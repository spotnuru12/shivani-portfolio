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
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        orange: 'var(--orange)',
        'orange-ink': 'var(--orange-ink)',
        red: 'var(--red)',
      },
      maxWidth: { content: '1120px', prose: '720px' },
    },
  },
  plugins: [],
}
export default config
