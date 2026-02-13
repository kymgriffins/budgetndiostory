# Budget Ndio Story Backend Implementation Roadmap

This roadmap outlines the step-by-step implementation of key backend features for your Next.js app: **Auth.js** (authentication), a **mailing newsletter system** using your org email, and **database schema migration to Neon** with integration to Auth.js. The plan is designed for free-tier tools where possible (e.g., Neon free, Resend free tier), with scalability in mind. It assumes your current setup (Next.js frontend, placeholder UI for /learn and /tracker) and prepares for future VPS hosting (e.g., Ubuntu VPS with Postgres + Node.js).

The roadmap is phased for incremental development: **Setup → Core Implementation → Integration → Testing/Security → Deployment/Migration**. Estimated time: 1–2 weeks for MVP (assuming part-time dev in Ruiru/Kiambu with variable connectivity). Use Git for versioning.

## Prerequisites
- Next.js project set up (App Router preferred for 2026 standards).
- Free accounts: Neon (serverless Postgres), Vercel (hosting), Resend (email, free 3k/month), Google/GitHub (OAuth).
- Env vars: Store API keys securely (`.env.local` for dev, Vercel dashboard for prod).
- Tools: Prisma (ORM for DB), Zod (validation), Nodemailer/Resend (email).

## Phase 1: Project Setup & Tool Installation (1 Day)
1. **Install Dependencies**:
   - Auth.js: `ppnpm i next-auth`
   - Prisma: `pnpm i prisma @prisma/client` (for Neon DB integration)
   - Email: `pnpm i resend` (free tier; alternative: Nodemailer for SMTP if using Gmail/org email)
   - Others: `pnpm i zod` (validation), `pnpm i bcryptjs` (if custom credentials)
   - Dev: `pnpm i -D @types/bcryptjs`

2. **Configure Env Vars**:
   - `.env` example:
     ```
     DATABASE_URL="postgresql://[user]:[password]@neon-host:5432/budgetndio?sslmode=require"  # From Neon
     NEXTAUTH_URL="http://localhost:3000"  # Update to production URL later
     NEXTAUTH_SECRET="supersecretkey"  # Generate with `openssl rand -base64 32`
     GOOGLE_CLIENT_ID=""
     GOOGLE_CLIENT_SECRET=""
     RESEND_API_KEY=""  # For newsletter
     EMAIL_FROM="info@budgetndiostory.org"
     ```

3. **Test Setup**:
   - Run `npx prisma init` to create `prisma/schema.prisma`.
   - Verify: `pnpm run dev` — no errors.

## Phase 2: Auth.js Implementation (2–3 Days)
Auth.js for user login (Google/GitHub + email magic links), progress saving, newsletter subs. Use Prisma adapter for Neon DB sync.

1. **Basic Auth Setup**:
   - Create `/app/api/auth/[...nextauth]/route.ts` (App Router):
     ```ts
     import NextAuth from "next-auth";
     import GoogleProvider from "next-auth/providers/google";
     import { PrismaAdapter } from "@auth/prisma-adapter";
     import prisma from "@/lib/prisma";  // Your Prisma client

     export const authOptions = {
       adapter: PrismaAdapter(prisma),
       providers: [
         GoogleProvider({
           clientId: process.env.GOOGLE_CLIENT_ID!,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
         }),
         // Add GitHub similarly
       ],
       secret: process.env.NEXTAUTH_SECRET,
       session: { strategy: "jwt" },
     };

     const handler = NextAuth(authOptions);
     export { handler as GET, handler as POST };
     ```
   - Update `prisma/schema.prisma` with Auth.js models (auto-generated via adapter).

2. **Add Email Magic Links** (Optional for MVP):
   - Add provider: `EmailProvider({ server: { host: 'smtp.resend.com', port: 587, auth: { user: 'resend', pass: process.env.RESEND_API_KEY } }, from: process.env.EMAIL_FROM })`

3. **Frontend Integration**:
   - In layout/component: Use `useSession()` for protected routes (e.g., save progress only if logged in).
     ```tsx
     import { useSession, signIn, signOut } from "next-auth/react";

     // Example in Navbar
     const { data: session } = useSession();
     {session ? <button onClick={signOut}>Logout</button> : <button onClick={() => signIn("google")}>Login with Google</button>}
     ```

4. **Test Auth**:
   - Login/logout flows.
   - Protected API: In `/api/progress`, check `session.user.id` before saving.

**Progress Milestone**: Basic login working; users table in Neon populated.

