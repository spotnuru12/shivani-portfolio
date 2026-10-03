import { FileText, Github, Linkedin, Mail, Smile } from 'lucide-react'
import { PROFILE } from '@/lib/data'

const BUILT_WITH = ['React', 'Tailwind', 'Next.js']

const LINKS = [
  { href: PROFILE.linkedin, label: 'LinkedIn', Icon: Linkedin, external: true },
  { href: PROFILE.github, label: 'GitHub', Icon: Github, external: true },
  { href: `mailto:${PROFILE.email}`, label: 'Email', Icon: Mail, external: false },
  { href: PROFILE.resume, label: 'Resume', Icon: FileText, external: true },
]

export default function Footer() {
  return (
    <footer className="closer border-t" style={{ borderColor: 'rgba(255, 239, 210, 0.16)' }}>
      <div className="max-w-content mx-auto px-6 md:px-10 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] flex flex-wrap items-center justify-between gap-8">
        <div>
          <div className="font-display text-[16px] inline-flex items-center gap-2">
            Designed and built by {PROFILE.name}
            <Smile size={17} strokeWidth={2} className="text-orange" />
          </div>
          <div className="mt-1.5 text-[13.5px]" style={{ color: 'rgba(255, 239, 210, 0.82)' }}>
            Built with{' '}
            {BUILT_WITH.map((tech, i) => (
              <span key={tech}>
                <span className="text-orange-ink">{tech}</span>
                {i < BUILT_WITH.length - 1 ? ', ' : ' '}
              </span>
            ))}
            · deployed on <span className="text-orange-ink">Vercel</span> · designed in{' '}
            <span className="text-orange-ink">Figma</span>
          </div>
        </div>

        <div className="flex items-center gap-1" style={{ color: 'rgba(255, 239, 210, 0.85)' }}>
          {LINKS.map(({ href, label, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:text-orange-ink transition-colors"
            >
              <Icon size={18} strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
