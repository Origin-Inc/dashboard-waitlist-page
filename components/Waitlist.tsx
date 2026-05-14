import { WaitlistInline } from "./WaitlistInline";
import { InsiderStats } from "./InsiderStats";
import { FounderAccess } from "./FounderAccess";
import { getCombinedStats } from "@/lib/signups";

export async function Waitlist() {
  const { total, thisWeek } = await getCombinedStats();

  return (
    <section
      id="waitlist"
      className="relative w-full overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32"
    >
      <div className="relative mx-auto flex w-full max-w-[680px] flex-col items-center text-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-ink-950/[0.04] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-700 ring-1 ring-inset ring-ink-950/[0.06]">
          <span aria-hidden className="h-1 w-1 rounded-full bg-signal-600" />
          Founder access · Wave 01
        </span>

        <h2 className="text-[34px] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink-950 sm:text-[46px] md:text-[54px]">
          Reserve your spot{" "}
          <span className="font-editorial font-normal italic text-ink-700">
            before we open the doors
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.6] text-ink-600 sm:text-[16px]">
          The first wave gets founder access: private updates, roadmap votes, and every feature
          before it ships.
        </p>

        <div className="mt-7 sm:mt-8">
          <InsiderStats total={total} thisWeek={thisWeek} />
        </div>

        <div className="mt-5 w-full max-w-[520px] sm:mt-6">
          <WaitlistInline
            compact
            cta="founder"
            helper="Invite-only batches"
          />
        </div>

        <FounderAccess className="mx-auto mt-7 max-w-[520px] sm:mt-9" />
      </div>
    </section>
  );
}
