import { cn } from "@/lib/utils";

type TileProps = { className?: string };

function Frame({
  title,
  kicker,
  tone = "light",
  children,
  className,
  accent,
}: {
  title?: string;
  kicker?: string;
  tone?: "light" | "dark" | "twilight" | "peach" | "mint" | "rose";
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  const tones: Record<string, string> = {
    light: "bg-gradient-to-br from-white/95 via-white/85 to-ink-50/70 text-ink-950",
    dark: "bg-gradient-to-br from-ink-950 via-ink-900 to-twilight-mid text-white",
    twilight:
      "bg-gradient-to-br from-twilight-rose/80 via-white/80 to-twilight-sky/80 text-ink-900",
    peach:
      "bg-gradient-to-br from-twilight-peach/90 via-white/80 to-twilight-rose/70 text-ink-900",
    mint: "bg-gradient-to-br from-twilight-aqua/70 via-white/85 to-twilight-sky/70 text-ink-900",
    rose: "bg-gradient-to-br from-white/90 via-twilight-rose/40 to-neon-magenta/20 text-ink-900",
  };
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden rounded-[14px] shadow-[0_10px_24px_-12px_rgba(14,21,64,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]",
        tones[tone],
        className,
      )}
    >
      {(title || kicker) && (
        <div className="flex items-center justify-between gap-1 border-b border-black/5 px-2.5 pt-2 pb-1.5">
          <div className="min-w-0 flex-1">
            {kicker && (
              <div className="truncate font-mono text-[7px] uppercase tracking-[0.22em] opacity-60">
                {kicker}
              </div>
            )}
            {title && (
              <div className="truncate text-[10px] font-bold leading-tight tracking-tight">
                {title}
              </div>
            )}
          </div>
          {accent && (
            <span className="shrink-0 rounded-full bg-black/5 px-1.5 py-0.5 font-mono text-[6.5px] uppercase tracking-[0.18em] opacity-70">
              {accent}
            </span>
          )}
          <span className="flex shrink-0 gap-0.5">
            <span className="h-1 w-1 rounded-full bg-current opacity-20" />
            <span className="h-1 w-1 rounded-full bg-current opacity-20" />
            <span className="h-1 w-1 rounded-full bg-current opacity-40" />
          </span>
        </div>
      )}
      <div className="min-h-0 flex-1 p-2.5">{children}</div>
    </div>
  );
}

/* ---------- reusable micro-widgets ---------- */
function Sparkline({
  points,
  stroke = "#3834ff",
  fill = "#3834ff",
  fillOpacity = 0.18,
}: {
  points: number[];
  stroke?: string;
  fill?: string;
  fillOpacity?: number;
}) {
  const w = 100;
  const h = 30;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = Math.max(1, max - min);
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - ((p - min) / span) * (h - 4) - 2] as const);
  const d = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c[0]} ${c[1]}`).join(" ");
  const area = `${d} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full">
      <path d={area} fill={fill} fillOpacity={fillOpacity} />
      <path d={d} stroke={stroke} strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

function Bars({ values, tone = "#3834ff" }: { values: number[]; tone?: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex h-full items-end gap-[2px]">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-[2px]"
          style={{ height: `${(v / max) * 100}%`, backgroundColor: tone, opacity: 0.55 + (v / max) * 0.45 }}
        />
      ))}
    </div>
  );
}

