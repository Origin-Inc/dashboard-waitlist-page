"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element first becomes ≥ `threshold` visible.
 * Disconnects the observer after the first hit, so subsequent viewport
 * recalcs (iOS Safari address-bar collapse, mobile Chrome resize) can't
 * re-trigger the animation or reset the element's state.
 *
 * Use the returned `revealed` flag to toggle a CSS class that runs the
 * actual transition — keeping animation off the JS thread entirely.
 */
export function useReveal<T extends Element = HTMLDivElement>(threshold = 0.2): {
  ref: React.RefObject<T | null>;
  revealed: boolean;
} {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Older browsers without IO: just reveal immediately.
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.disconnect();
            return;
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, revealed };
}
