import { Github, Linkedin, Mail } from 'lucide-react'
import { PROFILE } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import HeroPortrait from '@/components/ui/HeroPortrait'
import PauseOffscreen from '@/components/ui/PauseOffscreen'

const SOCIALS = [
  { href: PROFILE.linkedin, label: 'LinkedIn', Icon: Linkedin, external: true },
  { href: PROFILE.github, label: 'GitHub', Icon: Github, external: true },
  { href: `mailto:${PROFILE.email}`, label: 'Email', Icon: Mail, external: false },
]

export default function Hero() {
  return (
    <section id="home" className="max-w-content mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-10">
      <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-7 order-2 md:order-1">
          <Reveal>
            <h1 className="font-display text-display">
              Hi! I&apos;m {PROFILE.first}
            </h1>
            {/* TODO(shivani): rewrite intro in my own words */}
            <p className="mt-6 max-w-[33em] text-body md:text-lead text-ink">
              {PROFILE.lead}
            </p>
            <p className="mt-4 text-small font-medium italic text-orange-ink">Open to Summer 2027 internships in software engineering and data.</p>
            <p className="mt-4 text-body text-ink-soft">
              Feel free to reach me at{' '}
              <a href={`mailto:${PROFILE.email}`} className="text-ink font-medium orglink">
                spotnuru<span className="text-orange-ink">[@]</span>wisc.edu
              </a>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {SOCIALS.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-soft hover:text-orange-ink hover:border-orange hover:-translate-y-0.5 transition-all"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
          <div id="hero-portrait" className="relative">
            <Reveal>
              <HeroPortrait label={`Portrait of ${PROFILE.name}`} />
            </Reveal>
          </div>
        </div>
      </div>

      <PauseOffscreen className="mt-heading flex justify-center">
        <a href="#work" className="scrollcue inline-flex items-center text-orange" aria-label="Scroll to experience">
          <span className="bobarrow inline-flex" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </span>
        </a>
      </PauseOffscreen>
    </section>
  )
}
