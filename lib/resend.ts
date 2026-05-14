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
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>You're in the first wave</title>
</head>
<body style="margin:0;padding:0;background:#f5f3ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a0f2e;-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#f5f3ee;">Founder access reserved. One question before you go.</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f3ee;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;">

<tr><td style="background:linear-gradient(90deg,#3834ff 0%,#ff3ca5 50%,#ff7a29 100%);height:4px;font-size:0;line-height:0;border-radius:18px 18px 0 0;mso-line-height-rule:exactly;">&nbsp;</td></tr>

<tr><td style="background:#ffffff;padding:36px 36px 32px;border-radius:0 0 18px 18px;">

<div style="font-size:11px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:#3834ff;margin:0 0 18px;">Odeun · Wave 01</div>

<h1 style="margin:0 0 22px;font-size:28px;line-height:1.12;letter-spacing:-0.025em;color:#0a0f2e;font-weight:800;">You're in the first wave.</h1>

<p style="margin:0 0 16px;font-size:15.5px;line-height:1.6;color:#2e3a8a;">Hi, I'm Joey, from the Odeun team.</p>

<p style="margin:0 0 16px;font-size:15.5px;line-height:1.6;color:#2e3a8a;">Let me guess: you built something in Claude. Then the conversation ended and it was gone.</p>

<p style="margin:0 0 16px;font-size:15.5px;line-height:1.6;color:#2e3a8a;">Odeun is where what you build in Claude actually lives. Saved, with real data, that you can come back to tomorrow.</p>

<p style="margin:0 0 28px;font-size:15.5px;line-height:1.6;color:#2e3a8a;">We're letting people in as we're ready for them — not on a schedule. But you're early.</p>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f3f4ff;border-radius:12px;margin:0 0 28px;">
<tr><td style="padding:20px 22px;">
<div style="font-size:10.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#4750b4;margin:0 0 14px;">What that gets you</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td valign="top" width="22" style="padding:3px 10px 0 0;"><span style="display:inline-block;width:16px;height:16px;background:#3834ff;border-radius:999px;color:#ffffff;font-size:10px;line-height:16px;text-align:center;font-weight:800;">✓</span></td><td style="font-size:14.5px;line-height:1.55;color:#0d1540;padding-bottom:10px;"><strong style="color:#0a0f2e;font-weight:700;">Founding member access</strong> before public launch</td></tr>
<tr><td valign="top" width="22" style="padding:3px 10px 0 0;"><span style="display:inline-block;width:16px;height:16px;background:#3834ff;border-radius:999px;color:#ffffff;font-size:10px;line-height:16px;text-align:center;font-weight:800;">✓</span></td><td style="font-size:14.5px;line-height:1.55;color:#0d1540;padding-bottom:10px;"><strong style="color:#0a0f2e;font-weight:700;">Build notes from me directly</strong> — not marketing</td></tr>
<tr><td valign="top" width="22" style="padding:3px 10px 0 0;"><span style="display:inline-block;width:16px;height:16px;background:#3834ff;border-radius:999px;color:#ffffff;font-size:10px;line-height:16px;text-align:center;font-weight:800;">✓</span></td><td style="font-size:14.5px;line-height:1.55;color:#0d1540;"><strong style="color:#0a0f2e;font-weight:700;">A real say</strong> in what we ship next</td></tr>
</table>
</td></tr>
</table>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0a0f2e;border-radius:12px;margin:0 0 30px;">
<tr><td style="padding:24px 24px 26px;">
<div style="font-size:10.5px;font-weight:700;letter-spacing:0.20em;text-transform:uppercase;color:#fcd065;margin:0 0 12px;">One thing before you go</div>
<p style="margin:0 0 14px;font-size:18px;line-height:1.35;letter-spacing:-0.015em;color:#ffffff;font-weight:600;">What's the one thing you've been trying to build in Claude but couldn't get to stick?</p>
<p style="margin:0;font-size:13.5px;line-height:1.55;color:#c5cbff;">One sentence is enough. Just reply to this email — I read every one, and it shapes what ships first.</p>
</td></tr>
</table>

<p style="margin:0 0 4px;font-size:16px;line-height:1.5;color:#0a0f2e;font-weight:700;">— Joey</p>
<p style="margin:0;font-size:12.5px;line-height:1.5;color:#6a72d6;letter-spacing:0.02em;">Founder, Odeun</p>

</td></tr>

<tr><td style="padding:22px 16px 0;text-align:center;">
<p style="margin:0;font-size:11px;line-height:1.6;color:#9099ec;letter-spacing:0.03em;">You're receiving this because you joined the Odeun waitlist.</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function welcomeText(): string {
  return `You're in the first wave.

Hi, I'm Joey, from the Odeun team.

Let me guess: you built something in Claude. Then the conversation ended and it was gone.

Odeun is where what you build in Claude actually lives. Saved, with real data, that you can come back to tomorrow.

We're letting people in as we're ready for them — not on a schedule. But you're early.

WHAT THAT GETS YOU
✓ Founding member access before public launch
✓ Build notes from me directly — not marketing
✓ A real say in what we ship next

ONE THING BEFORE YOU GO
What's the one thing you've been trying to build in Claude but couldn't get to stick?

One sentence is enough. Just reply to this email — I read every one, and it shapes what ships first.

— Joey
Founder, Odeun

---
You're receiving this because you joined the Odeun waitlist.`;
}
