# Ochi Design System Library

## 📦 Overview
This is a comprehensive, reusable design system extracted from the Ochi website clone. It includes GSAP animations, Framer Motion components, marquee effects, and scroll-based interactions that you can use in any React/Next.js project.

## 🎨 Design Principles
- **Typography**: FoundersGrotesk & NeueMontreal fonts
- **Color Palette**:
  - Background: `#f1f1f1`
  - Secondary: `#212121`
  - Marquee: `#004d43`
  - About: `#cdea68`
- **Easing**: Custom cubic-bezier `[0.76, 0, 0.24, 1]` for smooth animations
- **Responsive**: Mobile-first with breakpoints (xm, sm, md, lg, xl)

## 🚀 Key Features

### 1. **Marquee Animations** (Framer Motion)
- **LogoMarquee**: Scroll-velocity-based infinite marquee
- **TextMarquee**: Horizontal text scrolling with customizable speed

### 2. **Page Transition Animations**
- **FadeUp**: Elements fade in from below
- **ScaleIn**: Scale and fade in effect
- **SlideIn**: Slide from left/right
- **TextReveal**: Text reveal with overflow mask
- **StaggerContainer**: Stagger children animations
- **Parallax**: Scroll-based parallax effect
- **RotateIn**: Rotate and scale in
- **HoverScale**: Interactive hover scaling

### 3. **GSAP Animations**
- **Rounded Button**: Circular hover effect with GSAP timeline
- **Curve Transition**: SVG path morphing for page transitions

### 4. **Text Effects**
- **TextMask**: Intersection observer-based text reveal
- **TextHover**: Interactive text hover effects
- **LinkHover**: Animated link underlines

### 5. **Motion Variants**
Pre-configured Framer Motion variants for:
- Navigation animations
- Footer animations
- Menu slide effects
- Curve transitions
- Opacity transitions

## 📂 File Structure

```
animation/
├── LogoMarquee.tsx          # Scroll-velocity marquee
├── TextMask.tsx             # Text reveal animation
├── TextHover.tsx            # Hover text effects
├── LinkHover.tsx            # Link animations
├── PageAnimations.tsx       # All page animation components
└── index.ts                 # Exports

components/
├── Marquee.tsx              # Marquee component
├── Rounded.tsx              # GSAP rounded button
├── Curve/Curve.jsx          # Page transition curve
└── [other components]

motion/
└── index.ts                 # Motion variants library

styles/
└── globals.css              # Global styles & utilities

tailwind.config.ts           # Tailwind configuration
```

## 🔧 Installation

### Dependencies
```bash
npm install framer-motion gsap react-intersection-observer
```

### Fonts
Include these fonts in your project:
- FoundersGrotesk.woff


### Tailwind Config
Copy the `tailwind.config.ts` for responsive breakpoints and custom colors.

## 💡 Usage Examples

### 1. Marquee Animation
```tsx
import { TextMarquee } from '@/animation';

<TextMarquee baseVelocity="0.7">
  <h1>Your scrolling text here</h1>
</TextMarquee>
```

### 2. Page Animations
```tsx
import { FadeUp, ScaleIn, SlideIn } from '@/animation';

<FadeUp delay={0.2} duration={0.8}>
  <div>Content fades up</div>
</FadeUp>

<ScaleIn delay={0.3}>
  <img src="..." alt="..." />
</ScaleIn>

<SlideIn direction="left">
  <p>Slides in from left</p>
</SlideIn>
```

### 3. GSAP Rounded Button
```tsx
import Rounded from '@/components/Rounded';

<Rounded
  backgroundColor="#212121"
  className="w-40 h-40"
>
  <span>Click Me</span>
</Rounded>
```

### 4. Text Reveal
```tsx
import { TextMask } from '@/animation';

<TextMask>
  {["Line 1", "Line 2", "Line 3"]}
</TextMask>
```

### 5. Stagger Animation
```tsx
import { StaggerContainer } from '@/animation';

<StaggerContainer>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerContainer>
```

## 🎯 Motion Variants

Use pre-configured variants for consistent animations:

```tsx
import { navVariants, footerVarient, menuSlide } from '@/motion';
import { motion } from 'framer-motion';

<motion.nav variants={navVariants} initial="hidden" animate="vissible">
  Navigation
</motion.nav>
```

Available variants:
- `navVariants` - Navbar slide down
- `footerVarient` - Footer fade up
- `menuSlide` - Mobile menu slide
- `slide` - Stagger slide
- `scale` - Scale open/close
- `transitionText` - Page transition text
- `opacity` - Fade in/out
- `slideUp` - Slide up exit

## 🎨 Tailwind Utilities

Custom utility classes available:
- `.padding-x` - Responsive horizontal padding
- `.padding-y` - Responsive vertical padding
- `.margin` - Responsive margins
- `.heading` - Responsive heading sizes
- `.sub-heading` - Responsive subheading
- `.paragraph` - Responsive paragraph
- `.sub-paragraph` - Responsive sub-paragraph
- `.small-text` - Responsive small text
- `.hover` - Animated underline on hover
- `.link-flash` - Flash underline animation

## 🌟 Advanced Features

### Scroll-Velocity Marquee
The LogoMarquee component responds to scroll velocity:
- Scrolling down speeds up the marquee
- Scrolling up reverses direction
- Smooth spring physics for natural feel

### Intersection Observer
Text animations trigger when elements enter viewport:
- Configurable threshold
- Trigger once or repeat
- Stagger delays for multiple elements

### GSAP Timeline
Rounded button uses GSAP timeline for complex hover states:
- Smooth enter/exit animations
- Delayed hover effects
- Circular reveal animation

## 📱 Responsive Design

Breakpoints:
- `xm`: max 400px
- `sm`: 401px - 768px
- `md`: 769px - 1024px
- `lg`: 1025px - 1490px
- `xl`: 1491px+

## 🎬 Animation Easing

Custom easing function used throughout:
```javascript
ease: [0.76, 0, 0.24, 1]  // Smooth, professional easing
```

## 🔄 Reusability

To use in another project:
1. Copy the `animation/` folder
2. Copy the `motion/` folder
3. Copy relevant components from `components/`
4. Copy `styles/globals.css`
5. Update `tailwind.config.ts`
6. Install dependencies
7. Add fonts to your project

## 📝 Notes

- All animations use Framer Motion or GSAP
- Intersection Observer for scroll-triggered animations
- Responsive and mobile-optimized
- Accessible and performant
- TypeScript support included

## 🚨 Important

- Ensure fonts are properly loaded
- GSAP requires proper licensing for commercial use
- Test animations on different devices
- Adjust timing/easing to match your brand

## 📖 Documentation

Each component is self-documented with TypeScript types. Check individual files for detailed prop types and usage.

---

**Created by**: Design System Team
**Version**: 1.0.0
**Last Updated**: 2026-01-26
