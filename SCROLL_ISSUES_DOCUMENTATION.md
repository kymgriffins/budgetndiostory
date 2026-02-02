# Scroll Issues Documentation

This document tracks common scrolling issues and their resolutions for the Budget Ndio Story project.

---

## Issue: Page Not Scrollable on Small Devices

### Symptoms

- Page content not scrolling on mobile/small devices
- Content hidden behind fixed navbar
- Horizontal overflow issues

### Root Cause

The page was missing required Locomotive Scroll configuration and proper structure.

### Resolution Applied

#### 1. Missing Locomotive Scroll Attributes

The scroller and content divs need `data-scroll-container` and `data-scroll-content` attributes:

```tsx
// ❌ Wrong
<div ref={scrollerRef} className="h-screen overflow-hidden">
  <div ref={contentRef}>
    <main className="w-full">
```

```tsx
// ✅ Correct
<div ref={scrollerRef} data-scroll-container className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#fafafa] text-[#212121]" style={{ position: "relative" }}>
  <div ref={contentRef} data-scroll-content>
    <main id="page-content" className="w-full">
```

#### 2. Missing Navbar Spacer

Fixed navbar (8vh height) needs a spacer div at the top:

```tsx
// ✅ Add inside content div, before main
<div className="h-[8vh]" />

<a href="#page-content" className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full">
  Skip to content
</a>
```

#### 3. Proper Scroller Classes

The scroller div must have both overflow properties:

```tsx
// ✅ Correct classes
className =
  "relative h-screen overflow-y-auto overflow-x-hidden bg-[#fafafa] text-[#212121]";
```

---

## Template for New Pages

Use this template when creating new pages to avoid scroll issues:

```tsx
import Head from "next/head";
import { useEffect, useRef } from "react";
import LandingFooter from "@/components/LandingFooter";

export default function PageName() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let loco: any;
    let ctx: any;
    let gsap: any;
    let ScrollTrigger: any;

    const el = scrollerRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    let cancelled = false;

    (async () => {
      try {
        if (
          typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
        ) {
          return;
        }

        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        const gsapModule: any = await import("gsap");
        const stModule: any = await import("gsap/ScrollTrigger");

        gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;
        ScrollTrigger = stModule.ScrollTrigger ?? stModule.default ?? stModule;

        if (!gsap?.registerPlugin || !ScrollTrigger) return;
        gsap.registerPlugin(ScrollTrigger);

        if (getComputedStyle(el).position === "static") {
          el.style.position = "relative";
        }

        loco = new LocomotiveScroll({
          lenisOptions: {
            wrapper: el,
            content,
            lerp: 0.08,
            smoothWheel: true,
            smoothTouch: true,
          } as any,
          scrollCallback: () => ScrollTrigger.update(),
          autoStart: true,
        });

        if (cancelled) return;

        const getScrollY = () =>
          loco?.lenisInstance?.scroll ?? el.scrollTop ?? 0;

        ScrollTrigger.scrollerProxy(el, {
          scrollTop(value?: number) {
            if (typeof value === "number") {
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
          pinType:
            getComputedStyle(el).transform !== "none" ? "transform" : "fixed",
        });

        ScrollTrigger.defaults({ scroller: el });
        ScrollTrigger.addEventListener("refresh", () => loco?.update?.());

        ctx = gsap.context(() => {
          // Add animations here
        }, el);

        ScrollTrigger.refresh();
        loco?.resize?.();
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelled = true;
      try {
        ctx?.revert?.();
        loco?.destroy?.();
        ScrollTrigger?.getAll?.().forEach?.((t: any) => t.kill?.());
      } catch {
        // no-op
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Page Title - Budget Ndio Story</title>
        <meta name="description" content="Page description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        ref={scrollerRef}
        data-scroll-container
        className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#fafafa] text-[#212121]"
        style={{ position: "relative" }}
      >
        <div ref={contentRef} data-scroll-content>
          {/* Navbar spacer */}
          <div className="h-[8vh]" />

          {/* Skip link for accessibility */}
          <a
            href="#page-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full"
          >
            Skip to content
          </a>

          <main id="page-content" className="w-full">
            {/* Page content here */}
          </main>

          <LandingFooter />
        </div>
      </div>
    </>
  );
}
```

---

## Common Mistakes to Avoid

1. **Missing `overflow-x-hidden`** - Causes horizontal scroll on mobile
2. **Missing navbar spacer** - Content hidden behind fixed navbar
3. **Missing `data-scroll-container/data-scroll-content`** - Locomotive Scroll won't work
4. **Wrong scroller height** - Must use `h-screen`, not `min-h-screen`
5. **Using `overflow-hidden` on scroller** - Must use `overflow-y-auto`

---

## Related Files

- [`pages/tracker/index.tsx`](pages/tracker/index.tsx) - Working example with proper scroll setup
- [`pages/stories/index.tsx`](pages/stories/index.tsx) - Fixed example
- [`pages/_app.tsx`](pages/_app.tsx) - Global app wrapper
