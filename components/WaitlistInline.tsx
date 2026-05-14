"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type CtaVariant = "default" | "founder" | "early";

export function WaitlistInline({
  compact = false,
  cta = "default",
  helper,
}: {
  compact?: boolean;
  cta?: CtaVariant;
  helper?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const ctaText =
    cta === "founder"
      ? { mobile: "Get access", desktop: "Get Founder Access" }
      : cta === "early"
        ? { mobile: "Get access", desktop: "Get Early Access" }
        : { mobile: "Join", desktop: "Join The Waitlist" };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: compact ? "form" : "hero" }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setState("err");
        setMessage(data.error ?? "Something interrupted the ritual. Try again?");
        return;
      }
      setState("ok");
      setMessage("You're in. Check your inbox.");
      setEmail("");
    } catch {
      setState("err");
      setMessage("Network unavailable. Please try again.");
    }
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Join the waitlist">
      <div
        className={cn(
          "group glass flex flex-row items-center gap-1 rounded-full p-1 pl-2 sm:gap-1.5 sm:p-1.5",
          state === "err" && "ring-2 ring-rose-300",
          state === "ok" && "ring-2 ring-emerald-300",
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:pl-1">
          <svg className="h-4 w-4 shrink-0 text-ink-400" viewBox="0 0 16 16" fill="none">
            <path
              d="M2.5 4.5l5.5 4 5.5-4M2.5 4.5v7a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-7M2.5 4.5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <label htmlFor={compact ? "email-compact" : "email-hero"} className="sr-only">
            Email address
          </label>
          <input
            id={compact ? "email-compact" : "email-hero"}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email…"
            autoComplete="email"
            disabled={state === "loading"}
            className="peer min-w-0 flex-1 bg-transparent px-1 py-2 text-[13.5px] font-medium text-ink-950 placeholder:text-ink-400 focus:outline-none disabled:opacity-60 sm:py-2.5 sm:text-[15px]"
          />
        </div>
        <button
          type="submit"
          disabled={state === "loading"}
          className={cn(
            "inline-flex h-9 w-auto shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink-950 px-3 text-[11.5px] font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-signal-600 active:scale-[0.98] sm:h-12 sm:px-5 sm:text-[13px]",
            state === "loading" && "opacity-80",
          )}
        >
          {state === "loading" ? (
            <Spinner />
          ) : (
            <>
              <span className="sm:hidden">{ctaText.mobile}</span>
              <span className="hidden sm:inline">{ctaText.desktop}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M2 7h10M7 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "mt-2.5 min-h-[20px] pl-4 text-[12.5px] font-medium",
          state === "ok" && "text-emerald-700",
          state === "err" && "text-rose-700",
          state === "idle" && "text-ink-500",
        )}
      >
        {message ?? helper ?? (compact ? "" : "No spam, no noise — just founder updates.")}
      </div>
    </form>
  );
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="animate-spin" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" fill="none" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
