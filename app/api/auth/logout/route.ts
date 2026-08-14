import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME, cookieOptions } from '@/lib/spotify-auth'

export async function GET(request: NextRequest) {
  const next = request.nextUrl.searchParams.get('next')
  const opts = cookieOptions()

  if (next) {
    const res = NextResponse.redirect(new URL(next, request.url))
    res.cookies.set(COOKIE_NAME, '', { ...opts, maxAge: 0 })
    return res
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, '', { ...opts, maxAge: 0 })
  return res
}
