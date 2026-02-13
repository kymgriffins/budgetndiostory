/**
 * Budget Ndio Story — Landing Page Motion Script
 * 
 * This document provides a comprehensive animation specification for the
 * civic education landing page. It complements the existing GSAP + Locomotive
 * Scroll setup with narrative, timing-based animations.
 * 
 * Motion Philosophy: Establish trust → Educate → Demonstrate impact → Guide action
 */

export interface AnimationSpec {
  element: string;
  animation: string;
  from: string | number;
  to: string | number;
  duration: number;
  delay: number;
  easing: string;
  trigger?: string;
  staggerDelay?: number;
}

export interface ScrollTriggerSpec {
  element: string;
  triggerPoint: string;
  animation: AnimationSpec[];
}

// ============================================================================
// 1. PAGE LOAD SEQUENCE (0ms — 2200ms)
// Purpose: Establish trust before content appears; prevent layout shift perception.
// ============================================================================

export const pageLoadSequence: AnimationSpec[] = [
  {
    element: 'html',
    animation: 'backgroundColor',
    from: '#fff',
    to: '#f1f1f1',
    duration: 400,
    delay: 0,
    easing: 'power2.out',
  },
  {
    element: '[data-progress-bar]',
    animation: 'scaleX',
    from: 0,
    to: 1,
    duration: 600,
    delay: 200,
    easing: 'power3.out',
  },
  {
    element: '[data-skip-link]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 300,
    delay: 800,
    easing: 'none',
  },
];

// Lock scroll until load sequence completes
export const scrollLockConfig = {
  stopAt: 1200, // ms to stop lenis
  startAt: 1200, // ms to start lenis
  gentleVelocity: true,
};

// ============================================================================
// 2. HERO REVEAL (400ms — 1800ms)
// Spatial Concept: Elements rise from below their optical center, surfacing through water.
// ============================================================================

export const heroEntranceSequence: AnimationSpec[] = [
  // Trust Badge
  {
    element: '[data-trust-badge]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 500,
    delay: 400,
    easing: 'power2.out',
  },
  {
    element: '[data-trust-badge]',
    animation: 'y',
    from: 20,
    to: 0,
    duration: 500,
    delay: 400,
    easing: 'power2.out',
  },
  // Subtitle
  {
    element: '[data-hero-subtitle]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 400,
    delay: 480,
    easing: 'power2.out',
  },
  {
    element: '[data-hero-subtitle]',
    animation: 'y',
    from: 15,
    to: 0,
    duration: 400,
    delay: 480,
    easing: 'power2.out',
  },
  // Title Line 1
  {
    element: '[data-hero-title-line-1]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 400,
    delay: 580,
    easing: 'power2.out',
  },
  {
    element: '[data-hero-title-line-1]',
    animation: 'y',
    from: 40,
    to: 0,
    duration: 400,
    delay: 580,
    easing: 'power3.out',
  },
  // Title Line 2 (Explained) with color pulse
  {
    element: '[data-hero-title-line-2]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 400,
    delay: 640,
    easing: 'power2.out',
  },
  {
    element: '[data-hero-title-line-2]',
    animation: 'y',
    from: 40,
    to: 0,
    duration: 400,
    delay: 640,
    easing: 'power3.out',
  },
  // Color pulse on "Explained" completion
  {
    element: '[data-hero-title-highlight]',
    animation: 'color',
    from: '#00aa55',
    to: '#00cc66',
    duration: 200,
    delay: 1040,
    easing: 'power2.out',
  },
  // Description
  {
    element: '[data-hero-description]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 400,
    delay: 760,
    easing: 'power2.out',
  },
  {
    element: '[data-hero-description]',
    animation: 'y',
    from: 20,
    to: 0,
    duration: 400,
    delay: 760,
    easing: 'power2.out',
  },
  // CTA Cluster (buttons stagger 40ms apart)
  {
    element: '[data-cta-primary]',
    animation: 'scale',
    from: 0.9,
    to: 1,
    duration: 800,
    delay: 860,
    easing: 'elastic.out(1, 0.6)',
  },
  {
    element: '[data-cta-secondary]',
    animation: 'scale',
    from: 0.9,
    to: 1,
    duration: 800,
    delay: 900,
    easing: 'elastic.out(1, 0.6)',
  },
  // Arrow icon entering from left
  {
    element: '[data-cta-arrow]',
    animation: 'x',
    from: -4,
    to: 0,
    duration: 300,
    delay: 920,
    easing: 'power2.out',
  },
  // Tag Pills (stagger 30ms, scale pop)
  {
    element: '[data-tag-pill]',
    animation: 'scaleY',
    from: 0.3,
    to: 1,
    duration: 400,
    delay: 960,
    easing: 'back.out(1.7)',
    trigger: 'stagger',
    staggerDelay: 30,
  },
  {
    element: '[data-tag-pill]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 300,
    delay: 960,
    easing: 'none',
    trigger: 'stagger',
    staggerDelay: 30,
  },
];

