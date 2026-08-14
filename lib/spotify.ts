// Sample data for the Listening card. The client hook hits the live routes
// under /app/api/spotify and only falls back to this when Spotify isn't
// authorized (local preview with no refresh token, or a failed request), so
// the card never renders empty.

export interface Track {
  song: string
  artist: string
  album?: string
  when?: string
  duration?: string
}

export interface Genre {
  name: string
  pct: number
  /** Artists carrying the genre — mirrors the provenance the live data shows. */
  artists: string[]
}

export interface ListeningData {
  nowPlaying: { song: string; artist: string; album: string; duration: string }
  topArtist: { name: string; plays: number }
  recent: Track[]
  topTracks: Track[]
  genres: Genre[]
}

// Genre names here match the canonical families in useSpotifyDashboardData, so
// the sample and the live card read the same way.
export const MOCK_LISTENING: ListeningData = {
  nowPlaying: {
    song: 'Mystery of Love',
    artist: 'Sufjan Stevens',
    album: 'Call Me By Your Name (OST)',
    duration: '4:08',
  },
  topArtist: { name: 'Sufjan Stevens', plays: 47 },
  recent: [
    { song: 'Vienna', artist: 'Billy Joel', when: '2h ago' },
    { song: 'Pink + White', artist: 'Frank Ocean', when: '4h ago' },
    { song: 'Cherry Wine', artist: 'Hozier', when: 'yesterday' },
  ],
  topTracks: [
    { song: 'Vienna', artist: 'Billy Joel', album: 'The Stranger', duration: '3:34' },
    { song: 'Pink + White', artist: 'Frank Ocean', album: 'Blonde', duration: '3:04' },
    { song: 'Heaven', artist: 'Niall Horan', album: 'The Show', duration: '3:18' },
    { song: 'Cherry Wine', artist: 'Hozier', album: 'Hozier', duration: '4:01' },
    {
      song: "Lover, You Should've Come Over",
      artist: 'Jeff Buckley',
      album: 'Grace',
      duration: '6:43',
    },
  ],
  genres: [
    { name: 'indie folk', pct: 31, artists: ['Sufjan Stevens', 'Hozier', 'Phoebe Bridgers'] },
    { name: 'singer-songwriter', pct: 24, artists: ['Billy Joel', 'Jeff Buckley'] },
    { name: 'alt R&B', pct: 18, artists: ['Frank Ocean', 'Daniel Caesar'] },
    { name: 'chamber pop', pct: 15, artists: ['Fleet Foxes', 'Big Thief'] },
    { name: 'ambient', pct: 12, artists: ['Ludovico Einaudi'] },
  ],
}
