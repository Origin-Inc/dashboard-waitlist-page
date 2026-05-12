"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const PHRASES = [
  "perfect command center",
  "financial planner that doesn't suck",
  "automatic property analyzer",
  "revenue operations hub",
  "client intake command center",
  "anxiety-soothing dashboard",
  "3-kid summer camp logistics hub",
  "90-day goal-crushing system",
  "perfect content manager",
  "daily routine cheerleader",
  "nervous system regulation board",
  "proactive agency Chief of Staff",
];

const ROTATE_MS = 3000;

export function HeroRotatingPhrase() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PHRASES.length), ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-block align-baseline">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block font-normal italic"
          style={{
            fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
            WebkitTextFillColor: "#fcd065",
            color: "#fcd065",
            textShadow: "0 4px 12px rgba(0,0,0,0.45)",
            // Promote to its own compositor layer so the remount paint cycle
            // doesn't flash on iOS Safari / mobile Chromium.
            willChange: "transform, opacity",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        >
          {PHRASES[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
