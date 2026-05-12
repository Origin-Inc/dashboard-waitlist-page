import { cn } from "@/lib/utils";

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn(className)} aria-hidden>
      <path
        d="M12 2.5c.5 3.8 1.7 5 5.5 5.5-3.8.5-5 1.7-5.5 5.5-.5-3.8-1.7-5-5.5-5.5 3.8-.5 5-1.7 5.5-5.5z"
        fill="currentColor"
      />
      <path
        d="M18.5 14c.3 2 .9 2.7 2.9 3-2 .3-2.6 1-2.9 3-.3-2-.9-2.7-2.9-3 2-.3 2.6-1 2.9-3z"
        fill="currentColor"
        fillOpacity="0.55"
      />
    </svg>
  );
}
