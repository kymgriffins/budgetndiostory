import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsProvider } from "@/components/Analytics";
import { FooterV2Provider } from "@/context/FooterV2Context";
import "@/styles/globals.css";

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
          {getLayout(<Component {...pageProps} />)}
          <Analytics />
        </FooterV2Provider>
      </AnalyticsProvider>
    </ThemeProvider>
  );
}
