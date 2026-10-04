import type { Film } from './letterboxd'

export type Bar = { label: string; value: number; detail?: string }

export interface RankStats {
  bars: Bar[]
  topShare: number
  n: number
  k: number
}

export function gini(weights: number[]): number {
  const n = weights.length
  if (n === 0) return 0
  const sorted = [...weights].sort((a, b) => a - b)
  const total = sorted.reduce((sum, w) => sum + w, 0)
  if (total === 0) return 0
  let acc = 0
  sorted.forEach((w, i) => {
    acc += (2 * (i + 1) - n - 1) * w
  })
  return acc / (n * total)
}

export function rankWeights(n: number): number[] {
  return Array.from({ length: n }, (_, i) => n - i)
}

export function shareOfTop(weights: number[], k: number): number {
  const total = weights.reduce((sum, w) => sum + w, 0)
  if (total === 0) return 0
  const top = [...weights].sort((a, b) => b - a).slice(0, k)
  return top.reduce((sum, w) => sum + w, 0) / total
}

export interface ListeningPlot {
  n: number
  bars: Bar[]
  top1Share: number
  evenShare: number
  timesEven: number
  mad: number
  evenness: number
}

/** Rank-weighted top-N. Uniform would give each artist 1/n. */
export function listeningPlot(names: string[], n = 10): ListeningPlot {
  const top = names.slice(0, n)
  const count = top.length
  const weights = rankWeights(count)
  const total = weights.reduce((sum, w) => sum + w, 0) || 1
  const shares = weights.map((w) => w / total)
  const evenShare = count > 0 ? 1 / count : 0
  const mad =
    count > 0 ? shares.reduce((sum, p) => sum + Math.abs(p - evenShare), 0) / count : 0
  const shannon = -shares.reduce((sum, p) => sum + (p > 0 ? p * Math.log(p) : 0), 0)
  const evenness = count > 1 ? shannon / Math.log(count) : 1
  return {
    n: count,
    bars: top.map((label, i) => ({ label, value: shares[i] ?? 0 })),
    top1Share: shares[0] ?? 0,
    evenShare,
    timesEven: evenShare > 0 ? (shares[0] ?? 0) / evenShare : 0,
    mad,
    evenness,
  }
}

export function artistRankStats(names: string[], k = 3): RankStats {
  const weights = rankWeights(names.length)
  const total = weights.reduce((sum, w) => sum + w, 0) || 1
  return {
    n: names.length,
    k: Math.min(k, names.length),
    topShare: shareOfTop(weights, k),
    bars: names.slice(0, 8).map((label, i) => ({
      label,
      value: weights[i] / total,
    })),
  }
}

export interface FilmWindow {
  n: number
  meanYear: number | null
  meanAge: number | null
  evenness: number
  rewatchPct: number | null
  vintagePct: number | null
  decades: Bar[]
}

export function filmWindow(films: Film[], now = new Date().getFullYear()): FilmWindow {
  const years = films
    .map((f) => Number.parseInt(f.year, 10))
    .filter((y) => Number.isFinite(y))
  const meanYear =
    years.length > 0 ? years.reduce((sum, y) => sum + y, 0) / years.length : null
  const decadeCounts = new Map<number, number>()
  for (const y of years) {
    const d = Math.floor(y / 10) * 10
    decadeCounts.set(d, (decadeCounts.get(d) ?? 0) + 1)
  }
  const decades = Array.from(decadeCounts.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([d, value]) => ({ label: `${String(d).slice(2)}s`, value }))
  const total = decades.reduce((sum, row) => sum + row.value, 0) || 1
  const shares = decades.map((row) => row.value / total)
  const shannon = -shares.reduce((sum, p) => sum + (p > 0 ? p * Math.log(p) : 0), 0)
  const evenness = decades.length > 1 ? shannon / Math.log(decades.length) : 1
  const rewatches = films.filter((f) => f.rewatch).length
  return {
    n: films.length,
    meanYear,
    meanAge: meanYear !== null ? now - meanYear : null,
    evenness,
    rewatchPct: films.length > 0 ? rewatches / films.length : null,
    vintagePct: years.length > 0 ? years.filter((y) => y < 2000).length / years.length : null,
    decades,
  }
}
