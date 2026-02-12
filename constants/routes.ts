/**
 * Centralized Route Constants for Budget Ndio Story
 * 
 * Features:
 * - Feature-grouped for scalability
 * - Type-safe with `as const` for full TypeScript inference
 * - DRY: Nav items derived from routes
 * - App Router conventions
 * 
 * Usage:
 * - Static routes: ROUTES.HOME, FEATURE_ROUTES.TRACKER
 * - Dynamic routes: getPodcastEpisodePath("ep-1")
 * - Navigation: MAIN_NAV_ITEMS, MOBILE_NAV_ITEMS
 */

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC ROUTES - Core public-facing pages
// ─────────────────────────────────────────────────────────────────────────────
export const PUBLIC_ROUTES = {
  HOME: "/" as const,
  ABOUT: "/about" as const,
  CONTACT: "/contact" as const,
  PRIVACY: "/privacy" as const,
  TERMS: "/terms" as const,
  SEARCH: "/search" as const,
  LANDING: "/landing" as const,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE ROUTES - Core feature pages (matches PRD naming)
// ─────────────────────────────────────────────────────────────────────────────
export const FEATURE_ROUTES = {
  TRACKER: "/tracker" as const,
  STORIES: "/stories" as const,       // Preferred: /stories (matches PRD)
  BLOG: "/blog" as const,             // Keep for legacy/redirects
  PODCASTS: "/podcasts" as const,
  SHORTS: "/shorts" as const,         // Short-form videos
  PARTICIPATE: "/participate" as const,
  LEARN: "/learn" as const,
  EDUSTORIES: "/edustories" as const,
  BUDGET_SIMPLIFIED: "/budget-simplified" as const,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// LEGACY / TESTING ROUTES - Keep for redirects/cleanup, avoid using in new code
// ─────────────────────────────────────────────────────────────────────────────
export const LEGACY_ROUTES = {
  HOME_ALT: "/home" as const,
  WORKIZ: "/workiz" as const,
  MVP1: "/mvp1" as const,
  CASE: "/case" as const,
  PRESENTATION: "/presentation" as const,
  INSIGHTS: "/insights" as const,
  SERVICES: "/services" as const,
  CONFIG: "/config" as const,
  FUNDS: "/funds" as const,
  BILLING: "/billing" as const,
  BUDGETNDIOSTORY: "/budgetndiostory" as const,
  EDU: "/edu" as const,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN / INTERNAL ROUTES - Protect these with authentication!
// ─────────────────────────────────────────────────────────────────────────────
export const ADMIN_ROUTES = {
  ADMIN: "/admin" as const,
  ADMIN_BLOG: "/admin/blog" as const,
  ANALYTICS: "/analytics" as const,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC ROUTES - Helpers for generating dynamic paths
// ─────────────────────────────────────────────────────────────────────────────
export const DYNAMIC_ROUTES = {
  LEARN_COURSE: (id: string) => `/learn/${id}` as const,
  EDU_COURSE: (id: string) => `/edu/${id}` as const,
  PODCAST_EPISODE: (id: string | number) => `/podcasts/${id}` as const,
  STORY_DETAIL: (slug: string) => `/stories/${slug}` as const,
  BLOG_POST: (slug: string) => `/blog/${slug}` as const,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// COMBINED ALL ROUTES - Single source for type inference
// ─────────────────────────────────────────────────────────────────────────────
export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...FEATURE_ROUTES,
  ...ADMIN_ROUTES,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// TYPE UTILITIES
// ─────────────────────────────────────────────────────────────────────────────
/** Static route type (excludes dynamic helpers) */
export type StaticRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** Union of all route types including dynamic routes */
export type RoutePath = 
  | StaticRoute 
  | ReturnType<(typeof DYNAMIC_ROUTES)[keyof typeof DYNAMIC_ROUTES]>;

/** Type for navigation item arrays */
export type NavItem = {
  title: string;
  href: StaticRoute;
  id?: number;
};

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION ITEMS - Derived from routes (DRY principle)
// ─────────────────────────────────────────────────────────────────────────────
export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  { title: "Home", href: PUBLIC_ROUTES.HOME, id: 1 },
  { title: "Tracker", href: FEATURE_ROUTES.TRACKER, id: 2 },
  { title: "Stories", href: FEATURE_ROUTES.STORIES, id: 3 },
  { title: "Podcasts", href: FEATURE_ROUTES.PODCASTS, id: 4 },
  { title: "Videos", href: FEATURE_ROUTES.SHORTS, id: 5 },
  { title: "Participate", href: FEATURE_ROUTES.PARTICIPATE, id: 6 },
  { title: "About", href: PUBLIC_ROUTES.ABOUT, id: 7 },
] as const;

export const MOBILE_NAV_ITEMS: readonly NavItem[] = [
  { title: "Home", href: PUBLIC_ROUTES.HOME, id: 1 },
  { title: "Tracker", href: FEATURE_ROUTES.TRACKER, id: 2 },
  { title: "Stories", href: FEATURE_ROUTES.STORIES, id: 3 },
  { title: "Podcasts", href: FEATURE_ROUTES.PODCASTS, id: 4 },
  { title: "Videos", href: FEATURE_ROUTES.SHORTS, id: 5 },
  { title: "Participate", href: FEATURE_ROUTES.PARTICIPATE, id: 6 },
  { title: "About", href: PUBLIC_ROUTES.ABOUT, id: 7 },
  { title: "Contact", href: PUBLIC_ROUTES.CONTACT, id: 8 },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER HIDE LOGIC - Only hide true landing/experimental pages
// ─────────────────────────────────────────────────────────────────────────────
export const FOOTER_HIDE_PATHS = [
  "/video-landing",
  PUBLIC_ROUTES.LANDING,
  // Only add true landing pages or experimental layouts here
  // Don't hide core content pages (tracker, podcasts, etc.)
] as const;

/**
 * Check if footer should be hidden for given pathname
 */
export function shouldHideFooter(pathname: string): boolean {
  const cleanPath = pathname.replace(/\/$/, "") || "/";
  return FOOTER_HIDE_PATHS.includes(cleanPath as (typeof FOOTER_HIDE_PATHS)[number]);
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS - For dynamic route generation
// ─────────────────────────────────────────────────────────────────────────────
export function getLearnCourseUrl(courseId: string): string {
  return `/learn/${courseId.toLowerCase()}`;
}

export function getEduCourseUrl(courseId: string): string {
  return `/edu/${courseId.toLowerCase()}`;
}

export function getPodcastEpisodeUrl(id: string | number): string {
  return `/podcasts/${id}`;
}

export function getStoryDetailUrl(slug: string): string {
  return `/stories/${slug}`;
}

export function getBlogPostUrl(slug: string): string {
  return `/blog/${slug}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS FOR BACKWARD COMPATIBILITY
// ─────────────────────────────────────────────────────────────────────────────
// These exports ensure existing imports continue to work during migration
export { 
  PUBLIC_ROUTES as PUBLIC, 
  FEATURE_ROUTES as FEATURE,
  ADMIN_ROUTES as ADMIN,
  LEGACY_ROUTES as LEGACY,
};
