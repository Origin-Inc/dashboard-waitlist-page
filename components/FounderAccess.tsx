import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const BENEFITS: { label: string; sub: string }[] = [
  { label: "Founding member badge", sub: "Permanent insider status" },
  { label: "Direct founder updates", sub: "Build notes, no marketing" },
  { label: "Private roadmap voting", sub: "Shape what ships next" },
  { label: "First-look feature access", sub: "Try every drop before launch" },
];

export function FounderAccess({ className }: Props) {
  return (
    <div className={cn("w-full", className)} aria-label="What founder access unlocks">
      <div className="mb-3 flex items-center justify-center gap-2">
        <span aria-hidden className="h-px w-6 bg-ink-200" />
        <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-500">
          Founder access unlocks
        </span>
        <span aria-hidden className="h-px w-6 bg-ink-200" />
      </div>
      <ul className="grid grid-cols-1 gap-2 text-left sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2.5">
        {BENEFITS.map((b) => (
          <li key={b.label} className="flex items-start gap-2.5">
            <Check />
            <span className="min-w-0 leading-[1.25]">
              <span className="block text-[13px] font-semibold text-ink-950 sm:text-[13.5px]">
                {b.label}
              </span>
              <span className="block text-[11.5px] font-medium text-ink-500 sm:text-[12px]">
                {b.sub}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Check() {
  return (
    <span
      aria-hidden
      className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-signal-600/10 text-signal-600 ring-1 ring-inset ring-signal-600/20"
    >
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path
          d="M1.5 4.6L3.6 6.7L7.5 2.3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
