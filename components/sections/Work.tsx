import Image from 'next/image'
import { EXPERIENCE } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Work() {
  return (
    <section id="work" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="experience" title="Where I've been" />
      </Reveal>

      <div className="mt-12 divide-y divide-line border-t border-line">
        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.role + e.org} as="div" delay={i * 40}>
            <article className="grid md:grid-cols-[160px_1fr] gap-3 md:gap-8 py-7">
              <div className="pt-1">
                <div className="text-[13px] text-muted">{e.dates}</div>
                {e.status === 'current' && (
                  <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-orange-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                    now
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    {e.logo && (
                      <span className="relative inline-block h-6 w-6 overflow-hidden rounded bg-white ring-1 ring-line shrink-0">
                        <Image src={e.logo} alt="" fill className="object-contain p-0.5" sizes="24px" />
                      </span>
                    )}
                    <h3 className="font-display text-[21px] md:text-[24px] leading-tight">{e.role}</h3>
                  </div>
                  <div className="hidden md:block text-[13px] text-muted whitespace-nowrap pt-1.5">
                    {e.loc}
                  </div>
                </div>

                <div className="text-[15px] text-orange-ink mt-1">{e.org}</div>
                <p className="text-[15.5px] text-ink-soft mt-3 max-w-prose leading-relaxed">
                  {e.blurb}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[12px] rounded-full border border-line px-2.5 py-0.5 text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
