# Budget Ndio Story – Auth Implementation Plan

## Goal
Free, testable backend (Auth.js + Neon + Newsletter) → ready for VPS self-hosting later.

## Timeline
7–10 days (part-time)

## Tools
- Next.js (App Router)
- Neon (free Postgres)
- Auth.js (NextAuth v5)
- Resend (free email)
- Prisma (ORM)

---

## Phase 1 – Setup & Auth.js (Days 1–3)

### 1.1 Install Dependencies
```bash
pnpm add next-auth@beta @prisma/client resend zod
pnpm add -D prisma
```

### 1.2 Environment Variables (.env.local)
```env
DATABASE_URL="postgresql://..."          # Neon connection string
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="openssl rand -base64 32"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
RESEND_API_KEY="re_..."
EMAIL_FROM="info@budgetndiostory.org"
```

### 1.3 Prisma Setup
1. Run `npx prisma init`
2. Add models to `prisma/schema.prisma`:
   - User
   - Account
   - Session
   - VerificationToken
   - Subscriber
3. Run `npx prisma generate`
4. Run `npx prisma db push` (sync to Neon)

### 1.4 Auth.js Core
1. Create `app/api/auth/[...nextauth]/route.ts`
2. Configure Google provider + Prisma adapter
3. Add `components/AuthProvider.tsx` with SessionProvider
4. Create `lib/prisma.ts` for Prisma client singleton

### 1.5 Test
- Login/logout with Google
- Check Neon `users` table populated

---

## Phase 2 – Newsletter Subscription (Days 4–5)

### 2.1 Subscriber Model (already in Phase 1)
```prisma
model Subscriber {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

### 2.2 Subscribe API
Create `app/api/subscribe/route.ts`:
- POST endpoint
- Validate email with Zod
- Save to Neon
- Send welcome email via Resend

### 2.3 Update Newsletter Component
- Form submits to `/api/subscribe`
- Show success/error messages

### 2.4 Test
- Subscribe → email arrives
- Duplicate email rejected
- DB entry appears in Neon

---

## Phase 3 – Polish & Security Basics (Days 6–7)

### 3.1 Rate Limiting
- Add rate limiting on `/api/subscribe`
- Use simple in-memory or `next-rate-limit` (5 req/min per IP)

### 3.2 Input Validation
- Zod schema for email + optional name

### 3.3 Error Handling
- Return 400/429 with user-friendly JSON messages

### 3.4 Test Full Flows
- Login → subscribe → logout
- Try spam signup → rate limit triggers

---

## Phase 4 – Testing & Prep for VPS Migration (Days 8–10)

### 4.1 Local + Vercel Testing
- Google login
- Newsletter send/receive
- Progress saving (if added)

### 4.2 Neon → VPS Prep Checklist
- Export Neon schema/data: `pg_dump`
- VPS setup later: Postgres install → restore dump
- Update `DATABASE_URL` in env
- Deploy Next.js build to VPS (PM2 + Nginx)

---

## File Structure

```
budgetndiostory/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   └── subscribe/
│   │       └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AuthProvider.tsx
│   ├── Newsletter.tsx
│   └── Navbar.tsx  # updated with auth UI
├── lib/
│   ├── auth.ts
│   └── prisma.ts
├── middleware.ts
├── prisma/
│   └── schema.prisma
└── .env.local
```

---

## MVP Deliverables
- Google login working
- Newsletter subscription + welcome email
- Data stored in Neon
- Rate-limited & validated APIs
- Ready for VPS DB migration (just change connection string)
