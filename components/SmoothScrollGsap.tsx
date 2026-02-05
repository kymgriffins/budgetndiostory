"use client";

import { useIsMobile } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import React, { useEffect, useMemo, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Smooth scrolling + scroll-triggered animations for a single page.
 * - Creates a LocomotiveScroll instance on a scoped container (desktop only)
 * - Bridges it to GSAP ScrollTrigger via scrollerProxy (desktop only)
 * - Applies lightweight, responsive entrance animations based on data attributes
 * - Uses native scroll on mobile for better performance
 *
 * Usage: wrap the page sections and add:
 * - data-animate="fade-up" on elements to animate individually
 * - data-animate="cards" on a parent; children with data-animate="card" will stagger
 */
export default function SmoothScrollGsap({ children, className }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  // Memoize to prevent unnecessary re-renders
  const shouldUseNativeScroll = useMemo(
    () => isMobile || prefersReducedMotion,
    [isMobile, prefersReducedMotion],
  );

  useEffect(() => {
    // Skip if native scroll mode (mobile or reduced motion)
    if (shouldUseNativeScroll) {
      // Still run lightweight CSS animations on mobile
      if (!initializedRef.current) {
        initializedRef.current = true;
        let gsap: any;
        let ScrollTrigger: any;
        let ctx: any;

        (async () => {
          try {
            const gsapModule: any = await import("gsap");
            const stModule: any = await import("gsap/ScrollTrigger");
            gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;
            ScrollTrigger =
              stModule.ScrollTrigger ?? stModule.default ?? stModule;

            if (!gsap?.registerPlugin || !ScrollTrigger) return;
            gsap.registerPlugin(ScrollTrigger);

            const el = scrollerRef.current;
            if (!el) return;

            // Lightweight animations using native scroll
            ctx = gsap.context(() => {
              // Use shorter, simpler animations for mobile
              const duration = prefersReducedMotion ? 0.1 : 0.4;
              const stagger = prefersReducedMotion ? 0 : 0.05;

              (
                gsap.utils.toArray("[data-animate='fade-up']") as HTMLElement[]
              ).forEach((node) => {
                gsap.fromTo(
                  node,
                  { y: 20, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: node,
                      scroller: el,
                      start: "top 90%",
                      toggleActions: "play none none reverse",
                    },
                  },
                );
              });

              (
                gsap.utils.toArray("[data-animate='cards']") as HTMLElement[]
              ).forEach((wrap) => {
                const cards = wrap.querySelectorAll<HTMLElement>(
                  "[data-animate='card']",
                );
                if (!cards.length) return;
                gsap.fromTo(
                  cards,
                  { y: 15, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration,
                    ease: "power2.out",
                    stagger,
                    scrollTrigger: {
                      trigger: wrap,
                      scroller: el,
                      start: "top 85%",
                      toggleActions: "play none none reverse",
                    },
                  },
                );
              });
            }, el);

            ScrollTrigger.refresh();
          } catch {
            // No-op: if something fails, page still renders
          }
        })();

        return () => {
          if (!initializedRef.current) return;
          try {
            ctx?.revert?.();
          } catch {}
        };
      }
      return;
    }

    // Desktop: Full Locomotive Scroll + GSAP integration
    if (initializedRef.current) return;
    initializedRef.current = true;
    let ctx: any;
    let gsap: any;
    let ScrollTrigger: any;
    let resizeTimer: NodeJS.Timeout;

    const el = scrollerRef.current;
    if (!el) return;

    let cancelled = false;
    let loco: any;

    (async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        const gsapModule: any = await import("gsap");
        const stModule: any = await import("gsap/ScrollTrigger");

        gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;
        ScrollTrigger = stModule.ScrollTrigger ?? stModule.default ?? stModule;

        if (!gsap?.registerPlugin || !ScrollTrigger) return;
        gsap.registerPlugin(ScrollTrigger);

        // Some ScrollTrigger builds warn if the scroller is position: static.
        // Force a non-static position for correct offset calculations.
        if (getComputedStyle(el).position === "static") {
          el.style.position = "relative";
        }

        // LocomotiveScroll v5 is built on Lenis; scope scrolling to this wrapper.
        loco = new LocomotiveScroll({
          lenisOptions: {
            wrapper: el,
            content: el,
            lerp: 0.08,
            smoothWheel: true,
            smoothTouch: false, // Disable on touch for better mobile performance
          } as any,
          scrollCallback: () => ScrollTrigger.update(),
          autoStart: true,
        });

        if (cancelled) {
          // Cleanup if cancelled during async operation
          try {
            ctx?.revert?.();
            loco?.destroy?.();
          } catch {}
          return;
        }

        // Mark as initialized
        initializedRef.current = true;

        const getScrollY = () =>
          loco?.lenisInstance?.scroll ?? el.scrollTop ?? 0;

        ScrollTrigger.scrollerProxy(el, {
          scrollTop(value?: number) {
            if (typeof value === "number") {
              // immediate avoids easing lag when ScrollTrigger sets position
              return loco?.scrollTo?.(value, { immediate: true });
            }
            return getScrollY();
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          // If locomotive is transforming the container, use transform pinning.
          pinType:
            getComputedStyle(el).transform !== "none" ? "transform" : "fixed",
        });

        ScrollTrigger.defaults({ scroller: el });

        ScrollTrigger.addEventListener("refresh", () => loco?.update?.());

        ctx = gsap.context(() => {
          // Individual fade-up elements
          (
            gsap.utils.toArray("[data-animate='fade-up']") as HTMLElement[]
          ).forEach((node) => {
            gsap.fromTo(
              node,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: node,
                  scroller: el,
                  start: "top 85%",
                },
              },
            );
          });

          // Stagger cards inside containers
          (
            gsap.utils.toArray("[data-animate='cards']") as HTMLElement[]
          ).forEach((wrap) => {
            const cards = wrap.querySelectorAll<HTMLElement>(
              "[data-animate='card']",
            );
            if (!cards.length) return;
            gsap.fromTo(
              cards,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.08,
                scrollTrigger: {
                  trigger: wrap,
                  scroller: el,
                  start: "top 80%",
                },
              },
            );
          });
        }, el);

        ScrollTrigger.refresh();
        loco?.resize?.();

        // Handle window resize for proper desktop scroll resolution
        const handleResize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
            loco?.resize?.();
          }, 100);
        };
        window.addEventListener("resize", handleResize);
      } catch {
        // No-op: if something fails (SSR, missing window, etc.) page still renders.
      }
    })();

    return () => {
      cancelled = true;
      // Only cleanup if we actually initialized
      if (!initializedRef.current) return;
      try {
        ctx?.revert?.();
        loco?.destroy?.();
        window.removeEventListener("resize", () => {});
      } catch {
        // no-op
      }
    };
  }, [shouldUseNativeScroll]);

  return (
    <div
      ref={scrollerRef}
      data-scroll-container
      className={`relative h-screen overflow-y-auto overflow-x-hidden ${className ?? ""}`}
      style={{ position: "relative" }}
    >
      {children}
    </div>
  );
}
