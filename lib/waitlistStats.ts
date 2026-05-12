/**
 * Deterministic, momentum-based waitlist stats.
 *
 * The displayed total grows from a configurable baseline by:
 *   - any actual new signups passed in (when a real datasource is wired up)
 *   - plus a per-week random "growth" sampled from a seeded RNG, so every visitor
 *     on the same day sees the same number (credibility > novelty).
 *
 * Within a week, the current-week growth is interpolated linearly by the fraction
 * of the week that has elapsed, so the number ticks up smoothly day-by-day without
 * unrealistic jumps.
 */

export type WaitlistStatsConfig = {
  /** Number displayed when the simulation began. */
  baselineCount: number;
  /** ISO date (UTC midnight) representing week index 0. */
  baselineDateISO: string;
  /** Minimum growth added per week. */
  minWeeklyGrowth: number;
  /** Maximum growth added per week. */
  maxWeeklyGrowth: number;
  /** Stable string used to seed the per-week RNG. Change this to reroll the curve. */
  seed: string;
};

export const DEFAULT_STATS_CONFIG: WaitlistStatsConfig = {
  baselineCount: 2140,
  baselineDateISO: "2026-04-01",
  minWeeklyGrowth: 90,
  maxWeeklyGrowth: 240,
  seed: "odeun-waitlist-v1",
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export type WaitlistStats = {
  total: number;
  thisWeek: number;
  weekIndex: number;
  /** Fraction of the current week elapsed, in [0, 1). Useful for client-side smoothing. */
  weekProgress: number;
};

export function getWaitlistStats(
  opts: {
    now?: Date;
    actualNewSignups?: number;
    config?: WaitlistStatsConfig;
  } = {},
): WaitlistStats {
  const config = opts.config ?? DEFAULT_STATS_CONFIG;
  const now = opts.now ?? new Date();
  const actualNewSignups = Math.max(0, Math.floor(opts.actualNewSignups ?? 0));

  const baseline = new Date(`${config.baselineDateISO}T00:00:00Z`).getTime();
  const elapsedMs = Math.max(0, now.getTime() - baseline);
  const weekIndex = Math.floor(elapsedMs / WEEK_MS);
  const weekProgress = (elapsedMs % WEEK_MS) / WEEK_MS;

  let completedWeeksGrowth = 0;
  for (let w = 0; w < weekIndex; w++) {
    completedWeeksGrowth += sampleWeekGrowth(w, config);
  }

  const currentWeekTarget = sampleWeekGrowth(weekIndex, config);
  const currentWeekSoFar = Math.floor(currentWeekTarget * weekProgress);

  const total = config.baselineCount + completedWeeksGrowth + currentWeekSoFar + actualNewSignups;
  const thisWeek = currentWeekSoFar + actualNewSignups;

  return { total, thisWeek, weekIndex, weekProgress };
}

function sampleWeekGrowth(weekIndex: number, config: WaitlistStatsConfig): number {
  const rand = seededRandom(`${config.seed}:${weekIndex}`);
  const span = Math.max(0, config.maxWeeklyGrowth - config.minWeeklyGrowth);
  return Math.round(config.minWeeklyGrowth + rand * span);
}

function seededRandom(input: string): number {
  // FNV-1a 32-bit hash -> mulberry32 PRNG. Pure, stable, no deps.
  let h = 2166136261 >>> 0;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let t = h >>> 0;
  t += 0x6d2b79f5;
  let r = Math.imul(t ^ (t >>> 15), 1 | t);
  r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
  return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
}
