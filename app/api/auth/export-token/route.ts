import { NextRequest, NextResponse } from 'next/server'
import { decryptToken, COOKIE_NAME } from '@/lib/spotify-auth'

/**
 * Returns the raw refresh token from the caller's cookie.
 * Used once to copy the token into SPOTIFY_REFRESH_TOKEN env var on Vercel.
 * Only works if you have a valid cookie (i.e. you connected via OAuth).
 */
export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME)?.value
  if (!cookie) {
    return NextResponse.json({ error: 'No Spotify cookie found. Connect first.' }, { status: 401 })
  }
  const token = decryptToken(cookie)
  if (!token) {
    return NextResponse.json({ error: 'Cookie unreadable. Try reconnecting.' }, { status: 401 })
  }
  return NextResponse.json({
    refresh_token: token,
    instructions: 'Copy this refresh_token value. In Vercel → Settings → Environment Variables, add SPOTIFY_REFRESH_TOKEN with this value. Then redeploy.',
  })
}