// Optional: Character/Word split animation for title
export const titleCharacterAnimation = {
  splitBy: 'word',
  animation: {
    y: { from: 40, to: 0 },
    opacity: { from: 0, to: 1 },
    rotateX: { from: 15, to: 0 },
  },
  stagger: 40, // ms between words
  easing: 'power2.out',
  // Special effect for "Explained" word
  highlightEffect: {
    scale: { from: 1.1, to: 1 },
    duration: 400,
    easing: 'elastic.out(1, 0.5)',
  },
};

// ============================================================================
// 3. HERO VISUAL CARD — "Budget Reality" Panel (Right Column)
// ============================================================================

export const heroCardEntrance: AnimationSpec[] = [
  {
    element: '[data-budget-card-container]',
    animation: 'y',
    from: 60,
    to: 0,
    duration: 600,
    delay: 800,
    easing: 'power3.out',
  },
  {
    element: '[data-budget-card-container]',
    animation: 'rotateY',
    from: -8,
    to: 0,
    duration: 600,
    delay: 800,
    easing: 'power2.out',
  },
  {
    element: '[data-budget-card-container]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 600,
    delay: 800,
    easing: 'power2.out',
  },
  // Inner grid cells stagger
  {
    element: '[data-budget-cell]',
    animation: 'y',
    from: 20,
    to: 0,
    duration: 400,
    delay: 900,
    easing: 'power2.out',
    trigger: 'stagger',
    staggerDelay: 100,
  },
  {
    element: '[data-budget-cell]',
    animation: 'clipPath',
    from: 'inset(100% 0 0 0)',
    to: 'inset(0% 0 0 0)',
    duration: 400,
    delay: 900,
    easing: 'power2.out',
    trigger: 'stagger',
    staggerDelay: 100,
  },
];

// Gradient background slow pan (20s loop)
export const heroCardGradientAnimation = {
  keyframes: [
    { backgroundPosition: '10% 10%' },
    { backgroundPosition: '20% 20%' },
    { backgroundPosition: '10% 20%' },
    { backgroundPosition: '20% 10%' },
  ],
  duration: 20000,
  easing: 'none',
  repeat: -1,
};

// Idle micro-motion (breathing effect)
export const heroCardIdleAnimation = {
  element: '[data-budget-cell]',
  animation: 'scale',
  from: 1,
    to: 1.02,
  duration: 4000,
  delay: 0,
  easing: 'sine.inOut',
  repeat: -1,
  yoyo: true,
};

// Border opacity pulse
export const heroCardBorderPulse = {
  element: '[data-budget-accent-border]',
  animation: 'opacity',
  from: 0.1,
  to: 0.2,
  duration: 2000,
  delay: 0,
  easing: 'sine.inOut',
  repeat: -1,
  yoyo: true,
};

// Scroll parallax (0.8x speed)
export const heroCardParallax = {
  speed: 0.8,
  axis: 'y',
};

// ============================================================================
// 4. IMPACT STATS SECTION — "The Counter Effect"
// Trigger: When section top hits 75% viewport height.
// ============================================================================

export const statsSectionTrigger = {
  triggerPoint: 'top 75%',
  startAnimation: true,
};

