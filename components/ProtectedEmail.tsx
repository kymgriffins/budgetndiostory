"use client";

import { obfuscateEmail, obfuscateMailto } from "@/lib/email-obfuscation";
import { Mail } from "lucide-react";

interface ProtectedEmailProps {
  email: string;
  displayText?: string;
  showIcon?: boolean;
  className?: string;
}

/**
 * Email component that obfuscates the email address to protect against scrapers.
 * The email is displayed using HTML entities and a mailto: link is generated
 * with obfuscated characters.
 */
export function ProtectedEmail({
  email,
  displayText,
  showIcon = false,
  className = "",
}: ProtectedEmailProps) {
  const obfuscatedDisplay = obfuscateEmail(displayText || email);
  const obfuscatedHref = obfuscateMailto(email);

  return (
    <a
      href={`mailto:${obfuscatedHref}`}
      className={`protected-email ${className}`}
      dangerouslySetInnerHTML={{ __html: obfuscatedDisplay }}
      suppressHydrationWarning
    />
  );
}

/**
 * Alternative email component with icon
 */
export function ProtectedEmailWithIcon({
  email,
  showIcon = true,
  className = "",
}: ProtectedEmailProps) {
  const obfuscatedDisplay = obfuscateEmail(email);
  const obfuscatedHref = obfuscateMailto(email);

  return (
    <a
      href={`mailto:${obfuscatedHref}`}
      className={`flex items-center gap-2 ${className}`}
      suppressHydrationWarning
    >
      {showIcon && <Mail size={16} />}
      <span dangerouslySetInnerHTML={{ __html: obfuscatedDisplay }} />
    </a>
  );
}

export default ProtectedEmail;
