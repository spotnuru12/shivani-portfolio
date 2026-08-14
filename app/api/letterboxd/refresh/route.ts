import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { LETTERBOXD_TAG } from '@/lib/letterboxd'

// Drops the cached RSS diary so the next render refetches it. Called by the
// refresh button on the film shelf; the feed is public, so there's nothing to
// protect here beyond keeping it POST-only.
export async function POST() {
  revalidateTag(LETTERBOXD_TAG)
  return NextResponse.json({ revalidated: true, at: Date.now() })
}
