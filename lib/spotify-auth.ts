/**
 * Server-only Spotify OAuth and token helpers.
 * Uses env: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI, COOKIE_SECRET.
 * NEVER import in client components.
 */

import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1'
const COOKIE_NAME = 'spotify_refresh'

function requireEnv(key: string): string {
  const v = (process.env[key] ?? '').trim()
  if (!v) throw new Error(`Missing required env var: ${key}`)
  return v
}

function getEnv(key: string): string {
  return (process.env[key] ?? '').trim()
}

export function getSpotifyAuthUrl(): string {
  const clientId = requireEnv('SPOTIFY_CLIENT_ID')
  const redirectUri = requireEnv('SPOTIFY_REDIRECT_URI')
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'user-top-read user-read-recently-played',
    state: crypto.randomBytes(16).toString('hex'),
  })
  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

export async function exchangeCodeForTokens(code: string): Promise<{ refresh_token: string; access_token: string; expires_in: number }> {
  const clientId = requireEnv('SPOTIFY_CLIENT_ID')
  const clientSecret = requireEnv('SPOTIFY_CLIENT_SECRET')
  const redirectUri = requireEnv('SPOTIFY_REDIRECT_URI')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('[Spotify token] exchange failed:', res.status, text.slice(0, 300))
    const err = new Error('Token exchange failed') as Error & { status?: number; body?: string }
    err.status = res.status
    err.body = text.slice(0, 500)
    throw err
  }

  const data = (await res.json()) as { refresh_token?: string; access_token?: string; expires_in?: number }
  if (!data.refresh_token) throw new Error('No refresh_token in Spotify response')

  return {
    refresh_token: data.refresh_token,
    access_token: data.access_token ?? '',
    expires_in: data.expires_in ?? 3600,
  }
}

export async function getAccessTokenFromRefresh(refreshToken: string): Promise<{ access_token: string; new_refresh_token?: string }> {
  const clientId = requireEnv('SPOTIFY_CLIENT_ID')
  const clientSecret = requireEnv('SPOTIFY_CLIENT_SECRET')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('[Spotify token] refresh failed:', res.status, text.slice(0, 300))
    const err = new Error('Refresh failed') as Error & { status?: number; body?: string }
    err.status = res.status
    err.body = text.slice(0, 300)
    throw err
  }

  const data = (await res.json()) as { access_token?: string; refresh_token?: string }
  if (!data.access_token) throw new Error('No access_token in refresh response')
  return {
    access_token: data.access_token,
    new_refresh_token: data.refresh_token || undefined,
  }
}

export async function fetchSpotifyApi(path: string, accessToken: string, params?: Record<string, string>): Promise<unknown> {
  const clean = path.startsWith('/') ? path.slice(1) : path
  const url = new URL(clean, `${SPOTIFY_API_BASE}/`)
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const fullUrl = url.toString()

  const res = await fetch(fullUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('[Spotify API]', res.status, fullUrl, text.slice(0, 300))
    const err = new Error(`Spotify API ${res.status}`) as Error & { status?: number; body?: string }
    err.status = res.status
    err.body = text.slice(0, 300)
    throw err
  }

  return res.json()
}

// --- Cookie encrypt/decrypt ---

const ALGO = 'aes-256-cbc'
const IV_LEN = 16

function getKey(): Buffer {
  const secret = requireEnv('COOKIE_SECRET')
  return crypto.createHash('sha256').update(secret).digest()
}

export function encryptToken(refreshToken: string): string {
  const key = getKey()
  const iv = crypto.randomBytes(IV_LEN)
  const cipher = crypto.createCipheriv(ALGO, key, iv)
  const enc = Buffer.concat([cipher.update(refreshToken, 'utf8'), cipher.final()])
  return Buffer.concat([iv, enc]).toString('base64url')
}

export function decryptToken(encrypted: string): string | null {
  try {
    const key = getKey()
    const buf = Buffer.from(encrypted, 'base64url')
    if (buf.length < IV_LEN) return null
    const iv = buf.subarray(0, IV_LEN)
    const data = buf.subarray(IV_LEN)
    const decipher = crypto.createDecipheriv(ALGO, key, iv)
    return Buffer.concat([decipher.update(data) as Buffer, decipher.final()]).toString('utf8')
  } catch {
    return null
  }
}

export function cookieOptions(): {
  httpOnly: true
  secure: boolean
  sameSite: 'lax'
  path: '/'
  maxAge: number
} {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  }
}

/**
 * Get the refresh token to use: cookie first, then SPOTIFY_REFRESH_TOKEN env var.
 * This lets all visitors see the owner's data when the env var is set.
 */
export function getRefreshToken(cookieValue: string | undefined): string | null {
  if (cookieValue) {
    const fromCookie = decryptToken(cookieValue)
    if (fromCookie) return fromCookie
  }
  const fromEnv = getEnv('SPOTIFY_REFRESH_TOKEN')
  return fromEnv || null
}

export function hasOwnerToken(): boolean {
  return !!getEnv('SPOTIFY_REFRESH_TOKEN')
}

export { COOKIE_NAME }

const CACHE_CONTROL = 'public, s-maxage=900, stale-while-revalidate=3600'

/** Token-refresh + fetch + error wrap shared by the three /api/spotify routes. */
export async function withSpotify(
  request: NextRequest,
  label: string,
  path: string,
  params?: Record<string, string>,
): Promise<NextResponse> {
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
    console.error(`[${label}] token_failed:`, status, body.slice(0, 300))
    return NextResponse.json({ error: 'token_failed', status }, { status: 502 })
  }

  try {
    const data = await fetchSpotifyApi(path, accessToken, params)
    const res = NextResponse.json(data)
    res.headers.set('Cache-Control', CACHE_CONTROL)
    if (newRefreshToken && cookie) {
      res.cookies.set(COOKIE_NAME, encryptToken(newRefreshToken), cookieOptions())
    }
    return res
  } catch (e) {
    const status = (e as { status?: number })?.status ?? 502
    const body = (e as { body?: string })?.body ?? ''
    console.error(`[${label}] spotify_api_failed:`, status, body.slice(0, 300))
    return NextResponse.json({ error: 'spotify_api_failed', status }, { status: 502 })
  }
}
