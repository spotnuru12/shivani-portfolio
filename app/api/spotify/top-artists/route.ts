import { NextRequest } from 'next/server'
import { withSpotify } from '@/lib/spotify-auth'

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get('limit') || '20'
  const time_range = request.nextUrl.searchParams.get('time_range') || 'short_term'
  return withSpotify(request, 'top-artists', 'me/top/artists', { limit, time_range })
}
