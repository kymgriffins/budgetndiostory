# 10/10 Architecture Improvement Plan

## Current State Analysis

| Area               | Current State                            | 10/10 Target                  | Gap      |
| ------------------ | ---------------------------------------- | ----------------------------- | -------- |
| **Routing**        | Pages Router (`pages/` directory)        | App Router (`app/` directory) | Major    |
| **API Layer**      | Traditional API routes with manual types | tRPC + TanStack Query         | Major    |
| **Database**       | In-memory storage (no persistence)       | Drizzle ORM with PostgreSQL   | Critical |
| **Type Safety**    | Manual type definitions                  | End-to-end type safety        | Major    |
| **Components**     | Custom patterns, no shadcn/ui            | Atomic Design + shadcn/ui     | Medium   |
| **Testing**        | No test setup                            | Vitest + Playwright           | Critical |
| **Error Handling** | Basic try/catch                          | Sentry + Error Boundaries     | Major    |
| **Performance**    | Basic optimization                       | PPR + React Compiler          | Medium   |
| **Layout System**  | Custom `getLayout` pattern               | Nested layouts + route groups | Medium   |

---

## Priority 1: Critical Improvements

### 1.1 Add Testing Infrastructure

**Why:** No tests = no confidence in refactoring.

```bash
# Install dependencies
pnpm add -D vitest @testing-library/react @testing-library/user-event @playwright/test
```

**Files to create:**

- `vitest.config.ts`
- `tests/setup.ts`
- `tests/unit/components/button.test.tsx`
- `tests/e2e/home.spec.ts`

**Tasks:**

- [ ] Create `vitest.config.ts` with React Testing Library setup
- [ ] Create `tests/setup.ts` for global test configuration
- [ ] Add basic component tests for critical UI components
- [ ] Add Playwright E2E tests for user flows

### 1.2 Add Observability (Error Tracking)

**Why:** Production errors need monitoring, not just console logs.

```bash
pnpm add @sentry/nextjs
```

**Tasks:**

- [ ] Configure `sentry.client.config.ts`
- [ ] Configure `sentry.server.config.ts`
- [ ] Create error boundary components
- [ ] Add error boundary to dashboard routes

### 1.3 Implement Type-Safe API Layer (tRPC)

**Why:** Manual type definitions are error-prone and hard to maintain.

```bash
pnpm add @trpc/server @trpc/client @tanstack/react-query @trpc/react-query
pnpm add zod
```

**Current API routes to migrate:**

- `pages/api/analytics.ts`
- `pages/api/billing/*`
- `pages/api/blog/*`
- `pages/api/funds/*`

**Tasks:**

- [ ] Create tRPC router structure in `lib/trpc/router.ts`
- [ ] Create tRPC React provider in `lib/trpc/react.tsx`
- [ ] Migrate analytics API endpoints to tRPC procedures
- [ ] Migrate billing API endpoints to tRPC procedures
- [ ] Migrate blog API endpoints to tRPC procedures

---

## Priority 2: Major Architecture Changes

### 2.1 Migrate to App Router

**Why:** Pages Router is legacy. App Router provides RSC, nested layouts, streaming.

**Migration Strategy:**

```
Current:                    Target:
pages/                     app/
├── _app.tsx               ├── layout.tsx              # Root layout
├── _document.tsx          ├── not-found.tsx
├── index.tsx              ├── page.tsx                # Home
├── about/                 ├── (marketing)/             # Route group
├── blog/                  │   ├── layout.tsx
├── contact/              │   ├── page.tsx
├── edu/                   │   ├── about/
├── learn/                 │   ├── blog/
├── services/              │   └── contact/
├── workiz/                ├── (dashboard)/            # Auth-gated group
├── admin/                 │   ├── layout.tsx
└── api/                   │   ├── page.tsx
    ├── analytics.ts       │   └── admin/
    ├── billing/           └── api/
    ├── blog/                  └── trpc/
    └── funds/                   └── [trpc]/
                                └── route.ts
```

**Tasks:**

- [ ] Create root `app/layout.tsx` with fonts, metadata, providers
- [ ] Create route groups `(marketing)` and `(dashboard)`
- [ ] Migrate home page to `app/page.tsx`
- [ ] Migrate about page to `app/(marketing)/about/page.tsx`
- [ ] Migrate blog to `app/(marketing)/blog/page.tsx` and dynamic slug
- [ ] Migrate edu page to `app/(marketing)/edu/page.tsx`
- [ ] Create `app/(dashboard)/layout.tsx` for admin routes
- [ ] Create tRPC API route at `app/api/trpc/[trpc]/route.ts`
- [ ] Remove `pages/` directory after successful migration

### 2.2 Database Setup with Drizzle ORM

**Why:** In-memory storage is not production-ready. Need persistent data.

```bash
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit @types/pg
```

**Schema design:**

```typescript
// lib/db/schema.ts
import { pgTable, serial, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 512 }).notNull(),
  referrer: varchar("referrer", { length: 512 }),
  userAgent: text("user_agent"),
  screenWidth: integer("screen_width"),
  screenHeight: integer("screen_height"),
  country: varchar("country", { length: 100 }),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});
```

**Tasks:**

- [ ] Create database schema in `lib/db/schema.ts`
- [ ] Create database connection in `lib/db/index.ts`
- [ ] Set up environment variables for database URL
- [ ] Create migration scripts with drizzle-kit
- [ ] Seed initial data for development

### 2.3 Implement shadcn/ui Component Library

