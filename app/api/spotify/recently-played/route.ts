import { NextRequest, NextResponse } from 'next/server'
import { getRefreshToken, getAccessTokenFromRefresh, fetchSpotifyApi, encryptToken, COOKIE_NAME, cookieOptions } from '@/lib/spotify-auth'

const MAX_LIMIT = 6

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME)?.value
  const refreshToken = getRefreshToken(cookie)
  if (!refreshToken) return NextResponse.json({ error: 'Not connected' }, { status: 401 })

  let accessToken: string
  let newRefreshToken: string | undefined
  try {
    const result = await getAccessTokenFromRefresh(refreshToken)
    accessToken = result.access_token
    newRefreshToken = result.new_refresh_token
  } catch (e) {
    const status = (e as { status?: number })?.status ?? 502
    const body = (e as { body?: string })?.body ?? ''
    console.error('[recently-played] token_failed:', status, body.slice(0, 300))
    return NextResponse.json({ error: 'token_failed', status }, { status: 502 })
  }

  try {
    const requested = parseInt(request.nextUrl.searchParams.get('limit') || '6', 10)
    const limit = String(Math.min(Math.max(requested, 1), MAX_LIMIT))
    const data = await fetchSpotifyApi('me/player/recently-played', accessToken, { limit })
    const res = NextResponse.json(data)
    if (newRefreshToken && cookie) {
      res.cookies.set(COOKIE_NAME, encryptToken(newRefreshToken), cookieOptions())
    }
    return res
  } catch (e) {
    const status = (e as { status?: number })?.status ?? 502
    const body = (e as { body?: string })?.body ?? ''
    console.error('[recently-played] spotify_api_failed:', status, body.slice(0, 300))
    return NextResponse.json({ error: 'spotify_api_failed', status }, { status: 502 })
  }
}
