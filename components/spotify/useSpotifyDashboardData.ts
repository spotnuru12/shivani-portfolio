'use client'

import { useEffect, useState } from 'react'

// ── Spotify API response shapes (only what we read) ─────────────────────
interface SpotifyImage {
  url: string
  width?: number
  height?: number
}
interface SpotifyArtistRef {
  id: string
  name: string
}
interface SpotifyAlbum {
  name: string
  images: SpotifyImage[]
}
interface SpotifyTrack {
  id: string
  name: string
  artists: SpotifyArtistRef[]
  album: SpotifyAlbum
  duration_ms: number
}
interface RecentlyPlayedItem {
  track: SpotifyTrack
  played_at: string
}
interface TopArtistsItem {
  id: string
  name: string
  genres: string[]
  images: SpotifyImage[]
}

// ── Shapes we expose to the dashboard ────────────────────────────────────
export interface NowPlayingDisplay {
  song: string
  artist: string
  album: string
  cover: string | null
  elapsed: string
  duration: string
}
export interface TopTrackDisplay {
  song: string
  artist: string
  album: string
  cover: string | null
  duration: string
}
export interface TopArtistSummary {
  name: string
  /** Number of times this artist appears across the user's top tracks. */
  plays: number
  cover: string | null
}
export interface RecentTrackDisplay {
  song: string
  artist: string
  cover: string | null
  /** Relative time (e.g. "2h ago"). */
  when: string
}
export interface GenreSlice {
  name: string
  /** Share of total listening weight, so the five slices are comparable. */
  pct: number
  /** Top artists carrying this genre — shows where the number came from. */
  artists: string[]
}
export interface SpotifyDashboardData {
  loading: boolean
  live: boolean
  nowPlaying: NowPlayingDisplay | null
  recentTracks: RecentTrackDisplay[]
  topTracks: TopTrackDisplay[]
  topArtist: TopArtistSummary | null
  topGenres: GenreSlice[]
}

// ── Helpers ─────────────────────────────────────────────────────────────
function msToClock(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function pickArt(images: SpotifyImage[] | undefined): string | null {
  if (!images || images.length === 0) return null
  // Spotify returns images largest first; grab a mid-size if available.
  return images[1]?.url ?? images[0]?.url ?? null
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  const diffSec = Math.max(0, Math.round((Date.now() - then) / 1000))
  if (diffSec < 60) return `${diffSec}s ago`
  const diffMin = Math.round(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffH = Math.round(diffMin / 60)
  if (diffH < 24) return `${diffH}h ago`
  const diffD = Math.round(diffH / 24)
  return `${diffD}d ago`
}

// ── Genre normalization ─────────────────────────────────────────────────
// Spotify's artist genres are long-tail and overlapping: one artist can carry
// "indie folk", "chamber pop", "stomp and holler" and "pov: indie" at once.
// Showing them raw produces five near-duplicate rows plus meta-tags that mean
// nothing to a reader, so we fold them into families first.

// Editorial/meta tags Spotify emits that describe a playlist mood, not a genre.
const GENRE_DENYLIST = new Set([
  'pov: indie',
  'escape room',
  'shiver pop',
  'vapor soul',
  'indie hip hop',
  'alt z',
  'metropopolis',
  'bubblegrunge',
  'candy pop',
])

// Ordered longest-match-first so "indie folk" wins over the bare "folk" rule.
const GENRE_FAMILIES: [RegExp, string][] = [
  [/singer-?songwriter|stomp and holler/, 'singer-songwriter'],
  [/indie folk|folk[- ]?pop|freak folk|new americana/, 'indie folk'],
  [/chamber pop|baroque pop|art pop/, 'chamber pop'],
  [/neo ?soul|alternative r&b|alt z r&b|r&b/, 'alt R&B'],
  [/bedroom pop|lo-?fi/, 'bedroom pop'],
  [/indie pop|indietronica/, 'indie pop'],
  [/indie rock|alternative rock|garage rock/, 'indie rock'],
  [/classical|orchestra|piano|compositional/, 'classical'],
  [/ambient|drone|new age/, 'ambient'],
  [/hip ?hop|rap|trap/, 'hip hop'],
  [/soundtrack|score|film/, 'soundtracks'],
  [/bollywood|desi|filmi|punjabi|telugu|tamil/, 'south asian'],
  [/house|techno|edm|electro/, 'electronic'],
  [/jazz|bossa/, 'jazz'],
  [/country|bluegrass/, 'country'],
  [/\bpop\b/, 'pop'],
  [/\brock\b/, 'rock'],
  [/\bfolk\b/, 'folk'],
]

function canonicalGenre(raw: string): string | null {
  const tag = raw.trim().toLowerCase()
  if (!tag || GENRE_DENYLIST.has(tag)) return null
  for (const [pattern, family] of GENRE_FAMILIES) {
    if (pattern.test(tag)) return family
  }
  return tag
}

/**
 * Score genres by rank-weighted artist overlap. `me/top/artists` comes back in
 * descending affinity order, so a linear decay makes your #1 artist count more
 * than your #20 — raw set size treated them identically. Percentages are shares
 * of total weight, which makes the five rows directly comparable.
 */
function deriveGenres(artists: TopArtistsItem[]): GenreSlice[] {
  const weights = new Map<string, number>()
  const provenance = new Map<string, string[]>()

  artists.forEach((artist, index) => {
    const weight = artists.length - index
    const families = new Set(
      (artist.genres ?? [])
        .map(canonicalGenre)
        .filter((g): g is string => g !== null)
    )
    for (const family of families) {
      weights.set(family, (weights.get(family) ?? 0) + weight)
      const seen = provenance.get(family) ?? []
      if (seen.length < 3) provenance.set(family, [...seen, artist.name])
    }
  })

  const total = Array.from(weights.values()).reduce((sum, w) => sum + w, 0)
  if (total === 0) return []

  return Array.from(weights.entries())
    .map(([name, weight]) => ({
      name,
      pct: Math.round((weight / total) * 100),
      artists: provenance.get(name) ?? [],
    }))
    .filter((g) => g.pct > 0)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 5)
}

function deriveTopArtist(tracks: SpotifyTrack[]): TopArtistSummary | null {
  const counts = new Map<string, number>()
  const cover = new Map<string, string | null>()
  for (const t of tracks) {
    for (const a of t.artists) {
      counts.set(a.name, (counts.get(a.name) ?? 0) + 1)
      if (!cover.has(a.name)) cover.set(a.name, pickArt(t.album.images))
    }
  }
  if (counts.size === 0) return null
  const [name, plays] = Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]
  return { name, plays, cover: cover.get(name) ?? null }
}

