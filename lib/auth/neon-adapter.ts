/**
 * Neon Database Adapter for Auth.js
 * 
 * This adapter allows Auth.js (NextAuth) to work with Neon PostgreSQL
 * without using Prisma. It implements all required adapter methods.
 * 
 * IMPORTANT: Keep DATABASE_URL secure - never expose to client-side code.
 */

import { sql } from "@/lib/db";
import type { Adapter, AdapterAccount, AdapterSession, AdapterUser } from "next-auth/adapters";

// Helper to generate UUIDs
function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Extended User type with role support
 */
export interface NeonUser extends AdapterUser {
  role?: 'admin' | 'editor' | 'author' | 'viewer';
}

/**
 * Format database user to Auth.js user format
 */
function formatUser(user: Record<string, unknown>): NeonUser {
  return {
    id: user.id as string,
    name: user.name as string | null,
    email: user.email as string,
    emailVerified: user.email_verified ? new Date(user.email_verified as string) : null,
    image: user.image as string | null,
    role: (user.role as NeonUser['role']) || 'viewer',
  };
}

/**
 * Format database account to Auth.js account format
 */
function formatAccount(account: Record<string, unknown>): AdapterAccount {
  return {
    id: account.id as string,
    userId: account.user_id as string,
    type: account.type as AdapterAccount["type"],
    provider: account.provider as string,
    providerAccountId: account.provider_account_id as string,
    refresh_token: account.refresh_token as string | undefined,
    access_token: account.access_token as string | undefined,
    expires_at: account.expires_at as number | undefined,
    token_type: account.token_type as Lowercase<string> | undefined,
    scope: account.scope as string | undefined,
    id_token: account.id_token as string | undefined,
    session_state: account.session_state as string | undefined,
  };
}

/**
 * Format database session to Auth.js session format
 */
function formatSession(session: Record<string, unknown>): AdapterSession {
  return {
    sessionToken: session.session_token as string,
    userId: session.user_id as string,
    expires: new Date(session.expires as string),
  };
}

/**
 * Format database verification token
 */
function formatVerificationToken(token: Record<string, unknown>) {
  return {
    identifier: token.identifier as string,
    token: token.token as string,
    expires: new Date(token.expires as string),
  };
}

/**
 * Neon Auth.js Adapter
 * 
 * Implements all required adapter methods for Auth.js to work with Neon.
 */
