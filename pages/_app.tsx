import { Navbar } from "@/components";
import { AnalyticsProvider } from "@/components/Analytics";
import LandingFooter from "@/components/LandingFooter";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";

export default function App({
  Component,
  pageProps,
  router,
}: {
  Component: any;
  pageProps: any;
  router: any;
}) {
  const isLanding = router?.route === "/landing";
  const path = router?.route ?? router?.pathname ?? "";

  // Routes where LandingFooter is hidden (either handled by page or intentionally excluded)
  const hideFooterRoutes = [
    "/", // Root - has own footer section
    "/contact", // Contact page - intentionally excluded
    "/landing", // Landing page - has own footer
    "/home", // Home page - has own footer section
    "/services", // Services - uses Curve with showFooter
    "/insights", // Insights - uses Curve with showFooter
    "/case", // Case - uses Curve with showFooter
    "/presentation", // Presentation - uses Curve with showFooter
    "/budgetndiostory", // BudgetNdioStory - uses Curve (no footer)
    "/workiz", // Workiz - uses Curve (no footer)
    "/stories", // Stories - manually imports LandingFooter
    "/tracker", // Tracker - manually imports LandingFooter
    "/podcasts", // Podcasts - manually imports LandingFooter
    "/shorts", // Shorts - manually imports LandingFooter
    "/budget-simplified", // Budget Simplified - manually imports LandingFooter
    "/analytics", // Analytics dashboard - no footer
  ];

  const shouldHideFooter = hideFooterRoutes.includes(path);

  return (
    <AnalyticsProvider>
      <Navbar />
      {isLanding ? (
        <Component key={router.route} {...pageProps} />
      ) : (
        <AnimatePresence mode="popLayout">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      )}
      {!shouldHideFooter && <LandingFooter />}
      <Analytics />
    </AnalyticsProvider>
  );
}
