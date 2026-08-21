import { SKILL_DEFINITIONS } from '@/lib/data'

export default function SkillChip({ name }: { name: string }) {
  const def = SKILL_DEFINITIONS[name]
  const tipId = def ? `skill-tip-${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}` : undefined
  return (
    <span className="relative inline-flex group">
      {/* Colours stay as classes rather than inline styles so the group-hover
          variants can actually win — inline styles can't be overridden. */}
      <span
        tabIndex={0}
        aria-describedby={tipId}
        className="text-[13.5px] md:text-[14.5px] px-3.5 py-1.5 rounded-full border border-line-strong text-ink-soft cursor-help transition-colors group-hover:bg-transparent group-hover:text-orange-ink group-hover:border-orange focus:bg-transparent focus:text-orange-ink focus:border-orange focus:outline-none"
      >
        {name}
      </span>
      {def && (
        <span
          id={tipId}
          role="tooltip"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2.5 -translate-y-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 z-30 w-[230px] md:w-[250px] text-left rounded-xl p-3 text-[13px] leading-[1.5] bg-note text-note-ink shadow-lift"
        >
          <span className="block">{def}</span>
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-note" />
        </span>
      )}
    </span>
  )
}
