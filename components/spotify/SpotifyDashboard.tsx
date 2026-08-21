'use client'

import Image from 'next/image'
import { useState } from 'react'
import { LiveDot, SpotifyIcon } from '@/components/ui/Icons'
import { MOCK_LISTENING } from '@/lib/spotify'
import { useSharedSpotify } from './SpotifyProvider'
import {
  type GenreSlice,
  type NowPlayingDisplay,
  type RecentTrackDisplay,
  type TopArtistSummary,
  type TopTrackDisplay,
} from './useSpotifyDashboardData'

type Tab = 'now' | 'top' | 'genre'

// ── Resolve live -> display, falling back to the sample data ─────────────
function useDashboardView() {
  const live = useSharedSpotify()
  const mock = MOCK_LISTENING

  const fallbackNow: NowPlayingDisplay = {
    song: mock.nowPlaying.song,
    artist: mock.nowPlaying.artist,
    album: mock.nowPlaying.album,
    cover: mock.nowPlaying.cover ?? null,
    elapsed: mock.nowPlaying.duration,
    duration: mock.nowPlaying.duration,
  }
  const fallbackRecent: RecentTrackDisplay[] = mock.recent.map((t) => ({
    song: t.song,
    artist: t.artist,
    cover: t.cover ?? null,
    when: t.when ?? '',
  }))
  const fallbackTopTracks: TopTrackDisplay[] = mock.topTracks.map((t) => ({
    song: t.song,
    artist: t.artist,
    album: t.album ?? '',
    cover: t.cover ?? null,
    duration: t.duration ?? '',
  }))
  const fallbackTopArtist: TopArtistSummary = { ...mock.topArtist, cover: null }
  const fallbackGenres: GenreSlice[] = mock.genres.map((g) => ({
    name: g.name,
    pct: g.pct,
    artists: [...g.artists],
  }))

  return {
    live: live.live,
    loading: live.loading,
    nowPlaying: live.nowPlaying ?? fallbackNow,
    recentTracks: live.recentTracks.length > 0 ? live.recentTracks : fallbackRecent,
    topTracks: live.topTracks.length > 0 ? live.topTracks : fallbackTopTracks,
    topArtist: live.topArtist ?? fallbackTopArtist,
    topGenres: live.topGenres.length > 0 ? live.topGenres : fallbackGenres,
  }
}