export const NeonAdapter: Adapter = {
  // User methods
  async createUser(user: Partial<AdapterUser>): Promise<AdapterUser> {
    const id = generateId();
    const now = new Date();
    
    await sql`
      INSERT INTO users (id, name, email, email_verified, image, created_at, updated_at)
      VALUES (
        ${id},
        ${user.name ?? null},
        ${user.email ?? null},
        ${user.emailVerified ? user.emailVerified.toISOString() : null},
        ${user.image ?? null},
        ${now.toISOString()},
        ${now.toISOString()}
      )
    `;
    
    return {
      id,
      name: user.name ?? null,
      email: user.email!,
      emailVerified: user.emailVerified ?? null,
      image: user.image ?? null,
    };
  },

  async getUser(id: string): Promise<AdapterUser | null> {
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    const rows = result as unknown as Record<string, unknown>[];
    
    if (rows.length === 0) return null;
    
    return formatUser(rows[0]);
  },

  async getUserByEmail(email: string): Promise<AdapterUser | null> {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    const rows = result as unknown as Record<string, unknown>[];
    
    if (rows.length === 0) return null;
    
    return formatUser(rows[0]);
  },

  async getUserByAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }): Promise<AdapterUser | null> {
    const result = await sql`
      SELECT u.* FROM users u
      JOIN accounts a ON a.user_id = u.id
      WHERE a.provider = ${provider} AND a.provider_account_id = ${providerAccountId}
      LIMIT 1
    `;
    const rows = result as unknown as Record<string, unknown>[];
    
    if (rows.length === 0) return null;
    
    return formatUser(rows[0]);
  },

  async updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, "id">): Promise<AdapterUser> {
    const now = new Date();
    
    await sql`
      UPDATE users 
      SET 
        name = ${user.name ?? null},
        email = ${user.email ?? null},
        email_verified = ${user.emailVerified ? user.emailVerified.toISOString() : null},
        image = ${user.image ?? null},
        updated_at = ${now.toISOString()}
      WHERE id = ${user.id}
    `;
    
    return {
      id: user.id,
      name: user.name ?? null,
      email: user.email!,
      emailVerified: user.emailVerified ?? null,
      image: user.image ?? null,
    };
  },

  async deleteUser(id: string): Promise<void> {
    await sql`DELETE FROM users WHERE id = ${id}`;
  },

  // Account methods
  async linkAccount(account: AdapterAccount): Promise<AdapterAccount | null> {
    const id = generateId();
    
    await sql`
      INSERT INTO accounts (
        id, user_id, type, provider, provider_account_id,
        refresh_token, access_token, expires_at, token_type,
        scope, id_token, session_state
      )
      VALUES (
        ${id},
        ${account.userId},
        ${account.type},
        ${account.provider},
        ${account.providerAccountId},
        ${account.refresh_token ?? null},
        ${account.access_token ?? null},
        ${account.expires_at ?? null},
        ${account.token_type ?? null},
        ${account.scope ?? null},
        ${account.id_token ?? null},
        ${account.session_state ?? null}
      )
    `;
    
    return formatAccount({ ...account, id });
  },

  async unlinkAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }): Promise<void> {
    await sql`
      DELETE FROM accounts 
      WHERE provider = ${provider} AND provider_account_id = ${providerAccountId}
    `;
  },

  // Session methods
  async createSession({ sessionToken, userId, expires }: { sessionToken: string; userId: string; expires: Date }): Promise<AdapterSession> {
    const id = generateId();
    
    await sql`
      INSERT INTO sessions (id, session_token, user_id, expires)
      VALUES (${id}, ${sessionToken}, ${userId}, ${expires.toISOString()})
    `;
    
    return {
      sessionToken,
      userId,
      expires,
    };
  },

  async getSessionAndUser(sessionToken: string): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
    const result = await sql`
      SELECT s.*, u.* FROM sessions s
      JOIN users u ON u.id = s.user_id
      WHERE s.session_token = ${sessionToken}
    `;
    const rows = result as unknown as Record<string, unknown>[];
    
    if (rows.length === 0) return null;
    
    const row = rows[0];
    
    return {
      session: formatSession(row),
      user: formatUser(row),
    };
  },

  async updateSession({ sessionToken, expires }: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">): Promise<AdapterSession | null | undefined> {
    const result = await sql`SELECT * FROM sessions WHERE session_token = ${sessionToken}`;
    const rows = result as unknown as Record<string, unknown>[];
    
    if (rows.length === 0) return null;
    
    await sql`
      UPDATE sessions 
      SET expires = ${expires!.toISOString()}
      WHERE session_token = ${sessionToken}
    `;
    
    return {
      sessionToken,
      userId: rows[0].user_id as string,
      expires: expires!,
    };
  },

  async deleteSession(sessionToken: string): Promise<void> {
    await sql`DELETE FROM sessions WHERE session_token = ${sessionToken}`;
  },

  // Verification token methods
  async createVerificationToken({ identifier, token, expires }: { identifier: string; token: string; expires: Date }) {
    await sql`
      INSERT INTO verification_tokens (identifier, token, expires)
      VALUES (${identifier}, ${token}, ${expires.toISOString()})
      ON CONFLICT (identifier, token) DO UPDATE SET
        token = ${token},
        expires = ${expires.toISOString()}
    `;
    
    return { identifier, token, expires };
  },

  async useVerificationToken({ identifier, token }: { identifier: string; token: string }) {
    const result = await sql`
      SELECT * FROM verification_tokens 
      WHERE identifier = ${identifier} AND token = ${token}
    `;
    const rows = result as unknown as Record<string, unknown>[];
    
    if (rows.length === 0) return null;
    
    await sql`
      DELETE FROM verification_tokens 
      WHERE identifier = ${identifier} AND token = ${token}
    `;
    
    return formatVerificationToken(rows[0]);
  },
};

export default NeonAdapter;
