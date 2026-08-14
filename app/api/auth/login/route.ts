import { NextResponse } from 'next/server'
import { getSpotifyAuthUrl } from '@/lib/spotify-auth'

// Reads env at request time; never prerender it.
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const url = getSpotifyAuthUrl()
    return NextResponse.redirect(url)
  } catch (e) {
    console.error('[auth/login]', e instanceof Error ? e.message : e)
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }
}
