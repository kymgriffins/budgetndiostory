import { Navbar } from "@/components";
import { AnalyticsProvider } from "@/components/Analytics";
import FooterV2 from "@/components/FooterV2";
import LandingFooter from "@/components/LandingFooter";
import { ThemeProvider } from "@/components/theme-provider";
import { FooterV2Provider, useFooterV2 } from "@/context/FooterV2Context";
import { FOOTER_HIDE_ROUTES } from "@/lib/routes";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { AnimatePresence } from "framer-motion";

function AppContent({
  Component,
  pageProps,
  router,
}: {
  Component: any;
  pageProps: any;
  router: any;
}) {
  const isLanding = router?.route === "/landing";
  const isVideoLanding =
    router?.route === "/video-landing" ||
    router?.route === "/" ||
    router?.route === "/blog" ||
    router?.route === "/blog/" ||
    router?.route?.startsWith("/blog/") ||
    router?.route === "/tracker" ||
    router?.route === "/edustories" ||
    router?.route === "/contact" ||
    router?.route === "/learn";
  const path = router?.route ?? router?.pathname ?? "";

  const shouldHideFooter = FOOTER_HIDE_ROUTES.includes(path as any);
  const { showFooterV2 } = useFooterV2();

  return (
    <>
      {!isVideoLanding && <Navbar />}
      {isLanding ? (
        <Component key={router.route} {...pageProps} />
      ) : (
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      )}
      {!shouldHideFooter && (showFooterV2 ? <FooterV2 /> : <LandingFooter />)}
      <Analytics />
    </>
  );
}

export default function App({
  Component,
  pageProps,
  router,
}: {
  Component: any;
  pageProps: any;
  router: any;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <AnalyticsProvider>
        <FooterV2Provider>
          <AppContent
            Component={Component}
            pageProps={pageProps}
            router={router}
          />
        </FooterV2Provider>
      </AnalyticsProvider>
    </ThemeProvider>
  );
}
