import { getServerSupabase } from "./supabase";
import { getWaitlistStats } from "./waitlistStats";

const TABLE = "waitlist_signups";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Single source of truth for displayed waitlist numbers.
 * Combines the deterministic momentum baseline with real DB counts when
 * Supabase is configured. Both the SSR'd Waitlist section and the
 * /api/waitlist/stats polling endpoint go through this.
 */
export async function getCombinedStats(): Promise<{
  total: number;
  thisWeek: number;
}> {
  const real = await getRealSignupCounts().catch(() => null);
  const stats = getWaitlistStats();
  return {
    total: stats.total + (real?.allTime ?? 0),
    thisWeek: stats.thisWeek + (real?.thisWeek ?? 0),
  };
}

/**
 * Count real signups from the database.
 * Returns null if Supabase isn't configured yet (deterministic-only mode).
 */
export async function getRealSignupCounts(): Promise<{
  allTime: number;
  thisWeek: number;
} | null> {
  const supabase = getServerSupabase();
  if (!supabase) return null;

  const sinceISO = new Date(Date.now() - WEEK_MS).toISOString();

  const [allTime, thisWeek] = await Promise.all([
    supabase.from(TABLE).select("*", { count: "exact", head: true }),
    supabase
      .from(TABLE)
      .select("*", { count: "exact", head: true })
      .gte("created_at", sinceISO),
  ]);

  if (allTime.error || thisWeek.error) {
    console.error("signup count error", allTime.error ?? thisWeek.error);
    return null;
  }

  return {
    allTime: allTime.count ?? 0,
    thisWeek: thisWeek.count ?? 0,
  };
}

/**
 * Insert a signup. Returns:
 *   - { stored: true } when persisted
 *   - { stored: false, reason: "duplicate" } when the email is already on the list
 *   - { stored: false, reason: "unconfigured" } when Supabase env vars are absent
 *   - throws on unexpected DB errors
 */
export async function storeSignup(input: {
  email: string;
  source: string;
}): Promise<{ stored: boolean; reason?: "duplicate" | "unconfigured" }> {
  const supabase = getServerSupabase();
  if (!supabase) return { stored: false, reason: "unconfigured" };

  const { error } = await supabase.from(TABLE).insert({
    email: input.email,
    source: input.source,
  });

  if (!error) return { stored: true };

  // Postgres unique_violation
  if (error.code === "23505") return { stored: false, reason: "duplicate" };

  throw error;
}
