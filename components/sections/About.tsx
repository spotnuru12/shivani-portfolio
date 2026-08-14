import { BELIEFS, BELIEFS_HEADING, EDUCATION } from '@/lib/data'
import StickyNote from '@/components/ui/StickyNote'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'

// Scatter positions for the bulletin board (left/top %, and pixel size).
const SPOTS = [
  { left: '2%', top: '4%', w: 210 },
  { left: '30%', top: '0%', w: 190 },
  { left: '58%', top: '10%', w: 230 },
  { left: '14%', top: '46%', w: 240 },
  { left: '52%', top: '52%', w: 210 },
]

const FONT: Record<string, string> = {
  hand: 'hand',
  mono: 'font-sans',
  serif: 'font-display italic',
}

export default function About() {
  return (
    <section id="about" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="about" title="A bit about me" />
      </Reveal>

      <div className="mt-11 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <Reveal className="space-y-4 text-ink-soft leading-relaxed max-w-prose">
            <p className="text-[19px] md:text-[21px] text-ink leading-snug">
              I&apos;m happiest when research, design, and code are the same job.
            </p>
            <p className="text-[16px] md:text-[17px]">
              I&apos;m drawn to problems in health, accessibility, and the everyday tools people
              actually rely on — the kind where getting the small details right decides whether
              someone can use the thing at all.
            </p>
            <p className="text-[16px] md:text-[17px]">
              These days I&apos;m focused on <span className="text-orange-ink font-medium">accessibility and
              vision-language models</span> at the MadAbility Lab, building a medication-companion
              app called <span className="text-orange-ink font-medium">Pharavo</span>, and turning
              campaign and web data into something readable at TruStage.
            </p>
          </Reveal>

          {/* Education. The tools themselves live in the Toolkit section. */}
          <Reveal delay={80} className="mt-8 rounded-2xl border border-line bg-panel/60 p-6">
            <div className="font-display text-[20px]">{EDUCATION.school}</div>
            <div className="text-[13.5px] text-orange-ink mt-1">{EDUCATION.degree}</div>
            <div className="text-[13px] text-muted mt-0.5">{EDUCATION.dates} · {EDUCATION.honors}</div>
            <div className="mt-5">
              <div className="text-[11px] uppercase tracking-wider text-muted mb-2">Coursework</div>
              <div className="flex flex-wrap gap-1.5">
                {EDUCATION.coursework.map((c) => (
                  <span
                    key={c}
                    className="text-[12px] rounded border border-line px-2 py-0.5 text-ink-soft"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bulletin board */}
        <div className="md:col-span-6">
          <Reveal>
            <p className="font-sans text-[12px] text-muted mb-3">{BELIEFS_HEADING} <span className="text-orange-ink">— drag them around</span></p>
            <div className="relative h-[440px] rounded-2xl border border-dashed border-line bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--hatch)_10px,var(--hatch)_20px)] overflow-hidden">
              {BELIEFS.map((b, i) => (
                <StickyNote
                  key={b.id}
                  kind={b.kind}
                  rotate={b.rotate}
                  fontClass={FONT[b.font ?? 'hand']}
                  className="p-4 text-[17px] leading-tight"
                  style={{ left: SPOTS[i]?.left, top: SPOTS[i]?.top, width: SPOTS[i]?.w, zIndex: i + 1 }}
                >
                  <span className="pointer-events-none block">{b.text}</span>
                </StickyNote>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
