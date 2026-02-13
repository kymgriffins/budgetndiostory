# Neon Database Setup Guide

This project now uses **Neon** PostgreSQL with the `@neondatabase/serverless` driver instead of Prisma.

## Quick Start

### 1. Database Setup

Run the SQL schema in your Neon console:

```bash
# Option 1: Using psql with your Neon connection string
psql "postgresql://neondb_owner:npg_wGXSqgafu7M9@ep-delicate-rain-ai81ud9d-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" -f lib/neon/init.sql

# Option 2: Copy the contents of lib/neon/init.sql and run in Neon SQL Editor
```

### 2. Environment Variables

Your `.env` file should have:
```
DATABASE_URL="postgresql://neondb_owner:npg_wGXSqgafu7M9@ep-delicate-rain-ai81ud9d-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

**⚠️ IMPORTANT**: Never expose `DATABASE_URL` to client-side code!

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Verify Setup

Run the development server:
```bash
pnpm dev
```

## Project Structure

```
lib/
├── db.ts                 # Neon SQL client singleton
├── neon/
│   └── init.sql         # Database schema
└── auth/
    └── neon-adapter.ts  # Auth.js adapter for Neon
```

## Key Differences from Prisma

| Prisma | Neon |
|--------|------|
| `prisma.user.findMany()` | `sql\`SELECT * FROM users\`` |
| `prisma.user.create({ data: {...} })` | `sql\`INSERT INTO users ...\`` |
| Type-safe generated client | Raw SQL with TypeScript template literals |
| Schema in `schema.prisma` | Schema in `lib/neon/init.sql` |

## Example Queries

### Select
```typescript
import { sql } from '@/lib/db';

const users = await sql`SELECT * FROM users WHERE email = ${email}`;
const user = users[0];
```

### Insert
```typescript
await sql`
  INSERT INTO users (id, name, email)
  VALUES (${id}, ${name}, ${email})
`;
```

### Update
```typescript
await sql`
  UPDATE users SET name = ${newName} WHERE id = ${userId}
`;
```

## Authentication

The project uses **Auth.js v5** with a custom Neon adapter (`lib/auth/neon-adapter.ts`). This adapter handles:
- User creation/management
- OAuth account linking
- Session management
- Verification tokens

## Security Notes

1. **Never expose DATABASE_URL**: Always use it only in Server Actions, API routes, or Server Components
2. **Use environment variables**: Store credentials in `.env` and never commit to version control
3. **SSL Required**: Neon requires `sslmode=require` in the connection string

## Troubleshooting

### "DATABASE_URL is not defined"
Make sure the environment variable is set in your `.env` file.

### "Connection refused"
Check that your Neon project is active and the connection string is correct.

### TypeScript errors with SQL results
The Neon SQL client returns results that need type casting:
```typescript
const result = await sql`SELECT * FROM users`;
const users = result as unknown as UserType[];
const user = users[0];
```
