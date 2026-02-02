"use client";

// Script loading strategies for performance optimization
export const ScriptStrategy = {
  BEFORE_INTERACTIVE: "beforeInteractive" as const,
  AFTER_INTERACTIVE: "afterInteractive" as const,
  LAZY_ONLOAD: "lazyOnload" as const,
  WORKER: "worker" as const,
};

// Third-party script loader with performance tracking
interface ThirdPartyScript {
  src: string;
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload" | "worker";
  name: string;
  id?: string;
  onLoad?: () => void;
  onError?: (error: unknown) => void;
}

// Log script loading for debugging
function logScriptLoad(script: ThirdPartyScript) {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[ScriptLoader] Loading "${script.name}" with strategy: ${script.strategy}`,
    );
  }
}

// Load third-party scripts with optimal strategy
export function loadThirdPartyScript(script: ThirdPartyScript): void {
  const {
    src,
    strategy = ScriptStrategy.LAZY_ONLOAD,
    name,
    onLoad,
    onError,
    id,
  } = script;

  logScriptLoad({ src, strategy, name, id, onLoad, onError });

  const scriptElement = document.createElement("script");
  scriptElement.src = src;
  scriptElement.async = true;
  scriptElement.defer = strategy === ScriptStrategy.LAZY_ONLOAD;

  if (id) {
    scriptElement.id = id;
  }

  scriptElement.onload = () => {
    logScriptLoad({ src, strategy, name, id, onLoad, onError });
    onLoad?.();
  };

  scriptElement.onerror = () => {
    console.error(`[ScriptLoader] Failed to load "${name}"`);
    onError?.(new Error(`Failed to load script: ${name}`));
  };

  document.body.appendChild(scriptElement);
}

// Preconnect to third-party origins
export function getPreconnectLinks(): string[] {
  return [
    "https://www.google-analytics.com",
    "https://www.googletagmanager.com",
  ];
}

// Defer non-critical analytics until user interaction
export function setupDeferredAnalytics(
  analyticsScriptLoader: () => void,
): void {
  if (typeof window === "undefined") return;

  const loadAnalytics = () => {
    analyticsScriptLoader();
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] Loading deferred analytics");
    }
  };

  const handleInteraction = () => {
    loadAnalytics();
    ["click", "scroll", "keydown", "mousemove", "touchstart"].forEach(
      (event) => {
        window.removeEventListener(event, handleInteraction);
      },
    );
  };

  ["click", "scroll", "keydown", "mousemove", "touchstart"].forEach((event) => {
    window.addEventListener(event, handleInteraction, {
      once: true,
      passive: true,
    });
  });
}

// Check if analytics already loaded (using type assertion for third-party globals)
export function isAnalyticsLoaded(): boolean {
  if (typeof window === "undefined") return false;

  // Use type assertion for third-party globals like gtag and dataLayer
  const win = window as unknown as Record<string, unknown>;
  return (
    typeof win.gtag !== "undefined" ||
    typeof win.dataLayer !== "undefined" ||
    document.querySelector('script[src*="analytics"]') !== null
  );
}
