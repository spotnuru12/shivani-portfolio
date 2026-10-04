'use client'

import type { ReactNode } from 'react'
import { PROFILE } from '@/lib/data'
import { MOCK_LISTENING, MOCK_TOP_ARTISTS } from '@/lib/spotify'
import type { Film } from '@/lib/letterboxd'
import { useSharedSpotify } from '@/components/spotify/SpotifyProvider'

function Em({ children }: { children: string }) {
  return <span className="text-ink font-medium">{children}</span>
}

function mostCommonDecade(films: Film[]): string | null {
  const counts = new Map<number, number>()
  for (const film of films) {
    const year = Number.parseInt(film.year, 10)
    if (!Number.isFinite(year)) continue
    const decade = Math.floor(year / 10) * 10
    counts.set(decade, (counts.get(decade) ?? 0) + 1)
  }

  let best: number | null = null
  let bestCount = -1
  for (const [decade, count] of counts) {
    if (best === null || count > bestCount || (count === bestCount && decade > best)) {
      best = decade
      bestCount = count
    }
  }
  return best === null ? null : String(best)
}

function joinClauses(clauses: ReactNode[]): ReactNode[] {
  if (clauses.length <= 1) return clauses
  if (clauses.length === 2) return [clauses[0], ' and ', clauses[1]]
  return [clauses[0], ', ', clauses[1], ', and ', clauses[2]]
}

export default function MediaMix({ films }: { films: Film[] }) {
  const live = useSharedSpotify()
  const topArtist = live.topArtistNames[0] ?? MOCK_TOP_ARTISTS[0] ?? null
  const rawGenre = live.topGenres[0]?.name ?? MOCK_LISTENING.genres[0]?.name
  const topGenre = rawGenre ? rawGenre.toLowerCase() : null
  const topDecade = mostCommonDecade(films)

  const clauses: ReactNode[] = []
  if (topArtist) clauses.push(<>a lot of <Em>{topArtist}</Em></>)
  if (topGenre) clauses.push(<>mostly <Em>{topGenre}</Em></>)
  if (topDecade) clauses.push(<>movies from the <Em>{`${topDecade}s`}</Em></>)

  return (
    <div className="max-w-prose text-[17px] leading-[1.6] text-ink-soft">
      {clauses.length > 0 ? <p>Lately: {joinClauses(clauses)}.</p> : null}
      <p className={clauses.length > 0 ? 'mt-3' : undefined}>
        Got a song or movie I should check out?{' '}
        <a
          href={`mailto:${PROFILE.email}?subject=A%20rec%20for%20you`}
          className="orglink inline-flex min-h-11 items-center text-orange-ink font-medium"
        >
          Send me a rec →
        </a>
      </p>
    </div>
  )
}
