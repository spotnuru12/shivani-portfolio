import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { PROFILE, SITE_URL } from '@/lib/data'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import { ThemeProvider } from '@/components/ui/ThemeProvider'

// Self-hosted variable fonts (no runtime Google dependency). Files live in
// app/fonts. League Spartan = display; Inter = body/UI.
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

const description = `${PROFILE.name} is a CS and Statistics student at ${PROFILE.school} building accessible, data-driven tools.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PROFILE.name} — Portfolio`,
    template: `%s — ${PROFILE.name}`,
  },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${PROFILE.name} — Portfolio`,
    description,
    url: '/',
    siteName: PROFILE.name,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: `${PROFILE.name} — Portfolio`, description },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fbfaf6',
}

// Hydration watchdog: entrance animations render at opacity:0. If the JS
// bundle never boots, force-reveal after 3.5s so the page is never blank.
const revealInit = `window.__t=setTimeout(function(){document.documentElement.className+=" no-hydrate"},3500)`

// Light unless this browser already picked dark. Do not follow the OS.
const themeInit = `(function(){try{var d=localStorage.getItem('shivani-theme')==='dark';var r=document.documentElement;r.classList.add(d?'theme-dark':'theme-light');r.dataset.theme=d?'dark':'light';r.style.colorScheme=d?'dark':'light'}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${league.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" as="image" href="/headshot.jpeg" />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script dangerouslySetInnerHTML={{ __html: revealInit }} />
      </head>
      <body>
        <ThemeProvider>
          <a href="#main" className="skip-link">Skip to content</a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
