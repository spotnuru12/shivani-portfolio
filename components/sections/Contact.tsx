import { PROFILE } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import SmileMascot from '@/components/ui/SmileMascot'

export default function Contact() {
  return (
    <section id="contact" className="max-w-content mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal className="text-center">
        <h2 className="font-display text-[52px] md:text-[80px] lg:text-[96px] leading-[1.02] tracking-[-0.03em]">
          let&apos;s build
          <br />
          something <span className="text-orange">cool</span>
          <span className="inline-block ml-2" style={{ verticalAlign: '-6px' }}>
            <SmileMascot size={64} />
          </span>
          .
        </h2>

        <a
          href={`mailto:${PROFILE.email}`}
          className="mt-10 md:mt-12 inline-flex items-center gap-3 flex-wrap justify-center font-display text-[24px] md:text-[36px] hover:opacity-90 transition-opacity"
          // .font-display hardcodes weight 700; the email wants to read lighter
          // than the headline above it.
          style={{ fontWeight: 500 }}
        >
          spotnuru <span className="text-orange">[at]</span> wisc.edu
          <span aria-hidden className="text-[0.7em]">↗</span>
        </a>
      </Reveal>
    </section>
  )
}
