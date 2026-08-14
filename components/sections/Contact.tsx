import { PROFILE } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'

export default function Contact() {
  return (
    <section id="contact" className="max-w-content mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal className="text-center">
        <p className="eyebrow mb-5">contact</p>
        <h2 className="font-display text-[38px] md:text-[54px] leading-[1.0] tracking-[-0.02em]">
          Let&apos;s build<br />something good.
        </h2>
        <p className="mt-6 max-w-[46ch] mx-auto text-[16px] md:text-[18px] text-ink-soft leading-relaxed">
          I&apos;m always up for talking about research, internships, or a project that could
          use a hand. I reply quickly.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 font-sans text-[13px]">
          <a href={`mailto:${PROFILE.email}`}
             className="rounded-full bg-orange text-white px-6 py-3 hover:opacity-90 transition-opacity">
            {PROFILE.email}
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"
             className="rounded-full border border-line px-6 py-3 hover:border-orange hover:text-orange-ink transition-colors">
            LinkedIn ↗
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer"
             className="rounded-full border border-line px-6 py-3 hover:border-orange hover:text-orange-ink transition-colors">
            GitHub ↗
          </a>
        </div>
      </Reveal>
    </section>
  )
}
