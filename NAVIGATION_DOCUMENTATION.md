# Budget Ndio Story - Navigation Documentation

## Overview

The Budget Ndio Story application uses **Next.js 14** with file-based routing. Navigation is managed through a centralized routing system for consistency and maintainability.

## Navigation Structure

### Primary Navigation Components

| Component      | File                                                             | Description                                    |
| -------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| Navbar         | [`components/Navbar.tsx`](components/Navbar.tsx)                 | Desktop navigation with scroll-based hide/show |
| MobileNav      | [`components/MobileNav.tsx`](components/MobileNav.tsx)           | Mobile/tablet hamburger menu navigation        |
| PageTransition | [`components/PageTransition.tsx`](components/PageTransition.tsx) | Framer Motion page transitions                 |

### Centralized Route Management

All routes are now defined in a single location for easy maintenance:

**File:** [`lib/routes.ts`](lib/routes.ts)

```typescript
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  SERVICES: "/services",
  INSIGHTS: "/insights",
  CASE: "/case",
  PRESENTATION: "/presentation",
  STORIES: "/stories",
  TRACKER: "/tracker",
  PODCASTS: "/podcasts",
  SHORTS: "/shorts",
  PARTICIPATE: "/participate",
  HOME_ALT: "/home",
  LANDING: "/landing",
  ANALYTICS: "/analytics",
  BUDGET_SIMPLIFIED: "/budget-simplified",
  BUDGETNDIOSTORY: "/budgetndiostory",
  WORKIZ: "/workiz",
  EDUSTORIES: "/edustories",
} as const;
```

---

## All Application Routes

### Static Routes

| Route                | File                                                                     | Purpose             |
| -------------------- | ------------------------------------------------------------------------ | ------------------- |
| `/`                  | [`pages/index.tsx`](pages/index.tsx)                                     | Home/Landing page   |
| `/about`             | [`pages/about/index.tsx`](pages/about/index.tsx)                         | About page          |
| `/contact`           | [`pages/contact/index.tsx`](pages/contact/index.tsx)                     | Contact page        |
| `/services`          | [`pages/services/index.tsx`](pages/services/index.tsx)                   | Services page       |
| `/insights`          | [`pages/insights/index.tsx`](pages/insights/index.tsx)                   | Insights/Blog       |
| `/case`              | [`pages/case/index.tsx`](pages/case/index.tsx)                           | Case studies        |
| `/presentation`      | [`pages/presentation/index.tsx`](pages/presentation/index.tsx)           | Presentations       |
| `/stories`           | [`pages/stories/index.tsx`](pages/stories/index.tsx)                     | Budget stories      |
| `/tracker`           | [`pages/tracker/index.tsx`](pages/tracker/index.tsx)                     | Budget tracker      |
| `/podcasts`          | [`pages/podcasts/index.tsx`](pages/podcasts/index.tsx)                   | Podcast listing     |
| `/shorts`            | [`pages/shorts/index.tsx`](pages/shorts/index.tsx)                       | Short videos        |
| `/participate`       | [`pages/participate/index.tsx`](pages/participate/index.tsx)             | Get involved        |
| `/home`              | [`pages/home/index.tsx`](pages/home/index.tsx)                           | Alternative home    |
| `/landing`           | [`pages/landing/index.tsx`](pages/landing/index.tsx)                     | Marketing landing   |
| `/analytics`         | [`pages/analytics/index.tsx`](pages/analytics/index.tsx)                 | Dashboard           |
| `/budget-simplified` | [`pages/budget-simplified/index.tsx`](pages/budget-simplified/index.tsx) | Simplified guide    |
| `/budgetndiostory`   | [`pages/budgetndiostory/index.tsx`](pages/budgetndiostory/index.tsx)     | Main platform       |
| `/workiz`            | [`pages/workiz/index.tsx`](pages/workiz/index.tsx)                       | Work showcase       |
| `/edustories`        | [`pages/edustories/index.tsx`](pages/edustories/index.tsx)               | Educational stories |

### Dynamic Routes

| Route            | File                                                 | Purpose                                              |
| ---------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `/edu/[id]`      | [`pages/edu/[id].tsx`](pages/edu/[id].tsx)           | Course viewer (id: basics, reading, tracking, civic) |
| `/podcasts/[id]` | [`pages/podcasts/[id].tsx`](pages/podcasts/[id].tsx) | Podcast player (id: 1-8)                             |

---

## Navigation Items

### Desktop Navbar Items

**Imported from:** [`lib/routes.ts`](lib/routes.ts)

