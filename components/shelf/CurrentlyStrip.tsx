// Paper strip above the shelf: the one-line version of what I'm on right now.
// Reading and watching come from the same sources the cards below use, so this
// can't drift out of sync with them.
export default function CurrentlyStrip({
  reading,
  watching,
  into,
}: {
  reading: string | null
  watching: string | null
  into: string
}) {
  const items = [
    { label: 'reading', value: reading },
    { label: 'watching', value: watching },
    { label: 'into', value: into },
  ].filter((i) => i.value)

  return (
    <div className="note rounded-xl px-6 py-4 grid gap-4 sm:grid-cols-3 sm:divide-x sm:divide-black/10">
      {items.map(({ label, value }) => (
        <div key={label} className="sm:px-5 sm:first:pl-0 sm:last:pr-0">
          <div className="text-[10.5px] uppercase tracking-[0.2em] opacity-50">{label}</div>
          <div className="hand mt-1 text-[21px] leading-tight">{value}</div>
        </div>
      ))}
    </div>
  )
}
