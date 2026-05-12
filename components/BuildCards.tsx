"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function BuildCards() {
  return (
    <section id="build" className="relative isolate w-full overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #cfe5ff 0%, #dff0ff 28%, #f1f7ff 60%, #fff3e3 90%, #ffe2c2 100%)",
          }}
        />
        <div
          className="absolute right-[8%] top-[-6%] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,236,200,0.85) 0%, rgba(255,221,178,0.45) 35%, rgba(255,221,178,0) 70%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[40%] opacity-60"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 100%, rgba(158,241,224,0.35), transparent 70%)",
          }}
        />
        <Cloud className="absolute left-[4%] top-[6%] h-[90px] w-[280px] opacity-85" />
        <Cloud className="absolute right-[10%] top-[4%] h-[100px] w-[320px] opacity-80" />
        <Cloud className="absolute left-[14%] top-[34%] h-[80px] w-[260px] opacity-70" />
        <Cloud className="absolute right-[6%] top-[40%] h-[88px] w-[290px] opacity-75" />
        <Cloud className="absolute left-[36%] top-[64%] h-[110px] w-[340px] opacity-70" />
        <Cloud className="absolute right-[18%] bottom-[8%] h-[84px] w-[270px] opacity-75" />
        <Cloud className="absolute left-[6%] bottom-[4%] h-[72px] w-[230px] opacity-65" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="text-[38px] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink-950 sm:text-[52px] md:text-[64px]">
            Your world,{" "}
            <span className="font-editorial font-normal text-ink-700">your</span> systems
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-[1.65] text-ink-600 sm:text-[17px]">
            Six starting points, infinite directions. Whatever lives in your head, Odeun can shape
            into something you actually use every day.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
          {CARDS.map((c, i) => (
            <CardRow key={c.title} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Card = {
  title: string;
  description: string;
  image: { src: string; alt: string };
};

function CardRow({ card, index }: { card: Card; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-5"
    >
      <div className="relative aspect-[1400/939] w-full overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-20px_rgba(14,21,64,0.25),0_2px_6px_-2px_rgba(14,21,64,0.08)] ring-1 ring-ink-950/5">
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          sizes="(min-width: 768px) 540px, 100vw"
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="text-[22px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink-950 sm:text-[26px]">
          {card.title}
        </h3>
        <p className="mt-2 text-[14.5px] leading-[1.6] text-ink-600 sm:text-[15.5px]">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

const CARDS: Card[] = [
  {
    title: "Websites",
    description:
      "Launch professional portfolios, sales pages, or informational sites — no developers needed.",
    image: { src: "/examples/website_opt.webp", alt: "Website example" },
  },
  {
    title: "Command Centers",
    description:
      "Build a personalized \"Second Brain\" that organizes your projects, tasks, and thoughts in one place.",
    image: { src: "/examples/command_centers_opt.webp", alt: "Command center example" },
  },
  {
    title: "Smart Trackers",
    description:
      "From personal finances to daily wellness, build beautiful trackers that turn raw data into clear insights.",
    image: { src: "/examples/trackers_opt.webp", alt: "Smart tracker example" },
  },
  {
    title: "Business Systems",
    description:
      "Create custom CRMs and order-processing tools that handle the grunt work while you focus on growth.",
    image: { src: "/examples/business_system_opt.webp", alt: "Business system example" },
  },
  {
    title: "Planners",
    description:
      "From client deadlines to morning routines, keep your business and life organized without the mental clutter.",
    image: { src: "/examples/planners_opt.webp", alt: "Planner example" },
  },
  {
    title: "Workflows",
    description:
      "Build custom paths that process orders, update logs, and sync information across your systems while you sleep.",
    image: { src: "/examples/workflow_opt.webp", alt: "Workflow example" },
  },
];

function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={className} aria-hidden>
      <defs>
        <radialGradient id="cloud-grad" cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill="url(#cloud-grad)">
        <ellipse cx="60" cy="48" rx="42" ry="22" />
        <ellipse cx="100" cy="40" rx="36" ry="26" />
        <ellipse cx="140" cy="48" rx="40" ry="20" />
        <ellipse cx="80" cy="52" rx="30" ry="14" />
        <ellipse cx="120" cy="54" rx="34" ry="16" />
      </g>
    </svg>
  );
}
