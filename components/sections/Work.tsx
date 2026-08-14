'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { EXPERIENCE, type Experience } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'

// The dotted timeline from the old site: a vertical line, a hollow dot per
// role, and a card to the right. The dot fills as you scroll past it so you
// can always tell where you are in the list. No disclosure, no "what I did" —
// the blurb is the whole story.

export default function Work() {
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const marker = window.innerHeight * 0.38
      let next = 0
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        if (el.getBoundingClientRect().top <= marker) next = i
      })
      setActive(next)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="work" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="experience" title="Where I've been" />
      </Reveal>

      <div className="relative mt-14">
        <div
          className="timeline-line hidden md:block"
          style={{ left: 196 }}
          aria-hidden
        />
        <div className="timeline-line md:hidden" style={{ left: 7 }} aria-hidden />

        <ol className="flex flex-col gap-7">
          {EXPERIENCE.map((job, i) => (
            <li
              key={job.role + job.org}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
            >
              <TimelineRow job={job} active={i === active} passed={i <= active} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function TimelineRow({
  job,
  active,
  passed,
}: {
  job: Experience
  active: boolean
  passed: boolean
}) {
  const [start, end] = splitDates(job.dates)
  const initials = initialsFor(job.org)

  return (
    <article className="relative flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
      <div className="hidden md:block w-[180px] shrink-0 pt-7 text-right pr-4">
        <div className="font-display text-[22px] leading-tight">{start}</div>
        <div className="mt-0.5 text-[15px] text-muted">→ {end}</div>
      </div>

      <div className="md:hidden pl-8 text-[14px] font-display">
        {start} <span className="font-sans font-normal text-muted">→ {end}</span>
      </div>

      <span
        className={`timeline-dot hidden md:block top-[34px] ${active ? 'active' : passed ? 'passed' : ''}`}
        style={{ left: 189 }}
        aria-hidden
      />
      <span
        className={`timeline-dot md:hidden top-[6px] ${active ? 'active' : passed ? 'passed' : ''}`}
        style={{ left: 1 }}
        aria-hidden
      />

      <div
        className="flex-1 ml-6 md:ml-0 rounded-3xl p-5 md:p-6 transition-transform duration-300 hover:-translate-y-1"
        style={{
          background: 'var(--work-card)',
          color: 'var(--work-card-ink)',
          boxShadow: '0 14px 36px rgba(27, 26, 23, 0.12)',
        }}
      >
        <div className="flex items-start gap-4 md:gap-5">
          <Mark logo={job.logo} initials={initials} />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h3 className="font-display text-[20px] md:text-[24px] leading-tight">
                {job.role}
                {job.status && (
                  <span
                    className="ml-2 align-middle inline-block rounded px-2 py-0.5 text-[11px] font-sans font-semibold uppercase tracking-[0.08em]"
                    style={{ background: 'var(--orange)', color: 'var(--work-card-ink)' }}
                  >
                    {job.status}
                  </span>
                )}
              </h3>
              <div className="text-[13.5px] opacity-65">{job.loc}</div>
            </div>
            <div className="mt-0.5 text-[16px] md:text-[18px] font-medium" style={{ color: 'var(--orange)' }}>
              {job.org}
            </div>
            <p className="mt-3 text-[14.5px] md:text-[15.5px] leading-[1.55] opacity-90">
              {job.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md px-3 py-1.5 text-[12px] md:text-[13px] font-medium"
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

function Mark({ logo, initials }: { logo?: string; initials: string }) {
  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-black/10">
      {logo ? (
        <Image src={logo} alt="" fill className="object-contain p-1.5" sizes="56px" />
      ) : (
        <span className="grid h-full w-full place-items-center font-display text-[16px] text-ink">
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
