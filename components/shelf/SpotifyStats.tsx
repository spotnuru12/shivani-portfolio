'use client'

import { LiveDot, SpotifyIcon } from '@/components/ui/Icons'
import { MOCK_LISTENING } from '@/lib/spotify'
import { artistRankStats, gini, rankWeights } from '@/lib/media-stats'
import { useSpotifyDashboardData } from '@/components/spotify/useSpotifyDashboardData'
import { HBars, Lorenz } from './Charts'

export default function SpotifyStats() {
  const live = useSpotifyDashboardData()
  const names =
    live.topArtistNames.length > 0
      ? live.topArtistNames
      : Array.from(new Set(MOCK_LISTENING.topTracks.map((t) => t.artist)))
  const stats = artistRankStats(names)
  const weights = rankWeights(names.length)
  const liveFlag = live.live

  return (
    <div className="shelf-card h-full">
      <div className="shelf-card-head">
        <div className="flex min-w-0 items-center gap-2">
          <span style={{ color: '#1DB954' }}>
            <SpotifyIcon size={17} />
          </span>
          <span className="truncate text-[13px] font-semibold">Listening, by the numbers</span>
          <LiveDot live={liveFlag} loading={live.loading} label="Spotify" />
        </div>
        <span className="shrink-0 text-[10px] opacity-55">last 4 weeks</span>
      </div>

      <div className="stats-card-body">
        <div className="grid grid-cols-2 gap-3">
          <Metric value={names[0] ?? '—'} label="top artist" />
          <Metric value={String(stats.n || '—')} label="artists in this window" />
        </div>

        <p className="mt-4 text-[13px] leading-relaxed opacity-80">
          Rank-weighted, not hours. Spotify will not give total playtime, so this is the
          top {stats.n} artists in the last month: #{1} counts more than #{stats.n}.
        </p>

        <div className="mt-5">
          <div className="shelf-label mb-3 opacity-70">Most present</div>
          <HBars rows={stats.bars} />
        </div>

        <div className="mt-6">
          <div className="shelf-label mb-2 opacity-70">How top-heavy</div>
          <Lorenz weights={weights} />
          <p className="mt-2 text-[12px] leading-relaxed opacity-70">
            Top {stats.k} hold {Math.round(stats.topShare * 100)}% of this window
            {weights.length > 1 ? ` · Gini ${gini(weights).toFixed(2)}` : ''}. A straight
            diagonal would mean every artist in the top {stats.n} got equal weight.
          </p>
        </div>
      </div>
    </div>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl px-3 py-2.5" style={{ background: 'var(--card-line)' }}>
      <div className="font-display truncate text-[22px] leading-none tracking-tight">{value}</div>
      <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] opacity-50">
        {label}
      </div>
    </div>
  )
}
