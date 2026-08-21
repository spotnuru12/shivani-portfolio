'use client'

import { useState } from 'react'
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

      <div className="relative mt-14">
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
  const [open, setOpen] = useState(false)

  return (
    <article className="relative flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
      <div className="hidden md:block w-[180px] shrink-0 pt-7 text-right pr-4">
        <div className="font-display text-[22px] leading-[1.15]">{start}</div>
        <div className="mt-0.5 text-[15px] text-muted">→ {end}</div>
      </div>

      <div className="md:hidden pl-8 text-[14px] font-display">
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
        className="on-cream flex-1 ml-6 md:ml-0 rounded-3xl p-6"
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
              <h3 className="font-display text-[20px] md:text-[24px] leading-[1.15]">{job.role}</h3>
              <div className="text-[13.5px] opacity-65">{job.loc}</div>
            </div>
            <div className="mt-0.5 text-[16px] md:text-[18px] font-medium" style={{ color: 'var(--orange-ink)' }}>
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
            <p className="mt-3 text-[14.5px] md:text-[15.5px] leading-[1.55] opacity-90">{job.blurb}</p>

            <div className={`jobmore ${open ? 'open' : ''}`}>
              <div className="jobmore-inner">
                <div className="mt-3.5">
                  <div className="text-[14px] font-medium text-orange-ink">What I did</div>
                  <ul className="mt-2 pl-[18px] text-[15px] leading-[1.6] opacity-85 list-disc">
                    {job.bullets.map((item) => (
                      <li key={item} className="mt-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              {job.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md px-3 py-1.5 text-[13px] font-medium"
                  style={{ background: 'var(--work-chip)', color: 'var(--work-chip-ink)' }}
                >
                  {tag}
                </span>
              ))}
              <button
                type="button"
                className={`morebtn ${open ? 'open' : ''}`}
                aria-expanded={open}
                aria-label={open ? 'Hide details' : 'Show what I did'}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="relative inline-block h-2.5 w-2.5" aria-hidden>
                  <span className="absolute left-0 top-[4px] h-0.5 w-2.5 rounded-sm bg-current" />
                  <span className="movbar absolute left-[4px] top-0 h-2.5 w-0.5 rounded-sm bg-current" />
                </span>
              </button>
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
    <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-[14px] bg-transparent">
      {logo ? (
        <Image
          src={logo}
          alt=""
          fill
          className={fit === 'cover' ? 'object-cover' : 'object-contain p-1'}
          sizes="52px"
        />
      ) : (
        <span className="grid h-full w-full place-items-center font-display text-[15px]">
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
