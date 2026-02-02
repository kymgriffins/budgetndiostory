"use client";

import { useReportWebVitals } from "next/web-vitals";

interface Metric {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  entries: any[];
}

export function WebVitals() {
  const reportWebVitals = (metric: Metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[WebVitals] ${metric.name}:`, {
        value: metric.value.toFixed(2),
        rating: metric.rating,
        delta: metric.delta.toFixed(2),
      });
    }

    // Send to analytics endpoint
    const body = JSON.stringify({
      ...metric,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    });

    // Use sendBeacon for reliability (works after page unload)
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/vitals", blob);
    } else {
      // Fallback to fetch with keepalive
      fetch("/api/vitals", {
        body,
        method: "POST",
        keepalive: true,
      }).catch(() => {
        // Silently fail - don't block user experience
      });
    }
  };

  useReportWebVitals(reportWebVitals);

  return null;
}

export default WebVitals;
