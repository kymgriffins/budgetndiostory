/**
 * Email obfuscation utilities to protect against email scrapers
 */

/**
 * Obfuscate an email address by converting it to HTML entities
 */
export function obfuscateEmail(email: string): string {
  return email
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      // Mix regular chars and HTML entities
      if (Math.random() > 0.5 && code > 32) {
        return `&#${code};`;
      }
      return char;
    })
    .join("");
}

/**
 * Obfuscate email for use in mailto: links
 */
export function obfuscateMailto(email: string): string {
  return email
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return `&#${code};`;
    })
    .join("");
}

/**
 * Create a display-safe email for obfuscated rendering
 */
export function getObfuscatedDisplay(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;

  // Show first char and last char of local part, hide the rest
  const hiddenLocal =
    local.length > 2 ? `${local[0]}...${local[local.length - 1]}` : local;

  return `${hiddenLocal}@${domain}`;
}
