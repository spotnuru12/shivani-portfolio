'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

// Shares the hovered interest between the About paragraph (left column) and
// the photo box under the school block (right column).
const Ctx = createContext<{ active: string | null; setActive: (v: string | null | ((p: string | null) => string | null)) => void }>({
  active: null,
  setActive: () => {},
})

export function InterestsProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<string | null>(null)
  return <Ctx.Provider value={{ active, setActive }}>{children}</Ctx.Provider>
}

export function useInterests() {
  return useContext(Ctx)
}
