import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS } from '@/lib/data'
import CaseStudyNav from '@/components/CaseStudyNav'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PROJECTS.find((x) => x.slug === params.slug)
  if (!p) return {}
  return { title: p.title, description: p.blurb, alternates: { canonical: `/case-study/${p.slug}` } }
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const visible = project.sections.filter((s) => s.body.length > 0)
  const toc = [
    { id: 'overview', heading: 'Overview' },
    ...visible.map((s) => ({ id: s.id, heading: s.heading })),
  ]

  const idx = PROJECTS.findIndex((p) => p.slug === project.slug)
  const next = PROJECTS[(idx + 1) % PROJECTS.length]

  const meta: [string, string | string[]][] = [
    ['Role', project.roleLabel],
    ['Timeline', project.timeline],
    ['Team', project.team],
    ['Tools', project.tools],
  ]

  return (
    <div className="max-w-content mx-auto px-6 md:px-10 py-14 md:py-20">
      <Link
        href="/#projects"
        className="inline-flex min-h-11 items-center text-caption text-muted hover:text-orange-ink transition-colors"
      >
        ← back to projects
      </Link>

      <nav className="mt-6 md:hidden -mx-1 overflow-x-auto" aria-label="On this page">
        <ul className="flex w-max gap-2 pb-1">
          {toc.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-line px-3.5 text-caption text-ink-soft"
              >
                {it.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 grid md:grid-cols-[200px_1fr] gap-10 md:gap-14">
        <CaseStudyNav items={toc} />

        <article className="min-w-0">
          <section id="overview" className="scroll-mt-24">
            <h1 className="font-display text-h2">{project.title}</h1>
            <p className="mt-3 text-body md:text-lead text-orange-ink">{project.sub}</p>

            <dl className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-6 border-y border-line py-7">
              {meta.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-caption text-muted">{label}</dt>
                  <dd className="mt-2 text-small text-ink-soft">
                    {Array.isArray(value)
                      ? value.map((v) => <div key={v}>{v}</div>)
                      : value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-body text-ink-soft max-w-prose">
              {project.blurb}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-wash px-4 py-2 text-caption text-orange-ink">
              Outcome · {project.outcome}
            </div>
          </section>

          {visible.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 mt-14">
              <h2 className="font-display text-h3">{s.heading}</h2>
              <div className="mt-4 space-y-4 max-w-prose">
                {s.body.map((para, i) => (
                  <p key={i} className="text-body text-ink-soft">{para}</p>
                ))}
              </div>
              {s.images?.map((img) => (
                <figure key={img.src} className="mt-6">
                  <div className="relative w-full overflow-hidden rounded-2xl">
                    <Image
                      src={img.src}
                      alt={img.caption}
                      width={1200}
                      height={800}
                      className="h-auto w-full rounded-2xl"
                    />
                  </div>
                  <figcaption className="mt-2 text-caption text-muted">{img.caption}</figcaption>
                </figure>
              ))}
            </section>
          ))}

          {next ? (
            <div className="mt-16 border-t border-line pt-8">
              <Link href={`/case-study/${next.slug}`} className="font-display text-h3 hover:text-orange-ink transition-colors">
                Next project →
              </Link>
            </div>
          ) : null}
        </article>
      </div>
    </div>
  )
}
