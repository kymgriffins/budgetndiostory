"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  /** Custom animation variants */
  variants?: {
    initial: { opacity: number; y: number };
    animate: { opacity: number; y: number };
    exit: { opacity: number; y: number };
  };
  /** Animation duration */
  duration?: number;
  /** Custom ease */
  ease?: number[] | [number, number, number, number];
}

const defaultVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const defaultEase: number[] = [0.22, 1, 0.36, 1];

// Default export for PageTransition
export default PageTransition;

export function PageTransition({
  children,
  variants = defaultVariants,
  duration = 0.5,
  ease = defaultEase,
}: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{
          duration,
          ease,
          // Stagger children animations
          staggerChildren: 0.1,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Slide transition variant
 */
export const slideVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

/**
 * Scale transition variant
 */
export const scaleVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 },
};

/**
 * Flip transition variant
 */
export const flipVariants = {
  initial: { opacity: 0, rotateX: 90 },
  animate: { opacity: 1, rotateX: 0 },
  exit: { opacity: 0, rotateX: -90 },
};

/**
 * Page wrapper with enter animations for children
 */
interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  duration?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  duration = 0.5,
}: StaggerChildrenProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
  duration = 0.5,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}) {
  const directionOffsets: Record<string, { y: number; x: number }> = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  };

  const offset = directionOffsets[direction] || directionOffsets.up;

  const itemVariants = {
    hidden: { opacity: 0, y: offset.y, x: offset.x },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration } },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
