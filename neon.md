 Here's a comprehensive guide to developing Next.js applications with Neon:

## Getting Started

First, create a Neon project and save your connection details [(1)](https://neon.com/docs/guides/nextjs) . You'll need your connection string from the Neon Console.

## Installation

Create a Next.js project and install the Neon serverless driver:

```bash
npx create-next-app@latest my-app
cd my-app
pnpm install @neondatabase/serverless
```


## Environment Setup

Add your Neon connection string to `.env`:

```
DATABASE_URL="postgresql://<user>:<password>@<endpoint_hostname>.neon.tech:<port>/<dbname>?sslmode=require&channel_binding=require"
```


## Using the App Router

### Server Components

In server components, connect to Neon directly:

```typescript
import { neon } from '@neondatabase/serverless';

async function getData() {
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`SELECT version()`;
  return response[0].version;
}

export default async function Page() {
  const data = await getData();
  return <>{data}</>;
}
```


### Server Actions

For data mutations, use server actions:

```typescript
import { neon } from '@neondatabase/serverless';

export default async function Page() {

  async function create(formData: FormData) {
    "use server";
    const sql = neon(process.env.DATABASE_URL);
    await sql`CREATE TABLE IF NOT EXISTS comments (comment TEXT)`;
    const comment = formData.get("comment");
    await sql`INSERT INTO comments (comment) VALUES (${comment})`;
  }
  return (
    <form action={create}>
      <input type="text" placeholder="write a comment" name="comment" />
      <button type="submit">Submit</button>
    </form>
  );
}
```


### Caching Considerations

In production, Next.js statically renders server components at build time. For fresh data on each request, add:

```typescript
export const dynamic = 'force-dynamic';
```


## Adding Authentication with Neon Auth

### Enable Neon Auth

Enable Auth in your Neon project and copy your Auth URL from the Configuration page [(2)](https://neon.com/docs/auth/quick-start/nextjs-api-only) .

### Install Dependencies

```bash
ppnpm install @neondatabase/auth
```


### Configure Environment Variables

Create `.env.local`:

```
NEON_AUTH_BASE_URL=https://ep-xxx.neonauth.us-east-1.aws.neon.tech/neondb/auth
NEON_AUTH_COOKIE_SECRET=your-secret-at-least-32-characters-long
```


Generate a secure cookie secret with `openssl rand -base64 32`.

### Create Auth Server Instance

Create `lib/auth/server.ts`:

```typescript
import { createNeonAuth } from '@neondatabase/auth/next/server';

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});
```


### Set Up API Routes

Create `app/api/auth/[...path]/route.ts`:

```typescript
import { auth } from '@/lib/auth/server';

export const { GET, POST } = auth.handler();
```


### Create Client Instance

Create `lib/auth/client.ts`:

```typescript
'use client';
import { createAuthClient } from '@neondatabase/auth/next/client';

export const authClient = createAuthClient();
```


## Connection Pooling

For serverless and edge workloads, append `-pooler` to your hostname to enable PgBouncer connection pooling [(1)](https://neon.com/docs/guides/nextjs) .

## File Storage

Neon doesn't provide built-in file storage. For binary file data, use dedicated storage services and track metadata in Neon.