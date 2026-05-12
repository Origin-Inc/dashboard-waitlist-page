"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Integration = {
  key: string;
  name: string;
  desc: string;
  src: string;
};

const integrations: Integration[] = [
  {
    key: "notion",
    name: "Notion",
    desc: "Keep your notes in Notion; let Odeun build the UI that runs them.",
    src: "/logos/Notion_app_logo.png",
  },
  {
    key: "sheets",
    name: "Google Sheets",
    desc: "Real-time data without the spreadsheet sprawl.",
    src: "/logos/google-sheets-icon.webp",
  },
  {
    key: "asana",
    name: "Asana",
    desc: "Professional priorities meet your personal side-quests.",
    src: "/logos/Asana-Logo.png",
  },
  {
    key: "apple",
    name: "Apple Reminders",
    desc: "A calmer day, synced to the system you already trust.",
    src: "/logos/apple-logo.png",
  },
  {
    key: "stripe",
    name: "Stripe",
    desc: "Live revenue pings, tax-surplus auto-sweeps, receipts that file themselves.",
    src: "/logos/stripe-logo.webp",
  },
  {
    key: "claude",
    name: "Claude",
    desc: "Your chats become deployable. Every artifact, every time.",
    src: "/logos/Claude_AI_symbol.svg.png",
  },
];

export function Integrations() {
  return (
    <section id="ecosystem" className="relative w-full overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-signal-500/10 blur-[140px]" />
        <div className="absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-twilight-rose/30 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="mx-auto max-w-[820px] text-center">
          <h2 className="text-[38px] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink-950 sm:text-[54px] md:text-[64px]">
            It&apos;s not either/or. It&apos;s an{" "}
            <span className="font-editorial font-normal italic">and</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-[1.65] text-ink-600 sm:text-[17px]">
            Odeun plugs into the tools you already love. Your data stays where it lives, Odeun
            becomes the interface on top.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1080px] grid-cols-1 gap-x-10 gap-y-5 sm:mt-16 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-10 lg:grid-cols-3">
          {integrations.map((it, i) => (
            <motion.div
              key={it.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-row items-center gap-4 text-left sm:flex-col sm:items-center sm:gap-0 sm:text-center"
            >
              <div className="relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
                <Image
                  src={it.src}
                  alt={`${it.name} logo`}
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0 flex-1 sm:flex-none">
                <h3 className="text-[16px] font-extrabold tracking-[-0.02em] text-ink-950 sm:mt-5 sm:text-[18px]">
                  {it.name}
                </h3>
                <p className="mt-1 text-[13.5px] leading-[1.5] text-ink-600 sm:mt-2 sm:max-w-[34ch] sm:text-[14px] sm:leading-[1.55]">
                  {it.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
