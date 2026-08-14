import { PROFILE } from '@/lib/data'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-muted">
        <div className="font-sans">© {year} {PROFILE.name} · {PROFILE.location}</div>
        <div className="flex items-center gap-5 font-sans">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hover:text-orange-ink transition-colors">github</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-orange-ink transition-colors">linkedin</a>
          <a href={`mailto:${PROFILE.email}`} className="hover:text-orange-ink transition-colors">email</a>
        </div>
      </div>
    </footer>
  )
}
