import { LetterboxdIcon, LiveDot } from '@/components/ui/Icons'
import type { FilmStats } from '@/lib/media-stats'
import { HBars, Histogram } from './Charts'

export default function FilmStats({
  stats,
  live,
  profileUrl,
}: {
  stats: FilmStats
  live: boolean
  profileUrl: string | null
}) {
  const avg = stats.avg !== null ? stats.avg.toFixed(1) : '—'
  const yearN = stats.thisYear !== null ? String(stats.thisYear) : '—'

  return (
    <div className="shelf-card h-full">
      <div className="shelf-card-head">
        <div className="flex min-w-0 items-center gap-2">
          <LetterboxdIcon size={30} />
          <span className="truncate text-[13px] font-semibold">Watching, by the numbers</span>
          <LiveDot live={live} label="Letterboxd" />
        </div>
        {profileUrl && (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[10px] opacity-60 hover:opacity-100"
            style={{ color: '#FF8000' }}
          >
            diary →
          </a>
        )}
      </div>

      <div className="stats-card-body">
        <div className="grid grid-cols-3 gap-3">
          <Metric value={String(stats.n)} label="in the diary" />
          <Metric value={yearN} label="logged this year" />
          <Metric value={avg} label="avg rating" />
        </div>

        <p className="mt-4 text-[13px] leading-relaxed opacity-80">
          From the public Letterboxd RSS, so this is the recent diary, not every film
          you have ever logged.
          {stats.rewatchPct !== null && stats.rewatchPct > 0
            ? ` ${Math.round(stats.rewatchPct * 100)}% are rewatches.`
            : ''}
        </p>

        <div className="mt-5">
          <div className="shelf-label mb-3 opacity-70">Where the stars land</div>
          <Histogram rows={stats.ratings} />
        </div>

        {stats.decades.length > 0 && (
          <div className="mt-6">
            <div className="shelf-label mb-3 opacity-70">When the films were made</div>
            <HBars rows={stats.decades} />
          </div>
        )}

        {stats.highest.length > 0 && (
          <div className="mt-6">
            <div className="shelf-label mb-3 opacity-70">Highest in this feed</div>
            <HBars
              rows={stats.highest.map((row) => ({
                ...row,
                detail: `${row.value}${row.detail ? ` · ${row.detail}` : ''}`,
              }))}
              max={5}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl px-3 py-2.5" style={{ background: 'var(--card-line)' }}>
      <div className="font-display text-[22px] leading-none tracking-tight">{value}</div>
      <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] opacity-50">
        {label}
      </div>
    </div>
  )
}
