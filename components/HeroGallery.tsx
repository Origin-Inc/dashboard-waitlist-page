"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type Tile = { row: number; pos: number; ar: number; ext?: "webp" | "png" };

/*  Each row's tile aspect-ratios sum to a similar value, so rows stay at
    consistent heights when using flex-grow proportional to aspect-ratio
    and aspect-ratio on the tile itself. Math:
      width_i  = ar_i / sum_ar × container_w
      height_i = width_i / ar_i = container_w / sum_ar
    => every tile in a row has the same height == container_w / sum_ar. */

const ROWS: Tile[][] = [
  [
    { row: 1, pos: 1, ar: 1.0 },
    { row: 1, pos: 2, ar: 1.78 },
    { row: 1, pos: 3, ar: 1.78 },
    { row: 1, pos: 4, ar: 1.0, ext: "png" },
    { row: 1, pos: 5, ar: 1.78 },
  ],
  [
    { row: 2, pos: 1, ar: 1.78 },
    { row: 2, pos: 2, ar: 1.0 },
    { row: 2, pos: 3, ar: 1.78 },
    { row: 2, pos: 4, ar: 1.78 },
    { row: 2, pos: 5, ar: 1.0 },
  ],
  [
    { row: 3, pos: 1, ar: 1.0 },
    { row: 3, pos: 2, ar: 1.78 },
    { row: 3, pos: 3, ar: 1.78 },
    { row: 3, pos: 4, ar: 1.0 },
    { row: 3, pos: 5, ar: 1.78 },
  ],
  [
    { row: 4, pos: 1, ar: 1.78 },
    { row: 4, pos: 2, ar: 1.0 },
    { row: 4, pos: 3, ar: 1.78 },
    { row: 4, pos: 4, ar: 1.78 },
    { row: 4, pos: 5, ar: 1.0 },
  ],
];

const MOBILE_BANDS: { dir: "left" | "right"; speed: string; tiles: Tile[] }[] = [
  { dir: "left",  speed: "48s", tiles: ROWS[0] },
  { dir: "right", speed: "54s", tiles: ROWS[1] },
  { dir: "left",  speed: "42s", tiles: ROWS[2] },
  { dir: "right", speed: "58s", tiles: ROWS[3] },
];

const tileKey = (t: Tile) => `r${t.row}p${t.pos}`;
const tileSrc = (t: Tile) => `/hero/Row_${t.row}_Pos_${t.pos}.${t.ext ?? "webp"}`;

function TileImage({ tile, sizes }: { tile: Tile; sizes: string }) {
  return (
    <Image
      src={tileSrc(tile)}
      alt=""
      fill
      sizes={sizes}
      className="object-cover"
      priority={tile.row === 1}
    />
  );
}

function TileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-ink-50 shadow-[0_10px_24px_-12px_rgba(14,21,64,0.35),inset_0_1px_0_rgba(255,255,255,0.6)]">
      {children}
    </div>
  );
}

function DesktopGrid() {
  return (
    <div className="flex h-full w-full flex-col gap-[clamp(10px,1.5vw,25px)]">
      {ROWS.map((row, ri) => (
        <div
          key={ri}
          className="flex w-full min-h-0 flex-1 gap-[clamp(10px,1.5vw,25px)]"
        >
          {row.map((t) => (
            <div
              key={tileKey(t)}
              style={{ flex: `${t.ar} 1 0` }}
              className="relative min-w-0"
            >
              <TileFrame>
                <TileImage tile={t} sizes="(min-width: 768px) 20vw, 50vw" />
              </TileFrame>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function MobileBand({ band }: { band: (typeof MOBILE_BANDS)[number] }) {
  const duplicated = [...band.tiles, ...band.tiles, ...band.tiles];
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <div
        className={cn(
          "flex h-full w-max shrink-0 gap-2",
          band.dir === "left" ? "animate-marquee-left" : "animate-marquee-right",
        )}
        style={{ animationDuration: band.speed }}
      >
        {duplicated.map((t, i) => (
          <div
            key={`${tileKey(t)}-${i}`}
            className="h-full"
            style={{ aspectRatio: `${t.ar} / 1` }}
          >
            <TileFrame>
              <TileImage tile={t} sizes="40vw" />
            </TileFrame>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroGallery() {
  return (
    <div aria-hidden className="relative h-full w-full overflow-hidden">
      {/* Desktop: justified wall */}
      <div className="hidden h-full w-full md:block">
        <DesktopGrid />
      </div>

      {/* Mobile: 4-band marquee, one per desktop row */}
      <div className="flex h-full w-full flex-col gap-2 md:hidden">
        {MOBILE_BANDS.map((b, i) => (
          <MobileBand key={i} band={b} />
        ))}
      </div>
    </div>
  );
}
