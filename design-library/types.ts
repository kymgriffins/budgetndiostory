import { ReactNode } from 'react';

// ============================================
// ANIMATION TYPES
// ============================================

export interface TlogoMarqueeProps {
  children: ReactNode;
  baseVelocity?: number;
}

export interface TMarqueeProps {
  title: string;
  className?: string;
}

// ============================================
// COMPONENT TYPES
// ============================================

export interface TRoundedProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
}

export interface TCurveProps {
  children: ReactNode;
  backgroundColor?: string;
}

// ============================================
// ANIMATION COMPONENT TYPES
// ============================================

export interface AnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export interface SlideInProps extends AnimationProps {
  direction?: 'left' | 'right';
}

export interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

// ============================================
// MOTION VARIANT TYPES
// ============================================

export interface MotionVariant {
  initial?: any;
  animate?: any;
  exit?: any;
  enter?: any;
  visible?: any;
  hidden?: any;
}
