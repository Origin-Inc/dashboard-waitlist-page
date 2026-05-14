"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "perfect command center",
  "financial planner that doesn't suck",
  "automatic property analyzer",
  "your revenue operations hub",
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
const FADE_MS = 260;

/**
 * Pure CSS opacity crossfade — no Framer Motion, no remount, no AnimatePresence.
 *
 * The previous AnimatePresence + mode="wait" approach caused visible flash on
 * iOS Safari / mobile Chromium because the remount + JS-driven transform
 * setting races with the browser's paint scheduler. Here a single span persists
 * for the lifetime of the component; we just animate its opacity via CSS while
 * swapping its text content between fades.
 */
export function HeroRotatingPhrase() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let swapTimer: ReturnType<typeof setTimeout> | null = null;
    const tick = setInterval(() => {
      setVisible(false);
      swapTimer = setTimeout(() => {
        setIdx((i) => (i + 1) % PHRASES.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);

    return () => {
      clearInterval(tick);
      if (swapTimer) clearTimeout(swapTimer);
    };
  }, []);

  return (
    <span
      className="inline-block font-normal italic"
      style={{
        fontFamily: "var(--font-fraunces), ui-serif, Georgia, serif",
        WebkitTextFillColor: "#fcd065",
        color: "#fcd065",
        // Layered halo: tight white outline for separation, soft diffuse glow
        // for elegance, and a subtle dark drop to ground the yellow on the
        // brighter parts of the hero artwork.
        textShadow:
          "0 0 1px rgba(255,255,255,0.85), 0 0 10px rgba(255,255,255,0.35), 0 0 24px rgba(255,255,255,0.18), 0 2px 8px rgba(0,0,0,0.35)",
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        willChange: "opacity",
      }}
    >
      {PHRASES[idx]}
    </span>
  );
}
