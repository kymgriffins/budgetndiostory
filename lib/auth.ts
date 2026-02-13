/**
 * Auth.js Configuration for NextAuth v5
 * 
 * Uses Neon PostgreSQL with a custom adapter instead of Prisma.
 * Includes role-based access control (RBAC).
 * 
 * Roles:
 * - admin: Full access to all features
 * - editor: Can edit and publish any content
 * - author: Can create and edit own content
 * - viewer: Read-only access (default)
 * 
 * Keep DATABASE_URL secure - never expose to client-side code.
 */

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NeonAdapter, type NeonUser } from "@/lib/auth/neon-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: NeonAdapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Add user ID and role to session
      if (token.sub && session.user) {
        session.user.id = token.sub;
        
        // Add role from JWT to session
        if (token.role) {
          session.user.role = token.role as string;
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // On initial sign in, get user role from database
      if (user || account) {
        token.sub = user?.id || account?.userId;
        
        // Get user role from the user object (set by adapter)
        const neonUser = user as NeonUser;
        if (neonUser?.role) {
          token.role = neonUser.role;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

// Helper function to check if user has required role
export function hasRole(userRole: string | undefined, requiredRole: string): boolean {
  const roleHierarchy = ['viewer', 'author', 'editor', 'admin'];
  const userRoleIndex = userRole ? roleHierarchy.indexOf(userRole) : -1;
  const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
  
  return userRoleIndex >= requiredRoleIndex;
}

// Helper to check if user is admin
export function isAdmin(role: string | undefined): boolean {
  return role === 'admin';
}

// Helper to check if user can edit (editor or admin)
export function canEdit(role: string | undefined): boolean {
  return role === 'editor' || role === 'admin';
}

// Helper to check if user can create content (author, editor, admin)
export function canCreate(role: string | undefined): boolean {
  return role === 'author' || role === 'editor' || role === 'admin';
}
