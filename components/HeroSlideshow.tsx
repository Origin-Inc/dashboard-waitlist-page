"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  AgencyArtifact,
  ContentArtifact,
  FinanceArtifact,
  SecondBrainArtifact,
} from "./HeroArtifacts";
import { cn } from "@/lib/utils";

const slides = [
  { key: "finance", label: "Finance Command", component: <FinanceArtifact /> },
  { key: "agency", label: "Agency Control Room", component: <AgencyArtifact /> },
  { key: "brain", label: "Nervous-System Dashboard", component: <SecondBrainArtifact /> },
  { key: "content", label: "90-Day Content Sprint", component: <ContentArtifact /> },
];

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      {/* stacked glow */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[38px] bg-gradient-to-br from-signal-500/15 via-neon-magenta/10 to-neon-orange/15 blur-2xl"
      />

      {/* layered stack — current on top, next peeking */}
      <div className="relative h-[510px] w-full sm:h-[480px]">
        {/* back layer (peek) */}
        <div className="pointer-events-none absolute inset-x-10 top-6 h-full scale-[0.92] opacity-50 blur-[0.5px]">
          <div className="glass h-[86%] w-full rounded-[28px]" />
        </div>
        <div className="pointer-events-none absolute inset-x-4 top-3 h-full scale-[0.96] opacity-80">
          <div className="glass h-[94%] w-full rounded-[28px]" />
        </div>

        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].key}
              initial={{ opacity: 0, y: 16, scale: 0.97, rotateX: -4 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
              style={{ transformPerspective: 1200 }}
            >
              {slides[index].component}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating cursor */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-14 top-24 z-20"
          animate={{ x: [0, 12, -4, 0], y: [0, 8, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M3 2 L19 10 L11 12 L9 20 Z"
              fill="#0a0f2e"
              stroke="white"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
          <div className="ml-3 mt-1 inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-2.5 py-1 text-[10px] font-semibold text-white shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-orange" />
            claudia
          </div>
        </motion.div>

        {/* Floating toolbar */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-4 left-1/2 z-20 -translate-x-1/2"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="glass flex items-center gap-2 rounded-full px-2.5 py-2 shadow-float">
            <button className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ink-950 px-3 text-[11px] font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Deployed · live
            </button>
            <div className="h-5 w-px bg-ink-200/70" />
            <button className="inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium text-ink-700">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6h8M6 2l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              copy link
            </button>
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-700">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 2v10M2 7h10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slide indicators / labels */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setIndex(i)}
            aria-label={`Show ${s.label}`}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all",
              i === index
                ? "border-ink-950 bg-ink-950 text-white"
                : "border-ink-200 bg-white/60 text-ink-600 hover:border-ink-400",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all",
                i === index ? "bg-neon-magenta" : "bg-ink-300",
              )}
            />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
