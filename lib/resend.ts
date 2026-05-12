import { Resend } from "resend";

let cached: Resend | null = null;

function getResend(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

/**
 * Send a welcome email. Silently no-ops if Resend isn't configured —
 * we never block a signup on email delivery.
 */
export async function sendWelcomeEmail(to: string): Promise<void> {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL;
  if (!resend || !from) return;

  try {
    await resend.emails.send({
      from,
      to,
      subject: "You're inside — founder access reserved",
      html: welcomeHtml(),
      text: welcomeText(),
    });
  } catch (err) {
    console.error("resend send failed", err);
  }
}

function welcomeHtml(): string {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#fafaf7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0a0f2e;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="520" style="max-width:520px;background:#ffffff;border-radius:18px;padding:36px 32px;box-shadow:0 30px 60px -30px rgba(20,26,82,0.18);">
        <tr><td>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#3834ff;">Odeun · Founder access</div>
          <h1 style="margin:16px 0 8px;font-size:28px;line-height:1.1;letter-spacing:-0.035em;color:#0a0f2e;">You're inside.</h1>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#2e3a8a;">
            Your spot is reserved for the first wave. Invites drop on Tuesdays.
          </p>
          <hr style="border:0;border-top:1px solid #e4e7ff;margin:24px 0;"/>
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#4750b4;">What you've unlocked</p>
          <ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.7;color:#0d1540;">
            <li>Founding member badge</li>
            <li>Direct founder updates — build notes, no marketing</li>
            <li>Private roadmap voting</li>
            <li>First-look feature access</li>
          </ul>
          <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#6a72d6;">
            — The Odeun team
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function welcomeText(): string {
  return `You're inside.

Your spot is reserved for the first wave. Invites drop on Tuesdays.

What you've unlocked:
- Founding member badge
- Direct founder updates — build notes, no marketing
- Private roadmap voting
- First-look feature access

— The Odeun team`;
}
