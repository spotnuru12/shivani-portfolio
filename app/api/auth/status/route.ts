import { NextRequest, NextResponse } from 'next/server'
import { getRefreshToken, hasOwnerToken, COOKIE_NAME } from '@/lib/spotify-auth'

export async function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get(COOKIE_NAME)?.value
    const hasToken = !!getRefreshToken(cookie)
    return NextResponse.json({
      connected: hasToken,
      ownerToken: hasOwnerToken(),
    })
  } catch {
    return NextResponse.json({ connected: false, ownerToken: false })
  }
}