export const statsEntranceSequence: AnimationSpec[] = [
  // Container
  {
    element: '[data-stats-container]',
    animation: 'y',
    from: 40,
    to: 0,
    duration: 600,
    delay: 0,
    easing: 'power3.out',
  },
  {
    element: '[data-stats-container]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 600,
    delay: 0,
    easing: 'power3.out',
  },
  // Stat cards stagger
  {
    element: '[data-stat-card]',
    animation: 'y',
    from: 30,
    to: 0,
    duration: 500,
    delay: 0,
    easing: 'power3.out',
    trigger: 'stagger',
    staggerDelay: 120,
  },
  {
    element: '[data-stat-card]',
    animation: 'scale',
    from: 0.95,
    to: 1,
    duration: 500,
    delay: 0,
    easing: 'power2.out',
    trigger: 'stagger',
    staggerDelay: 120,
  },
  {
    element: '[data-stat-card]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 500,
    delay: 0,
    easing: 'power2.out',
    trigger: 'stagger',
    staggerDelay: 120,
  },
];

// Counter animation (800ms duration)
export const counterAnimation = {
  element: '[data-counter-number]',
  from: 0,
  to: (target: HTMLElement) => parseInt(target.dataset.target || '0'),
  duration: 800,
  easing: 'power2.out',
  snap: { innerText: 1 },
};

// Plus symbol fade-in after number completes
export const plusSymbolAnimation = {
  element: '[data-counter-plus]',
  animation: 'opacity',
  from: 0,
  to: 1,
  duration: 200,
  delay: 500,
  easing: 'none',
};
export const plusSymbolPop = {
  element: '[data-counter-plus]',
  animation: 'scale',
  from: 0.5,
  to: 1.2,
  duration: 300,
  delay: 500,
  easing: 'elastic.out(1, 0.5)',
};

// Dark card (Actions Taken) — delayed, arrives from right
export const darkCardSpecialEntrance: AnimationSpec[] = [
  {
    element: '[data-stat-card-dark]',
    animation: 'x',
    from: 20,
    to: 0,
    duration: 500,
    delay: 200, // Additional delay
    easing: 'power2.out',
  },
];

// Hover states (CSS preferred for performance)
export const statsCardHoverCSS = {
  transform: 'translateY(-4px)',
  shadow: 'lg',
  transition: 'all 0.2s ease',
};

// Number scale on hover
export const statsNumberHover = {
  element: '[data-stat-number]',
  animation: 'scale',
  from: 1,
  to: 1.05,
  duration: 200,
  easing: 'power2.out',
};

// Green accent brightening
export const statsAccentHover = {
  element: '[data-stat-accent]',
  animation: 'opacity',
  from: 0.7,
  to: 1,
  duration: 200,
  easing: 'power2.out',
};

// ============================================================================
// 5. QUICK SNAPSHOT — "The Grid Snap"
// ============================================================================

export const snapshotGridEntrance = {
  element: '[data-snapshot-grid]',
  stagger: {
    from: 'center', // Middle cards animate first, spreading outward
    amount: 0.3,
  },
};

export const snapshotCardEntrance: AnimationSpec[] = [
  {
    element: '[data-snapshot-card]',
    animation: 'y',
    from: 50,
    to: 0,
    duration: 500,
    delay: 0,
    easing: 'power3.out',
  },
  {
    element: '[data-snapshot-card]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 500,
    delay: 0,
    easing: 'power2.out',
  },
  {
    element: '[data-snapshot-card]',
    animation: 'rotateX',
    from: 10,
    to: 0,
    duration: 500,
    delay: 0,
    easing: 'power2.out',
  },
];

// Icon entrance
export const snapshotIconEntrance = {
  element: '[data-snapshot-icon]',
  animation: 'scale',
  from: 0,
  to: 1,
  duration: 400,
  delay: 200,
  easing: 'back.out(1.7)',
};

// Interaction Design
export const snapshotCardInteractions = {
  hover: {
    transform: 'translateY(-6px)',
    shadow: 'lg',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s ease',
  },
  active: {
    transform: 'scale(0.98)',
    transition: 'all 0.1s ease',
  },
  focus: {
    ring: '2px',
    ringColor: '#00aa55',
    ringOffset: '2px',
    outline: 'none',
  },
};

// ============================================================================
// 6. STORIES FROM THE GROUND — "Editorial Depth"
// ============================================================================

