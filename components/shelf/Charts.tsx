import type { Bar } from '@/lib/media-stats'
import { lorenz } from '@/lib/media-stats'

const INK = 'currentColor'
const LINE = 'var(--card-line)'
const ACCENT = '#e4571b'

export function HBars({ rows, max }: { rows: Bar[]; max?: number }) {
  const peak = max ?? Math.max(1, ...rows.map((r) => r.value))
  return (
    <ul className="space-y-2">
      {rows.map((row) => (
        <li key={row.label}>
          <div className="flex items-baseline justify-between gap-3 text-[12px]">
            <span className="min-w-0 truncate font-medium">{row.label}</span>
            <span className="shrink-0 tabular-nums opacity-55">
              {row.detail ?? (row.value <= 1 ? `${Math.round(row.value * 100)}%` : row.value)}
            </span>
          </div>
          <div className="mt-1 h-[5px] overflow-hidden rounded-full" style={{ background: LINE }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${(row.value / peak) * 100}%`, background: ACCENT }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function Histogram({ rows }: { rows: Bar[] }) {
  const peak = Math.max(1, ...rows.map((r) => r.value))
  return (
    <div className="flex h-[88px] items-end gap-[3px]">
      {rows.map((row) => (
        <div key={row.label} className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-sm"
            style={{
              height: `${Math.max(4, (row.value / peak) * 72)}px`,
              background: row.value > 0 ? ACCENT : LINE,
              opacity: row.value > 0 ? 1 : 0.7,
            }}
          />
          <span className="text-[9px] tabular-nums opacity-45">{row.label}</span>
        </div>
      ))}
    </div>
  )
}

export function Lorenz({ weights }: { weights: number[] }) {
  const pts = lorenz(weights)
  const d = pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(p.x * 100).toFixed(1)} ${(100 - p.y * 100).toFixed(1)}`)
    .join(' ')
  return (
    <svg viewBox="0 0 100 100" className="h-[88px] w-full overflow-visible" aria-hidden>
      <line x1="0" y1="100" x2="100" y2="0" stroke={LINE} strokeWidth="1.2" />
      <path d={d} fill="none" stroke={ACCENT} strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
      <text x="3" y="12" fill={INK} fontSize="8" opacity="0.4">
        even
      </text>
    </svg>
  )
}
