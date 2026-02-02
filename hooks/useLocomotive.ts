"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseLocomotiveOptions {
  /** Lerp value for smooth scrolling (0-1) */
  lerp?: number;
  /** Multiplier for scroll speed */
  multiplier?: number;
  /** Enable smooth wheel */
  smoothWheel?: boolean;
  /** Enable smooth touch */
  smoothTouch?: boolean;
  /** Disable on mobile */
  disableOnMobile?: boolean;
}

interface UseLocomotiveReturn {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  scroll: unknown | null;
  isReady: boolean;
  /** Update scroll on content changes */
  update: () => void;
  /** Scroll to element or position */
  scrollTo: (
    target: string | number,
    options?: { offset?: number; duration?: number },
  ) => void;
  /** Stop all scroll animations */
  stop: () => void;
  /** Start scroll animations */
  start: () => void;
}

export function useLocomotive(
  options: UseLocomotiveOptions = {},
): UseLocomotiveReturn {
  const {
    lerp = 0.1,
    multiplier = 1,
    smoothWheel = true,
    smoothTouch = true,
    disableOnMobile = false,
  } = options;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<unknown>(null);
  const [isReady, setIsReady] = useState(false);
  const scrollInstanceRef = useRef<unknown>(null);
  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update scroll instance
  const update = useCallback(() => {
    if (
      scrollInstanceRef.current &&
      typeof (scrollInstanceRef.current as { update?: () => void }).update ===
        "function"
    ) {
      try {
        (scrollInstanceRef.current as { update: () => void }).update();
      } catch (e) {
        // Ignore update errors
      }
    }
  }, []);

  // Scroll to element or position
  const scrollTo = useCallback(
    (
      target: string | number,
      options?: { offset?: number; duration?: number },
    ) => {
      if (!scrollInstanceRef.current) return;

      try {
        const scrollInstance = scrollInstanceRef.current as {
          scrollTo?: (
            target: string | number,
            options?: { offset?: number; duration?: number },
          ) => void;
        };
        if (typeof scrollInstance.scrollTo === "function") {
          scrollInstance.scrollTo(target, options);
        }
      } catch (e) {
        // Ignore scrollTo errors
      }
    },
    [],
  );

  // Stop scroll animations
  const stop = useCallback(() => {
    if (scrollInstanceRef.current) {
      try {
        const scrollInstance = scrollInstanceRef.current as {
          stop?: () => void;
        };
        if (typeof scrollInstance.stop === "function") {
          scrollInstance.stop();
        }
      } catch (e) {
        // Ignore stop errors
      }
    }
  }, []);

  // Start scroll animations
  const start = useCallback(() => {
    if (scrollInstanceRef.current) {
      try {
        const scrollInstance = scrollInstanceRef.current as {
          start?: () => void;
        };
        if (typeof scrollInstance.start === "function") {
          scrollInstance.start();
        }
      } catch (e) {
        // Ignore start errors
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!scrollRef.current) return;

    // Skip on mobile if disabled
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (disableOnMobile && isMobile) {
      setIsReady(true);
      return;
    }

    const el = scrollRef.current;

    // Dynamic import to avoid SSR issues
    let LocomotiveScroll: new (options: unknown) => unknown;
    (async () => {
      try {
        const module = await import("locomotive-scroll");
        LocomotiveScroll = (
          module as { default: new (options: unknown) => unknown }
        ).default;
      } catch (e) {
        console.warn("Failed to load Locomotive Scroll:", e);
        return;
      }

      if (!el || !LocomotiveScroll) return;

      try {
        const locoScroll = new LocomotiveScroll({
          wrapper: el,
          smooth: true,
          lerp,
          multiplier: isMobile ? multiplier * 0.8 : multiplier,
          smartphone: { smooth: smoothTouch },
          tablet: { smooth: smoothWheel },
          reloadOnContextChange: true,
        });

        scrollInstanceRef.current = locoScroll;
        setScroll(locoScroll);
        setIsReady(true);

        // Handle resize with debounce
        const handleResize = () => {
          if (resizeTimerRef.current) {
            clearTimeout(resizeTimerRef.current);
          }
          resizeTimerRef.current = setTimeout(() => {
            try {
              (locoScroll as { update?: () => void }).update?.();
            } catch (e) {
              // Ignore update errors
            }
          }, 250);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup function
        const cleanup = () => {
          window.removeEventListener("resize", handleResize);
          if (resizeTimerRef.current) {
            clearTimeout(resizeTimerRef.current);
          }
          try {
            (locoScroll as { destroy?: () => void }).destroy?.();
          } catch (e) {
            console.warn("Error destroying Locomotive Scroll:", e);
          }
          scrollInstanceRef.current = null;
          setScroll(null);
          setIsReady(false);
        };

        // Store cleanup for unmount
        scrollInstanceRef.current = locoScroll;

        // Return cleanup on unmount
        return cleanup;
      } catch (e) {
        console.warn("Failed to initialize Locomotive Scroll:", e);
      }
    })();

    // Cleanup on unmount
    return () => {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, [lerp, multiplier, smoothWheel, smoothTouch, disableOnMobile]);

  return {
    scrollRef,
    scroll,
    isReady,
    update,
    scrollTo,
    stop,
    start,
  };
}

/**
 * Hook to sync GSAP ScrollTrigger with Locomotive Scroll
 */
export function useLocomotiveWithScrollTrigger() {
  const { scrollRef, isReady, update } = useLocomotive();

  useEffect(() => {
    if (!isReady) return;

    const handleRefresh = () => {
      update();
    };

    window.addEventListener("load", handleRefresh);

    return () => {
      window.removeEventListener("load", handleRefresh);
    };
  }, [isReady, update]);

  return { scrollRef, isReady, update };
}