## Phase 3: Mailing Newsletter System (1–2 Days)
Use Resend for sending newsletters (integrate with your org email). Store subscribers in Neon DB.

1. **DB Schema for Subscribers**:
   - In `prisma/schema.prisma`:
     ```prisma
     model Subscriber {
       id        Int      @id @default(autoincrement())
       email     String   @unique
       name      String?
       interests String[] // e.g., ["budget-basics", "clinics"]
       subscribedAt DateTime @default(now())
     }
     ```

2. **Newsletter API**:
   - `/api/subscribe.ts`: POST endpoint to add subscriber.
     ```ts
     import { Resend } from "resend";
     import prisma from "@/lib/prisma";

     export default async function handler(req, res) {
       if (req.method === "POST") {
         const { email } = req.body;
         await prisma.subscriber.create({ data: { email } });
         const resend = new Resend(process.env.RESEND_API_KEY);
         await resend.emails.send({
           from: process.env.EMAIL_FROM,
           to: email,
           subject: "Welcome to Budget Ndio Story",
           html: "<p>Thanks for subscribing!</p>",
         });
         res.status(200).json({ success: true });
       }
     }
     ```

3. **Frontend Form**:
   - In Newsletter component: Fetch API on submit.
   - Add unsubscribe: `/api/unsubscribe` endpoint.

4. **Bulk Mailing**:
   - Use Resend campaigns (manual via dashboard for now) or cron job (Vercel Cron) to send newsletters to all subscribers.

5. **Test**:
   - Subscribe/unsubscribe; check emails arrive (use test mode in Resend).

**Progress Milestone**: Newsletter form works; emails send via org address.

## Phase 4: Schema to Neon & Auth.js Integration (2–3 Days)
Migrate your Postgres schema to Neon (serverless, free 0.5GB/1 project).

1. **Neon Setup**:
   - Create Neon project; get `DATABASE_URL` (psql connection string).
   - Update `.env`: Replace old DB URL with Neon's.

2. **Schema Migration**:
   - Run `npx prisma migrate dev --name init` to apply your schema (from earlier SQL) to Neon.
   - Seed data: Create `/prisma/seed.ts` with mock courses/subscribers; run `npx prisma db seed`.

3. **Connect Auth.js to Neon**:
   - Use Prisma adapter (as in Phase 2) — Auth.js auto-creates user tables in Neon.
   - For progress: Add `Progress` model in schema; link to User ID.
     ```prisma
     model User {
       id String @id @default(uuid())
       // Auth.js fields...
       progress Progress[]
     }
     model Progress {
       id Int @id @default(autoincrement())
       userId String
       courseId String
       completed Boolean
       user User @relation(fields: [userId], references: [id])
     }
     ```
   - In API: Check session before saving progress.

4. **Test Integration**:
   - Login → save progress → query DB via Prisma Studio (Neon dashboard).

**Progress Milestone**: Schema live on Neon; auth syncs users/progress.

## Phase 5: Testing, Security & Scalability (2 Days)
1. **Rate Limiting**: Add to API routes (e.g., `/api/subscribe`): Use `next-rate-limit` (free).
2. **Security**: Enable Neon RLS; validate inputs with Zod; HTTPS via Vercel.
3. **Scalability**: Neon auto-scales reads; Vercel handles API bursts (free up to 100k req/month).
4. **Test**: Unit (Jest for APIs), e2e (Playwright for login/newsletter), load (Artillery for 1k users).

## Phase 6: VPS Migration Roadmap (Future-Proof – 1 Week When Ready)
When outgrowing free tiers (e.g., 40k MAU):
1. **Prep**: Export Neon DB dump; copy schema to self-hosted Postgres (install on VPS via apt).
2. **VPS Setup**: Ubuntu 24.04 + Postgres 16 + Node.js 20 + PM2 (process manager) + Nginx (reverse proxy).
3. **Migrate**:
   - DB: Restore dump to VPS Postgres; update `DATABASE_URL`.
   - App: Deploy Next.js to VPS (build + pm2 start).
   - Auth: Keep Auth.js (update env vars); email via SMTP (Gmail free limit or Postmark).
4. **Scaling**: Add Redis (for rate limits/sessions), Cloudflare CDN (free), auto-backups (cron pg_dump).
5. **Test**: Local VPS sim (Docker); monitor with PM2 logs.

**Total Perks**: Secure, scalable auth + newsletters from day 1, free until growth, easy VPS shift. Start with Phase 1 today! If stuck, share error logs.