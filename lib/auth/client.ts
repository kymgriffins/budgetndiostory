/**
 * Neon Auth Client Instance
 * 
 * This file creates the client-side auth instance for Neon Auth.
 * Used in client components and pages.
 * 
 * Based on: https://neon.com/docs/auth/quick-start/nextjs-api-only
 */

'use client';

import { createAuthClient } from '@neondatabase/auth/next';

/**
 * Create and export the Neon Auth client instance.
 * 
 * This client is used for:
 * - Checking if user is authenticated (useSession hook)
 * - Signing in/out users
 * - Getting user information
 * 
 * Note: This client can only be used in client-side code (components with 'use client')
 */
export const authClient = createAuthClient();