function Pill({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "signal" | "magenta" | "orange" | "emerald" | "amber" }) {
  const tones: Record<string, string> = {
    ink: "bg-ink-950/90 text-white",
    signal: "bg-signal-500/85 text-white",
    magenta: "bg-neon-magenta/90 text-white",
    orange: "bg-neon-orange/90 text-white",
    emerald: "bg-emerald-500/90 text-white",
    amber: "bg-amber-400/90 text-ink-900",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-1.5 py-[1px] font-mono text-[7.5px] font-semibold uppercase tracking-[0.12em]",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

function Dot({ tone = "emerald" }: { tone?: "emerald" | "amber" | "rose" | "signal" | "magenta" }) {
  const tones: Record<string, string> = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-400",
    rose: "bg-rose-500",
    signal: "bg-signal-500",
    magenta: "bg-neon-magenta",
  };
  return <span className={cn("inline-block h-1.5 w-1.5 rounded-full", tones[tone])} />;
}

/* ======================= TILES ======================= */

/* 1 · ROOTS Agency Ledger */
export function TileRoots({ className }: TileProps) {
  return (
    <Frame kicker="Roots ledger" title="Chief of Staff · April" accent="ops" className={className}>
      <div className="grid grid-cols-5 gap-1">
        {[
          { k: "Rev", v: "48k", t: "+12" },
          { k: "Ops", v: "11k", t: "−3" },
          { k: "Opp", v: "6.9k", t: "+48" },
          { k: "Tax", v: "9.6k", t: "res" },
          { k: "Surp", v: "20k", t: "+19" },
        ].map((m) => (
          <div key={m.k} className="rounded-md bg-white/70 px-1 py-1">
            <div className="font-mono text-[6.5px] uppercase tracking-widest opacity-50">{m.k}</div>
            <div className="text-[9px] font-bold tabular-nums">${m.v}</div>
            <div className="text-[7px] font-medium tabular-nums text-emerald-600">{m.t}</div>
          </div>
        ))}
      </div>
      <div className="mt-1.5 h-[36%] rounded-md bg-white/60 p-1">
        <Sparkline points={[40, 38, 32, 34, 24, 28, 20, 26, 18, 14, 22, 10, 12, 6]} />
      </div>
    </Frame>
  );
}

/* 2 · Cleaning Business Planner */
export function TileCleaning({ className }: TileProps) {
  return (
    <Frame kicker="Svc biz · content" title="Cleaning Co · week 17" tone="mint" className={className}>
      <div className="grid h-full grid-cols-5 grid-rows-4 gap-[3px]">
        {Array.from({ length: 20 }).map((_, i) => {
          const kinds = ["bg-signal-500/70", "bg-neon-magenta/60", "bg-twilight-aqua/80", "bg-white/80", "bg-ink-950/10"];
          return (
            <div
              key={i}
              className={cn("rounded-[3px]", kinds[(i * 3) % kinds.length])}
            />
          );
        })}
      </div>
    </Frame>
  );
}

/* 3 · Insurance Command */
export function TileInsurance({ className }: TileProps) {
  return (
    <Frame kicker="Policy pipeline" title="Allegheny Ins. · 43 open" className={className}>
      <div className="space-y-1">
        {[
          { s: "Renewal", p: 84, t: "signal" as const },
          { s: "Quote sent", p: 62, t: "magenta" as const },
          { s: "Bind", p: 41, t: "orange" as const },
          { s: "Cold lead", p: 22, t: "ink" as const },
        ].map((r) => (
          <div key={r.s} className="flex items-center gap-1.5">
            <div className="w-14 truncate text-[8px] font-medium">{r.s}</div>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
              <div
                className={cn(
                  "h-full rounded-full",
                  r.t === "signal" && "bg-signal-500",
                  r.t === "magenta" && "bg-neon-magenta",
                  r.t === "orange" && "bg-neon-orange",
                  r.t === "ink" && "bg-ink-400",
                )}
                style={{ width: `${r.p}%` }}
              />
            </div>
            <span className="w-5 text-right font-mono text-[7px] tabular-nums opacity-60">{r.p}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 4 · Auto Order Processor */
export function TileOrders({ className }: TileProps) {
  return (
    <Frame kicker="Sheets → Live" title="Orders · auto-routed" tone="dark" accent="sync" className={className}>
      <div className="flex items-center gap-1.5">
        <div className="flex-1 space-y-[2px]">
          {["ORD-1042", "ORD-1041", "ORD-1039", "ORD-1037"].map((o, i) => (
            <div key={o} className="flex items-center justify-between rounded-sm bg-white/10 px-1 py-[2px] font-mono text-[7.5px]">
              <span>{o}</span>
              <span className={cn("font-semibold", i === 0 ? "text-emerald-300" : i === 1 ? "text-amber-300" : "text-ink-300")}>
                {i === 0 ? "packed" : i === 1 ? "printing" : "done"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* 5 · Ebook Sales Page */
export function TileEbook({ className }: TileProps) {
  return (
    <Frame kicker="Direct launch" title="Ebook · Slow CRM" tone="peach" className={className}>
      <div className="relative h-full">
        <div className="absolute inset-x-3 bottom-0 top-0 grid place-items-center">
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-full bg-neon-magenta/30 blur-xl" />
            <div className="flex h-[60px] w-[42px] items-center justify-center rounded-sm border border-ink-900/10 bg-gradient-to-br from-ink-950 to-twilight-mid text-white shadow-lg rotate-[-6deg]">
              <div className="text-center">
                <div className="font-editorial text-[8px] italic">The</div>
                <div className="text-[7px] font-black tracking-tight">SLOW</div>
                <div className="text-[7px] font-black tracking-tight">CRM</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-1 left-0 right-0 flex items-center justify-between px-0.5 text-[7.5px]">
          <span className="font-semibold">$24 · 312 sold</span>
          <Pill tone="magenta">buy</Pill>
        </div>
      </div>
    </Frame>
  );
}

/* 6 · Non-Profit Impact */
export function TileNonprofit({ className }: TileProps) {
  return (
    <Frame kicker="Mission report" title="Nets for Kids · Q1" tone="twilight" className={className}>
      <div className="flex h-full items-end gap-1">
        <div className="flex-1">
          <div className="text-[8px] font-medium opacity-60">Donations</div>
          <div className="text-[13px] font-black tabular-nums">$42,810</div>
          <div className="h-1.5 w-full rounded-full bg-white/50">
            <div className="h-1.5 rounded-full bg-signal-600" style={{ width: "74%" }} />
          </div>
          <div className="mt-0.5 text-[7px] font-mono opacity-60">74% of Q1 goal</div>
        </div>
        <div className="w-12 text-center">
          <div className="text-[16px] font-black text-neon-magenta">214</div>
          <div className="text-[7px] font-mono uppercase tracking-wider opacity-60">kids reached</div>
        </div>
      </div>
    </Frame>
  );
}

/* 7 · Law Firm Intake CRM */
export function TileIntake({ className }: TileProps) {
  return (
    <Frame kicker="Intake pipeline" title="Blair & Associates" className={className}>
      <div className="flex gap-1">
        {[
          { s: "New", n: 7, tone: "bg-signal-500/20 text-signal-600" },
          { s: "Screening", n: 4, tone: "bg-neon-magenta/15 text-neon-magenta" },
          { s: "Retained", n: 3, tone: "bg-emerald-500/15 text-emerald-700" },
        ].map((c) => (
          <div key={c.s} className={cn("flex-1 rounded-md px-1.5 py-1", c.tone)}>
            <div className="font-mono text-[6.5px] uppercase tracking-wider opacity-70">{c.s}</div>
            <div className="text-[12px] font-black tabular-nums">{c.n}</div>
          </div>
        ))}
      </div>
      <div className="mt-1.5 space-y-[3px]">
        {["M. Okafor · car", "D. Perez · estate", "K. Alvarez · slip"].map((t, i) => (
          <div key={t} className="flex items-center gap-1 rounded-sm bg-white/70 px-1.5 py-[3px] text-[7.5px]">
            <Dot tone={i === 0 ? "signal" : i === 1 ? "magenta" : "emerald"} />
            <span className="flex-1 truncate font-medium">{t}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 8 · Meeting Poll */
export function TileMeetingPoll({ className }: TileProps) {
  return (
    <Frame kicker="When2Meet" title="Q2 roadmap sync" tone="light" className={className}>
      <div className="grid grid-cols-6 grid-rows-4 gap-[2px]">
        {Array.from({ length: 24 }).map((_, i) => {
          const vote = [4, 5, 6, 10, 11, 12, 17, 18, 19, 23].includes(i);
          const strong = [10, 11, 17, 18].includes(i);
          return (
            <div
              key={i}
              className={cn(
                "rounded-[2px]",
                strong
                  ? "bg-signal-500/90"
                  : vote
                    ? "bg-signal-500/35"
                    : "bg-ink-100",
              )}
            />
          );
        })}
      </div>
    </Frame>
  );
}

/* 9 · Inventory Tracker */
export function TileInventory({ className }: TileProps) {
  return (
    <Frame kicker="SKU health" title="Studio · 142 SKUs" className={className}>
      <div className="space-y-[3px]">
        {[
          { n: "linen napkin · sand", s: 142, low: false },
          { n: "ceramic mug · plum", s: 12, low: true },
          { n: "candle · bergamot", s: 43, low: false },
          { n: "tea towel · citrine", s: 3, low: true },
        ].map((i) => (
          <div key={i.n} className="flex items-center gap-1 text-[8px]">
            <Dot tone={i.low ? "rose" : "emerald"} />
            <span className="flex-1 truncate">{i.n}</span>
            <span className={cn("font-mono font-bold tabular-nums", i.low ? "text-rose-600" : "text-ink-700")}>
              {i.s}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 10 · Quote Builder */
export function TileQuote({ className }: TileProps) {
  return (
    <Frame kicker="Quote PDF · v4" title="Greenway Roofing" tone="peach" className={className}>
      <div className="flex h-full gap-1.5">
        <div className="flex w-[46%] flex-col rounded-md bg-white/90 p-1.5 shadow-inner">
          <div className="font-editorial text-[9px] italic">Estimate</div>
          <div className="mt-0.5 h-0.5 w-full bg-ink-950/80" />
          <div className="mt-1 space-y-[1.5px]">
            {[1, 2, 3, 4, 5].map((l) => (
              <div key={l} className="h-[1.5px] w-full rounded-full bg-ink-200" />
            ))}
          </div>
          <div className="mt-auto flex items-end justify-between">
            <div className="text-[6px] opacity-40">#GW-0042</div>
            <div className="text-[9px] font-black">$14,220</div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="font-mono text-[6.5px] uppercase tracking-wider opacity-60">sent</div>
            <div className="text-[9px] font-bold">to M. Greenway</div>
          </div>
          <Pill tone="orange">awaiting sign</Pill>
        </div>
      </div>
    </Frame>
  );
}

/* 11 · Summer Camp Schedule (3 kids) */
export function TileCampSchedule({ className }: TileProps) {
  return (
    <Frame kicker="3 kids · 11 weeks" title="Summer command center" tone="rose" className={className}>
      <div className="space-y-[3px]">
        {[
          { k: "Mia", w: [1, 1, 2, 2, 3, 3, 3, 1, 1, 2, 4] },
          { k: "Theo", w: [3, 3, 1, 1, 2, 4, 4, 2, 2, 1, 1] },
          { k: "Zoe", w: [2, 1, 3, 3, 1, 1, 2, 4, 4, 3, 2] },
        ].map((row) => (
          <div key={row.k} className="flex items-center gap-[3px]">
            <span className="w-6 text-[7.5px] font-bold">{row.k}</span>
            <div className="flex flex-1 gap-[2px]">
              {row.w.map((v, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 flex-1 rounded-[2px]",
                    v === 1 && "bg-signal-500/80",
                    v === 2 && "bg-neon-magenta/75",
                    v === 3 && "bg-twilight-aqua",
                    v === 4 && "bg-neon-orange/75",
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="font-mono text-[7px] opacity-60">pickups resolved</span>
        <Pill tone="emerald">✓ 18/18</Pill>
      </div>
    </Frame>
  );
}

/* 12 · 90-Day Goal Sprint */
export function TileSprint({ className }: TileProps) {
  return (
    <Frame kicker="Sprint90" title="Day 34 / 90" tone="dark" className={className}>
      <div className="flex items-center gap-2">
        <div className="relative h-12 w-12 shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle cx="18" cy="18" r="15" stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none" />
            <circle
              cx="18"
              cy="18"
              r="15"
              stroke="#ff3ca5"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 15 * 0.38} ${2 * Math.PI * 15}`}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-[10px] font-black">38%</div>
        </div>
        <div className="flex-1 space-y-[3px]">
          {["Publish 3 vids · 2", "Threads → 5k · 3.9k", "4 discovery calls · 3"].map((g) => (
            <div key={g} className="truncate font-mono text-[7px] opacity-70">{g}</div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* 13 · College Search Dashboard */
export function TileCollege({ className }: TileProps) {
  return (
    <Frame kicker="Sr. athlete · d2" title="College shortlist" className={className}>
      <div className="flex flex-wrap gap-1">
        {["Duke", "UNC", "Wake", "Elon", "BC", "Clemson"].map((s, i) => (
          <div
            key={s}
            className={cn(
              "flex items-center gap-1 rounded-full border px-1.5 py-[2px] text-[7.5px] font-semibold",
              i === 0
                ? "border-neon-magenta bg-neon-magenta/10 text-neon-magenta"
                : i < 3
                  ? "border-signal-500/40 bg-signal-500/5 text-signal-600"
                  : "border-ink-200 text-ink-600",
            )}
          >
            <Dot tone={i === 0 ? "magenta" : i < 3 ? "signal" : "emerald"} />
            {s}
          </div>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-3 gap-1">
        {[
          { k: "GPA", v: "3.84" },
          { k: "1600m", v: "4:32" },
          { k: "SAT", v: "1440" },
        ].map((s) => (
          <div key={s.k} className="rounded-md bg-ink-50 px-1.5 py-1">
            <div className="font-mono text-[6.5px] uppercase tracking-wider opacity-60">{s.k}</div>
            <div className="text-[10px] font-black tabular-nums">{s.v}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 14 · Job Search Motivation */
export function TileJobSearch({ className }: TileProps) {
  return (
    <Frame kicker="Dream roles" title="Job hunt · vol. 3" tone="twilight" className={className}>
      <div className="space-y-[3px]">
        {[
          { c: "Linear", s: "onsite", tone: "emerald" as const },
          { c: "Vercel", s: "ph 2", tone: "signal" as const },
          { c: "Figma", s: "applied", tone: "amber" as const },
          { c: "Stripe", s: "recruiter", tone: "magenta" as const },
        ].map((j) => (
          <div key={j.c} className="flex items-center gap-1.5 rounded-md bg-white/75 px-1.5 py-[3px]">
            <div className="h-3 w-3 rounded bg-ink-900/90" />
            <span className="flex-1 text-[8px] font-semibold">{j.c}</span>
            <Pill tone={j.tone}>{j.s}</Pill>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 15 · GTD Side Quests */
export function TileSideQuests({ className }: TileProps) {
  return (
    <Frame kicker="Side quest log" title="Today · 6 xp" tone="dark" className={className}>
      <div className="space-y-[3px]">
        {[
          { t: "reply to mom", x: 1, d: true },
          { t: "schedule dentist", x: 2, d: false },
          { t: "photograph 3 pairs", x: 3, d: false },
          { t: "compost", x: 1, d: true },
        ].map((q) => (
          <div
            key={q.t}
            className={cn(
              "flex items-center gap-1 rounded-md border border-white/10 px-1.5 py-[2px] text-[7.5px]",
              q.d && "opacity-50 line-through",
            )}
          >
            <span className="h-3 w-3 rounded border border-white/20">
              {q.d && <span className="block h-full w-full rounded-[2px] bg-emerald-400/90" />}
            </span>
            <span className="flex-1">{q.t}</span>
            <Pill tone="orange">+{q.x}</Pill>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 16 · Etsy SEO */
export function TileEtsy({ className }: TileProps) {
  return (
    <Frame kicker="Etsy keyword rank" title="Linen · shop 02" tone="peach" className={className}>
      <div className="space-y-1">
        {[
          { t: "slub linen sheet", p: 2, d: "+4" },
          { t: "earth-tone bedding", p: 7, d: "+1" },
          { t: "heavy linen drape", p: 14, d: "−2" },
        ].map((r) => (
          <div key={r.t} className="flex items-center gap-1 text-[7.5px]">
            <span className="w-3 font-mono font-bold tabular-nums opacity-60">#{r.p}</span>
            <span className="flex-1 truncate font-medium">{r.t}</span>
            <span className={cn("font-mono tabular-nums", r.d.startsWith("+") ? "text-emerald-700" : "text-rose-700")}>
              {r.d}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1 h-[30%] rounded-md bg-white/60 p-0.5">
        <Sparkline points={[3, 5, 4, 8, 6, 10, 12, 11, 14, 13, 16, 18]} stroke="#ff7a29" fill="#ff7a29" />
      </div>
    </Frame>
  );
}

/* 17 · Bible Study Cross-Reference */
export function TileBible({ className }: TileProps) {
  return (
    <Frame kicker="Cross-ref map" title="Romans 8 · study" tone="twilight" className={className}>
      <div className="relative h-full">
        <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full">
          <g stroke="#5d2fa0" strokeOpacity="0.35" strokeWidth="0.6" fill="none">
            <path d="M20 30 Q 50 10 80 25" />
            <path d="M20 30 Q 40 40 70 45" />
            <path d="M80 25 Q 60 35 70 45" />
            <path d="M50 15 Q 30 30 25 50" />
          </g>
          <g>
            {[
              [20, 30],
              [80, 25],
              [70, 45],
              [50, 15],
              [25, 50],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3.5" fill={i === 0 ? "#ff3ca5" : "#3834ff"} />
            ))}
          </g>
        </svg>
        <div className="absolute left-1 top-1 font-editorial text-[8px] italic opacity-70">
          "hope that is seen…"
        </div>
      </div>
    </Frame>
  );
}

/* 18 · Personal CRM */
export function TilePersonalCRM({ className }: TileProps) {
  return (
    <Frame kicker="People · follow-up" title="Connections · 112" className={className}>
      <div className="space-y-[3px]">
        {[
          { n: "Marta K.", d: "3d · coffee" },
          { n: "Eli P.", d: "1w · intro" },
          { n: "Sam O.", d: "today · vox" },
          { n: "Ada R.", d: "2w · book" },
        ].map((p, i) => (
          <div key={p.n} className="flex items-center gap-1.5">
            <div
              className={cn(
                "h-4 w-4 rounded-full",
                i % 4 === 0 && "bg-neon-magenta/70",
                i % 4 === 1 && "bg-twilight-aqua",
                i % 4 === 2 && "bg-signal-500/70",
                i % 4 === 3 && "bg-neon-orange/70",
              )}
            />
            <span className="flex-1 text-[8px] font-semibold">{p.n}</span>
            <span className="font-mono text-[6.5px] opacity-60">{p.d}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 19 · Nervous System Regulation */
export function TileNervousSystem({ className }: TileProps) {
  return (
    <Frame kicker="Mantra · today" title="Regulation" tone="rose" className={className}>
      <div className="h-full rounded-md bg-gradient-to-br from-twilight-rose/30 via-white/60 to-twilight-sky/40 p-1.5">
        <div className="font-mono text-[6.5px] uppercase tracking-wider opacity-60">felt sense</div>
        <div className="mt-0.5 font-editorial text-[10px] italic leading-tight text-ink-900">
          "move at the speed of your nervous system"
        </div>
        <div className="mt-1.5 flex items-center gap-1">
          <span className="h-1 flex-1 rounded-full bg-twilight-aqua/90" />
          <span className="h-1 flex-[1.2] rounded-full bg-twilight-rose/90" />
          <span className="h-1 flex-[0.6] rounded-full bg-twilight-peach/90" />
        </div>
      </div>
    </Frame>
  );
}

/* 20 · Sleep Mat Data */
export function TileSleep({ className }: TileProps) {
  return (
    <Frame kicker="Withings mat · 7-day" title="Sleep architecture" tone="dark" className={className}>
      <div className="flex h-full flex-col gap-1">
        <div className="grid flex-1 grid-cols-7 items-end gap-[2px]">
          {[4, 6, 3, 7, 5, 8, 6].map((v, i) => (
            <div key={i} className="flex h-full flex-col justify-end gap-[1px]">
              <div className="rounded-sm bg-twilight-aqua" style={{ height: `${v * 6}%` }} />
              <div className="rounded-sm bg-neon-magenta/70" style={{ height: `${v * 4}%` }} />
              <div className="rounded-sm bg-signal-500/70" style={{ height: `${v * 10}%` }} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-[7px] opacity-70">
          <span>deep 1h42</span>
          <span>rem 1h18</span>
          <span>hr 52</span>
        </div>
      </div>
    </Frame>
  );
}

/* 21 · Meal Prep / Macros */
export function TileMeals({ className }: TileProps) {
  return (
    <Frame kicker="Weekly macros" title="Meal prep · Sun" tone="mint" className={className}>
      <div className="grid grid-cols-2 gap-1">
        {[
          { k: "protein", v: 82, t: "bg-signal-500" },
          { k: "carbs", v: 54, t: "bg-neon-orange" },
          { k: "fat", v: 68, t: "bg-neon-magenta" },
          { k: "fiber", v: 37, t: "bg-twilight-aqua" },
        ].map((m) => (
          <div key={m.k} className="rounded-md bg-white/80 px-1.5 py-1">
            <div className="font-mono text-[6.5px] uppercase tracking-wider opacity-60">{m.k}</div>
            <div className="mt-0.5 h-1 rounded-full bg-ink-100">
              <div className={cn("h-1 rounded-full", m.t)} style={{ width: `${m.v}%` }} />
            </div>
            <div className="mt-0.5 text-right font-mono text-[7px] tabular-nums opacity-60">{m.v}%</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 22 · Workout + Period */
export function TileCycle({ className }: TileProps) {
  return (
    <Frame kicker="28-day cycle · d12" title="Cycle-synced training" tone="rose" className={className}>
      <div className="relative h-full">
        <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full">
          <circle cx="50" cy="35" r="22" stroke="#ff3ca5" strokeOpacity="0.4" strokeWidth="1" fill="none" />
          <path d="M50 13 A 22 22 0 0 1 71 41" stroke="#ff3ca5" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="68.5" cy="45" r="3" fill="#ff3ca5" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-1 text-[7px]">
          <span className="font-semibold">ovulatory</span>
          <Pill tone="magenta">heavy lift</Pill>
        </div>
      </div>
    </Frame>
  );
}

/* 23 · Anxiety Overthinking */
export function TileAnxiety({ className }: TileProps) {
  return (
    <Frame kicker="Thought log" title="Reframe toolkit" tone="twilight" className={className}>
      <div className="space-y-1">
        {[
          { p: "catastrophizing", c: "evidence?" },
          { p: "shoulds", c: "preference?" },
          { p: "mind-reading", c: "ask." },
        ].map((t) => (
          <div key={t.p} className="flex items-center gap-1 rounded-md bg-white/80 px-1.5 py-1">
            <div className="text-[7.5px] font-semibold opacity-70">{t.p}</div>
            <span className="font-mono text-[7px] opacity-40">→</span>
            <div className="flex-1 font-editorial text-[8.5px] italic text-neon-magenta">{t.c}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 24 · Clutch Routine */
export function TileClutch({ className }: TileProps) {
  return (
    <Frame kicker="Morning · 5:40" title="Clutch routine" tone="dark" className={className}>
      <div className="flex flex-col gap-[3px]">
        {[
          { t: "sunlight 12m", d: 100 },
          { t: "cold 3m", d: 100 },
          { t: "deep work 90m", d: 66 },
          { t: "walk 20m", d: 0 },
        ].map((r, i) => (
          <div key={r.t} className="flex items-center gap-1">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full border",
                r.d === 100 && "border-emerald-400 bg-emerald-400",
                r.d > 0 && r.d < 100 && "border-amber-300 bg-amber-300/40",
                r.d === 0 && "border-white/30",
              )}
            />
            <span className="flex-1 text-[8px] font-medium">{r.t}</span>
            {r.d > 0 && r.d < 100 && (
              <span className="font-mono text-[7px] text-amber-300">live</span>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 25 · Property Cash Flow */
export function TileProperty({ className }: TileProps) {
  return (
    <Frame kicker="Daily scrape · alerts" title="Cash-flow scout · 47" className={className}>
      <div className="space-y-[3px]">
        {[
          { a: "112 Maple St", n: "$312/mo", cap: "7.8%", tone: "emerald" as const },
          { a: "89 Pine Rd", n: "$180/mo", cap: "6.1%", tone: "signal" as const },
          { a: "4 Acorn Ln", n: "−$40/mo", cap: "3.2%", tone: "amber" as const },
        ].map((p) => (
          <div key={p.a} className="flex items-center gap-1.5 rounded-md bg-white/75 px-1.5 py-1">
            <div className="h-3 w-3 rounded-sm bg-gradient-to-br from-twilight-sky to-signal-500" />
            <span className="flex-1 truncate text-[8px] font-semibold">{p.a}</span>
            <span className="font-mono text-[7.5px] tabular-nums">{p.n}</span>
            <Pill tone={p.tone}>{p.cap}</Pill>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 26 · Options Psychology Log */
export function TileOptions({ className }: TileProps) {
  return (
    <Frame kicker="Pre-market · 08:12" title="Discipline log" tone="dark" accent="SPY" className={className}>
      <div className="grid grid-cols-2 gap-1">
        {[
          { k: "sleep", v: "7h 12m" },
          { k: "hr var", v: "48" },
          { k: "mood", v: "5/7" },
          { k: "plan", v: "iron condor" },
        ].map((m) => (
          <div key={m.k} className="rounded-md border border-white/10 px-1.5 py-1">
            <div className="font-mono text-[6.5px] uppercase tracking-wider opacity-50">{m.k}</div>
            <div className="text-[9px] font-bold">{m.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="font-mono text-[7px] opacity-60">max loss</span>
        <span className="font-mono text-[9px] font-black text-neon-orange">$420</span>
      </div>
    </Frame>
  );
}

/* 27 · Synergy Map */
export function TileSynergy({ className }: TileProps) {
  return (
    <Frame kicker="Content synergy" title="Monetization atlas" tone="peach" className={className}>
      <div className="relative h-full">
        <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full">
          <g stroke="#ff3ca5" strokeOpacity="0.4" strokeWidth="0.7" fill="none">
            <path d="M50 30 L20 15" />
            <path d="M50 30 L80 20" />
            <path d="M50 30 L25 45" />
            <path d="M50 30 L78 48" />
            <path d="M20 15 L25 45" />
            <path d="M80 20 L78 48" />
          </g>
          <g>
            <circle cx="50" cy="30" r="6" fill="#ff7a29" />
            {[
              [20, 15],
              [80, 20],
              [25, 45],
              [78, 48],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3.8" fill="#3834ff" />
            ))}
          </g>
          <text x="50" y="32.5" textAnchor="middle" fontSize="4" fill="white" fontWeight="700">$</text>
        </svg>
      </div>
    </Frame>
  );
}

/* 28 · MS Money Replacement */
export function TileMoney({ className }: TileProps) {
  return (
    <Frame kicker="Household · MTD" title="Ledger" className={className}>
      <div className="flex h-[42%] items-end gap-[2px]">
        <Bars values={[12, 18, 9, 22, 16, 14, 20, 8, 14, 24, 18, 22]} tone="#3834ff" />
      </div>
      <div className="mt-1.5 grid grid-cols-2 gap-1">
        <div className="rounded-md bg-ink-50 px-1.5 py-1">
          <div className="font-mono text-[6.5px] uppercase tracking-wider opacity-60">in</div>
          <div className="text-[10px] font-black tabular-nums">$8,420</div>
        </div>
        <div className="rounded-md bg-ink-50 px-1.5 py-1">
          <div className="font-mono text-[6.5px] uppercase tracking-wider opacity-60">out</div>
          <div className="text-[10px] font-black tabular-nums">$5,118</div>
        </div>
      </div>
    </Frame>
  );
}

/* 29 · Digital Clone / Echovault */
export function TileClone({ className }: TileProps) {
  return (
    <Frame kicker="Second brain · v.07" title="My digital clone" tone="twilight" className={className}>
      <div className="relative h-full">
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-signal-500 via-neon-magenta to-neon-orange opacity-90 blur-[0.5px]" />
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-10 w-10 rounded-full border-2 border-white/70 bg-white/20 backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between text-[7px]">
          <span className="font-mono opacity-70">memories · 4,281</span>
          <Pill tone="magenta">query</Pill>
        </div>
      </div>
    </Frame>
  );
}

/* 30 · One Million Tiles */
export function TileMillion({ className }: TileProps) {
  return (
    <Frame kicker="Crowdfund · STEM" title="One Million Tiles" tone="mint" className={className}>
      <div className="grid h-full grid-cols-12 grid-rows-6 gap-[1px]">
        {Array.from({ length: 72 }).map((_, i) => {
          const v = (i * 7919) % 100;
          return (
            <div
              key={i}
              className="rounded-[1px]"
              style={{
                backgroundColor:
                  v < 18
                    ? "rgba(56,52,255,0.8)"
                    : v < 36
                      ? "rgba(255,60,165,0.7)"
                      : v < 52
                        ? "rgba(255,122,41,0.65)"
                        : v < 70
                          ? "rgba(30,196,178,0.6)"
                          : "rgba(14,21,64,0.08)",
              }}
            />
          );
        })}
      </div>
    </Frame>
  );
}

/* 31 · Twilight mushroom art */
export function TileMushroom({ className }: TileProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[14px] shadow-[0_10px_24px_-12px_rgba(14,21,64,0.45)]",
        "bg-gradient-to-b from-[#1a0e4d] via-[#3a1a7a] to-[#8b4aa8]",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: "radial-gradient(1px 1px at 22% 18%, #fff, transparent), radial-gradient(1px 1px at 78% 32%, #fff, transparent), radial-gradient(1px 1px at 44% 70%, #fff, transparent), radial-gradient(1.5px 1.5px at 62% 12%, #fff, transparent)",
      }} />
      <svg viewBox="0 0 100 70" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="mushGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0" stopColor="#ffd3b3" stopOpacity="0.6" />
            <stop offset="1" stopColor="#ffd3b3" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="42" r="38" fill="url(#mushGlow)" />
        <path
          d="M30 48 Q30 28 50 28 Q70 28 70 48 Z"
          fill="#f4a1c1"
          opacity="0.9"
        />
        <circle cx="44" cy="40" r="2" fill="white" opacity="0.85" />
        <circle cx="56" cy="38" r="1.5" fill="white" opacity="0.7" />
        <circle cx="52" cy="44" r="1.8" fill="white" opacity="0.8" />
        <rect x="46" y="48" width="8" height="14" rx="2" fill="#ffd3b3" opacity="0.95" />
      </svg>
      <div className="absolute bottom-1 left-2 font-editorial text-[8px] italic text-white/70">
        Twilight Grove
      </div>
    </div>
  );
}

/* 32 · Glass floating orb */
export function TileGlassOrb({ className }: TileProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[14px] shadow-[0_10px_24px_-12px_rgba(14,21,64,0.4)]",
        "bg-gradient-to-br from-twilight-sky via-white to-twilight-rose",
        className,
      )}
    >
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-14 w-14 rounded-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/70 via-twilight-sky/50 to-signal-500/40 backdrop-blur-sm" />
          <div className="absolute left-2 top-1.5 h-4 w-4 rounded-full bg-white/80 blur-[1px]" />
          <div className="absolute right-3 bottom-3 h-1.5 w-1.5 rounded-full bg-white/90" />
        </div>
      </div>
      <div className="absolute bottom-1 left-2 font-editorial text-[8px] italic text-ink-800/80">
        soft object study
      </div>
    </div>
  );
}

/* 33 · Dreamy landscape */
export function TileDreamland({ className }: TileProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[14px] shadow-[0_10px_24px_-12px_rgba(14,21,64,0.4)]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffd3b3] via-[#f4a1c1] to-[#8b4aa8]" />
      <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full">
        <circle cx="72" cy="18" r="8" fill="#fff8ef" />
        <path d="M0 48 Q 25 30 50 42 T 100 36 L 100 60 L 0 60 Z" fill="#1a0e4d" opacity="0.85" />
        <path d="M0 52 Q 30 42 60 50 T 100 48 L 100 60 L 0 60 Z" fill="#0a0f2e" opacity="0.9" />
      </svg>
    </div>
  );
}

/* 34 · Energy wave (small) */
export function TileEnergyWave({ className }: TileProps) {
  return (
    <Frame kicker="Daily energy" title="Wave" tone="peach" className={className}>
      <div className="flex h-full flex-col justify-end">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="ew" x1="0" x2="1">
              <stop offset="0" stopColor="#3834ff" />
              <stop offset="0.5" stopColor="#ff3ca5" />
              <stop offset="1" stopColor="#ff7a29" />
            </linearGradient>
          </defs>
          <path
            d="M0 28 Q 12 10 24 24 T 48 24 T 72 14 T 100 22"
            stroke="url(#ew)"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </Frame>
  );
}

/* 35 · Radar / weekly review */
export function TileRadar({ className }: TileProps) {
  return (
    <Frame kicker="Weekly review" title="Life radar · wk 17" className={className}>
      <div className="relative h-full">
        <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full">
          <g fill="none" stroke="#3834ff" strokeOpacity="0.2">
            <polygon points="50,10 80,28 72,54 28,54 20,28" />
            <polygon points="50,18 72,30 66,48 34,48 28,30" />
            <polygon points="50,26 64,32 60,42 40,42 36,32" />
          </g>
          <polygon
            points="50,14 74,28 66,50 30,52 24,30"
            fill="#ff3ca5"
            fillOpacity="0.35"
            stroke="#ff3ca5"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    </Frame>
  );
}

/* 36 · Big bold metric */
export function TileMetric({ className }: TileProps) {
  return (
    <Frame kicker="MRR · April" title="Claudia SaaS" tone="dark" accent="live" className={className}>
      <div className="flex h-full flex-col justify-center">
        <div className="gradient-text text-[22px] font-black leading-none">$28,410</div>
        <div className="mt-0.5 font-mono text-[7.5px] opacity-70">+$4.2k · 24 new subs</div>
      </div>
    </Frame>
  );
}