export const storiesSectionHeader: AnimationSpec[] = [
  {
    element: '[data-stories-title]',
    animation: 'x',
    from: -30,
    to: 0,
    duration: 500,
    delay: 0,
    easing: 'power2.out',
  },
  {
    element: '[data-stories-title]',
    animation: 'clipPath',
    from: 'inset(0 100% 0 0)',
    to: 'inset(0 0% 0 0)',
    duration: 500,
    delay: 0,
    easing: 'power2.out',
  },
  {
    element: '[data-view-all-stories]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 300,
    delay: 200,
    easing: 'power2.out',
  },
  {
    element: '[data-view-all-stories]',
    animation: 'x',
    from: 10,
    to: 0,
    duration: 300,
    delay: 200,
    easing: 'power2.out',
  },
];

export const storyCardsEntrance: AnimationSpec[] = [
  {
    element: '[data-story-card]',
    animation: 'y',
    from: 80,
    to: 0,
    duration: 600,
    delay: 0,
    easing: 'power3.out',
  },
  {
    element: '[data-story-card]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 600,
    delay: 0,
    easing: 'power2.out',
    trigger: 'stagger',
    staggerDelay: 150,
  },
];

// Category badges pop in
export const categoryBadgeAnimation: AnimationSpec[] = [
  {
    element: '[data-category-badge]',
    animation: 'scale',
    from: 0,
    to: 1,
    duration: 400,
    delay: 600, // After card body settles
    easing: 'elastic.out(1, 0.5)',
  },
];

// Parallax for story cards (moves faster than scroll)
export const storyCardParallax = {
  speed: 1.1,
  axis: 'y',
};

// Hover enhancement
export const storyCardHover = {
  card: {
    transform: 'translateY(-8px)',
    transition: 'all 0.3s ease',
  },
  image: {
    transform: 'scale(1.05)',
    transition: 'transform 0.5s ease',
  },
  arrow: {
    transform: 'translateX(4px)',
    transition: 'transform 0.2s ease',
  },
  border: {
    borderColor: 'rgba(0, 0, 0, 0.15)',
    transition: 'border-color 0.3s ease',
  },
};

// ============================================================================
// 7. HOW IT WORKS — "The Process Pipeline"
// ============================================================================

export const processSectionEntrance: AnimationSpec[] = [
  {
    element: '[data-process-section]',
    animation: 'scale',
    from: 0.98,
    to: 1,
    duration: 600,
    delay: 0,
    easing: 'power2.out',
  },
];

// Step Card 1 (Identify) — slides from left
export const stepCard1Animation: AnimationSpec[] = [
  {
    element: '[data-step-card-1]',
    animation: 'x',
    from: -40,
    to: 0,
    duration: 500,
    delay: 0,
    easing: 'power2.out',
  },
  {
    element: '[data-step-number-1]',
    animation: 'scale',
    from: 1,
    to: 1.2,
    duration: 200,
    delay: 500,
    easing: 'power2.out',
  },
  {
    element: '[data-step-number-1]',
    animation: 'scale',
    from: 1.2,
    to: 1,
    duration: 200,
    delay: 700,
    easing: 'power2.out',
  },
];

// Step Card 2 (Verify) — slides from bottom
export const stepCard2Animation: AnimationSpec[] = [
  {
    element: '[data-step-card-2]',
    animation: 'y',
    from: 40,
    to: 0,
    duration: 500,
    delay: 100,
    easing: 'power2.out',
  },
  {
    element: '[data-step-number-2]',
    animation: 'rotate',
    from: 0,
    to: 360,
    duration: 600,
    delay: 600,
    easing: 'power2.out',
  },
];

// Step Card 3 (Act) — slides from right
export const stepCard3Animation: AnimationSpec[] = [
  {
    element: '[data-step-card-3]',
    animation: 'x',
    from: 40,
    to: 0,
    duration: 500,
    delay: 200,
    easing: 'power2.out',
  },
  {
    element: '[data-step-number-3]',
    animation: 'boxShadow',
    from: '0 0 0 rgba(0, 170, 85, 0)',
    to: '0 0 20px rgba(0, 170, 85, 0.5)',
    duration: 400,
    delay: 700,
    easing: 'power2.out',
  },
];

// Connecting lines (SVG stroke-dashoffset)
export const connectingLineAnimation = {
  element: '[data-process-line]',
  animation: 'strokeDashoffset',
  from: 1000,
  to: 0,
  duration: 400,
  delay: 800,
  easing: 'power2.out',
};

