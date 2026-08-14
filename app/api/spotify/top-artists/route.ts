import { NextRequest, NextResponse } from 'next/server'
import {
  getRefreshToken,
  getAccessTokenFromRefresh,
  fetchSpotifyApi,
  encryptToken,
  COOKIE_NAME,
  cookieOptions,
} from '@/lib/spotify-auth'

// Proxies https://api.spotify.com/v1/me/top/artists.
// Same `user-top-read` scope as /api/spotify/top-tracks — no re-auth needed.
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
    console.error('[top-artists] token_failed:', status, body.slice(0, 300))
    return NextResponse.json({ error: 'token_failed', status }, { status: 502 })
  }

  try {
    const limit = request.nextUrl.searchParams.get('limit') || '20'
    const time_range = request.nextUrl.searchParams.get('time_range') || 'short_term'
    const data = await fetchSpotifyApi('me/top/artists', accessToken, { limit, time_range })
    const res = NextResponse.json(data)
    if (newRefreshToken && cookie) {
      res.cookies.set(COOKIE_NAME, encryptToken(newRefreshToken), cookieOptions())
    }
    return res
  } catch (e) {
    const status = (e as { status?: number })?.status ?? 502
    const body = (e as { body?: string })?.body ?? ''
    console.error('[top-artists] spotify_api_failed:', status, body.slice(0, 300))
    return NextResponse.json({ error: 'spotify_api_failed', status }, { status: 502 })
  }
}
