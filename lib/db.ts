/**
 * Neon Database Utility
 * 
 * Provides a singleton SQL client for Neon PostgreSQL.
 * IMPORTANT: DATABASE_URL must only be used server-side to protect credentials.
 * 
 * Usage:
 *   import { sql } from '@/lib/db';
 *   const result = await sql`SELECT * FROM users`;
 */

import { neon } from "@neondatabase/serverless";

// Type for the SQL client
type SqlClient = ReturnType<typeof neon>;

// Create a singleton SQL client
// This ensures we don't create multiple connections in development
const globalForSql = globalThis as unknown as {
  sql: SqlClient | undefined;
};

// Initialize the SQL client with Neon
// DATABASE_URL is read from environment variables - NEVER expose to client
function createSqlClient(): SqlClient {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not defined. Please set it in your .env file.\n" +
      "Example: postgresql://user:password@host.neon.tech/dbname?sslmode=require"
    );
  }
  
  return neon(databaseUrl);
}

// Export a singleton instance
// In production: always create a new connection
// In development: reuse the same connection to avoid connection limits
export const sql = globalForSql.sql ?? createSqlClient();

if (process.env.NODE_ENV !== "production") {
  globalForSql.sql = sql;
}

// Database table names for type safety
export const tables = {
  users: "users",
  accounts: "accounts",
  sessions: "sessions",
  newsletterSubscriptions: "newsletter_subscriptions",
} as const;

export default sql;