// Line pulse (data-flow animation)
export const linePulseAnimation = {
  element: '[data-process-line]',
  animation: 'opacity',
  from: 1,
  to: 0.3,
  duration: 1000,
  delay: 1200,
  easing: 'sine.inOut',
  repeat: -1,
  yoyo: true,
};

// 3D Tilt effect on hover
export const stepCardTiltEffect = {
  maxRotation: 5,
  reverse: true,
  scale: 1.05,
  duration: 300,
};

// ============================================================================
// 8. FAQ SECTION — "Accordion Breathing"
// ============================================================================

export const faqEntrance: AnimationSpec[] = [
  {
    element: '[data-faq-header]',
    animation: 'y',
    from: 20,
    to: 0,
    duration: 400,
    delay: 0,
    easing: 'power2.out',
  },
  {
    element: '[data-faq-header]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 400,
    delay: 0,
    easing: 'power2.out',
  },
];

// FAQ items with wave pattern
export const faqItemAnimations: AnimationSpec[] = [
  {
    element: '[data-faq-item]:nth-child(odd)',
    animation: 'x',
    from: -10,
    to: 0,
    duration: 400,
    delay: 0,
    easing: 'power2.out',
    trigger: 'stagger',
    staggerDelay: 80,
  },
  {
    element: '[data-faq-item]:nth-child(even)',
    animation: 'x',
    from: 10,
    to: 0,
    duration: 400,
    delay: 0,
    easing: 'power2.out',
    trigger: 'stagger',
    staggerDelay: 80,
  },
  {
    element: '[data-faq-item]',
    animation: 'y',
    from: 20,
    to: 0,
    duration: 400,
    delay: 0,
    easing: 'power2.out',
    trigger: 'stagger',
    staggerDelay: 80,
  },
  {
    element: '[data-faq-item]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 400,
    delay: 0,
    easing: 'power2.out',
    trigger: 'stagger',
    staggerDelay: 80,
  },
];

// Accordion interaction (future enhancement)
export const accordionAnimation = {
  open: {
    height: 'auto',
    duration: 300,
    easing: 'power2.out',
  },
  close: {
    height: 0,
    duration: 200,
    easing: 'power2.in',
  },
};

export const chevronAnimation = {
  open: {
    rotate: 180,
    duration: 300,
    easing: 'elastic.out(1, 0.5)',
  },
  close: {
    rotate: 0,
    duration: 200,
    easing: 'power2.in',
  },
};

export const accordionBackgroundShift = {
  from: 'white',
  to: '#f9f9f9',
  duration: 200,
  easing: 'power2.out',
};

// ============================================================================
// 9. EXPLORE THE PLATFORM — "Feature Previews"
// ============================================================================

export const featureCardEntrance: AnimationSpec[] = [
  {
    element: '[data-feature-card]',
    animation: 'scale',
    from: 0.9,
    to: 1,
    duration: 500,
    delay: 0,
    easing: 'power3.out',
  },
  {
    element: '[data-feature-card]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 500,
    delay: 0,
    easing: 'power2.out',
    trigger: 'stagger',
    staggerDelay: 100,
  },
];

// Gradient hue shift (15s loop)
export const featureCardGradientAnimation = {
  element: '[data-feature-gradient]',
  animation: 'filter',
  from: 'hue-rotate(0deg)',
  to: 'hue-rotate(10deg)',
  duration: 15000,
  delay: 0,
  easing: 'none',
  repeat: -1,
  yoyo: true,
};

// Hover states
export const featureCardHover = {
  card: {
    transform: 'translateY(-10px)',
    transition: 'all 0.3s ease',
  },
  icon: {
    transform: 'scale(1.1) rotate(5deg)',
    transition: 'all 0.3s ease',
  },
  preview: {
    transform: 'translate(5px, -5px)',
    transition: 'all 0.3s ease',
  },
  border: {
    borderColor: (accentColor: string) => accentColor,
    transition: 'border-color 0.3s ease',
  },
};

// ============================================================================
// 10. BIG CTA — "The Final Moment"
// Purpose: Conversion. This needs to feel inevitable, not pushy.
// ============================================================================

export const ctaBackgroundAnimation = {
  element: '[data-cta-gradient]',
  keyframes: [
    { backgroundSize: '100% 100%' },
    { backgroundSize: '110% 110%' },
    { backgroundSize: '100% 100%' },
  ],
  duration: 8000,
  easing: 'sine.inOut',
  repeat: -1,
};

