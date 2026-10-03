import type { ReactNode } from 'react'

// Shared section header: orange eyebrow, big League Spartan title, and a rule
// that runs out to the right margin. Optional doodle rides the rule.
export default function SectionHeading({
  eyebrow,
  title,
  rule = true,
  doodle,
}: {
  eyebrow: string
  title: string
  rule?: boolean
  doodle?: ReactNode
}) {
  return (
    <>
      <p className="eyebrow eyebrow-lg mb-4">{eyebrow}</p>
      <div className="flex items-end gap-5">
        <h2 className="font-display text-[32px] sm:text-[42px] md:text-[60px] leading-[1.08] md:leading-[1.02]">
          {title}
        </h2>
        {rule && (
          <div className="relative hidden sm:block flex-1 min-w-[72px] h-11 mb-1 overflow-hidden">
            <span aria-hidden className="absolute inset-x-0 top-[26px] h-px bg-line" />
            {doodle}
          </div>
        )}
      </div>
    </>
  )
}
