import Image from 'next/image'
import { Github, Linkedin, Mail } from 'lucide-react'
import { PROFILE } from '@/lib/data'
import Typewriter from '@/components/ui/Typewriter'
import Reveal from '@/components/ui/Reveal'

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
            <p className="mt-6 text-[20px] md:text-[24px] text-ink-soft leading-snug">
              I work at the intersection of{' '}
              <span className="text-orange-ink font-medium">
                <Typewriter words={[...PROFILE.typing]} />
              </span>
            </p>
            <p className="mt-6 max-w-prose text-[16px] md:text-[17px] text-ink-soft leading-relaxed">
              {PROFILE.intro}
            </p>

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
                className="ml-1 inline-flex items-center rounded-full bg-orange text-white px-5 h-11 text-[15px] font-medium hover:opacity-90 transition-opacity"
              >
                Résumé
              </a>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
          <Reveal className="relative">
            <div className="absolute -inset-3 rounded-[30px] bg-orange/10 rotate-[2.5deg]" aria-hidden />
            <div className="relative h-[280px] w-[280px] md:h-[330px] md:w-[330px] overflow-hidden rounded-[26px] border border-line shadow-sm">
              <Image src="/headshot.jpeg" alt={PROFILE.name} fill className="object-cover" priority sizes="330px" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
