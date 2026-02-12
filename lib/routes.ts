/**
 * BACKWARD COMPATIBILITY LAYER
 * 
 * This file now re-exports from constants/routes.ts
 * Update your imports to use '@/constants/routes' directly.
 * 
 * Migration:
 * - import { ROUTES, NAV_ITEMS } from '@/lib/routes'
 * + import { ROUTES, MAIN_NAV_ITEMS, MOBILE_NAV_ITEMS } from '@/constants/routes'
 */

// Re-export everything from the new centralized location
export * from '@/constants/routes';

// Also export individual items for easier migration
export {
  PUBLIC_ROUTES,
  FEATURE_ROUTES,
  ADMIN_ROUTES,
  LEGACY_ROUTES,
  DYNAMIC_ROUTES,
  MAIN_NAV_ITEMS,
  MOBILE_NAV_ITEMS,
  // Backward compatibility alias
  MAIN_NAV_ITEMS as NAV_ITEMS,
  FOOTER_HIDE_PATHS,
  shouldHideFooter,
  getLearnCourseUrl,
  getEduCourseUrl,
  getPodcastEpisodeUrl,
  getStoryDetailUrl,
  getBlogPostUrl,
} from '@/constants/routes';

// Type exports
export type { StaticRoute, RoutePath, NavItem } from '@/constants/routes';
