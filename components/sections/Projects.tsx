import Link from 'next/link'
import { PROJECTS } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Projects() {
  return (
    <section id="projects" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="projects" title="Things I've built" />
      </Reveal>

      <div className="mt-11 grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} as="article" delay={i * 50}>
            <Link
              href={`/case-study/${p.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-panel/50 p-6 transition-all hover:border-orange/50 hover:-translate-y-0.5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[22px] leading-tight">{p.title}</h3>
                <span className="font-sans text-[12px] text-muted tabular-nums shrink-0">{p.year}</span>
              </div>
              <p className="mt-1.5 text-[14px] text-orange-ink">{p.sub}</p>
              <p className="mt-3 flex-1 text-[15px] text-ink-soft leading-relaxed">{p.blurb}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="font-sans text-[11px] rounded-full border border-line px-2 py-0.5 text-ink-soft">{t}</span>
                  ))}
                </div>
                <span className="font-sans text-[12px] text-orange-ink opacity-0 group-hover:opacity-100 transition-opacity">
                  case study →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
