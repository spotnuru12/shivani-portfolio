'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'shivani-theme'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

// The class is already on <html> before first paint (see themeInit in
// app/layout.tsx). This provider only mirrors it into React state so the
// toggle can render the right icon, then persists user choices.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    const root = document.documentElement
    root.classList.toggle('theme-dark', next === 'dark')
    root.classList.toggle('theme-light', next === 'light')
    root.dataset.theme = next
    root.style.colorScheme = next
    setTheme(next)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      /* private mode — the theme just won't persist */
    }
  }, [theme])

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  // Fall back to a no-op so a stray consumer can never crash the page.
  return ctx ?? { theme: 'light', toggle: () => undefined }
}
