'use client'

import { createContext, useContext, type ReactNode } from 'react'
import {
  useSpotifyDashboardData,
  type SpotifyDashboardData,
} from './useSpotifyDashboardData'

const SpotifyCtx = createContext<SpotifyDashboardData | null>(null)

export function SpotifyProvider({ children }: { children: ReactNode }) {
  const data = useSpotifyDashboardData()
  return <SpotifyCtx.Provider value={data}>{children}</SpotifyCtx.Provider>
}

export function useSharedSpotify(): SpotifyDashboardData {
  const ctx = useContext(SpotifyCtx)
  if (!ctx) throw new Error('useSharedSpotify must be used inside SpotifyProvider')
  return ctx
}
