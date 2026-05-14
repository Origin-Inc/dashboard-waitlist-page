import { Sparkle } from "./Sparkle";
import { HeroGallery } from "./HeroGallery";
import { HeroRotatingPhrase } from "./HeroRotatingPhrase";
import { WaitlistInline } from "./WaitlistInline";
import { InsiderStats } from "./InsiderStats";
import { getCombinedStats } from "@/lib/signups";

export async function Hero() {
  const { total, thisWeek } = await getCombinedStats();
  return (
    <section className="relative isolate w-full overflow-hidden sm:min-h-[900px] lg:min-h-[1020px]">
      {/* --- Background: justified artifact wall --- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* White base under the tiles */}
        <div className="absolute inset-0 bg-white" />

        {/* the tiled wall */}
        <div className="absolute inset-0 sm:px-[clamp(15px,2.25vw,35px)] sm:pt-[clamp(20px,2.5vw,45px)] sm:pb-[clamp(20px,2.5vw,45px)]">
          <HeroGallery />
        </div>

        {/* Black vertical overlay — opaque at top + bottom, transparent in the middle */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.10) 18%, rgba(0,0,0,0.10) 42%, rgba(0,0,0,0.10) 58%, rgba(0,0,0,0.30) 82%, rgba(255, 255, 255,1.00) 100%)",
          }}
        />

        {/* tiny white fade at the very bottom to stitch into the next (white) section */}
        {/*<div className="absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-b from-transparent to-white" />*/}

        {/* subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 18% 12%, rgba(255,255,255,0.5) 50%, transparent 51%), radial-gradient(1px 1px at 73% 28%, rgba(255,255,255,0.45) 50%, transparent 51%), radial-gradient(1px 1px at 42% 68%, rgba(255,255,255,0.4) 50%, transparent 51%), radial-gradient(1px 1px at 88% 82%, rgba(255,255,255,0.5) 50%, transparent 51%)",
          }}
        />
      </div>

      {/* --- Foreground: bare text, fully transparent container --- */}
      <div className="relative z-10 mx-auto flex max-w-[1320px] items-center justify-center px-5 pb-20 pt-24 sm:min-h-[900px] sm:px-8 sm:pb-32 sm:pt-32 lg:min-h-[1020px] lg:pb-36 lg:pt-36">
        <HeroCopy total={total} thisWeek={thisWeek} />
      </div>
    </section>
  );
}

function HeroCopy({ total, thisWeek }: { total: number; thisWeek: number }) {
  return (
    <div className="relative isolate w-full max-w-[760px] text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-32 -inset-y-24 -z-10"
        style={{
          background:
            "radial-gradient(ellipse farthest-side at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 33%, rgba(0,0,0,0.05) 66%, rgba(0,0,0,0) 100%)",
        }}
      />
      <h1
        className="mt-7 text-[36px] font-extrabold leading-[0.98] tracking-[-0.04em] text-transparent sm:mt-9 sm:text-[54px] md:text-[64px] lg:text-[100px]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 22%, rgba(255,255,255,0.40) 50%, rgba(255,255,255,0.55) 78%, rgba(255,255,255,0.92) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow:
            "0 0 1px rgba(255,255,255,0.95), 0 0 8px rgba(255,255,255,0.45), 0 0 22px rgba(255,255,255,0.30), 0 0 55px rgba(255,255,255,0.18), 0 2px 6px rgba(0,0,0,0.25)",
        }}
      >
        Make it your:
        <br />
        <HeroRotatingPhrase />
      </h1>

      {/*<p className="mx-auto mt-7 max-w-[580px] text-[15.5px] font-medium leading-[1.6] text-white/80 sm:mt-8 sm:text-[17.5px]">
        The first AI engine designed to turn your idiosyncratic
        <em className="font-editorial text-white"> mountain of thoughts </em>
        into beautiful, permanent software. From property analyzers to
        nervous-system trackers — if you can chat it, we can build it.
      </p>*/}

      <div className="mt-7 flex justify-center sm:mt-9">
        <InsiderStats total={total} thisWeek={thisWeek} variant="strong" />
      </div>

      <div className="mx-auto mt-5 max-w-[560px] text-left sm:mt-6">
        <WaitlistInline cta="early" glass="strong" size="compact" />
      </div>


    </div>
  );
}
