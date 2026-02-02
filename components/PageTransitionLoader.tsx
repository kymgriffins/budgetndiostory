"use client";

import { gsap } from "@/lib/gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Page transition loader component
 * Shows "BUDGET NDIO STORY" text with smooth fade between routes
 */
export function PageTransitionLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [displayText, setDisplayText] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const prevPathname = useRef(pathname);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isNavigating = useRef(false);

  useEffect(() => {
    // Skip if already navigating or same pathname
    if (pathname === prevPathname.current || isNavigating.current) {
      return;
    }

    isNavigating.current = true;
    prevPathname.current = pathname;
    setIsLoading(true);
    setDisplayText(false);

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    // Sequence: show text -> fade in page -> hide loader
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        setDisplayText(false);
        isNavigating.current = false;
      },
    });

    timelineRef.current = tl;

    // Show text with smooth fade
    tl.set(textRef.current, { opacity: 0, y: 20 });
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      onStart: () => setDisplayText(true),
    })
      // Hold for a moment
      .to({}, { duration: 0.3 })
      // Fade out text
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
      });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      isNavigating.current = false;
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black pointer-events-none"
      style={{ opacity: isLoading ? 1 : 0 }}
    >
      <h1
        ref={textRef}
        className={`
          text-2xl md:text-4xl lg:text-5xl font-bold tracking-widest
          text-white font-neue
          whitespace-nowrap
          transition-opacity duration-500
        `}
        style={{
          fontFamily: "NeueMontreal, sans-serif",
          opacity: displayText ? 1 : 0,
          visibility: displayText ? "visible" : "hidden",
        }}
      >
        BUDGET NDIO STORY
      </h1>
    </div>
  );
}

/**
 * Simple page transition wrapper with loader
 */
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransitionWithLoader({ children }: PageTransitionProps) {
  return (
    <>
      <PageTransitionLoader />
      {children}
    </>
  );
}
