import { NextResponse } from "next/server";
import { getCombinedStats } from "@/lib/signups";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await getCombinedStats();
  return NextResponse.json(stats, {
    headers: { "cache-control": "no-store, max-age=0" },
  });
}
