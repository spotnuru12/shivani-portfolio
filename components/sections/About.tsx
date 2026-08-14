import { EDUCATION, POLAROIDS } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import Polaroid from '@/components/ui/Polaroid'
import SectionHeading from '@/components/ui/SectionHeading'

export default function About() {
  return (
    <section id="about" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-24">
      <Reveal>
        <SectionHeading eyebrow="about" title="A bit about me" />
      </Reveal>

      <div className="mt-11 grid md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-6">
          <Reveal className="space-y-5 text-ink-soft leading-relaxed max-w-prose">
            <p className="text-[19px] md:text-[22px] text-ink leading-snug">
              I&apos;ve worked across{' '}
              <span className="text-orange-ink font-medium">pharma and clinical data</span>,{' '}
              <span className="text-orange-ink font-medium">HCI research</span>, and{' '}
              <span className="text-orange-ink font-medium">health insurance</span>. Same thread
              through all of it: sit with the people who have to use the thing, then build until
              it stops being confusing.
            </p>
            <p className="text-[16px] md:text-[17.5px]">
              These days that looks like accessibility and vision-language models at the{' '}
              <span className="text-orange-ink font-medium">MadAbility Lab</span>, a medication
              app called <span className="text-orange-ink font-medium">Pharavo</span> for ESL
              patients and older adults, and CRM data at TruStage. I also help run Design
              Interactive, which is a long way of saying I spend a lot of time in Figma with other
              students who care about this stuff too.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-8 rounded-2xl border border-line bg-panel/60 p-6">
            <div className="font-display text-[20px]">{EDUCATION.school}</div>
            <div className="text-[13.5px] text-orange-ink mt-1">{EDUCATION.degree}</div>
            <div className="text-[13px] text-muted mt-0.5">
              {EDUCATION.dates} · {EDUCATION.honors}
            </div>
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

        <div className="md:col-span-6">
          <Reveal>
            <p className="text-[12px] text-muted mb-4">
              a few pictures. drop yours in when you have them
            </p>
            <div className="relative h-[420px] md:h-[460px]">
              {POLAROIDS.map((shot, i) => (
                <Polaroid key={shot.id} shot={shot} index={i} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
