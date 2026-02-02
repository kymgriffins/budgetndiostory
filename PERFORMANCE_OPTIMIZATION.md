# Performance Optimization Guide

This document outlines the comprehensive performance optimization strategy implemented for the Budget Ndio Story Next.js application.

## 🎯 Performance Targets

| Metric          | Target  | Priority |
| --------------- | ------- | -------- |
| **TTFB**        | < 100ms | Critical |
| **FCP**         | < 0.8s  | Critical |
| **LCP**         | < 1.2s  | Critical |
| **INP**         | < 100ms | High     |
| **CLS**         | 0       | Critical |
| **TBT**         | < 150ms | High     |
| **Speed Index** | < 1.5s  | Medium   |

## ✅ Implemented Optimizations

### 1. Infrastructure & Deployment

#### Edge Caching (`middleware.ts`)

- Configured stale-while-revalidate caching strategy
- Added security headers (X-DNS-Prefetch-Control, X-Content-Type-Options, etc.)
- Cache-Control headers for HTML pages: `public, max-age=60, s-maxage=3600, stale-while-revalidate=86400`

#### Next.js Configuration (`next.config.mjs`)

- **Compression**: Enabled automatic gzip/brotli compression
- **Image Optimization**: AVIF and WebP formats with device sizes up to 1920px
- **Console Removal**: Console.log statements removed in production
- **Package Optimization**: Optimized imports for framer-motion, gsap, lucide-react, lodash-es
- **CSS Optimization**: Enabled experimental CSS optimization
- **Security Headers**: X-DNS-Prefetch-Control, X-Content-Type-Options, Referrer-Policy

### 2. Asset Optimization

#### Image Components (`components/OptimizedImage.tsx`)

- **LCP Optimization**: `HeroImage` component with priority loading and fetchPriority="high"
- **Lazy Loading**: Thumbnail images lazy-loaded by default
- **Blur Placeholders**: Optional blur placeholder for smooth loading
- **Error Handling**: Graceful fallback when images fail to load
- **Responsive Sizing**: Proper `sizes` attribute for responsive images

#### Font Optimization

- Custom fonts (FoundersGrotesk, NeueMontreal) are locally hosted in `/fonts/`
- Preload critical fonts via `_document.tsx`
- Font display: swap for zero FOIT (Flash of Invisible Text)

### 3. JavaScript Optimization

#### Code Splitting

- Next.js automatically splits code by route
- Dynamic imports for heavy components (locomotive-scroll, gsap)
- `lazyOnload` strategy for non-critical scripts

#### Script Loading (`lib/scriptLoader.ts`)

- `ScriptStrategy` enum for consistent script loading strategies
- Deferred analytics loading (loads on first user interaction)
- Preconnect hints for third-party origins
- Analytics check to prevent duplicate loading

### 4. Caching Strategy

#### Multi-Layer Caching

1. **Browser Cache**: 1 year for static assets (immutable)
2. **CDN Cache (Vercel)**: 1 hour for HTML with stale-while-revalidate
3. **Next.js Data Cache**: Server-side caching for data fetching

#### Cache Headers

```typescript
// Static assets
Cache-Control: public, max-age=31536000, immutable

// HTML pages
Cache-Control: public, max-age=60, s-maxage=3600, stale-while-revalidate=86400
```

### 5. Real User Monitoring

#### Web Vitals (`components/WebVitals.tsx`)

- Tracks all Core Web Vitals metrics
- Sends data to `/api/vitals` endpoint
- Uses `sendBeacon` for reliable delivery
- Development logging for debugging

#### Vitals API (`pages/api/vitals.ts`)

- Receives and stores performance metrics
- In-memory storage (replace with database in production)
- Timestamps and user context included

### 6. Performance Budgets

#### Lighthouse CI (`lighthouserc.json`)

- Performance: minScore 0.9
- Accessibility: minScore 0.9
- Best Practices: minScore 0.9
- SEO: minScore 0.9
- FCP: max 1500ms
- LCP: max 2000ms
- TBT: max 300ms
- CLS: max 0.1

## 🚀 Quick Wins Applied

### Immediate (Already Implemented)

- ✅ Enabled `next/image` with AVIF/WebP formats
- ✅ Configured `lazyOnload` for third-party scripts
- ✅ Added `priority` to LCP images
- ✅ Enabled SWC minification
- ✅ Added CDN cache headers
- ✅ Removed console.log in production
- ✅ Optimized package imports
- ✅ Added Web Vitals monitoring

### High Impact (Already Implemented)

- ✅ Configured edge caching middleware
- ✅ Added performance budgets
- ✅ Implemented script loading strategies
- ✅ Created optimized image components

## 📊 Testing Commands

```bash
# Run production build
npm run build && npm run start

# Lighthouse CI audit
npx lighthouserc http://localhost:3000 --preset=desktop

# Bundle analysis
ANALYZE=true npm run build

# Check Web Vitals (open browser console)
# Navigate to any page and check console for metrics

# Check vitals API
curl -X POST http://localhost:3000/api/vitals \
  -H "Content-Type: application/json" \
  -d '{"id":"test","name":"FCP","value":1000,"rating":"good","delta":0}'
```

## 🔧 Monitoring & Alerting

### Development

- Open browser console to see Web Vitals logs
- Check `/api/vitals` endpoint for received metrics

### Production

- Deploy to Vercel for edge network benefits
- Set up Vercel Analytics for comprehensive monitoring
- Configure alerts for performance regressions

## 📝 Future Optimizations

Consider these additional optimizations as needed:

1. **Partial Prerendering (PPR)**: For mixed static/dynamic content
2. **React Server Components**: Migrate to App Router for better streaming
3. **Partytown**: For offloading third-party scripts to web workers
4. **On-Demand Revalidation**: For real-time content updates
5. **Bundle Analyzer**: Regular analysis to detect bundle bloat

## 📖 Resources

- [Next.js Performance Documentation](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Vercel Edge Network](https://vercel.com/docs/edge-network/overview)
