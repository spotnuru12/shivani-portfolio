import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'

const NAVY = '#00314f'
const CREAM = '#ffefd2'

export default function Projects() {
  return (
    <section id="projects" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="projects" title="Things I've built" />
      </Reveal>

      <div className="mt-11 grid sm:grid-cols-2 gap-5">
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
  const hoverCopy = project.sections[0]?.body[0] ?? project.blurb

  return (
    <Link
      href={`/case-study/${project.slug}`}
      className="reveal-trigger relative block rounded-2xl overflow-hidden group border border-black/10"
      style={{ background: NAVY, color: '#1b1a18', height: 340 }}
    >
      <div
        className="on-navy absolute inset-0 p-6 flex flex-col justify-between"
        style={{ color: CREAM }}
      >
        <div>
          <div className="text-[12px]" style={{ color: 'var(--orange-ink)' }}>
            {project.timeline}
          </div>
          <h3 className="font-display text-[24px] md:text-[28px] leading-[1.02] mt-1.5">
            {project.title}
          </h3>
          <div className="italic text-[15px] mt-1" style={{ color: 'var(--orange-ink)' }}>
            {project.sub}
          </div>
          <p className="text-[13.5px] mt-4 leading-[1.55] opacity-90">{hoverCopy}</p>
        </div>
        <div className="flex flex-wrap gap-1 pr-36">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] font-semibold px-2 py-1 rounded border"
              style={{ borderColor: CREAM, color: CREAM }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        className="on-cream reveal-cover absolute inset-0 z-10 flex flex-col p-6"
        style={{ background: '#ffffff' }}
      >
        <div className="flex items-start justify-between text-[12px] text-muted">
          <div>P.{String(idx + 1).padStart(2, '0')}</div>
          <div>{project.timeline}</div>
        </div>

        <div className="mt-3 h-[84px] rounded-[10px] overflow-hidden relative bg-[#f0ede5]" />

        <div className="mt-3 flex-1 min-h-0">
          <div className="font-display text-[22px] leading-[1.05]">{project.title}</div>
          <div className="italic text-[14px] mt-1" style={{ color: 'var(--orange-ink)' }}>
            {project.sub}
          </div>
          <p className="mt-2.5 text-[13px] leading-[1.5] text-[#4a4640] line-clamp-2">{project.blurb}</p>
        </div>

        <div className="mt-3 pt-3 border-t border-black/10 flex items-end pr-36">
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[11px] font-semibold px-2 py-1 rounded"
                style={{ background: '#1b1a18', color: '#fbfaf7' }}
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
