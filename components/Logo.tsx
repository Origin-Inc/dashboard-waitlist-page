import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn(className)} fill="none" aria-hidden>
      <defs>
        <linearGradient id="Odeun-g" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3834ff" />
          <stop offset="0.55" stopColor="#ff3ca5" />
          <stop offset="1" stopColor="#ff7a29" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="url(#Odeun-g)" />
      <rect x="1" y="1" width="38" height="38" rx="11" fill="white" fillOpacity="0.08" />
      <path
        d="M10 27c2.8-9 7-13 20-15-5 12-6 16-10 18-3 1.5-7 0-10-3z"
        fill="white"
        fillOpacity="0.95"
      />
      <circle cx="24.5" cy="14" r="1.6" fill="#0a0f2e" />
      <path
        d="M12 28c3-1.5 5-3 8-5"
        stroke="#0a0f2e"
        strokeOpacity="0.25"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
