import { WaitlistInline } from "./WaitlistInline";

export function Waitlist() {
  return (
    <section
      id="waitlist"
      className="relative w-full overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32"
    >
      <div className="relative mx-auto w-full max-w-[680px] text-center">
        <h2 className="text-[34px] font-extrabold leading-[1.02] tracking-[-0.035em] text-ink-950 sm:text-[46px] md:text-[54px]">
          Build the system that&apos;s{" "}
          <span className="font-editorial font-normal italic text-ink-700">already in your head</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.6] text-ink-600 sm:text-[16px]">
          Get an invite when we open the next batch. No spam, no noise.
        </p>

        <div className="mx-auto mt-8 max-w-[520px]">
          <WaitlistInline compact />
        </div>
      </div>
    </section>
  );
}
