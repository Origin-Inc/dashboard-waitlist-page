import Link from "next/link";
import { Logo } from "./Logo";

export function Nav() {
  return (
    <header className="relative z-50 sm:fixed sm:inset-x-0 sm:top-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden backdrop-blur-sm sm:block"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0.02) 80%, rgba(0,0,0,0) 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      />
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-3 px-4 py-2 sm:px-8 sm:py-2.5">
        <Link href="/" className="group flex items-center gap-2 sm:gap-2.5" aria-label="Odeun home">
          <Logo className="h-7 w-7 sm:h-[34px] sm:w-[34px]" />
          <span
            className="text-[16px] font-semibold tracking-tight text-white sm:text-[18px]"
            style={{ mixBlendMode: "difference" }}
          >
            Odeun
          </span>

        </Link>

        <a
          href="#waitlist"
          className="group relative inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink-950 px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(10,15,46,0.5)] transition-all hover:bg-signal-600 active:scale-[0.98] sm:gap-2 sm:px-4 sm:py-2 sm:text-[15px]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-magenta opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-magenta" />
          </span>
          <span className="sm:hidden">Join beta</span>
          <span className="hidden sm:inline">Join the inner circle</span>
        </a>
      </div>
    </header>
  );
}
