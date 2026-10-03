import type { Film } from './letterboxd'

const STAR_STEPS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5] as const

export type Bar = { label: string; value: number; detail?: string }

export interface FilmStats {
  n: number
  thisYear: number | null
  avg: number | null
  rewatchPct: number | null
  ratings: Bar[]
  decades: Bar[]
  highest: Bar[]
}

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

export function lorenz(weights: number[]): { x: number; y: number }[] {
  const n = weights.length
  if (n === 0) return [{ x: 0, y: 0 }, { x: 1, y: 1 }]
  const sorted = [...weights].sort((a, b) => a - b)
  const total = sorted.reduce((sum, w) => sum + w, 0) || 1
  let cum = 0
  const pts = [{ x: 0, y: 0 }]
  sorted.forEach((w, i) => {
    cum += w
    pts.push({ x: (i + 1) / n, y: cum / total })
  })
  return pts
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

export function filmStats(films: Film[], year = new Date().getFullYear()): FilmStats {
  const rated = films.filter((f) => f.rating !== null)
  const avg =
    rated.length > 0
      ? rated.reduce((sum, f) => sum + (f.rating ?? 0), 0) / rated.length
      : null
  const withDate = films.filter((f) => f.watchedDate)
  const thisYear =
    withDate.length > 0
      ? films.filter((f) => f.watchedDate.startsWith(String(year))).length
      : null
  const rewatches = films.filter((f) => f.rewatch).length
  const rewatchPct = films.length > 0 ? rewatches / films.length : null

  const ratingCounts = new Map<number, number>()
  for (const step of STAR_STEPS) ratingCounts.set(step, 0)
  for (const f of rated) {
    const bucket = STAR_STEPS.reduce((best, step) =>
      Math.abs(step - (f.rating ?? 0)) < Math.abs(best - (f.rating ?? 0)) ? step : best,
    )
    ratingCounts.set(bucket, (ratingCounts.get(bucket) ?? 0) + 1)
  }

  const decadeCounts = new Map<number, number>()
  for (const f of films) {
    const y = Number.parseInt(f.year, 10)
    if (!Number.isFinite(y)) continue
    const d = Math.floor(y / 10) * 10
    decadeCounts.set(d, (decadeCounts.get(d) ?? 0) + 1)
  }

  return {
    n: films.length,
    thisYear,
    avg,
    rewatchPct,
    ratings: STAR_STEPS.map((step) => ({
      label: step % 1 === 0 ? String(step) : `${Math.floor(step)}½`,
      value: ratingCounts.get(step) ?? 0,
    })),
    decades: Array.from(decadeCounts.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([d, value]) => ({ label: `${d}s`, value })),
    highest: [...rated]
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.title.localeCompare(b.title))
      .slice(0, 5)
      .map((f) => ({
        label: f.title,
        value: f.rating ?? 0,
        detail: f.year,
      })),
  }
}
