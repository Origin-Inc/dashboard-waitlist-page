/**
 * Shared email format validation — kept in one place so client and server
 * use the exact same rule, and there's no chance of them drifting apart.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_EMAIL_LENGTH = 320;

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_EMAIL_LENGTH) return false;
  return EMAIL_RE.test(trimmed);
}