// Noise texture overlay (static CSS)
export const noiseOverlayCSS = {
  opacity: 0.03,
  url: 'url(#noise)',
};

export const ctaEntrance: AnimationSpec[] = [
  {
    element: '[data-cta-title]',
    animation: 'y',
    from: 30,
    to: 0,
    duration: 500,
    delay: 0,
    easing: 'power3.out',
    trigger: 'stagger',
    staggerDelay: 50,
  },
  {
    element: '[data-cta-title]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 500,
    delay: 0,
    easing: 'power2.out',
    trigger: 'stagger',
    staggerDelay: 50,
  },
  {
    element: '[data-cta-description]',
    animation: 'y',
    from: 20,
    to: 0,
    duration: 400,
    delay: 200,
    easing: 'power2.out',
  },
  {
    element: '[data-cta-description]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 400,
    delay: 200,
    easing: 'power2.out',
  },
  {
    element: '[data-cta-button]',
    animation: 'scale',
    from: 0.9,
    to: 1,
    duration: 800,
    delay: 400,
    easing: 'elastic.out(1, 0.6)',
    trigger: 'stagger',
    staggerDelay: 100,
  },
  {
    element: '[data-trust-line]',
    animation: 'opacity',
    from: 0,
    to: 1,
    duration: 300,
    delay: 600,
    easing: 'none',
  },
];

// Typewriter effect for trust line (optional)
export const typewriterEffect = {
  element: '[data-trust-line]',
  text: 'Free to use. Open data. Transparent impact.',
  typeSpeed: 50,
  cursorBlink: true,
};

// Button interactions
export const ctaButtonHover = {
  primary: {
    backgroundColor: '#00bb66',
    boxShadow: '0 0 30px rgba(0, 170, 85, 0.3)',
    transition: 'all 0.2s ease',
  },
  secondary: {
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: 'all 0.2s ease',
  },
};

// Ambient floating elements
export const ambientFloatAnimation = {
  element: '[data-ambient-float]',
  animation: 'y',
  from: -10,
  to: 10,
  duration: 3000,
  delay: 0,
  easing: 'sine.inOut',
  repeat: -1,
  yoyo: true,
};

// ============================================================================
// 11. SCROLL-LINKED GLOBAL BEHAVIORS
// ============================================================================

export const progressBarConfig = {
  element: '[data-progress-bar]',
  updateOn: 'lenis.scroll', // Not native scroll
  smoothTransition: {
    property: 'width',
    duration: 0.1,
    easing: 'linear',
  },
};

// Parallax speed configurations
export const parallaxConfig = {
  speeds: {
    '[data-parallax="hero"]': 0.8,
    '[data-parallax="cards"]': 1.1,
    '[data-parallax="background"]': 0.5,
    '[data-parallax="foreground"]': 1.2,
  },
  axis: 'y',
};

// Scroll velocity reactivity
export const velocityReactivity = {
  enabled: true,
  skewThreshold: 2,
  maxSkewAngle: 2,
  skewFormula: (velocity: number) => velocity * 0.05,
  springBack: {
    easing: 'elastic.out(1, 0.5)',
    duration: 500,
  },
};

// ============================================================================
// 12. PERFORMANCE & ACCESSIBILITY SPECS
// ============================================================================

export const reducedMotionOverride = {
  enabled: 'prefers-reduced-motion: reduce',
  overrides: {
    parallax: false,
    yAnimations: 'opacity',
    counterAnimation: 'showFinal',
    tiltEffects: false,
    staggerDelays: 0.5, // Reduce by half
  },
};

export const performanceConfig = {
  willChangeProperties: ['transform', 'opacity'],
  removeWillChangeAfter: true,
  maxSimultaneousAnimations: 6,
  useTransform3d: true,
  debounceResize: {
    wait: 100,
    maxWait: 300,
  },
  scrollTriggerConfig: {
    refreshInterval: 200,
    limitCallbacks: true,
  },
};

export const mobileOptimizations = {
  disable3DTilt: true,
  reduceParallaxIntensity: 0.5,
  simplifyStaggerDelays: {
    multiplier: 0.7,
  },
  optimizeTouchEvents: true,
};

// ============================================================================
// 13. TIMING CHEAT SHEET
// ============================================================================

