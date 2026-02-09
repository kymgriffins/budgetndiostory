import { AnalyticsProvider } from "@/components/Analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { FooterV2Provider } from "@/context/FooterV2Context";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { AnimatePresence } from "framer-motion";
import Script from "next/script";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  showPageTransition?: boolean;
}

// Base Layout - empty wrapper
export function BaseLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

// Landing Layout - no navbar, no footer
export function LandingLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

// Video Landing Layout - no navbar, custom footer handling
export function VideoLandingLayout({ children }: LayoutProps) {
  return <>{children}</>;
}

// Default Layout - has navbar, has footer
export function DefaultLayout({
  children,
  showPageTransition = true,
}: LayoutProps) {
  return showPageTransition ? (
    <AnimatePresence mode="wait">{children}</AnimatePresence>
  ) : (
    <>{children}</>
  );
}

export type LayoutFunction = (page: ReactNode) => ReactNode;

// Page component type with optional getLayout
type PageComponent = {
  getLayout?: LayoutFunction;
  (props: any): ReactNode;
};

export default function App({
  Component,
  pageProps,
}: {
  Component: PageComponent;
  pageProps: any;
}) {
  // Use page-specific layout or default to BaseLayout
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <AnalyticsProvider>
        <FooterV2Provider>
          {/* Google Analytics - gtag.js */}
          <Script
            strategy="beforeInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-DQMEN6448V"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-DQMEN6448V');
              `,
            }}
          />
          {getLayout(<Component {...pageProps} />)}
          <Analytics />
        </FooterV2Provider>
      </AnalyticsProvider>
    </ThemeProvider>
  );
}
