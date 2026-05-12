export function LogoMarquee() {
  const rows = [
    "Amazon",
    "Adobe",
    "Vercel",
    "Stripe",
    "Notion",
    "Linear",
    "Figma",
    "Shopify",
  ];
  return (
    <section className="relative w-full border-y border-ink-100 bg-white/70 py-10 backdrop-blur">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="max-w-[260px] text-center md:text-left">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-400">
              builders use Odeun at
            </div>
            <div className="mt-1 text-[15px] font-semibold text-ink-700">
              Enterprise teams · indie creators · solo operators
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-10">
            {rows.map((n) => (
              <span
                key={n}
                className="font-editorial text-[22px] italic text-ink-500 transition-colors hover:text-ink-950"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
