# Budget Ndio Story - Page Transition Optimization Progress

## Document Status: ACTIVE DEVELOPMENT

## Last Updated: February 5, 2025

## Target: 10/10 Performance Score on All Pages

---

## 🎯 Executive Summary

This document outlines the comprehensive roadmap for achieving **10/10 performance scores** across all pages in the Budget Ndio Story application. Current analysis reveals **critical mobile performance issues** that must be addressed to reach production-quality standards.

### Current Performance Snapshot

| Metric          | Desktop  | Mobile     | Target | Gap (Mobile) |
| --------------- | -------- | ---------- | ------ | ------------ |
| **LCP**         | 2.7s ⚠️  | 13.0s ❌   | <2.5s  | -10.5s       |
| **TBT**         | 560ms ⚠️ | 2,800ms ❌ | <200ms | -2,600ms     |
| **Speed Index** | 2.1s ⚠️  | 10.0s ❌   | <3.4s  | -6.6s        |
| **CLS**         | 0.041 ✅ | 0.032 ✅   | <0.1   | ✅ Pass      |
| **FCP**         | 0.33s ✅ | 1.1s ✅    | <1.8s  | ✅ Pass      |
| **Interactive** | 2.7s ✅  | 13.0s ❌   | <3.8s  | -9.2s        |

---

## 🔴 Critical Issues Matrix

### Priority 1: Critical (Must Fix Before Launch)

| Issue                 | Page(s) Affected | Root Cause                      | Impact               |
| --------------------- | ---------------- | ------------------------------- | -------------------- |
| **Mobile LCP > 13s**  | All pages        | Large JS bundles, GSAP blocking | UX Severely Degraded |
| **Mobile TBT > 2.8s** | All pages        | Animation library overhead      | Poor Interactivity   |
| **Speed Index > 10s** | All pages        | Above-fold rendering blocked    | Perceived Slowness   |

### Priority 2: High (Should Fix Before Launch)

| Issue                  | Page(s) Affected | Root Cause                | Impact     |
| ---------------------- | ---------------- | ------------------------- | ---------- |
| **Bundle Size**        | All pages        | No aggressive splitting   | Slow Load  |
| **Font Loading**       | All pages        | Unoptimized font delivery | FCP Impact |
| **Image Optimization** | Media pages      | Missing next/image        | LCP Impact |

### Priority 3: Medium (Nice to Have)

| Issue                     | Page(s) Affected | Impact      |
| ------------------------- | ---------------- | ----------- |
| **Animation Consistency** | All pages        | UX Degraded |
| **Reduced Motion**        | Accessibility    | A11y Impact |
| **Transition States**     | All pages        | UX Quality  |

---

## 📄 Page-by-Page Optimization Plan

### 1. 🏠 Home Page (`/`)

**Current Status:** 7.5/10

#### Current Issues

- [ ] LCP: 2.7s (Desktop), 13.0s (Mobile) - ❌
- [ ] TBT: 560ms (Desktop), 2,800ms (Mobile) - ❌
- [ ] Hero section animations blocking main thread

#### Optimization Tasks

| Task                                   | Priority | Effort | Impact |
| -------------------------------------- | -------- | ------ | ------ |
| Lazy load GSAP animations below fold   | P1       | 2h     | +15%   |
| Implement critical CSS for hero        | P1       | 1h     | +20%   |
| Add `next/image` with priority to hero | P1       | 1h     | +25%   |
| Remove Locomotive Scroll on mobile     | P1       | 3h     | +30%   |
| Code split page sections               | P2       | 2h     | +10%   |
| Optimize hero video embed              | P2       | 1h     | +15%   |

#### Target: 10/10

- [ ] LCP < 2.5s (Desktop & Mobile)
- [ ] TBT < 200ms (Mobile)
- [ ] Speed Index < 3.4s

---

### 2. 📚 Education Page (`/edu`)

**Current Status:** 8.0/10

#### Current Issues

- [ ] Course cards causing layout shifts
- [ ] Sidebar navigation blocking main thread
- [ ] Video player lazy loading issues

#### Optimization Tasks

