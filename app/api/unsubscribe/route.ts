import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";

// Rate limiting store (simple in-memory for MVP)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per minute
const WINDOW_MS = 60 * 1000; // 1 minute

// Zod schema for email validation
const unsubscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Type for newsletter subscription from database
type NewsletterSubscription = {
  id: string;
  email: string;
  name: string | null;
  is_active: boolean;
  subscribed_at: Date;
  unsubscribed_at: Date | null;
  source: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Rate limiting check
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const record = rateLimit.get(ip);

    if (record && record.resetAt > now) {
      if (record.count >= RATE_LIMIT) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
      record.count++;
    } else {
      rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    }

    // Validate input
    const result = unsubscribeSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Check for existing subscription using Neon SQL
    const existingResult = await sql`SELECT * FROM newsletter_subscriptions WHERE email = ${email}`;
    const existingRows = existingResult as unknown as NewsletterSubscription[];
    const existing = existingRows[0];

    if (!existing) {
      return NextResponse.json(
        { error: "This email is not subscribed to our newsletter." },
        { status: 400 }
      );
    }

    if (!existing.is_active) {
      return NextResponse.json(
        { error: "This email is already unsubscribed." },
        { status: 400 }
      );
    }

    // Update subscription to inactive using Neon SQL
    await sql`
      UPDATE newsletter_subscriptions
      SET is_active = false, unsubscribed_at = ${new Date().toISOString()}
      WHERE email = ${email}
    `;

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed from newsletter.",
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
