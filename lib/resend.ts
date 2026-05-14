import { Resend } from "resend";

let cached: Resend | null = null;

function getResend(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

const REPLY_TO = "Joey from Odeun <emails@odeun.tech>";

/**
 * Send a welcome email. Silently no-ops if Resend isn't configured —
 * we never block a signup on email delivery.
 *
 * Plain, minimal HTML — designed to read like a personal note from a
 * coworker. No branded chrome, no gradient bars, no callout cards. The
 * tone is everything; visual hierarchy stays out of the way.
 *
 * `Reply-To` is set to a real mailbox (not the no-inbox sending subdomain)
 * so the "reply to this email" prompt in the body actually reaches us.
 */
export async function sendWelcomeEmail(to: string): Promise<void> {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL;
  if (!resend || !from) return;

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: REPLY_TO,
      subject: "You're in the first wave. One question for you",
      html: welcomeHtml(),
      text: welcomeText(),
    });
  } catch (err) {
    console.error("resend send failed", err);
  }
}

function welcomeHtml(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>You're in the first wave</title>
</head>
<body style="margin:0;padding:24px 16px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15.5px;line-height:1.6;color:#1a1a1a;-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#ffffff;">A quick note from Joey at Odeun.</div>
<div style="max-width:560px;margin:0 auto;">
<p style="margin:0 0 16px;">Hi, I'm Joey, from the Odeun team.</p>
<p style="margin:0 0 16px;">Let me guess: you built something in Claude. Then the conversation ended and it was gone.</p>
<p style="margin:0 0 16px;">Odeun is where what you build in Claude actually lives. Saved, with real data, that you can come back to tomorrow. You're in the first wave. We're letting people in as we're ready for them, not on a schedule, but you're early.</p>
<p style="margin:0 0 16px;">What that gets you: founding member access before public launch, build notes from me directly, and a real say in what we ship next.</p>
<p style="margin:0 0 16px;"><strong style="font-weight:700;color:#0a0f2e;">One thing before you go, reply to this email and tell me:</strong> what's the one thing you've been trying to build in Claude but couldn't get to stick? One sentence is enough. I read every reply, and it shapes what ships first.</p>
<p style="margin:0;">Joey</p>
</div>
</body>
</html>`;
}

function welcomeText(): string {
  return `Hi, I'm Joey, from the Odeun team.

Let me guess: you built something in Claude. Then the conversation ended and it was gone.

Odeun is where what you build in Claude actually lives. Saved, with real data, that you can come back to tomorrow. You're in the first wave. We're letting people in as we're ready for them, not on a schedule, but you're early.

What that gets you: founding member access before public launch, build notes from me directly, and a real say in what we ship next.

One thing before you go, reply to this email and tell me: what's the one thing you've been trying to build in Claude but couldn't get to stick? One sentence is enough. I read every reply, and it shapes what ships first.

Joey`;
}
