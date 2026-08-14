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
  cover?: string | null
}

export interface Genre {
  name: string
  pct: number
  /** Artists carrying the genre — mirrors the provenance the live data shows. */
  artists: string[]
}

export interface ListeningData {
  nowPlaying: { song: string; artist: string; album: string; duration: string; cover?: string | null }
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
    cover:
      'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/06/92/3c/06923c8d-1524-b097-1779-b7aebbd6aec2/CMBYN_Mystery_of_Love_Digital_Cover.jpg/200x200bb.jpg',
  },
  topArtist: { name: 'Sufjan Stevens', plays: 47 },
  recent: [
    {
      song: 'Vienna',
      artist: 'Billy Joel',
      when: '2h ago',
      cover:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/37/68/4c/37684c52-dbdf-9bfe-0d87-07492f43dc4c/dj.gmcbwich.jpg/200x200bb.jpg',
    },
    {
      song: 'Pink + White',
      artist: 'Frank Ocean',
      when: '4h ago',
      cover:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/45/68/bb4568f3-68cd-619d-fbcb-4e179916545d/BlondCover-Final.jpg/200x200bb.jpg',
    },
    {
      song: 'Cherry Wine',
      artist: 'Hozier',
      when: 'yesterday',
      cover:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5e/1b/f1/5e1bf1de-e5f1-e73e-0752-e7882b4f2d57/886444718820.jpg/200x200bb.jpg',
    },
  ],
  topTracks: [
    {
      song: 'Vienna',
      artist: 'Billy Joel',
      album: 'The Stranger',
      duration: '3:34',
      cover:
        'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/37/68/4c/37684c52-dbdf-9bfe-0d87-07492f43dc4c/dj.gmcbwich.jpg/200x200bb.jpg',
    },
    {
      song: 'Pink + White',
      artist: 'Frank Ocean',
      album: 'Blonde',
      duration: '3:04',
      cover:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/45/68/bb4568f3-68cd-619d-fbcb-4e179916545d/BlondCover-Final.jpg/200x200bb.jpg',
    },
    {
      song: 'Heaven',
      artist: 'Niall Horan',
      album: 'The Show',
      duration: '3:18',
      cover:
        'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/81/c3/86/81c38674-b743-245f-d840-9b585ca81e48/23UMGIM00778.rgb.jpg/200x200bb.jpg',
    },
    {
      song: 'Cherry Wine',
      artist: 'Hozier',
      album: 'Hozier',
      duration: '4:01',
      cover:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5e/1b/f1/5e1bf1de-e5f1-e73e-0752-e7882b4f2d57/886444718820.jpg/200x200bb.jpg',
    },
    {
      song: "Lover, You Should've Come Over",
      artist: 'Jeff Buckley',
      album: 'Grace',
      duration: '6:43',
      cover:
        'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/19/db/9d/19db9d89-d534-10d8-5001-829a3ced9324/886447832936.jpg/200x200bb.jpg',
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