export const timingSummary = {
  pageLoad: {
    start: 0,
    end: 1200,
    unit: 'ms',
  },
  heroSequence: {
    start: 400,
    end: 1800,
    unit: 'ms',
  },
  statsEntrance: {
    total: 800,
    trigger: 'top 75%',
    unit: 'ms',
  },
  storiesEntrance: {
    total: 1000,
    trigger: 'viewport',
    unit: 'ms',
  },
  howItWorks: {
    total: 1200,
    trigger: 'viewport',
    unit: 'ms',
  },
  ctaEntrance: {
    total: 800,
    trigger: 'viewport',
    unit: 'ms',
  },
};

export const easingReference = {
  entrance: 'power3.out',
  movement: 'power2.inOut',
  buttons: 'elastic.out(1, 0.6)',
  badges: 'elastic.out(1, 0.5)',
  stagger: 'power2.out',
  scroll: 'none',
};

// ============================================================================
// 14. IMPLEMENTATION NOTES FOR EXISTING STACK
// ============================================================================

export const implementationNotes = {
  locomotiveGsapIntegration: {
    scrollCallback: 'update ScrollTrigger',
    refreshTiming: 'after all images load',
    batchStrategy: {
      default: 'individual',
      grids: 'ScrollTrigger.batch()',
      performanceWarning: 'switch to batch if degradation occurs',
    },
  },
  framerMotionNotes: {
    preferredFor: ['FAQ items', 'story cards', 'accordion behavior'],
    config: {
      whileInView: true,
      viewportSettings: {
        once: true,
        margin: '-100px',
      },
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  currentCodeEnhancements: {
    addAttributes: ['data-parallax-speed', 'data-scroll-speed'],
    counterAnimation: 'ensure no layout thrashing on mobile',
    recommended: 'Consider GSAP quickTo for progress bar',
  },
};

// Export all specs as a single object for easy importing
export const motionScript = {
  pageLoad: pageLoadSequence,
  scrollLock: scrollLockConfig,
  hero: {
    entrance: heroEntranceSequence,
    titleChars: titleCharacterAnimation,
    card: {
      entrance: heroCardEntrance,
      gradient: heroCardGradientAnimation,
      idle: heroCardIdleAnimation,
      borderPulse: heroCardBorderPulse,
      parallax: heroCardParallax,
    },
  },
  stats: {
    trigger: statsSectionTrigger,
    entrance: statsEntranceSequence,
    counter: counterAnimation,
    plusSymbol: plusSymbolAnimation,
    plusPop: plusSymbolPop,
    darkCard: darkCardSpecialEntrance,
    hover: {
      card: statsCardHoverCSS,
      number: statsNumberHover,
      accent: statsAccentHover,
    },
  },
  snapshot: {
    grid: snapshotGridEntrance,
    cards: snapshotCardEntrance,
    icon: snapshotIconEntrance,
    interactions: snapshotCardInteractions,
  },
  stories: {
    header: storiesSectionHeader,
    cards: storyCardsEntrance,
    badges: categoryBadgeAnimation,
    parallax: storyCardParallax,
    hover: storyCardHover,
  },
  process: {
    section: processSectionEntrance,
    step1: stepCard1Animation,
    step2: stepCard2Animation,
    step3: stepCard3Animation,
    lines: connectingLineAnimation,
    linePulse: linePulseAnimation,
    tilt: stepCardTiltEffect,
  },
  faq: {
    entrance: faqEntrance,
    items: faqItemAnimations,
    accordion: accordionAnimation,
    chevron: chevronAnimation,
    background: accordionBackgroundShift,
  },
  features: {
    entrance: featureCardEntrance,
    gradient: featureCardGradientAnimation,
    hover: featureCardHover,
  },
  cta: {
    background: ctaBackgroundAnimation,
    entrance: ctaEntrance,
    typewriter: typewriterEffect,
    buttons: ctaButtonHover,
    ambient: ambientFloatAnimation,
  },
  global: {
    progressBar: progressBarConfig,
    parallax: parallaxConfig,
    velocity: velocityReactivity,
  },
  accessibility: {
    reducedMotion: reducedMotionOverride,
    performance: performanceConfig,
    mobile: mobileOptimizations,
  },
  timing: timingSummary,
  easing: easingReference,
  implementation: implementationNotes,
};

export default motionScript;
