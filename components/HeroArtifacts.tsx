"use client";

import { cn } from "@/lib/utils";

type Health = "green" | "yellow" | "red";

const healthStyles: Record<Health, { ring: string; dot: string; label: string; text: string }> = {
  green: {
    ring: "ring-emerald-300/40 bg-emerald-50",
    dot: "bg-emerald-500",
    label: "Flowing",
    text: "text-emerald-700",
  },
  yellow: {
    ring: "ring-amber-300/50 bg-amber-50",
    dot: "bg-amber-500",
    label: "Watching",
    text: "text-amber-700",
  },
  red: {
    ring: "ring-rose-300/50 bg-rose-50",
    dot: "bg-rose-500",
    label: "Overbooked",
    text: "text-rose-700",
  },
};

function ArtifactShell({
  title,
  subtitle,
  health,
  accent,
  children,
}: {
  title: string;
  subtitle: string;
  health: Health;
  accent?: string;
  children: React.ReactNode;
}) {
  const h = healthStyles[health];
  return (
    <div className="glass relative h-full w-full overflow-hidden rounded-[28px]">
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-white/60 bg-white/40 px-5 py-3.5 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
          <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-500">
            artifact · {accent ?? "live"}
          </span>
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1",
            h.ring,
            h.text,
          )}
        >
          <span className={cn("h-1.5 w-1.5 animate-pulse-soft rounded-full", h.dot)} />
          Task Health: {h.label}
        </div>
      </div>

      {/* header */}
      <div className="px-5 pt-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
          {subtitle}
        </div>
        <div className="mt-0.5 text-[17px] font-bold tracking-tight text-ink-950">{title}</div>
      </div>

      <div className="px-5 pb-5 pt-3">{children}</div>
    </div>
  );
}

