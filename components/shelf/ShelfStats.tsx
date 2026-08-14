// The tally under the ledge. Numbers are derived, not typed in, so they stay
// honest as the feeds move.
export default function ShelfStats({
  stats,
}: {
  stats: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-wrap gap-x-12 gap-y-5">
      {stats.map(({ value, label }) => (
        <div key={label}>
          <div className="font-display text-[30px] md:text-[36px] leading-none tabular-nums">
            {value}
          </div>
          <div className="mt-1.5 text-[12px] uppercase tracking-[0.14em] text-muted">{label}</div>
        </div>
      ))}
    </div>
  )
}
