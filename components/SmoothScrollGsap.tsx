"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Smooth scrolling + scroll-triggered animations for a single page.
 * - Creates a LocomotiveScroll instance on a scoped container
 * - Bridges it to GSAP ScrollTrigger via scrollerProxy
 * - Applies lightweight, responsive entrance animations based on data attributes
 *
 * Usage: wrap the page sections and add:
 * - data-animate="fade-up" on elements to animate individually
 * - data-animate="cards" on a parent; children with data-animate="card" will stagger
 */
export default function SmoothScrollGsap({ children, className }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
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
            smoothTouch: true,
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
  }, []);

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
