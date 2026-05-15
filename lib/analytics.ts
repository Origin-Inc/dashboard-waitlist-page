/**
 * Meta Pixel helper.
 *
 * The pixel ID lives here so it's set in one place and imported wherever
 * we need to fire an event. The `fbq()` wrapper safely no-ops when the
 * pixel hasn't loaded yet (SSR, ad-blocker, or strategy="afterInteractive"
 * still in flight), so call sites never need to guard.
 */

export const META_PIXEL_ID = "2055688842011128";

type FbqArgs = [string, ...unknown[]];

declare global {
  interface Window {
    fbq?: (...args: FbqArgs) => void;
  }
}

export function fbq(...args: FbqArgs): void {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq(...args);
}
