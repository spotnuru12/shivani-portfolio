'use client'

import { MOCK_LISTENING, MOCK_TOP_ARTISTS } from '@/lib/spotify'
import { listeningPlot } from '@/lib/media-stats'
import { useSharedSpotify } from '@/components/spotify/SpotifyProvider'
import { HBars } from './Charts'

export default function SpotifyStats() {
  const live = useSharedSpotify()
  const names =
    live.topArtistNames.length > 0 ? live.topArtistNames : MOCK_TOP_ARTISTS
  const plot = listeningPlot(names, 10)
  const genres =
    live.topGenres.length > 0
      ? live.topGenres
      : MOCK_LISTENING.genres
  const genreBars = genres.map((g) => ({
    label: g.name,
    value: g.pct / 100,
    detail: `${g.pct}%`,
  }))
  const genreLead = genres[0]

  return (
    <div
      className="on-cream h-full rounded-3xl p-6 md:p-8"
      style={{
        background: 'var(--work-card)',
        color: 'var(--work-card-ink)',
        boxShadow: '0 14px 36px rgba(27, 26, 23, 0.13)',
      }}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-ink">
            last 4 weeks
          </div>
          <h4 className="mt-1 font-display text-[26px] md:text-[32px] leading-[1.05]">
            How lopsided is the top 10
          </h4>
        </div>
        <span className="text-[12px] text-muted">
          {live.live ? 'live rank weight' : 'sample rank weight'}
        </span>
      </div>

      <p className="mt-3 max-w-prose text-[14.5px] leading-relaxed text-ink-soft">
        Spotify will not give hours listened, so this is affinity rank, not playtime.
        If the top 10 split evenly, each artist would be {Math.round(plot.evenShare * 100)}%.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric
          value={`${plot.timesEven.toFixed(1)}×`}
          label="how much #1 over-indexes vs even"
        />
        <Metric
          value={`${Math.round(plot.mad * 100)} pt`}
          label="mean gap from an even split"
        />
        <Metric
          value={plot.evenness.toFixed(2)}
          label="evenness (1 = all equal)"
        />
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div>
          <div className="shelf-label mb-3 opacity-70">Share of the top 10</div>
          <HBars rows={plot.bars} />
          <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
            #{1} holds {Math.round(plot.top1Share * 100)}% of the rank weight.
            A flat line would mean you rotated through everyone the same.
          </p>
        </div>

        <div>
          <div className="shelf-label mb-3 opacity-70">Genres, folded</div>
          <HBars rows={genreBars} />
          <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
            {genreLead
              ? `${genreLead.name} leads this window (${genreLead.pct}%). Spotify tags are messy on purpose, so near-duplicate labels get folded first.`
              : 'Genre tags show up once the live artists load.'}
          </p>
        </div>
      </div>
    </div>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl px-4 py-3" style={{ background: 'var(--bg-panel)' }}>
      <div className="font-display truncate text-[28px] leading-none tracking-tight">{value}</div>
      <div className="mt-2 text-[11px] font-medium leading-snug text-muted">{label}</div>
    </div>
  )
}
