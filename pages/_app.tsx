import { Navbar } from "@/components";
import { AnalyticsProvider } from "@/components/Analytics";
import LandingFooter from "@/components/LandingFooter";
import { FOOTER_HIDE_ROUTES } from "@/lib/routes";
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

  const shouldHideFooter = FOOTER_HIDE_ROUTES.includes(path as any);

  return (
    <AnalyticsProvider>
      <Navbar />
      {isLanding ? (
        <Component key={router.route} {...pageProps} />
      ) : (
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      )}
      {!shouldHideFooter && <LandingFooter />}
      <Analytics />
    </AnalyticsProvider>
  );
}
