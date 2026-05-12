import { NextResponse } from "next/server";
import { storeSignup } from "@/lib/signups";
import { sendWelcomeEmail } from "@/lib/resend";

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

    const result = await storeSignup({ email, source }).catch((err) => {
      console.error("storeSignup failed", err);
      return { stored: false, reason: undefined as undefined } as const;
    });

    if (result.stored) {
      // Fire-and-forget; we never block the signup on email delivery.
      void sendWelcomeEmail(email);
    } else if (result.reason === "unconfigured") {
      // No DB yet — log so we can audit signups before infra is wired.
      console.log(
        JSON.stringify({
          event: "waitlist_signup_unstored",
          email,
          source,
          at: new Date().toISOString(),
        }),
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something interrupted the ritual. Try again?" },
      { status: 500 },
    );
  }
}
