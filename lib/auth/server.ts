/**
 * Neon Auth Server Instance
 * 
 * This file creates the server-side auth instance for Neon Auth.
 * Used in API routes and server components.
 * 
 * Based on: https://neon.com/docs/auth/quick-start/nextjs-api-only
 */

import { createNeonAuth } from '@neondatabase/auth/next/server';

/**
 * Create and export the Neon Auth server instance.
 * 
 * Required environment variables:
 * - NEON_AUTH_BASE_URL: The Auth URL from your Neon Console (Configuration page)
 * - NEON_AUTH_COOKIE_SECRET: A secure secret for cookie signing (min 32 characters)
 * 
 * Generate a secure cookie secret with: openssl rand -base64 32
 */
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});
