import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Wraps every hover: utility in @media (hover: hover) and (pointer: fine)
  // so effects can't stick after a tap on touch screens.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-league)', 'var(--font-inter)', 'sans-serif'],
        hand: ['var(--font-caveat)', 'ui-sans-serif', 'cursive'],
      },
      // Fixed sizes. Responsive heading sizes (text-display/h2/h3) live in globals.css.
      fontSize: {
        lead: ['22px', { lineHeight: '1.45' }],
        body: ['17px', { lineHeight: '1.6' }],
        small: ['15px', { lineHeight: '1.6' }],
        caption: ['13px', { lineHeight: '1.5' }],
        micro: ['11px', { lineHeight: '1.3' }],
      },
      spacing: { heading: '2.75rem' },
      colors: {
        bg: 'var(--bg)',
        panel: 'var(--bg-panel)',
        note: 'var(--bg-note)',
        'note-ink': 'var(--note-ink)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        orange: 'var(--orange)',
        'orange-ink': 'var(--orange-ink)',
        'orange-wash': 'var(--orange-wash)',
        red: 'var(--red)',
        // Fixed brand colours, same in both themes. Hex (not var()) so
        // opacity modifiers like text-cream/80 work.
        navy: '#00314f',
        cream: '#ffefd2',
        paper: '#fbfaf6',
        charcoal: '#1b1a17',
        'charcoal-soft': '#4a463f',
      },
      boxShadow: { lift: '0 10px 30px rgba(0, 0, 0, 0.22)' },
      maxWidth: { content: '1120px', prose: '720px' },
    },
  },
  plugins: [],
}
export default config