```typescript
export const NAV_ITEMS = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "Stories", href: "/stories" },
  { id: 3, title: "Tracker", href: "/tracker" },
  { id: 8, title: "Edu", href: "/edu" },
  { id: 4, title: "Podcasts", href: "/podcasts" },
  { id: 7, title: "Contact", href: "/contact" },
] as const;
```

### Mobile Navigation Items

```typescript
export const MOBILE_NAV_ITEMS = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "Podcasts", href: "/podcasts" },
  { id: 3, title: "Tracker", href: "/tracker" },
  { id: 4, title: "Stories", href: "/stories" },
  { id: 5, title: "Contact us", href: "/contact" },
] as const;
```

---

## Page Transition Architecture

### Flow Diagram

```
User clicks link → Navbar/MobileNav → Link component → _app.tsx
                                                      ↓
                                              AnimatePresence
                                                      ↓
                                              PageTransition
                                                      ↓
                                              New page mounts
```

### Transition Configuration

**File:** [`components/PageTransition.tsx`](components/PageTransition.tsx)

```typescript
const defaultVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};
```

**Available variants:**

- `defaultVariants` - Fade up/down (0.5s)
- `slideVariants` - Slide left/right
- `scaleVariants` - Scale in/out
- `flipVariants` - 3D flip effect

### App-level Transition Control

**File:** [`pages/_app.tsx`](pages/_app.tsx)

```typescript
<AnimatePresence mode="popLayout">
  <Component key={router.route} {...pageProps} />
</AnimatePresence>
```

---

## Footer Visibility Control

Footer display is managed centrally in [`lib/routes.ts`](lib/routes.ts):

```typescript
export const FOOTER_HIDE_ROUTES = [
  "/",
  "/contact",
  "/landing",
  "/home",
  "/services",
  "/insights",
  "/case",
  "/presentation",
  "/budgetndiostory",
  "/workiz",
  "/stories",
  "/tracker",
  "/podcasts",
  "/shorts",
  "/budget-simplified",
  "/analytics",
] as const;
```

**Usage in [`pages/_app.tsx`](pages/_app.tsx):**

```typescript
import { FOOTER_HIDE_ROUTES } from "@/lib/routes";

const shouldHideFooter = FOOTER_HIDE_ROUTES.includes(path as any);
```

---

## Edu Section Route Structure

### Nested Navigation

```
/edu (Learning Path overview)
├── /edu/basics (Budget Basics course)
├── /edu/reading (Reading the Budget course)
├── /edu/tracking (Tracking Spending course)
└── /edu/civic (Civic Action course)
```

### Data Management

**File:** [`lib/edu-data.ts`](lib/edu-data.ts)

Helper functions for navigation:

```typescript
getAllCourses(); // List all courses
getCourseById(id); // Get single course
getLessonById(courseId, lessonId); // Get lesson
getNextLesson(courseId, lessonId); // Navigate forward
getPreviousLesson(courseId, lessonId); // Navigate backward
courseExists(courseId); // Validate course
```

### Dynamic Route Helper Functions

**File:** [`lib/routes.ts`](lib/routes.ts)

```typescript
// Generate dynamic route URLs
getEduCourseUrl(courseId: string): string       // Returns `/edu/${courseId}`
getPodcastEpisodeUrl(id: string | number): string  // Returns `/podcasts/${id}`
```

---

## Helper Functions

### Check Footer Visibility

```typescript
import { shouldHideFooter } from "@/lib/routes";

if (shouldHideFooter("/services")) {
  // Don't show footer
}
```

### Generate Dynamic URLs

```typescript
import { getEduCourseUrl, getPodcastEpisodeUrl } from "@/lib/routes";

// In components
<Link href={getEduCourseUrl("basics")}>Budget Basics</Link>
<Link href={getPodcastEpisodeUrl(1)}>Episode 1</Link>
```

---

## Bug Fixes Applied

### 1. Fixed Mobile Nav Contact Link

**Before:**

```typescript
{ id: 5, title: "Contact us", href: "contact" }  // Missing leading slash
```

**After:**

```typescript
{ id: 5, title: "Contact us", href: "/contact" }  // Fixed
```

**File:** [`constants/index.ts`](constants/index.ts:135)

### 2. Fixed Broken Home Page Link

**Before:**

```typescript
<Link href="/edustories">Explore Stories</Link>  // Route doesn't exist
```

**After:**

```typescript
<Link href="/stories">Explore Stories</Link>  // Points to existing route
```

