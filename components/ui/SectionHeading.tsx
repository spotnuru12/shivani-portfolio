// Shared section header: orange eyebrow, big League Spartan title, and a rule
// that runs out to the right margin so each section opens on a clear line.
export default function SectionHeading({
  eyebrow,
  title,
  rule = true,
}: {
  eyebrow: string
  title: string
  rule?: boolean
}) {
  return (
    <>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <div className="flex items-center gap-6">
        <h2 className="font-display text-[36px] md:text-[52px] leading-[1.02] sm:whitespace-nowrap">
          {title}
        </h2>
        {rule && <span aria-hidden className="hidden sm:block h-px flex-1 bg-line" />}
      </div>
    </>
  )
}
