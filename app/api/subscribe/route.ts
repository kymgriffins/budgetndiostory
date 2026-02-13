import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

// Rate limiting store (simple in-memory for MVP)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // requests per minute
const WINDOW_MS = 60 * 1000; // 1 minute

// Zod schema for email validation
const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional(),
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
    const result = subscribeSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { email, name } = result.data;

    // Check for existing subscription
    const existing = await prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (existing && existing.isActive) {
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 400 }
      );
    }

    // Create or update subscription
    const subscription = await prisma.newsletterSubscription.upsert({
      where: { email },
      update: {
        isActive: true,
        unsubscribedAt: null,
        name: name || existing?.name,
      },
      create: {
        email,
        name,
        isActive: true,
        source: "website",
      },
    });

    // Send welcome email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: email,
        subject: "Welcome to Budget Ndio Story Newsletter!",
        html: `
          <h1>Welcome to Budget Ndio Story!</h1>
          <p>Hi ${name || "there"},</p>
          <p>Thanks for subscribing to our newsletter. You'll receive updates on:</p>
          <ul>
            <li>Budget insights and analysis</li>
            <li>County-level budget breakdowns</li>
            <li>Tax education resources</li>
            <li>Civic engagement opportunities</li>
          </ul>
          <p>Stay informed, stay engaged!</p>
          <p>The Budget Ndio Story Team</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter!",
      data: {
        email: subscription.email,
        subscribedAt: subscription.subscribedAt,
      },
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
