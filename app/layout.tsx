import type { Metadata } from "next";
import { hanken, instrument, mono, fraunces } from "./fonts";
import { MetaPixel } from "@/components/MetaPixel";
import "./globals.css";

export const metadata: Metadata = {
  title: "Odeun — Stop fitting your life into their apps. Build your own Command Center.",
  description:
    "Odeun turns your AI chats into permanent, beautiful, live web-apps. Build your own dashboards, trackers, and second brains — no code, just your vision.",
  openGraph: {
    title: "Odeun — Build your own Command Center",
    description:
      "Turn your Claudia chats into permanent, live, beautiful web-apps. Dashboards that actually speak your language.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${hanken.variable} ${instrument.variable} ${mono.variable} ${fraunces.variable}`}>
      <body className="antialiased">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
