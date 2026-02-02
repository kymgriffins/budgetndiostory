"use client";

import { useAnimationIntensity } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ReactNode, useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  ease?: string;
  start?: string;
  toggleActions?: string;
  once?: boolean;
  /** Don't animate on mobile */
  disableOnMobile?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 1,
  ease = "power3.out",
  start = "top 85%",
  toggleActions = "play none none none",
  once = true,
  disableOnMobile = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isMobile, shouldAnimate } = useAnimationIntensity();

  const isDisabled = prefersReducedMotion || (disableOnMobile && isMobile);

  useEffect(() => {
    if (isDisabled || !ref.current) return;

    const element = ref.current;

    // Calculate initial position based on direction
    const initialValues: Record<string, number> = {
      opacity: 0,
    };

    switch (direction) {
      case "up":
        initialValues.y = 50;
        break;
      case "down":
        initialValues.y = -50;
        break;
      case "left":
        initialValues.x = 50;
        break;
      case "right":
        initialValues.x = -50;
        break;
    }

    // Create animation
    const animation = gsap.fromTo(
      element,
      {
        ...initialValues,
        visibility: "hidden",
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        visibility: "visible",
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions,
          once,
          // SEO: Mark as non-essential for LCP
          fastScrollEnd: true,
        },
      },
    );

    // Cleanup
    return () => {
      animation.kill();
      try {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === element) {
            st.kill();
          }
        });
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, [
    delay,
    direction,
    duration,
    ease,
    start,
    toggleActions,
    once,
    isDisabled,
  ]);

  return (
    <div
      ref={ref}
      className={`gsap-reveal ${className}`}
      // SEO: Ensure content is visible without JS
      style={{ visibility: isDisabled ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
}

/**
 * Simplified reveal for simple fade-in animations
 */
interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const element = ref.current;

    const animation = gsap.fromTo(
      element,
      { opacity: 0, visibility: "hidden" },
      {
        opacity: 1,
        visibility: "visible",
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: `top ${100 - threshold * 100}%`,
          toggleActions: "play none none none",
          once,
        },
      },
    );

    return () => {
      animation.kill();
      try {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === element) st.kill();
        });
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, [delay, duration, threshold, once, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ visibility: prefersReducedMotion ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
}

// Default export
export default ScrollReveal;
