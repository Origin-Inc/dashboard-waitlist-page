"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Server-computed total at SSR. Polling will keep this in sync across clients. */
  total: number;
  /** Server-computed weekly total at SSR. */
  thisWeek: number;
  /** How often to refetch the centralized stats, in ms. Default 30s. */
  pollIntervalMs?: number;
  /** "strong" uses a nearly-opaque glass — for use on dark backgrounds. */
  variant?: "default" | "strong";
  className?: string;
};

export function InsiderStats({
  total,
  thisWeek,
  pollIntervalMs = 30_000,
  variant = "default",
  className,
}: Props) {
  const [liveTotal, setLiveTotal] = useState(total);
  const [liveWeek, setLiveWeek] = useState(thisWeek);

  // Re-sync if the parent re-renders with fresh server stats.
  useEffect(() => setLiveTotal(total), [total]);
  useEffect(() => setLiveWeek(thisWeek), [thisWeek]);

  useStatsPoll({
    intervalMs: pollIntervalMs,
    onUpdate: (next) => {
      setLiveTotal(next.total);
      setLiveWeek(next.thisWeek);
    },
  });

  return (
    <div
      className={cn(
        "group inline-flex items-center gap-3 rounded-full px-3 py-2 sm:gap-4 sm:px-4 sm:py-2.5",
        variant === "strong" ? "glass-strong" : "glass",
        className,
      )}
      aria-label="Waitlist insider numbers"
      role="group"
    >
      <span className="flex items-center gap-1.5 pl-0.5">
        <LiveDot />
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-500">Live</span>
      </span>
      <span aria-hidden className="h-3 w-px bg-ink-200/80" />
      <Stat value={liveTotal} label="joined" />
      <span aria-hidden className="h-3 w-px bg-ink-200/80" />
      <Stat value={liveWeek} label="this week" emphasis="signal" />
    </div>
  );
}

function Stat({
  value,
  label,
  emphasis,
}: {
  value: number;
  label: string;
  emphasis?: "signal";
}) {
  const display = useSmoothedNumber(value);
  return (
    <span className="flex min-w-0 items-baseline gap-1.5">
      <span
        className={cn(
          "font-sans text-[15px] font-extrabold tabular-nums leading-none tracking-[-0.02em] text-ink-950 sm:text-[16.5px]",
          emphasis === "signal" && "text-signal-600",
        )}
      >
        {display.toLocaleString("en-US")}
      </span>
      <span className="text-[11px] font-medium text-ink-500 sm:text-[12px]">{label}</span>
    </span>
  );
}

function LiveDot() {
  return (
    <span className="relative inline-flex h-1.5 w-1.5">
      <span
        aria-hidden
        className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60"
        style={{ animationDuration: "2.4s" }}
      />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
    </span>
  );
}

/**
 * Polls /api/waitlist/stats on a fixed interval so every client converges on
 * the same centralized number. Pauses while the tab is hidden, refetches
 * immediately on visibility regain. Silently tolerates network failures.
 */
function useStatsPoll(opts: {
  intervalMs: number;
  onUpdate: (stats: { total: number; thisWeek: number }) => void;
}) {
  const onUpdateRef = useRef(opts.onUpdate);
  onUpdateRef.current = opts.onUpdate;
  const intervalMs = opts.intervalMs;

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const fetchOnce = async () => {
      try {
        const res = await fetch("/api/waitlist/stats", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { total?: number; thisWeek?: number };
        if (cancelled) return;
        if (typeof data.total === "number" && typeof data.thisWeek === "number") {
          onUpdateRef.current({ total: data.total, thisWeek: data.thisWeek });
        }
      } catch {
        // network blip — skip this tick and try again next interval.
      }
    };

    const schedule = () => {
      timeoutId = setTimeout(async () => {
        if (!document.hidden) await fetchOnce();
        if (!cancelled) schedule();
      }, intervalMs);
    };

    const onVisible = () => {
      if (!document.hidden) void fetchOnce();
    };
    document.addEventListener("visibilitychange", onVisible);

    schedule();

    return () => {
      cancelled = true;
      if (timeoutId !== null) clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [intervalMs]);
}

/**
 * Smoothly tweens displayed number toward the underlying value over ~600ms.
 * Renders the current value on first paint (SSR-safe — no mismatch).
 */
function useSmoothedNumber(target: number): number {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === display) return;
    if (typeof window === "undefined") {
      setDisplay(target);
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }

    fromRef.current = display;
    const start = performance.now();
    const duration = 650;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(fromRef.current + (target - fromRef.current) * eased);
      setDisplay(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // Intentionally don't depend on `display` — that would create a feedback loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return display;
}
