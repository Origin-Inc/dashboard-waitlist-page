import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-ink-950/10">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="text-[17px] font-semibold tracking-tight text-ink-950">Odeun</span>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-500">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-magenta" />
              private beta · invites weekly
            </span>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-ink-400">
              © {new Date().getFullYear()} Odeun systems · made with care
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
