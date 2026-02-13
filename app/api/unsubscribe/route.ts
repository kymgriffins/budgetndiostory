import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

// Rate limiting store (simple in-memory for MVP)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per minute
const WINDOW_MS = 60 * 1000; // 1 minute

// Zod schema for email validation
const unsubscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

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

    // Check for existing subscription
    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "This email is not subscribed to our newsletter." },
        { status: 400 }
      );
    }

    if (!existing.isActive) {
      return NextResponse.json(
        { error: "This email is already unsubscribed." },
        { status: 400 }
      );
    }

    // Update subscription to inactive
    await prisma.newsletterSubscription.update({
      where: { email },
      data: {
        isActive: false,
        unsubscribedAt: new Date(),
      },
    });

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
