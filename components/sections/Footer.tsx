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
    <footer className="border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10 py-10 flex flex-wrap items-center justify-between gap-8">
        <div>
          <div className="font-display text-[16px] inline-flex items-center gap-2">
            Designed and built by {PROFILE.name}
            <Smile size={17} strokeWidth={2} className="text-orange" />
          </div>
          <div className="mt-1.5 text-[13.5px] text-ink-soft">
            Built with{' '}
            {BUILT_WITH.map((tech, i) => (
              <span key={tech}>
                <span className="text-orange-ink">{tech}</span>
                {i < BUILT_WITH.length - 1 ? ', ' : ' '}
              </span>
            ))}
            · deployed on <span className="text-orange-ink">Vercel</span> · designed in{' '}
            <span className="text-orange-ink">Figma</span> · © {new Date().getFullYear()}
          </div>
        </div>

        <div className="flex items-center gap-5 text-ink-soft">
          {LINKS.map(({ href, label, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="hover:text-orange-ink transition-colors"
            >
              <Icon size={18} strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
