import { NextRequest } from 'next/server'
import { withSpotify } from '@/lib/spotify-auth'

const MAX_LIMIT = 6

export async function GET(request: NextRequest) {
  const requested = parseInt(request.nextUrl.searchParams.get('limit') || '6', 10)
  const limit = String(Math.min(Math.max(requested, 1), MAX_LIMIT))
  return withSpotify(request, 'recently-played', 'me/player/recently-played', { limit })
}
