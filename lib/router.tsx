/**
 * TanStack Router Configuration
 * Type-safe routing for the BudgetNDIOStory project
 */

import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

// Lazy load page components for better performance
const HomePage = lazy(() => import('@/pages/index'));
const AboutPage = lazy(() => import('@/pages/about/index'));
const ContactPage = lazy(() => import('@/pages/contact/index'));
const ServicesPage = lazy(() => import('@/pages/services/index'));
const InsightsPage = lazy(() => import('@/pages/insights/index'));
const CasePage = lazy(() => import('@/pages/case/index'));
const PresentationPage = lazy(() => import('@/pages/presentation/index'));
const StoriesPage = lazy(() => import('@/pages/stories/index'));
const TrackerPage = lazy(() => import('@/pages/tracker/index'));
const PodcastsPage = lazy(() => import('@/pages/podcasts/index'));
const PodcastEpisodePage = lazy(() => import('@/pages/podcasts/[id]'));
const ShortsPage = lazy(() => import('@/pages/shorts/index'));
const ParticipatePage = lazy(() => import('@/pages/participate/index'));
const LandingPage = lazy(() => import('@/pages/landing/index'));
const AnalyticsPage = lazy(() => import('@/pages/analytics/index'));
const BudgetSimplifiedPage = lazy(() => import('@/pages/budget-simplified/index'));
const BudgetNDIOStoryPage = lazy(() => import('@/pages/budgetndiostory/index'));
const WorkizPage = lazy(() => import('@/pages/workiz/index'));
const EduStoriesPage = lazy(() => import('@/pages/edustories/index'));
const LearnPage = lazy(() => import('@/pages/learn/index'));
const LearnCoursePage = lazy(() => import('@/pages/learn/[id]'));
const EduCoursePage = lazy(() => import('@/pages/edu/[id]'));

// Root Route
export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});

// Index Route (Home)
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <HomePage />
    </Suspense>
  ),
});

// About Route
export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'about',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <AboutPage />
    </Suspense>
  ),
});

// Contact Route
export const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'contact',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <ContactPage />
    </Suspense>
  ),
});

// Services Route
export const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'services',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <ServicesPage />
    </Suspense>
  ),
});

// Insights Route
export const insightsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'insights',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <InsightsPage />
    </Suspense>
  ),
});

// Case Route
export const caseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'case',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <CasePage />
    </Suspense>
  ),
});

// Presentation Route
export const presentationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'presentation',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <PresentationPage />
    </Suspense>
  ),
});

// Stories Route
export const storiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'stories',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <StoriesPage />
    </Suspense>
  ),
});

// Tracker Route
export const trackerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'tracker',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <TrackerPage />
    </Suspense>
  ),
});

// Podcasts Route
export const podcastsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'podcasts',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <PodcastsPage />
    </Suspense>
  ),
});

// Podcast Episode (Dynamic) Route
export const podcastEpisodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'podcasts/$episodeId',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <PodcastEpisodePage />
    </Suspense>
  ),
});

// Shorts Route
export const shortsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'shorts',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <ShortsPage />
    </Suspense>
  ),
});

// Participate Route
export const participateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'participate',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <ParticipatePage />
    </Suspense>
  ),
});

// Landing Route
export const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'landing',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <LandingPage />
    </Suspense>
  ),
});

// Analytics Route
export const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'analytics',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <AnalyticsPage />
    </Suspense>
  ),
});

// Budget Simplified Route
export const budgetSimplifiedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'budget-simplified',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <BudgetSimplifiedPage />
    </Suspense>
  ),
});

// BudgetNDIOStory Route
export const budgetNDIOStoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'budgetndiostory',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <BudgetNDIOStoryPage />
    </Suspense>
  ),
});

// Workiz Route
export const workizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'workiz',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <WorkizPage />
    </Suspense>
  ),
});

// EduStories Route
export const eduStoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'edustories',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <EduStoriesPage />
    </Suspense>
  ),
});

// Learn Route
export const learnRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'learn',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <LearnPage />
    </Suspense>
  ),
});

// Learn Course (Dynamic) Route
export const learnCourseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'learn/$courseId',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <LearnCoursePage />
    </Suspense>
  ),
});

// Edu Course (Dynamic) Route
export const eduCourseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'edu/$courseId',
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <EduCoursePage />
    </Suspense>
  ),
});

// Define the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  contactRoute,
  servicesRoute,
  insightsRoute,
  caseRoute,
  presentationRoute,
  storiesRoute,
  trackerRoute,
  podcastsRoute,
  podcastEpisodeRoute,
  shortsRoute,
  participateRoute,
  landingRoute,
  analyticsRoute,
  budgetSimplifiedRoute,
  budgetNDIOStoryRoute,
  workizRoute,
  eduStoriesRoute,
  learnRoute,
  learnCourseRoute,
  eduCourseRoute,
]);

// Create the router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
});

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
