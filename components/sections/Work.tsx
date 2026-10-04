import Image from 'next/image'
import { EXPERIENCE, type Experience } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Work() {
  return (
    <section id="work" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="experience" title="Where I've worked" />
      </Reveal>

      <div className="relative mt-heading">
        <div className="timeline-line hidden md:block" style={{ left: 196 }} aria-hidden />
        <div className="timeline-line md:hidden" style={{ left: 7 }} aria-hidden />

        <ol className="flex flex-col gap-7">
          {EXPERIENCE.map((job) => (
            <li key={job.role + job.org}>
              <TimelineRow job={job} present={job.dates.includes('Present')} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function TimelineRow({ job, present }: { job: Experience; present: boolean }) {
  const [start, end] = splitDates(job.dates)
  const initials = initialsFor(job.org)

  return (
    <article className="relative flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
      <div className="hidden md:block w-[180px] shrink-0 pt-7 text-right pr-4">
        <div className="font-display text-h3">{start}</div>
        <div className="mt-0.5 text-small text-muted">→ {end}</div>
      </div>

      <div className="md:hidden pl-8 text-caption font-semibold">
        {start} <span className="font-sans font-normal text-muted">→ {end}</span>
      </div>

      <span
        className={`timeline-dot hidden md:block top-[34px] ${present ? 'present' : 'passed'}`}
        style={{ left: 189 }}
        aria-hidden
      />
      <span
        className={`timeline-dot md:hidden top-[6px] ${present ? 'present' : 'passed'}`}
        style={{ left: 1 }}
        aria-hidden
      />

      <div
        className="on-cream flex-1 ml-6 md:ml-0 rounded-2xl md:rounded-3xl p-4 md:p-6"
        style={{
          background: 'var(--work-card)',
          color: 'var(--work-card-ink)',
          boxShadow: '0 14px 36px rgba(27, 26, 23, 0.13)',
        }}
      >
        <div className="flex items-start gap-5">
          <Mark logo={job.logo} fit={job.logoFit} initials={initials} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h3 className="font-display text-h3">{job.role}</h3>
              <div className="text-caption opacity-75">{job.loc}</div>
            </div>
            <div className="mt-0.5 text-body font-medium" style={{ color: 'var(--orange-ink)' }}>
              {job.url ? (
                <a href={job.url} target="_blank" rel="noopener noreferrer" className="orglink">
                  {job.org}{' '}
                  <span className="orgarrow" aria-hidden>
                    ↗
                  </span>
                </a>
              ) : (
                job.org
              )}
            </div>

            <ul className="mt-4 pl-4 text-small opacity-90 list-disc">
              {job.bullets.map((item) => (
                <li key={item} className="mt-1">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              {job.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md px-3 py-1.5 text-caption font-medium"
                  style={{ background: 'var(--work-chip)', color: 'var(--work-chip-ink)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function Mark({
  logo,
  fit = 'contain',
  initials,
}: {
  logo?: string
  fit?: 'cover' | 'contain'
  initials: string
}) {
  return (
    <div className="relative h-11 w-11 md:h-[52px] md:w-[52px] shrink-0 overflow-hidden rounded-[14px] bg-transparent">
      {logo ? (
        <Image
          src={logo}
          alt=""
          fill
          className={fit === 'cover' ? 'object-cover' : 'object-contain p-1'}
          sizes="52px"
        />
      ) : (
        <span className="grid h-full w-full place-items-center text-small font-semibold">
          {initials}
        </span>
      )}
    </div>
  )
}

function splitDates(dates: string): [string, string] {
  const [start, end] = dates.split(' – ')
  return [start ?? dates, end ?? '']
}

function initialsFor(org: string): string {
  const first = org.split(/[·,]/)[0]?.trim() ?? org
  const words = first.split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}
