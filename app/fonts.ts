import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono, Fraunces } from "next/font/google";

export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});
