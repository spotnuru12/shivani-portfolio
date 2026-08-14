import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForTokens, encryptToken, COOKIE_NAME, cookieOptions } from '@/lib/spotify-auth'

export async function GET(request: NextRequest) {
  const error = request.nextUrl.searchParams.get('error')
  const code = request.nextUrl.searchParams.get('code')

  const frontendUrl = (process.env.FRONTEND_URL ?? '').trim() || 'http://localhost:3000'
  const redirectBase = `${frontendUrl}/#about`

  if (error) {
    return NextResponse.redirect(`${frontendUrl}/?spotify_error=${encodeURIComponent(error)}#about`)
  }

  if (!code) {
    return NextResponse.redirect(`${frontendUrl}/?spotify_error=missing_code#about`)
  }

  const redirectUriPresent = (process.env.SPOTIFY_REDIRECT_URI ?? '').trim() ? 'set' : 'missing'
  console.log('[Spotify callback] exchange attempt — SPOTIFY_REDIRECT_URI:', redirectUriPresent)

  try {
    const { refresh_token } = await exchangeCodeForTokens(code)
    const encrypted = encryptToken(refresh_token)
    const res = NextResponse.redirect(redirectBase)
    res.cookies.set(COOKIE_NAME, encrypted, cookieOptions())
    return res
  } catch (e) {
    const status = typeof (e as { status?: number }).status === 'number' ? (e as { status: number }).status : 500
    const body = (e as { body?: string }).body ?? (e instanceof Error ? e.message : '')
    console.error('[Spotify callback] exchange failed — status:', status, 'body:', body.slice(0, 300))
    return NextResponse.redirect(`${frontendUrl}/?spotify_error=exchange_failed&code=${status}#about`)
  }
}
