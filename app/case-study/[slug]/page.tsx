import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PROJECTS } from '@/lib/data'
import CaseStudyNav from '@/components/CaseStudyNav'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PROJECTS.find((x) => x.slug === params.slug)
  if (!p) return {}
  return { title: p.title, description: p.blurb }
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const toc = [
    { id: 'overview', heading: 'Overview' },
    ...project.sections.map((s) => ({ id: s.id, heading: s.heading })),
  ]

  const meta: [string, string | string[]][] = [
    ['timeline', project.timeline],
    ['role', project.roleLabel],
    ['team', project.team],
    ['tools', project.tools],
  ]

  return (
    <div className="max-w-content mx-auto px-6 md:px-10 py-14 md:py-20">
      <Link href="/#projects" className="font-sans text-[12.5px] text-muted hover:text-orange-ink transition-colors">
        ← back to projects
      </Link>

      {/* Breadcrumb (Caleb Wu style) */}
      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3.5 py-1.5 font-sans text-[12px]">
        <span className="text-orange-ink">📁</span>
        <span>{project.title}</span>
        <span className="text-muted">▸</span>
        <span className="text-muted">case study</span>
      </div>

      <div className="mt-8 grid md:grid-cols-[200px_1fr] gap-10 md:gap-14">
        {/* Left TOC sidebar (Emmi Wu style) */}
        <CaseStudyNav items={toc} />

        {/* Body */}
        <article className="min-w-0">
          <section id="overview" className="scroll-mt-24">
            <h1 className="font-display text-[38px] md:text-[52px] leading-[1.02] tracking-tight">
              {project.title}
            </h1>
            <p className="mt-3 text-[18px] md:text-[20px] text-orange-ink">{project.sub}</p>

            {/* Metadata row */}
            <dl className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-6 border-y border-line py-7">
              {meta.map(([label, value]) => (
                <div key={label}>
                  <dt className="font-sans text-[11px] uppercase tracking-[0.16em] text-orange-ink">{label}</dt>
                  <dd className="mt-2 text-[14px] text-ink-soft leading-snug">
                    {Array.isArray(value)
                      ? value.map((v) => <div key={v}>{v}</div>)
                      : value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-[17px] md:text-[19px] text-ink-soft leading-relaxed max-w-prose">
              {project.blurb}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-wash px-4 py-2 font-sans text-[12.5px] text-orange-ink"
                 style={{ background: 'var(--orange-wash)' }}>
              outcome · {project.outcome}
            </div>
          </section>

          {project.sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 mt-14">
              <h2 className="font-display text-[26px] md:text-[30px] leading-tight">{s.heading}</h2>
              <div className="mt-4 space-y-4 max-w-prose">
                {s.body.map((para, i) => (
                  <p key={i} className="text-[16px] md:text-[17px] text-ink-soft leading-relaxed">{para}</p>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-16 border-t border-line pt-8">
            <Link href="/#projects" className="font-sans text-[13px] text-orange-ink hover:underline">
              ← all projects
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
