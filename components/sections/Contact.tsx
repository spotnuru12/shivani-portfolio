import { PROFILE } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import SmileMascot from '@/components/ui/SmileMascot'

export default function Contact() {
  return (
    <section id="contact" className="closer">
      <div className="max-w-content mx-auto px-6 md:px-10 py-24 md:py-32">
        <Reveal className="text-center">
          <h2 className="font-display text-[52px] md:text-[72px] leading-[1.02] tracking-[-0.03em]">
            let&apos;s build
            <br />
            something <span className="word-cool text-[1.05em]">useful</span>
            <span className="inline-block ml-2" style={{ verticalAlign: '-6px' }}>
              <SmileMascot size={52} />
            </span>
            .
          </h2>

          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-10 md:mt-12 inline-flex items-center gap-2 flex-wrap justify-center text-[22px] md:text-[32px] hover:opacity-90 transition-opacity"
            style={{ fontWeight: 500 }}
          >
            spotnuru<span className="text-orange">[@]</span>wisc.edu
            <span aria-hidden className="text-[0.75em] text-orange">↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