**File:** [`pages/index.tsx`](pages/index.tsx:322)

### 3. Improved Back Navigation

**Before (Edu Course):**

```typescript
<button onClick={() => router.push("/edu")}>Back</button>
```

**After:**

```typescript
<button onClick={() => router.back()}>Back</button>
```

**File:** [`pages/edu/[id].tsx`](pages/edu/[id].tsx:100)

**Before (Podcast Player):**

```typescript
<Link href="/podcasts">Back</Link>
```

**After:**

```typescript
<button onClick={() => router.back()}>Back</button>
```

**File:** [`pages/podcasts/[id].tsx`](pages/podcasts/[id].tsx:339)

---

## Recommended Improvements

### 1. Centralize Route Constants

Routes are now centralized in [`lib/routes.ts`](lib/routes.ts) with:

- Static route constants
- Dynamic route helper functions
- Navigation items for Navbar and MobileNav
- Footer visibility control

### 2. Use Router.back() for Back Navigation

Always use `router.back()` for back buttons to maintain browser history:

```typescript
import { useRouter } from "next/navigation";

export default function MyComponent() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      Go Back
    </button>
  );
}
```

### 3. Use Helper Functions for Dynamic Routes

Instead of hard-coding dynamic routes:

```typescript
// Bad
<Link href={`/edu/${courseId}`}>Course</Link>
<Link href={`/podcasts/${episodeId}`}>Episode</Link>

// Good
import { getEduCourseUrl, getPodcastEpisodeUrl } from "@/lib/routes";

<Link href={getEduCourseUrl(courseId)}>Course</Link>
<Link href={getPodcastEpisodeUrl(episodeId)}>Episode</Link>
```

---

## Quick Reference: File Locations

| Component        | File                                                             | Lines |
| ---------------- | ---------------------------------------------------------------- | ----- |
| Route Constants  | [`lib/routes.ts`](lib/routes.ts)                                 | 1-100 |
| Navbar           | [`components/Navbar.tsx`](components/Navbar.tsx)                 | 1-60  |
| MobileNav        | [`components/MobileNav.tsx`](components/MobileNav.tsx)           | 1-73  |
| PageTransition   | [`components/PageTransition.tsx`](components/PageTransition.tsx) | 1-157 |
| App Config       | [`pages/_app.tsx`](pages/_app.tsx)                               | 1-54  |
| Route Exports    | [`constants/index.ts`](constants/index.ts)                       | 37-41 |
| Edu Data         | [`lib/edu-data.ts`](lib/edu-data.ts)                             | 1-588 |
| Edu Index        | [`pages/edu/index.tsx`](pages/edu/index.tsx)                     | 1-32  |
| Edu Dynamic      | [`pages/edu/[id].tsx`](pages/edu/[id].tsx)                       | 1-124 |
| Podcasts Index   | [`pages/podcasts/index.tsx`](pages/podcasts/index.tsx)           | -     |
| Podcasts Dynamic | [`pages/podcasts/[id].tsx`](pages/podcasts/[id].tsx)             | 1-680 |
| Home Page        | [`pages/index.tsx`](pages/index.tsx)                             | 1-913 |

---

## Summary Statistics

- **Total static routes**: 20
- **Total dynamic routes**: 2
- **Navigation menus**: 2 (Navbar, MobileNav)
- **Animation libraries**: 3 (Framer Motion, GSAP, Locomotive Scroll)
- **Bug fixes applied**: 3

---

## Adding New Routes

### Step 1: Add to ROUTES in lib/routes.ts

```typescript
export const ROUTES = {
  // ... existing routes
  NEW_PAGE: "/new-page",
} as const;
```

### Step 2: Add to Navigation (if needed)

```typescript
export const NAV_ITEMS = [
  // ... existing items
  { id: X, title: "New Page", href: ROUTES.NEW_PAGE },
] as const;
```

### Step 3: Update Footer Visibility (if needed)

```typescript
export const FOOTER_HIDE_ROUTES = [
  // ... existing routes
  ROUTES.NEW_PAGE,
] as const;
```

### Step 4: Create the Page

Create `pages/new-page/index.tsx` for the new route.

---

## Performance Considerations

1. **Route Prefetching**: Next.js Link components automatically prefetch routes in the viewport
2. **Code Splitting**: Dynamic imports for heavy components
3. **Animation Optimization**: Consider reducing animation complexity on mobile devices
4. **Lazy Loading**: Use `React.lazy()` for components not needed on initial load

---

_Last Updated: February 2025_
_Maintained by: Development Team_
