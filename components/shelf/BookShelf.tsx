import { BookOpen } from 'lucide-react'
import { BOOKS, type Book } from '@/lib/data'

// Books are curated in lib/data.ts rather than pulled from a feed — Goodreads
// killed its API and StoryGraph has none, so a hand-kept list stays honest.
const STATUS_STYLE: Record<Book['status'], { label: string; color: string }> = {
  reading: { label: 'reading', color: 'var(--orange)' },
  finished: { label: 'finished', color: 'rgba(232,232,232,0.45)' },
  next: { label: 'up next', color: 'rgba(232,232,232,0.3)' },
}

export default function BookShelf() {
  const current = BOOKS.find((b) => b.status === 'reading')

  return (
    <div className="shelf-card h-full">
      <div className="shelf-card-head">
        <div className="flex min-w-0 items-center gap-2">
          <span style={{ color: 'var(--orange)' }}>
            <BookOpen size={17} strokeWidth={2} aria-hidden />
          </span>
          <span className="truncate text-[13px] font-semibold">Reading</span>
        </div>
        <span className="shrink-0 text-[10px] tabular-nums opacity-55">
          {BOOKS.filter((b) => b.status === 'finished').length} finished
        </span>
      </div>

      <div className="shelf-card-body">
        <div className="flex h-full flex-col">
          <div className="shelf-label opacity-70">
            {current ? 'Currently' : 'The shelf'}
          </div>

          {current && (
            <div className="mt-2.5">
              <div className="text-[15px] font-bold leading-tight">{current.title}</div>
              <div className="text-[12px] opacity-80">{current.author}</div>
              {current.note && (
                <div className="mt-0.5 text-[10px] italic opacity-50">{current.note}</div>
              )}
            </div>
          )}

          <div
            className="mt-4 border-t pt-2.5 shelf-label opacity-55"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            Also on the shelf
          </div>

          <ul className="mt-2 space-y-2">
            {BOOKS.filter((b) => b !== current).map((book) => (
              <li key={book.title} className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-semibold leading-tight">
                    {book.title}
                  </div>
                  <div className="truncate text-[10px] opacity-55">{book.author}</div>
                </div>
                <span
                  className="shrink-0 text-[9.5px] uppercase tracking-[0.12em]"
                  style={{ color: STATUS_STYLE[book.status].color }}
                >
                  {STATUS_STYLE[book.status].label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