// ── Fetcher ──────────────────────────────────────────────────────────────
const fetchOpts: RequestInit = { credentials: 'include', cache: 'no-store' }

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, fetchOpts)
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

// ── Hook ─────────────────────────────────────────────────────────────────
/**
 * Pulls live Spotify data from the route handlers under /api/spotify and shapes
 * it for `<SpotifyDashboard />`. Returns `live=false` until the first successful
 * response so the caller can keep showing sample data.
 */
export function useSpotifyDashboardData(): SpotifyDashboardData {
  const [state, setState] = useState<SpotifyDashboardData>({
    loading: true,
    live: false,
    nowPlaying: null,
    recentTracks: [],
    topTracks: [],
    topArtist: null,
    topGenres: [],
  })

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      const [topTracksJson, topArtistsJson, recentJson] = await Promise.all([
        safeFetch<{ items?: SpotifyTrack[] }>(
          '/api/spotify/top-tracks?limit=5&time_range=short_term'
        ),
        safeFetch<{ items?: TopArtistsItem[] }>(
          '/api/spotify/top-artists?limit=20&time_range=short_term'
        ),
        // 4 recent: 1 for the "last played" hero + up to 3 for the recents list.
        safeFetch<{ items?: RecentlyPlayedItem[] }>('/api/spotify/recently-played?limit=4'),
      ])
      if (cancelled) return

      const topTracksRaw = topTracksJson?.items ?? []
      const topArtistsRaw = topArtistsJson?.items ?? []
      const recentRaw = recentJson?.items ?? []

      const anyLive =
        topTracksRaw.length > 0 || topArtistsRaw.length > 0 || recentRaw.length > 0
      if (!anyLive) {
        setState((s) => ({ ...s, loading: false }))
        return
      }

      const mostRecentItem = recentRaw[0]
      const nowPlaying: NowPlayingDisplay | null = mostRecentItem
        ? {
            song: mostRecentItem.track.name,
            artist: mostRecentItem.track.artists.map((a) => a.name).join(', '),
            album: mostRecentItem.track.album.name,
            cover: pickArt(mostRecentItem.track.album.images),
            elapsed: msToClock(mostRecentItem.track.duration_ms),
            duration: msToClock(mostRecentItem.track.duration_ms),
          }
        : null

      const recentTracks: RecentTrackDisplay[] = recentRaw.slice(1, 4).map((item) => ({
        song: item.track.name,
        artist: item.track.artists.map((a) => a.name).join(', '),
        cover: pickArt(item.track.album.images),
        when: relativeTime(item.played_at),
      }))

      const topTracks: TopTrackDisplay[] = topTracksRaw.slice(0, 5).map((t) => ({
        song: t.name,
        artist: t.artists.map((a) => a.name).join(', '),
        album: t.album.name,
        cover: pickArt(t.album.images),
        duration: msToClock(t.duration_ms),
      }))

      setState({
        loading: false,
        live: true,
        nowPlaying,
        recentTracks,
        topTracks,
        topArtist: deriveTopArtist(topTracksRaw),
        topGenres: deriveGenres(topArtistsRaw),
      })
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
