/**
 * Neon Auth API Route Handler
 * 
 * This file handles all auth-related API requests.
 * It delegates to the Neon Auth handler for authentication flows.
 * 
 * Based on: https://neon.com/docs/auth/quick-start/nextjs-api-only
 */

import { auth } from '@/lib/auth/server';

export const { GET, POST } = auth.handler();
