# SEO Site Checkup Tasklist - Budget Ndio Story

## Overview

**Current SEO Score:** 84/100 (Above average of 75%)
**Issues Found:** 9 Failed, 2 Warnings, 50 Passed

## Priority Tasks

### HIGH Priority

#### 1. Add H1 Heading Tag

**Issue:** The webpage is missing H1 headings which help search engines identify important topics.

**Current H2 Tags Found:**

- "Where did the health budget go?"
- "From numbers to narratives"
- "Frequently Asked Questions"
- "Your tax money. Your right to know."

**Solution:**

- Add a descriptive H1 tag with primary keyword (e.g., "Budget Ndio Story - Bridging the Budget Literacy Gap for Kenyan Citizens")
- Place H1 at the top of main content
- Ensure only one H1 per page

#### 2. Eliminate Render-Blocking Resources

**Issue:** 15% of top sites passed - render-blocking resources slow down page loading

**Current Resources:**

- JavaScript: 27 requests (75%)
- CSS: 1 request (2.8%)
- Total: 36 HTTP requests

**Solution:**

- Defer non-critical JavaScript
- Inline critical CSS
- Use `next/script` with strategy="afterInteractive" or "lazyOnload"
- Move scripts to footer where possible

### MEDIUM Priority

#### 3. Set Up CDN for Static Resources

**Issue:** Resources are not being served from CDN (95% of top sites use CDN)

**Current Domain:** budgetndiostory.org (100% of traffic)

**Solution:**

- Configure CDN (Cloudflare, Vercel Edge, AWS CloudFront)
- Cache static assets: images, JS, CSS, fonts
- Enable compression at CDN level

#### 4. Create Custom 404 Error Page

**Issue:** Default 404 pages provide poor user experience

**Solution:**

- Create `pages/404.tsx` or `app/not-found.tsx`
- Include helpful navigation links
- Add search functionality
- Display popular content sections
- Track 404 errors for broken link detection

#### 5. Add Google Analytics

**Issue:** No Google Analytics script detected (72% of top sites have it)

**Solution:**

- Create `components/Analytics.tsx` (already exists)
- Add GA4 measurement ID to environment variables
- Implement in `app/layout.tsx` or `pages/_app.tsx`
- Track key metrics: page views, bounce rate, session duration

#### 6. Implement Structured Data (JSON-LD)

**Issue:** No structured data for rich search results

**Solution:**

- Add Organization schema
- Add Website schema with search action
- Add Article schema for blog posts
- Add BreadcrumbList schema
- Use JSON-LD format in `<script>` tags

### LOW Priority

#### 7. Reduce HTTP Requests

**Issue:** 36 HTTP requests (recommendation: under 20)

**Breakdown:**

- JavaScript: 27 requests (84.1% of content size)
- Fonts: 2 requests
- Other: 4 requests
- CSS: 1 request
- HTML: 1 request
- Images: 1 request

**Solution:**

- Code-split JavaScript bundles
- Combine CSS files
- Use font subsets
- Lazy-load images and videos
- Implement tree-shaking

#### 8. Set Up SPF Record

**Issue:** No SPF record for email security

**Solution:**

- Add TXT record to DNS:
  ```
  v=spf1 include:_spf.google.com ~all
  ```
- For domain: `budgetndiostory.org`
- See `SPF_RECORD_GUIDANCE.md` for detailed instructions

### Advanced SEO Tasks

#### 9. Add Canonical Tag

**Issue:** No canonical link tag (93% of top sites use it)

**Solution:**

- Add to all pages:
  ```html
  <link rel="canonical" href="https://www.budgetndiostory.org/[page-path]" />
  ```
- Handle www vs non-www canonicalization
- Use absolute URLs

#### 10. Consistent Open Graph & Twitter Cards

**Current Status:**

- og:title: Budget Ndio Story ✓
- og:description: Bridging the budget literacy gap for youth through storytelling ✓

**Missing:**

- og:image (required for link previews)
- og:url
- og:type
- twitter:card
- twitter:image
- twitter:site

**Solution:**

- Add complete Open Graph tags
- Add Twitter Card meta tags
- Use optimized featured images (1200x630px)

#### 11. Update robots.txt

**Current Status:** ✓ robots.txt exists

**Improvements:**

- Add `Sitemap:` directive
- Add Crawl-delay if needed
- Review Disallow directives

## Implementation Plan

### Phase 1: Critical Fixes (Week 1)

1. Add H1 heading to homepage
2. Add canonical tags
3. Fix render-blocking resources
4. Add Google Analytics

### Phase 2: Performance (Week 2)

5. Configure CDN
6. Reduce HTTP requests
7. Optimize images

### Phase 3: SEO Enhancements (Week 3)

8. Implement structured data
9. Create custom 404 page
10. Complete social meta tags

### Phase 4: Security & Maintenance (Week 4)

11. Set up SPF record
12. Update robots.txt
13. Test all improvements

## Testing & Verification

### Tools to Use

1. **Google Search Console** - Monitor indexing
2. **Lighthouse** - Performance testing
3. **GTmetrix** - Speed analysis
4. **Schema.org Validator** - Structured data testing
5. **Open Graph Debugger** - Social preview testing

### Success Metrics

- SEO Score: Target 90+ (currently 84)
- LCP: Under 2.5s (currently 0.0s)
- CLS: Under 0.1 (currently 0.0000)
- FCP: Under 1.8s (currently 0.696s)
- TTFB: Under 0.8s (currently 0.001s)

## Files to Modify

```
components/
├── Analytics.tsx (update GA4)
├── StructuredData.tsx (add schemas)
└── SeoMeta.tsx (create for meta tags)

pages/
├── 404.tsx (create custom page)
├── _app.tsx or app/layout.tsx
└── index.tsx (add H1)

lib/
├── seo.ts (update SEO utilities)
└── constants.ts (add GA4 ID)

public/
├── robots.txt (update)
└── sitemap.xml (verify)

next.config.mjs (CDN configuration)
```

## Notes

- The site already has many SEO best practices in place
- Focus on high-impact, low-effort improvements first
- Test changes incrementally to avoid regressions
- Monitor Search Console for indexing issues
- Track performance metrics over time

---

**Generated:** 2026-02-09
**SEO Score:** 84/100
**Target Score:** 90/100
