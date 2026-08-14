import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-league)', 'var(--font-inter)', 'sans-serif'],
        hand: ['var(--font-caveat)', 'ui-sans-serif', 'cursive'],
      },
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
        red: 'var(--red)',
      },
      boxShadow: { lift: '0 10px 30px rgba(0, 0, 0, 0.22)' },
      maxWidth: { content: '1120px', prose: '720px' },
    },
  },
  plugins: [],
}
export default config
