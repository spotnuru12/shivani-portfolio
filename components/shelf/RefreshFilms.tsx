'use client'

import { useState, useTransition } from 'react'
import { RotateCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Busts the cached Letterboxd feed, then re-renders the server component that
// reads it. The spinner keeps turning until the new markup has swapped in.
export default function RefreshFilms() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isRevalidating, setRevalidating] = useState(false)

  const spinning = isPending || isRevalidating

  async function refresh() {
    if (spinning) return
    setRevalidating(true)
    try {
      await fetch('/api/letterboxd/refresh', { method: 'POST' })
      startTransition(() => router.refresh())
    } finally {
      setRevalidating(false)
    }
  }

  return (
    <button
      type="button"
      onClick={refresh}
      disabled={spinning}
      aria-label="Refresh Letterboxd diary"
      title="Refresh from Letterboxd"
      className="shrink-0 opacity-55 transition-opacity hover:opacity-100 disabled:opacity-40"
    >
      <RotateCw size={13} strokeWidth={2} className={spinning ? 'animate-spin' : undefined} />
    </button>
  )
}
