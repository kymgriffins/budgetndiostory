/**
 * Centralized Route Constants
 * Use these constants throughout the app to ensure consistent routing
 */

// Static Routes
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
  LEARN: "/learn",
  BLOG: "/blog",
  ADMIN_BLOG: "/admin/blog",
  MVP1: "/mvp1",
} as const;

// Dynamic Routes
export const DYNAMIC_ROUTES = {
  LEARN_COURSE: (id: string) => `/learn/${id}`,
  EDU_COURSE: (id: string) => `/edu/${id}`,
  PODCAST_EPISODE: (id: string | number) => `/podcasts/${id}`,
} as const;

// Navigation Items (for Navbar and MobileNav)
export const NAV_ITEMS = [
  { id: 1, title: "Home", href: ROUTES.HOME },
  { id: 9, title: "Blog", href: ROUTES.BLOG },
  { id: 3, title: "Tracker", href: ROUTES.TRACKER },
  // { id: 4, title: "Podcasts", href: ROUTES.PODCASTS },
  { id: 7, title: "Contact", href: ROUTES.CONTACT },
] as const;

export const MOBILE_NAV_ITEMS = [
  { id: 1, title: "Home", href: ROUTES.HOME },
  // { id: 2, title: "Podcasts", href: ROUTES.PODCASTS },
  { id: 3, title: "Tracker", href: ROUTES.TRACKER },
  { id: 9, title: "Blog", href: ROUTES.BLOG },
  { id: 5, title: "Contact us", href: ROUTES.CONTACT },
] as const;

// Footer Routes (routes that should NOT show the footer)
export const FOOTER_HIDE_ROUTES = [
  ROUTES.HOME,
  ROUTES.CONTACT,
  ROUTES.LANDING,
  ROUTES.HOME_ALT,
  ROUTES.SERVICES,
  ROUTES.INSIGHTS,
  ROUTES.CASE,
  ROUTES.PRESENTATION,
  ROUTES.BUDGETNDIOSTORY,
  ROUTES.WORKIZ,
  ROUTES.STORIES,
  ROUTES.TRACKER,
  // ROUTES.PODCASTS, // Removed - show footer on podcasts page
  ROUTES.SHORTS,
  ROUTES.BUDGET_SIMPLIFIED,
  ROUTES.ANALYTICS,
  ROUTES.LEARN,
  ROUTES.BLOG,
] as const;

// Type for route values
export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];

// Helper function to check if route should hide footer
export function shouldHideFooter(pathname: string): boolean {
  return FOOTER_HIDE_ROUTES.includes(
    pathname as (typeof FOOTER_HIDE_ROUTES)[number],
  );
}

// Helper function to generate dynamic route URLs
export function getLearnCourseUrl(courseId: string): string {
  return `/learn/${courseId.toLowerCase()}`;
}

export function getEduCourseUrl(courseId: string): string {
  return `/edu/${courseId.toLowerCase()}`;
}

export function getPodcastEpisodeUrl(id: string | number): string {
  return `/podcasts/${id}`;
}