// ─────────────────────────────────────────────────────────────────────────
export default function SpotifyDashboard({ className = '' }: { className?: string }) {
  const [tab, setTab] = useState<Tab>('now')
  const data = useDashboardView()
  const tabs: ReadonlyArray<readonly [Tab, string]> = [
    ['now', 'now'],
    ['top', 'top 5'],
    ['genre', 'genre'],
  ]

  return (
    <div className={`shelf-card h-full ${className}`}>
      <div className="shelf-card-head">
        <div className="flex min-w-0 items-center gap-2">
          <span style={{ color: '#1DB954' }}>
            <SpotifyIcon size={17} />
          </span>
          <span className="truncate text-[13px] font-semibold">Listening</span>
          <LiveDot live={data.live} loading={data.loading} label="Spotify" />
        </div>
        <div
          className="flex shrink-0 items-center gap-1 rounded-full p-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{ background: 'var(--card-line)' }}
        >
          {tabs.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              aria-pressed={tab === key}
              className={`rounded-full px-2.5 py-1 transition-colors ${tab === key ? '' : 'opacity-60'}`}
              style={{
                background: tab === key ? 'var(--card-ink)' : 'transparent',
                color: tab === key ? 'var(--card-bg)' : undefined,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="shelf-card-body">
        {tab === 'now' && <NowPanel now={data.nowPlaying} recent={data.recentTracks} />}
        {tab === 'top' && <TopPanel topTracks={data.topTracks} topArtist={data.topArtist} />}
        {tab === 'genre' && <GenrePanel genres={data.topGenres} />}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
function PanelHead({ label, aside }: { label: string; aside?: string }) {
  return (
    <div className="shelf-label flex items-baseline justify-between gap-2">
      <span className="opacity-70">{label}</span>
      {aside && (
        <span className="truncate" style={{ color: '#1DB954' }}>
          {aside}
        </span>
      )}
    </div>
  )
}

function NowPanel({ now, recent }: { now: NowPlayingDisplay; recent: RecentTrackDisplay[] }) {
  return (
    <div className="flex h-full flex-col">
      <PanelHead label="Last played" />
      <div className="mt-3 flex items-center gap-3">
        <AlbumCover src={now.cover} size={54} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-bold leading-tight">{now.song}</div>
          <div className="truncate text-[12px] opacity-80">{now.artist}</div>
          <div className="truncate text-[10px] opacity-55">{now.album}</div>
        </div>
      </div>

      {recent.length > 0 && (
        <>
          <div
            className="mt-4 border-t pt-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] opacity-55"
            style={{ borderColor: 'var(--card-line)' }}
          >
            Recently
          </div>
          <ul className="mt-2 space-y-2">
            {recent.slice(0, 3).map((t, i) => (
              <li key={`${t.song}-${i}`} className="flex items-center gap-3">
                <AlbumCover src={t.cover} size={26} rounded="rounded" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-semibold">{t.song}</div>
                  <div className="truncate text-[10px] opacity-60">{t.artist}</div>
                </div>
                <span className="shrink-0 text-[10px] tabular-nums opacity-50">{t.when}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function TopPanel({
  topTracks,
  topArtist,
}: {
  topTracks: TopTrackDisplay[]
  topArtist: TopArtistSummary
}) {
  return (
    <div className="flex h-full flex-col">
      <PanelHead label="Top tracks · 4 weeks" aside={topArtist.name} />
      <ul className="mt-3 space-y-2">
        {topTracks.slice(0, 5).map((t, i) => (
          <li key={`${t.song}-${i}`} className="flex items-center gap-3">
            <span className="w-4 shrink-0 text-[11px] font-semibold tabular-nums opacity-50">
              {String(i + 1).padStart(2, '0')}
            </span>
            <AlbumCover src={t.cover} size={26} rounded="rounded" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12px] font-semibold leading-tight">{t.song}</div>
              <div className="truncate text-[10px] opacity-60">{t.artist}</div>
            </div>
            <span className="shrink-0 text-[10px] tabular-nums opacity-50">{t.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Genres are folded into families and weighted by artist rank in the hook, so
// these five percentages are shares of the same total and can be compared.
function GenrePanel({ genres }: { genres: GenreSlice[] }) {
  const max = Math.max(1, ...genres.map((g) => g.pct))
  return (
    <div className="flex h-full flex-col">
      <PanelHead label="Top genres · 4 weeks" aside={genres[0]?.name ?? '—'} />
      <ul className="mt-3 space-y-1.5">
        {genres.slice(0, 5).map((g) => (
          <li key={g.name}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[12px] font-semibold">{g.name}</span>
              <span className="shrink-0 text-[10px] tabular-nums opacity-50">{g.pct}%</span>
            </div>
            <div
              className="mt-0.5 h-[3px] overflow-hidden rounded-full"
              style={{ background: 'var(--card-line)' }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: `${(g.pct / max) * 100}%`, background: '#1DB954' }}
              />
            </div>
            {g.artists.length > 0 && (
              <div className="mt-0.5 truncate text-[10px] opacity-50">
                via {g.artists.join(', ')}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
function AlbumCover({
  src,
  size,
  rounded = 'rounded-md',
}: {
  src: string | null
  size: number
  rounded?: string
}) {
  if (src) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden ${rounded}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>
    )
  }
  return (
    <div
      className={`grid shrink-0 place-items-center ${rounded}`}
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #1DB954, #0F7536 70%)',
      }}
    >
      <SpotifyIcon size={Math.max(12, Math.round(size * 0.36))} />
    </div>
  )
}
