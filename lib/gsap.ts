import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger - only runs on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Critical: Prevent FOUC by setting initial visibility
  gsap.set(".gsap-reveal", { visibility: "visible" });
}

export { gsap, ScrollTrigger };

/**
 * Smooth scroll ease configuration for premium feel
 */
export const premiumEase = [0.22, 1, 0.36, 1] as const;

/**
 * Default animation durations
 */
export const animationDurations = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  extraSlow: 1.2,
} as const;