| Task                                   | Priority | Effort | Impact |
| -------------------------------------- | -------- | ------ | ------ |
| Implement skeleton loaders for courses | P1       | 2h     | +15%   |
| Code split sidebar component           | P2       | 1h     | +10%   |
| Lazy load video players on scroll      | P2       | 2h     | +20%   |
| Optimize course card CLS               | P2       | 1h     | +10%   |

#### Target: 10/10

- [ ] CLS < 0.1
- [ ] LCP < 2.5s
- [ ] TTI < 3.8s

---

### 3. 🎙️ Podcasts Page (`/podcasts`)

**Current Status:** 7.8/10

#### Current Issues

- [ ] YouTube player iframe blocking
- [ ] Episode list rendering delay
- [ ] No progressive image loading

#### Optimization Tasks

| Task                                   | Priority | Effort | Impact |
| -------------------------------------- | -------- | ------ | ------ |
| Implement facades for video thumbnails | P1       | 2h     | +25%   |
| Virtualize long episode lists          | P2       | 3h     | +20%   |
| Add progressive image loading          | P2       | 1h     | +10%   |
| Code split player component            | P2       | 1h     | +10%   |

#### Target: 10/10

- [ ] LCP < 2.5s
- [ ] TBT < 200ms
- [ ] No layout shifts

---

### 4. 📰 Blog Listing (`/blog`)

**Current Status:** 8.5/10

#### Current Issues

- [ ] Search/filter blocking main thread
- [ ] Thread preview rendering heavy
- [ ] Category filter no debouncing

#### Optimization Tasks

| Task                                                | Priority | Effort | Impact |
| --------------------------------------------------- | -------- | ------ | ------ |
| Debounce search input                               | P1       | 30m    | +15%   |
| Virtualize long post lists                          | P2       | 2h     | +20%   |
| Code split filter component                         | P2       | 1h     | +10%   |
| Implement intersection observer for infinite scroll | P2       | 2h     | +15%   |

#### Target: 10/10

- [ ] TBT < 200ms
- [ ] LCP < 2.5s
- [ ] Smooth filtering experience

---

### 5. 📝 Blog Post (`/blog/[slug]`)

**Current Status:** 8.2/10

#### Current Issues

- [ ] Thread system blocking main thread
- [ ] No progressive content loading
- [ ] Heavy SEO components

#### Optimization Tasks

| Task                                  | Priority | Effort | Impact |
| ------------------------------------- | -------- | ------ | ------ |
| Lazy load comments section            | P1       | 2h     | +25%   |
| Implement content progressive loading | P2       | 2h     | +15%   |
| Defer non-critical SEO scripts        | P2       | 1h     | +10%   |
| Optimize thread rendering             | P2       | 2h     | +15%   |

#### Target: 10/10

- [ ] LCP < 2.5s
- [ ] TBT < 200ms
- [ ] Content interactive immediately

---

### 6. 💰 Tracker Pages (`/tracker`, `/tracker/details/[id]`)

**Current Status:** 7.0/10

#### Current Issues

- [ ] Complex data table rendering
- [ ] Chart library not optimized
- [ ] No pagination/virtualization

#### Optimization Tasks

| Task                                | Priority | Effort | Impact |
| ----------------------------------- | -------- | ------ | ------ |
| Implement virtualization for tables | P1       | 3h     | +30%   |
| Lazy load chart components          | P1       | 2h     | +20%   |
| Add pagination with URL sync        | P2       | 2h     | +15%   |
| Optimize data fetching              | P2       | 1h     | +10%   |

#### Target: 10/10

- [ ] TBT < 200ms
- [ ] LCP < 2.5s
- [ ] Smooth table interactions

---

### 7. 🛠️ Admin Pages (`/admin/blog`)

**Current Status:** 7.5/10

#### Current Issues

- [ ] Rich editor blocking main thread
- [ ] Form validation overhead
- [ ] No optimistic UI updates

#### Optimization Tasks

| Task                           | Priority | Effort | Impact |
| ------------------------------ | -------- | ------ | ------ |
| Code split editor component    | P1       | 2h     | +20%   |
| Implement optimistic mutations | P2       | 2h     | +15%   |
| Defer form validation          | P2       | 1h     | +10%   |

#### Target: 10/10

