import { PROFILE } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import SmileMascot from '@/components/ui/SmileMascot'

export default function Contact() {
  return (
    <section id="contact" className="closer">
      <div className="max-w-content mx-auto px-6 md:px-10 py-24 md:py-32">
        <Reveal className="text-center">
          <h2 className="font-display text-h2">
            let&apos;s build
            <br />
            something <span className="word-cool text-[1.05em]">useful</span>
            <span className="inline-block align-baseline ml-[0.12em] [&_svg]:block [&_svg]:h-[0.7em] [&_svg]:w-[0.7em]">
              <SmileMascot size={52} />
            </span>
            .
          </h2>

          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-10 md:mt-12 inline-flex items-center gap-2 flex-wrap justify-center text-lead md:text-[32px] font-medium hover:opacity-90 transition-opacity"
          >
            spotnuru<span className="text-orange-ink">[@]</span>wisc.edu
            <span aria-hidden className="text-[0.75em] text-orange-ink">↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
