import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { BuildCards } from "@/components/BuildCards";
import { ProductIntro } from "@/components/ProductIntro";
import { Integrations } from "@/components/Integrations";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative overflow-hidden bg-white text-ink-950">
      <Nav />
      <Hero />
      <ProductIntro />
      <BuildCards />
      <Integrations />
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, #fafaf7 0%, #eef2ff 14%, #e1ebff 32%, #f0e8ff 50%, #ffe6e3 72%, #ffd9c2 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(60% 40% at 12% 0%, rgba(182,214,255,0.55), transparent 70%), radial-gradient(45% 35% at 88% 12%, rgba(244,161,193,0.45), transparent 70%), radial-gradient(70% 50% at 50% 100%, rgba(255,211,179,0.65), transparent 70%), radial-gradient(40% 30% at 80% 78%, rgba(158,241,224,0.4), transparent 70%)",
          }}
        />
        {/* soft horizon glow near the seam */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[58%] -z-10 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,236,210,0.7) 50%, transparent 100%)",
            boxShadow: "0 0 60px 12px rgba(255,225,200,0.45)",
          }}
        />
        <Waitlist />
        <Footer />
      </div>
    </main>
  );
}