/* ------------ 1. Finance: ROOTS ------------ */
export function FinanceArtifact() {
  const roots = [
    { k: "Revenue", v: "$48,210", t: "+12.4%", tone: "text-emerald-600" },
    { k: "Operations", v: "$11,380", t: "−3.1%", tone: "text-emerald-600" },
    { k: "Opportunities", v: "$6,920", t: "+48%", tone: "text-signal-600" },
    { k: "Taxes", v: "$9,642", t: "reserved", tone: "text-ink-500" },
    { k: "Surplus", v: "$20,268", t: "+19%", tone: "text-emerald-600" },
  ];
  return (
    <ArtifactShell
      title="Chief of Staff — April"
      subtitle="ROOTS ledger"
      health="green"
      accent="finance"
    >
      <div className="grid grid-cols-5 gap-2">
        {roots.map((r) => (
          <div
            key={r.k}
            className="rounded-xl border border-white/60 bg-white/70 px-2 py-2.5 text-left"
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
              {r.k}
            </div>
            <div className="mt-1 text-[12px] font-semibold text-ink-950 tabular-nums">{r.v}</div>
            <div className={cn("mt-0.5 text-[10px] font-medium tabular-nums", r.tone)}>{r.t}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-white/60 bg-white/70 p-3">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold text-ink-700">Cash flow · last 12 weeks</div>
          <div className="font-mono text-[10px] text-ink-400">weekly</div>
        </div>
        <svg viewBox="0 0 260 56" className="mt-2 h-14 w-full">
          <defs>
            <linearGradient id="cf" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#3834ff" stopOpacity="0.3" />
              <stop offset="1" stopColor="#3834ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 40 L20 38 L40 32 L60 34 L80 24 L100 28 L120 20 L140 26 L160 18 L180 14 L200 22 L220 10 L240 12 L260 6 L260 56 L0 56 Z"
            fill="url(#cf)"
          />
          <path
            d="M0 40 L20 38 L40 32 L60 34 L80 24 L100 28 L120 20 L140 26 L160 18 L180 14 L200 22 L220 10 L240 12 L260 6"
            stroke="#3834ff"
            strokeWidth="1.8"
            fill="none"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mt-2.5 flex items-center justify-between rounded-xl border border-white/60 bg-signal-500/10 px-3 py-2">
        <div className="text-[11px] font-medium text-ink-700">
          Tax surplus auto-sweep ready · <span className="text-signal-600">$2,410</span>
        </div>
        <button className="rounded-full bg-ink-950 px-2.5 py-1 text-[10px] font-semibold text-white">
          Transfer
        </button>
      </div>
    </ArtifactShell>
  );
}

/* ------------ 2. Agency Dashboard ------------ */
export function AgencyArtifact() {
  return (
    <ArtifactShell
      title="Agency Control Room"
      subtitle="inbox · stripe · socials"
      health="yellow"
      accent="agency"
    >
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-white/60 bg-white/70 p-2.5">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
            inbox
          </div>
          <div className="mt-1 text-[12px] font-semibold text-ink-950">
            12 <span className="text-ink-400">unread</span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-[80%] rounded-full bg-signal-500/50" />
            <div className="h-1.5 w-[60%] rounded-full bg-neon-magenta/50" />
            <div className="h-1.5 w-[45%] rounded-full bg-ink-200" />
          </div>
        </div>
        <div className="rounded-xl border border-white/60 bg-white/70 p-2.5">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
            stripe
          </div>
          <div className="mt-1 text-[12px] font-semibold text-ink-950 tabular-nums">
            $14,820
          </div>
          <div className="mt-0.5 text-[10px] font-medium text-emerald-600 tabular-nums">
            +$820 overnight
          </div>
          <svg viewBox="0 0 80 22" className="mt-1.5 h-5 w-full">
            <path
              d="M0 18 L10 12 L20 14 L30 8 L40 10 L50 4 L60 6 L70 2 L80 3"
              stroke="#10b981"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>
        <div className="rounded-xl border border-white/60 bg-white/70 p-2.5">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
            socials
          </div>
          <div className="mt-1 text-[12px] font-semibold text-ink-950">3 queued</div>
          <div className="mt-1.5 flex -space-x-1.5">
            <div className="h-4 w-4 rounded-sm bg-neon-magenta" />
            <div className="h-4 w-4 rounded-sm bg-signal-500" />
            <div className="h-4 w-4 rounded-sm bg-neon-orange" />
          </div>
        </div>
      </div>

      {/* Connection map */}
      <div className="relative mt-3 h-[100px] overflow-hidden rounded-xl border border-white/60 bg-gradient-to-br from-signal-500/10 via-white/50 to-neon-magenta/10">
        <svg viewBox="0 0 260 100" className="absolute inset-0 h-full w-full">
          <g stroke="#3834ff" strokeOpacity="0.35" strokeWidth="1">
            <path d="M45 50 Q 130 20 220 30" fill="none" strokeDasharray="3 3" />
            <path d="M45 50 Q 130 90 220 75" fill="none" strokeDasharray="3 3" />
            <path d="M220 30 Q 180 50 220 75" fill="none" strokeDasharray="3 3" />
          </g>
          <g>
            <circle cx="45" cy="50" r="14" fill="white" stroke="#3834ff" strokeWidth="1.5" />
            <text
              x="45"
              y="54"
              textAnchor="middle"
              fontSize="9"
              fill="#3834ff"
              fontWeight="700"
            >
              IN
            </text>
            <circle cx="220" cy="30" r="14" fill="white" stroke="#ff3ca5" strokeWidth="1.5" />
            <text
              x="220"
              y="34"
              textAnchor="middle"
              fontSize="8"
              fill="#ff3ca5"
              fontWeight="700"
            >
              $
            </text>
            <circle cx="220" cy="75" r="14" fill="white" stroke="#ff7a29" strokeWidth="1.5" />
            <text
              x="220"
              y="79"
              textAnchor="middle"
              fontSize="8"
              fill="#ff7a29"
              fontWeight="700"
            >
              ▶
            </text>
          </g>
        </svg>
        <div className="absolute bottom-2 left-3 text-[10px] font-medium text-ink-500">
          auto-processed while you sleep · 04:12 am
        </div>
      </div>
    </ArtifactShell>
  );
}

/* ------------ 3. Second Brain ------------ */
export function SecondBrainArtifact() {
  return (
    <ArtifactShell
      title="Regulation Dashboard"
      subtitle="mantra · nervous system"
      health="green"
      accent="second-brain"
    >
      <div className="rounded-xl border border-white/60 bg-gradient-to-br from-twilight-rose/40 via-white/70 to-twilight-sky/40 p-3">
        <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-500">
          mantra for today
        </div>
        <div className="mt-1 font-editorial text-[16px] leading-[1.2] text-ink-950">
          "You&apos;re allowed to move at the speed of your nervous system."
        </div>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/60 bg-white/70 p-2.5">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
            deep work
          </div>
          <div className="mt-1 flex items-end gap-0.5">
            {[20, 38, 12, 44, 28, 55, 30].map((h, i) => (
              <div
                key={i}
                className="w-2 rounded-sm bg-signal-500/70"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          <div className="mt-1 text-[10px] text-ink-500">4h 12m this week</div>
        </div>
        <div className="rounded-xl border border-white/60 bg-white/70 p-2.5">
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">
            macros
          </div>
          <div className="mt-1.5 space-y-1.5">
            <Bar label="protein" pct={82} tone="bg-signal-500" />
            <Bar label="water" pct={64} tone="bg-twilight-aqua" />
            <Bar label="sunlight" pct={48} tone="bg-neon-orange" />
          </div>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-3 py-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neon-magenta/15 text-[10px]">
          ✦
        </span>
        <div className="text-[11px] text-ink-700">
          Overbooked next Tuesday. Suggest moving yoga → 7am.
        </div>
      </div>
    </ArtifactShell>
  );
}

function Bar({ label, pct, tone }: { label: string; pct: number; tone: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[9px] text-ink-500">
        <span>{label}</span>
        <span className="tabular-nums">{pct}%</span>
      </div>
      <div className="h-1 w-full rounded-full bg-ink-100">
        <div className={cn("h-1 rounded-full", tone)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ------------ 4. Content Planner ------------ */
export function ContentArtifact() {
  return (
    <ArtifactShell
      title="90-Day Sprint"
      subtitle="content · goals"
      health="green"
      accent="content"
    >
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1.5">
          <Platform label="TT" tone="bg-ink-950 text-white" />
          <Platform label="IG" tone="bg-neon-magenta text-white" />
          <Platform label="TH" tone="bg-signal-500 text-white" />
        </div>
        <div className="text-[11px] font-semibold text-ink-700">Synergy score · 86</div>
      </div>

      <div className="mt-3 rounded-xl border border-white/60 bg-white/70 p-3">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold text-ink-700">Day 34 / 90</div>
          <div className="font-mono text-[10px] text-ink-400">on pace</div>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-ink-100">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-signal-500 via-neon-magenta to-neon-orange"
            style={{ width: "38%" }}
          />
        </div>
        <div className="mt-3 space-y-1.5">
          <GoalRow label="Publish 3 long-form videos" done={2} total={3} />
          <GoalRow label="Grow Threads to 5k" done={3900} total={5000} format="number" />
          <GoalRow label="Book 4 discovery calls" done={3} total={4} />
        </div>
      </div>

      <div className="mt-2.5 rounded-xl border border-white/60 bg-gradient-to-r from-signal-500/15 to-neon-magenta/15 p-3">
        <div className="text-[11px] font-medium text-ink-800">
          Tomorrow&apos;s actionable step →{" "}
          <span className="font-semibold text-signal-600">record intro for &apos;soft productivity&apos;</span>
        </div>
      </div>
    </ArtifactShell>
  );
}

function Platform({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-white",
        tone,
      )}
    >
      {label}
    </span>
  );
}

function GoalRow({
  label,
  done,
  total,
  format = "plain",
}: {
  label: string;
  done: number;
  total: number;
  format?: "plain" | "number";
}) {
  const pct = Math.min(100, Math.round((done / total) * 100));
  const f = (n: number) => (format === "number" ? n.toLocaleString() : n.toString());
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] text-ink-600">
        <span>{label}</span>
        <span className="tabular-nums text-ink-500">
          {f(done)}/{f(total)}
        </span>
      </div>
      <div className="mt-1 h-1 w-full rounded-full bg-ink-100">
        <div className="h-1 rounded-full bg-signal-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