- [ ] TTI < 3.8s
- [ ] TBT < 200ms
- [ ] Responsive form interactions

---

### 8. 📊 Analytics Page (`/analytics`)

**Current Status:** 6.5/10

#### Current Issues

- [ ] Heavy chart rendering
- [ ] Real-time data polling overhead
- [ ] Dashboard widget layout shifts

#### Optimization Tasks

| Task                                 | Priority | Effort | Impact |
| ------------------------------------ | -------- | ------ | ------ |
| Virtualize dashboard widgets         | P1       | 3h     | +25%   |
| Implement WebSocket for real-time    | P2       | 4h     | +20%   |
| Reserve space for charts (CLS)       | P1       | 1h     | +15%   |
| Defer non-visible dashboard sections | P2       | 2h     | +15%   |

#### Target: 10/10

- [ ] CLS < 0.1
- [ ] TBT < 200ms
- [ ] Stable layout during load

---

## 🔧 Global Optimization Tasks

### Animation System Overhaul

| Task                                         | Priority | Effort | Impact |
| -------------------------------------------- | -------- | ------ | ------ |
| Implement `useReducedMotion` globally        | P1       | 1h     | +15%   |
| Add mobile-specific animation variants       | P1       | 3h     | +25%   |
| Lazy load GSAP only when needed              | P1       | 2h     | +20%   |
| Remove Locomotive Scroll on mobile           | P1       | 3h     | +30%   |
| Implement CSS-only animations where possible | P2       | 4h     | +15%   |

### Code Splitting Strategy

| Task                            | Priority | Effort | Impact |
| ------------------------------- | -------- | ------ | ------ |
| Implement route-based splitting | P1       | 1h     | +25%   |
| Component-level dynamic imports | P1       | 2h     | +20%   |
| Vendor bundle separation        | P2       | 2h     | +10%   |
| Analyze and reduce bundle size  | P1       | 3h     | +30%   |

### Font Optimization

| Task                            | Priority | Effort | Impact |
| ------------------------------- | -------- | ------ | ------ |
| Use `next/font` with swap       | P1       | 1h     | +15%   |
| Preload critical fonts          | P1       | 30m    | +10%   |
| Implement font display optional | P2       | 30m    | +5%    |

### Image Optimization

| Task                           | Priority | Effort | Impact |
| ------------------------------ | -------- | ------ | ------ |
| Add `next/image` to all images | P1       | 3h     | +25%   |
| Implement blur placeholders    | P2       | 2h     | +10%   |
| Use modern formats (AVIF/WebP) | P2       | 1h     | +10%   |

---

## 📅 Implementation Timeline

### Phase 1: Critical Fixes (Week 1)

| Day | Task                                            | Owner |
| --- | ----------------------------------------------- | ----- |
| 1   | Remove Locomotive Scroll on mobile              | TBD   |
| 2   | Add `next/image` with priority to hero sections | TBD   |
| 3   | Implement critical CSS inlining                 | TBD   |
| 4   | Lazy load GSAP animations below fold            | TBD   |
| 5   | Code split main page components                 | TBD   |

### Phase 2: Performance Tuning (Week 2)

| Day | Task                                        | Owner |
| --- | ------------------------------------------- | ----- |
| 1   | Implement `useReducedMotion` globally       | TBD   |
| 2   | Add mobile-specific animation variants      | TBD   |
| 3   | Virtualize table/list components            | TBD   |
| 4   | Optimize font loading                       | TBD   |
| 5   | Implement lazy loading for heavy components | TBD   |

### Phase 3: Polish (Week 3)

| Day | Task                               | Owner |
| --- | ---------------------------------- | ----- |
| 1   | Add skeleton loaders               | TBD   |
| 2   | Implement optimistic UI updates    | TBD   |
| 3   | Add progressive loading indicators | TBD   |
| 4   | Final Lighthouse audit             | TBD   |
| 5   | Deploy and monitor                 | TBD   |

---

## ✅ Verification Checklist

### Pre-Launch Checklist

- [ ] **Desktop Lighthouse Score: 95+**
  - [ ] Performance > 95
  - [ ] Accessibility > 95
  - [ ] Best Practices > 95
  - [ ] SEO > 95

