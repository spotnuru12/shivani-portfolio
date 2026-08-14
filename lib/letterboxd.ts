// Letterboxd has no public API, but every profile publishes an RSS diary feed.
// We read it server-side and revalidate hourly, so the film shelf keeps itself
// current without a client fetch or an API key.
//
// Set LETTERBOXD_USERNAME in lib/data.ts. While it's empty — or if the feed is
// unreachable — the shelf falls back to the curated FILMS list in lib/data.ts.

import { LETTERBOXD_USERNAME } from './data'

export interface Film {
  title: string
  year: string
  /** 0.5–5 in half-star steps, or null when the entry is unrated. */
  rating: number | null
  watchedDate: string
  rewatch: boolean
  poster: string | null
  url: string
}

export interface LetterboxdData {
  films: Film[]
  filmsThisYear: number | null
  avgRecentRating: number | null
  profileUrl: string
}

/** Cache tag for the diary feed, shared with the on-demand refresh route. */
export const LETTERBOXD_TAG = 'letterboxd'

export function letterboxdProfileUrl(): string | null {
  return LETTERBOXD_USERNAME ? `https://letterboxd.com/${LETTERBOXD_USERNAME}/` : null
}

function tag(item: string, name: string): string | null {
  const match = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))
  return match ? match[1].trim() : null
}

function parseItem(item: string, fallbackUrl: string): Film | null {
  // Diary entries carry filmTitle; list and review-only items don't.
  const title = tag(item, 'letterboxd:filmTitle')
  if (!title) return null

  const ratingRaw = tag(item, 'letterboxd:memberRating')
  const rating = ratingRaw ? Number.parseFloat(ratingRaw) : null
  const posterMatch = item.match(/<img src="([^"]+)"/)

  return {
    title: title.replace(/^<!\[CDATA\[|\]\]>$/g, ''),
    year: tag(item, 'letterboxd:filmYear') ?? '',
    rating: rating !== null && Number.isFinite(rating) ? rating : null,
    watchedDate: tag(item, 'letterboxd:watchedDate') ?? '',
    rewatch: tag(item, 'letterboxd:rewatch') === 'Yes',
    poster: posterMatch ? posterMatch[1].replace(/&amp;/g, '&') : null,
    url: tag(item, 'link') ?? fallbackUrl,
  }
}

export async function getLetterboxd(): Promise<LetterboxdData | null> {
  const profileUrl = letterboxdProfileUrl()
  if (!profileUrl) return null

  try {
    // Tagged so the refresh button (app/api/letterboxd/refresh) can bust this
    // entry on demand instead of waiting out the hour.
    const res = await fetch(`${profileUrl}rss/`, {
      next: { revalidate: 3600, tags: [LETTERBOXD_TAG] },
    })
    if (!res.ok) return null

    const xml = await res.text()
    const films = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map((m) => parseItem(m[1], profileUrl))
      .filter((f): f is Film => f !== null)

    if (films.length === 0) return null

    const rated = films.filter((f) => f.rating !== null)
    const thisYear = String(new Date().getFullYear())

    return {
      films,
      filmsThisYear: films.filter((f) => f.watchedDate.startsWith(thisYear)).length,
      avgRecentRating:
        rated.length > 0
          ? rated.reduce((sum, f) => sum + (f.rating ?? 0), 0) / rated.length
          : null,
      profileUrl,
    }
  } catch {
    return null
  }
}

/** Renders 4.5 as "★★★★½". */
export function stars(rating: number): string {
  return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '')
}
