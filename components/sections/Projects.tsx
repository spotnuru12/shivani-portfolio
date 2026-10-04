import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Projects() {
  return (
    <section id="projects" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="projects" title="Things I've built" />
      </Reveal>

      <div className="mt-heading grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 50}>
            <ProjectCard project={p} idx={i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  idx,
}: {
  project: (typeof PROJECTS)[number]
  idx: number
}) {
  const hoverCopy = project.sections.find((s) => s.body.length > 0)?.body[0] ?? project.blurb

  return (
    <Link
      href={`/case-study/${project.slug}`}
      className="reveal-trigger relative block h-[300px] sm:h-[340px] rounded-2xl overflow-hidden group border border-black/10 bg-navy text-charcoal"
    >
      <div className="on-navy absolute inset-0 p-5 md:p-6 flex flex-col justify-between text-cream">
        <div>
          <div className="text-caption text-orange-ink">
            {project.timeline}
          </div>
          <h3 className="font-display text-h3 mt-1.5">
            {project.title}
          </h3>
          <div className="italic text-small mt-1 text-orange-ink">
            {project.sub}
          </div>
          <p className="text-caption mt-4 opacity-90">{hoverCopy}</p>
        </div>
        <div className="flex flex-wrap gap-1 pr-20 md:pr-36">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-micro font-semibold px-2 py-1 rounded border border-cream text-cream"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="on-cream reveal-cover absolute inset-0 z-10 flex flex-col p-5 md:p-6 bg-white">
        <div className="flex items-start justify-between text-caption text-muted">
          <div>P.{String(idx + 1).padStart(2, '0')}</div>
          <div>{project.timeline}</div>
        </div>

        <div className="mt-3 h-[84px] rounded-[10px] overflow-hidden relative bg-panel" />

        <div className="mt-3 flex-1 min-h-0">
          <div className="font-display text-h3">{project.title}</div>
          <div className="italic text-small mt-1 text-orange-ink">
            {project.sub}
          </div>
          <p className="mt-3 text-caption text-charcoal-soft line-clamp-2">{project.blurb}</p>
        </div>

        <div className="mt-3 pt-3 border-t border-black/10 flex items-end pr-20 md:pr-36">
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-micro font-semibold px-2 py-1 rounded bg-charcoal text-paper"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <span className="reveal-cta">
        <span className="cta-idle">View</span>
        <span className="cta-open">View case study</span>
        <span className="reveal-arrow inline-flex">
          <ArrowUpRight size={15} />
        </span>
      </span>
    </Link>
  )
}
