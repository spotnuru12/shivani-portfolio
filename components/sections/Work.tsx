import Image from 'next/image'
import { EXPERIENCE } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'

export default function Work() {
  return (
    <section id="work" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <p className="eyebrow mb-4">work</p>
        <h2 className="font-display text-[30px] md:text-[38px] leading-tight">Where I&apos;ve been.</h2>
      </Reveal>

      <div className="mt-10 divide-y divide-line border-t border-line">
        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.role + e.org} as="div" delay={i * 40}>
            <details className="row group py-6">
              <summary className="grid md:grid-cols-[150px_1fr_auto] gap-3 md:gap-6 items-start">
                <div className="font-sans text-[12.5px] text-muted pt-1 flex items-center gap-2">
                  {e.dates}
                  {e.status && (
                    <span className="text-[10px] uppercase tracking-wider text-orange-ink border border-orange/40 rounded px-1 py-0.5">
                      {e.status}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    {e.logo && (
                      <span className="relative inline-block h-6 w-6 overflow-hidden rounded bg-white ring-1 ring-line shrink-0">
                        <Image src={e.logo} alt="" fill className="object-contain p-0.5" sizes="24px" />
                      </span>
                    )}
                    <h3 className="font-display text-[20px] md:text-[22px] leading-tight">{e.role}</h3>
                  </div>
                  <div className="text-[14px] text-ink-soft mt-1">{e.org} · {e.loc}</div>
                  <p className="text-[15px] text-muted mt-2 max-w-prose">{e.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.stack.map((s) => (
                      <span key={s} className="font-sans text-[11px] rounded-full border border-line px-2 py-0.5 text-ink-soft">{s}</span>
                    ))}
                  </div>
                </div>
                <span className="hidden md:flex items-center gap-1.5 font-sans text-[12px] text-orange-ink pt-1 whitespace-nowrap">
                  <span className="row-chev inline-block">→</span> what I did
                </span>
              </summary>
              <ul className="mt-4 md:ml-[174px] space-y-2 border-l-2 border-orange/30 pl-4">
                {e.did.map((d, j) => (
                  <li key={j} className="text-[15px] text-ink-soft leading-relaxed">{d}</li>
                ))}
              </ul>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
