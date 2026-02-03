"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

type AnalyticsEvent = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

class AnalyticsClient {
  private endpoint = "/api/analytics";
  private queuedEvents: (() => void)[] = [];
  private isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("online", this.handleOnline);
      window.addEventListener("offline", this.handleOffline);
    }
  }

  private handleOnline = () => {
    this.isOnline = true;
    this.flushQueue();
  };

  private handleOffline = () => {
    this.isOnline = false;
  };

  private flushQueue = () => {
    while (this.queuedEvents.length > 0) {
      const event = this.queuedEvents.shift();
      if (event) event();
    }
  };

  private send(data: { type: string; data: any }) {
    if (!this.isOnline) {
      // Queue for later
      this.queuedEvents.push(() => this.send(data));
      return;
    }

    try {
      fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => {
        // Silently fail - analytics should not break the app
      });
    } catch {
      // Ignore errors
    }
  }

  trackPageView(url: string) {
    this.send({
      type: "pageview",
      data: {
        url,
        referrer: typeof document !== "undefined" ? document.referrer : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        screenWidth: typeof window !== "undefined" ? window.screen.width : 0,
        screenHeight: typeof window !== "undefined" ? window.screen.height : 0,
        language: typeof navigator !== "undefined" ? navigator.language : "en",
      },
    });
  }

  trackEvent(event: AnalyticsEvent) {
    this.send({
      type: "event",
      data: {
        ...event,
        url: typeof window !== "undefined" ? window.location.pathname : "",
      },
    });
  }

  destroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("online", this.handleOnline);
      window.removeEventListener("offline", this.handleOffline);
    }
  }
}

// Singleton instance
let analyticsClient: AnalyticsClient | null = null;

function getAnalyticsClient() {
  if (typeof window === "undefined") return null;
  if (!analyticsClient) {
    analyticsClient = new AnalyticsClient();
  }
  return analyticsClient;
}

// React hook for page views
export function usePageAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPath = useRef(pathname);

  useEffect(() => {
    const client = getAnalyticsClient();
    if (!client) return;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Track page view on route change
    if (previousPath.current !== pathname) {
      client.trackPageView(url);
      previousPath.current = pathname;
    }
  }, [pathname, searchParams]);
}

// Hook for custom events
export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    const client = getAnalyticsClient();
    if (client) {
      client.trackEvent(event);
    }
  }, []);

  return { trackEvent };
}

// Auto-initialize component
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  usePageAnalytics();

  useEffect(() => {
    const client = getAnalyticsClient();
    if (client) {
      // Track initial page view
      if (typeof window !== "undefined") {
        client.trackPageView(window.location.pathname);
      }
    }

    return () => {
      if (client) {
        client.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}

// Event tracking helper for buttons, links, etc.
export function trackButtonClick(
  category: string,
  action: string,
  label?: string,
) {
  const client = getAnalyticsClient();
  if (client) {
    client.trackEvent({ category, action, label });
  }
}

// Named export for easier imports
export const analytics = {
  trackPageView: (url: string) => getAnalyticsClient()?.trackPageView(url),
  trackEvent: (event: AnalyticsEvent) =>
    getAnalyticsClient()?.trackEvent(event),
  trackButtonClick,
};
