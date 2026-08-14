import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { PROFILE, SITE_URL } from '@/lib/data'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'

// Self-hosted variable fonts (no runtime Google dependency). Files live in
// app/fonts. League Spartan = bold display; Inter = body/UI; Caveat = the
// handwritten sticky notes.
const league = localFont({
  src: './fonts/LeagueSpartan.woff2',
  variable: '--font-league',
  display: 'swap',
  weight: '100 900',
})

const inter = localFont({
  src: './fonts/Inter.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
})

const caveat = localFont({
  src: './fonts/Caveat.woff2',
  variable: '--font-caveat',
  display: 'swap',
  weight: '400 700',
})

const description = `${PROFILE.name} — ${PROFILE.role} at ${PROFILE.school}, working at the intersection of HCI, machine learning, and data.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PROFILE.name} — Portfolio`,
    template: `%s — ${PROFILE.name}`,
  },
  description,
  openGraph: {
    title: `${PROFILE.name} — Portfolio`,
    description,
    url: '/',
    siteName: PROFILE.name,
    type: 'website',
  },
  twitter: { card: 'summary', title: `${PROFILE.name} — Portfolio`, description },
}

// Hydration watchdog: entrance animations render at opacity:0. If the JS
// bundle never boots, force-reveal after 3.5s so the page is never blank.
const revealInit = `window.__t=setTimeout(function(){document.documentElement.className+=" no-hydrate"},3500)`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${league.variable} ${inter.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealInit }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
