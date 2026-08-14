import { Github, Linkedin, Mail } from 'lucide-react'
import { PROFILE } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import BlobPortrait from '@/components/ui/BlobPortrait'
import CodeCard from '@/components/ui/CodeCard'

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
            <h1 className="font-display text-[56px] md:text-[84px] leading-[0.92] tracking-[-0.03em]">
              Hi, I&apos;m {PROFILE.first}.
            </h1>
            <p className="mt-6 max-w-prose text-[19px] md:text-[22px] text-ink-soft leading-snug">
              {PROFILE.lead}
            </p>

            <div className="mt-7">
              <CodeCard />
            </div>

            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-soft hover:text-orange-ink hover:border-orange hover:-translate-y-0.5 transition-all"
                >
                  <Icon size={19} strokeWidth={1.75} />
                </a>
              ))}
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center rounded-full bg-orange text-bg px-5 h-11 text-[15px] font-medium hover:opacity-90 transition-opacity"
              >
                Resume
              </a>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
          <Reveal>
            {/* Blob-masked portrait with an outline and loose accent dots. */}
            <div className="relative h-[320px] w-[320px]">
              <span className="absolute -top-1 left-[58%] h-4 w-4 rounded-full bg-orange" aria-hidden />
              <span className="absolute top-[14%] -right-1 h-2.5 w-2.5 rounded-full bg-ink opacity-70" aria-hidden />
              <span className="absolute bottom-7 -left-2 h-3 w-3 rounded-full bg-ink opacity-50" aria-hidden />
              <span className="absolute bottom-[16%] right-[6%] h-2 w-2 rounded-full bg-orange opacity-85" aria-hidden />
              <div className="absolute inset-[10px]">
                <BlobPortrait size={300} label={`Portrait of ${PROFILE.name}`} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