- [ ] **Mobile Lighthouse Score: 90+**
  - [ ] Performance > 90
  - [ ] Accessibility > 90
  - [ ] Best Practices > 90
  - [ ] SEO > 90

- [ ] **Core Web Vitals Passing**
  - [ ] LCP < 2.5s (mobile)
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
  - [ ] TBT < 200ms (mobile)

### Per-Page Checklist

| Page         | LCP   | TBT    | CLS  | Score |
| ------------ | ----- | ------ | ---- | ----- |
| /            | <2.5s | <200ms | <0.1 | /100  |
| /edu         | <2.5s | <200ms | <0.1 | /100  |
| /podcasts    | <2.5s | <200ms | <0.1 | /100  |
| /blog        | <2.5s | <200ms | <0.1 | /100  |
| /blog/[slug] | <2.5s | <200ms | <0.1 | /100  |
| /tracker     | <2.5s | <200ms | <0.1 | /100  |
| /admin/blog  | <3.8s | <200ms | <0.1 | /100  |
| /analytics   | <3.8s | <200ms | <0.1 | /100  |

---

## 📊 Progress Metrics

### Current Sprint Progress

| Metric              | Start  | Current | Target |
| ------------------- | ------ | ------- | ------ |
| Overall Score       | 6.5/10 | -/10    | 10/10  |
| Critical Issues     | 3      | -       | 0      |
| High Priority Tasks | 5      | -       | 0      |
| Pages at 10/10      | 0      | -       | 8      |

### Weekly Targets

| Week | Target Score | Critical Milestones      |
| ---- | ------------ | ------------------------ |
| 1    | 7.5/10       | Critical issues resolved |
| 2    | 8.5/10       | All P1 tasks complete    |
| 3    | 9.5/10       | All P2 tasks complete    |
| 4    | 10/10        | Launch ready             |

---

## 🐛 Known Issues Log

### Active Issues

| ID       | Description               | Severity | Status | Owner |
| -------- | ------------------------- | -------- | ------ | ----- |
| MOB-001  | Mobile LCP > 13s          | Critical | Open   | TBD   |
| MOB-002  | Mobile TBT > 2.8s         | Critical | Open   | TBD   |
| MOB-003  | Speed Index > 10s         | High     | Open   | TBD   |
| ANIM-001 | GSAP blocking main thread | High     | Open   | TBD   |
| ANIM-002 | No reduced motion support | Medium   | Open   | TBD   |

### Resolved Issues

| ID  | Description | Resolution Date |
| --- | ----------- | --------------- |
| N/A | -           | -               |

---

## 📝 Notes

### Technical Decisions

1. **Animation Strategy**: Will use CSS animations for simple effects, GSAP only for complex sequences
2. **Mobile First**: All optimizations will prioritize mobile experience
3. **Bundle Budget**: Enforce strict bundle size limits in Next.js config
4. **Caching**: Aggressive static caching with ISR for content pages

### Dependencies

- Next.js 14 (already installed)
- GSAP (optimize usage)
- Locomotive Scroll (remove on mobile)
- React Intersection Observer (add for lazy loading)

---

## 🔗 Related Documents

- [MVP_PROGRESS.md](./MVP_PROGRESS.md) - Original MVP status
- [PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md) - Previous optimization notes
- [lighthouse-desktop.json](./lighthouse-desktop.json) - Desktop audit results
- [lighthouse-mobile.json](./lighthouse-mobile.json) - Mobile audit results
- [lighthouserc.json](./lighthouserc.json) - CI configuration

---

## 📈 Success Criteria

### Hard Metrics

1. **Mobile Performance Score: 90+**
2. **Desktop Performance Score: 95+**
3. **All Core Web Vitals in green**
4. **Bundle size reduced by 50%**

### Soft Metrics

1. **Perceived performance**: Instant navigation feel
2. **Animation smoothness**: 60fps on all devices
3. **Accessibility**: WCAG 2.1 AA compliance
4. **User satisfaction**: Zero complaints about slowness

---

**Document Version:** 1.0
**Next Review:** February 12, 2025
**Status:** 🚧 UNDER DEVELOPMENT
