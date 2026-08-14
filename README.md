# Shivani Potnuru — Portfolio

A warm, minimal personal site built with Next.js (App Router), TypeScript, and
Tailwind. Self-hosted variable fonts, so there's no runtime Google Fonts call:
**League Spartan** for display/headings, **Inter** for body and UI, **Caveat**
for the handwritten sticky notes.

## Run it

```bash
npm install
npm run dev                      # http://localhost:3000
npm run build && npm run start   # production
```

## Structure

```
app/
  page.tsx               homepage — section order lives here
  layout.tsx             fonts, metadata, Navbar + Footer
  globals.css            design tokens (:root vars) + component styles
  fonts/                 self-hosted variable woff2
  case-study/[slug]/     case-study template
  api/spotify/*          live Spotify proxies (top tracks, top artists, recent)
  api/auth/*             Spotify OAuth: login, callback, status, export-token
components/
  Navbar.tsx             sticky nav with scroll-spy
  CaseStudyNav.tsx       sticky table of contents for case studies
  sections/              Hero, Work, About, Projects, Shelf, Contact, Footer
  shelf/                 FilmShelf (Letterboxd), BookShelf
  spotify/               SpotifyDashboard + its data hook
  ui/                    Typewriter, StatCounter, Reveal, StickyNote, Icons
lib/
  data.ts                ALL content lives here — edit this to update the site
  spotify.ts             Listening types + sample fallback
  spotify-auth.ts        server-only OAuth/token helpers (never import client-side)
  letterboxd.ts          RSS diary parser for the film shelf
public/                  headshot + org logos
```

## Editing content

Everything is data-driven from `lib/data.ts`:

- **Profile / typing words / intro** → `PROFILE`
- **Sticky-note beliefs** → `BELIEFS`
- **Work timeline** → `EXPERIENCE`
- **Projects + case studies** → `PROJECTS`
- **Education / skills** → `EDUCATION`, `SKILLS`
- **Books on the shelf** → `BOOKS`
- **Letterboxd handle** → `LETTERBOXD_USERNAME`

## The shelf (music · film · books)

Three cards in a row. Each one degrades gracefully: if the live source isn't
configured, it shows sample data instead of an empty card, and the header dot
tells you which you're looking at (green = live, grey = sample).

### Music — Spotify

Copy `.env.example` to `.env.local` and fill it in:

1. Create an app at [developer.spotify.com](https://developer.spotify.com/dashboard)
   and add `http://localhost:3000/api/auth/callback` as a redirect URI.
2. Set `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REDIRECT_URI`, and
   any random string for `COOKIE_SECRET`.
3. Run the app, visit `/api/auth/login`, and authorize.
4. Open `/api/auth/export-token`, copy the `refresh_token`, and set it as
   `SPOTIFY_REFRESH_TOKEN`. That's what lets *every* visitor see your listening
   data rather than only you. In production, add the same vars in Vercel.

Genres are folded into families and weighted by artist rank before display, so
the five rows aren't five near-duplicate spellings of "indie folk".

### Film — Letterboxd

No API key and no API: Letterboxd publishes a public RSS diary per profile. Set
`LETTERBOXD_USERNAME` in `lib/data.ts` and the card goes live, fetched
server-side and revalidated hourly. Until then it shows the curated `FILMS`
list.

### Books

Hand-curated in `BOOKS` (Goodreads retired its API and StoryGraph has none).

## Commit convention

Conventional Commits, single author:

```
feat: add sticky-note bulletin board
fix: correct case-study TOC active state
chore: update resume.pdf
```
