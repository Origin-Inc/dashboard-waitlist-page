import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      source?: string;
    };
    const email = (body.email ?? "").trim().toLowerCase();
    const source = (body.source ?? "unknown").slice(0, 32);

    if (!email || !EMAIL_RE.test(email) || email.length > 320) {
      return NextResponse.json(
        { ok: false, error: "That email doesn't look quite right." },
        { status: 400 },
      );
    }

    // Persist to whichever backend is configured. For now we log the signup — when the user
    // wires up a real store (Vercel Postgres, Resend, Loops, ConvertKit, etc.), swap this out.
    console.log(
      JSON.stringify({
        event: "waitlist_signup",
        email,
        source,
        at: new Date().toISOString(),
      }),
    );

    // Small simulated latency so the UI's loading state is visible.
    await new Promise((r) => setTimeout(r, 250));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something interrupted the ritual. Try again?" },
      { status: 500 },
    );
  }
}