**Why:** Reusable, accessible primitives that you own and customize.

```bash
pnpm dlx shadcn@latest init
```

**Components to add:**

- [ ] Button (`components/ui/button.tsx`)
- [ ] Card (`components/ui/card.tsx`)
- [ ] Dialog (`components/ui/dialog.tsx`)
- [ ] Form (`components/ui/form.tsx`)
- [ ] Input (`components/ui/input.tsx`)
- [ ] Table (`components/ui/table.tsx`)

**Tasks:**

- [ ] Initialize shadcn/ui with default settings
- [ ] Add required shadcn primitives
- [ ] Create domain-specific composites:
  - `components/marketing/navbar.tsx`
  - `components/dashboard/sidebar.tsx`
  - `components/shared/data-table.tsx`

---

## Priority 3: Performance & DX Improvements

### 3.1 Enable Next.js Experimental Features

**Current `next.config.mjs` needs updates:**

```typescript
const nextConfig = {
  experimental: {
    ppr: true, // Partial Prerendering
    reactCompiler: true, // Automatic memoization
  },
  // ... existing config
};
```

**Tasks:**

- [ ] Add PPR configuration
- [ ] Add React Compiler configuration
- [ ] Verify bundle size with new features

### 3.2 Implement Container Queries

**Why:** Component-based responsiveness, not viewport-based.

```css
/* styles/globals.css */
@layer utilities {
  .container-prose {
    container-type: inline-size;
    container-name: prose;
  }
}
```

**Tasks:**

- [ ] Add container query utilities to CSS
- [ ] Update responsive grid components to use container queries
- [ ] Create `ProjectGrid` component with container query responsiveness

### 3.3 Add Error Boundaries

**Why:** Graceful degradation when components fail.

```typescript
// components/shared/error-boundary.tsx
"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <h2 className="text-lg font-semibold">Something went wrong</h2>
          <p className="text-muted-foreground">{this.state.error?.message}</p>
          <Button onClick={() => this.setState({ hasError: false })}>
            Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

**Tasks:**

- [ ] Create shared error boundary component
- [ ] Add error boundary to blog post renderer
- [ ] Add error boundary to data visualization components
- [ ] Add route-level error boundaries in App Router

---

## Priority 4: Component Architecture Refinement

### 4.1 Atomic Design Structure

```
components/
├── ui/                    # shadcn/ui primitives (npx shadcn add)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── table.tsx
│   └── ...
│
├── marketing/             # Domain-specific composites
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── footer.tsx
│   └── pricing-grid.tsx
│
├── dashboard/
│   ├── sidebar.tsx
│   ├── analytics-chart.tsx
│   └── data-table.tsx
│
└── shared/                # Cross-domain utilities
    ├── error-boundary.tsx
    ├── loading-skeleton.tsx
    ├── empty-state.tsx
    └── data-provider.tsx
```

**Tasks:**

- [ ] Reorganize components into atomic structure
- [ ] Create missing shared utilities (loading-skeleton, empty-state)
- [ ] Migrate existing components to new structure

### 4.2 Standardize Component API

**Every component should have:**

- Props interface with proper types
- ForwardRef for compound components
- Storybook stories (optional)
- Unit tests

```typescript
// components/ui/button.tsx (example)
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1)

- [ ] Add testing infrastructure (Vitest + Playwright)
- [ ] Add Sentry error tracking
- [ ] Create initial error boundary components

### Phase 2: Data Layer (Week 2)

- [ ] Set up Drizzle ORM with PostgreSQL
- [ ] Create database schema
- [ ] Implement tRPC API layer
- [ ] Migrate analytics API to tRPC

### Phase 3: App Router Migration (Week 3)

- [ ] Create App Router structure
- [ ] Migrate all pages from `pages/` to `app/`
- [ ] Implement nested layouts with route groups
- [ ] Set up tRPC client in App Router

### Phase 4: Component Library (Week 4)

- [ ] Initialize shadcn/ui
- [ ] Add required primitives
- [ ] Refactor components to atomic structure
- [ ] Create domain-specific composites

### Phase 5: Polish (Week 5)

- [ ] Enable PPR and React Compiler
- [ ] Add container queries
- [ ] Complete error boundary implementation
- [ ] Performance audit and optimization

---

## Quick Wins (Can Do Now)

1. **Add React Compiler** - Single line change in `next.config.mjs`
2. **Create Error Boundary** - No dependencies needed
3. **Add Vitest setup** - Minimal configuration
4. **Organize components** - No code changes, just file moves

## Dependencies Summary

| Package                | Purpose              | Priority |
| ---------------------- | -------------------- | -------- |
| vitest                 | Unit testing         | Critical |
| @testing-library/react | Component testing    | Critical |
| @playwright/test       | E2E testing          | Critical |
| @sentry/nextjs         | Error tracking       | Critical |
| @trpc/server           | Type-safe API        | Major    |
| @trpc/client           | Type-safe API client | Major    |
| @tanstack/react-query  | Data fetching        | Major    |
| drizzle-orm            | Database ORM         | Major    |
| shadcn/ui              | Component library    | Medium   |

---

## Next Steps

1. **Review this plan** - Are the priorities correct?
2. **Start with Quick Wins** - These can be done immediately
3. **Phase 1 tasks** - Foundation before architecture
4. **Decide on database** - PostgreSQL or continue with current setup?

Would you like me to:

1. Start implementing the Quick Wins now?
2. Focus on a specific phase first?
3. Adjust priorities based on your needs?
