# Budget Ndio Story - Technical Documentation v2.0

> Comprehensive developer documentation for the Budget Ndio Story platform
> Version: 2.0 | Last Updated: February 2026

---

## Table of Contents

1. [Overview](#overview)
2. [API Reference](#api-reference)
3. [Component Library](#component-library)
4. [Code Architecture](#code-architecture)
5. [Page Documentation](#page-documentation)
6. [Data Structures](#data-structures)
7. [Integration Guides](#integration-guides)

---

## Overview

### Project Mission

**Budget Ndio Story** is a Kenya-wide civic engagement platform that transforms complex government budget data into accessible, youth-friendly content. The platform bridges the gap between government financial data and Kenyan citizens, particularly youth, enabling informed civic participation through:

- Simplified budget reports and analysis
- Interactive data visualizations
- Multimedia content (podcasts, videos, stories)
- Budget tracking tools
- Community engagement opportunities

### Technology Stack

| Layer | Technology |
|-------|-------------|
| Framework | Next.js 14+ (App Router + Pages Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | GSAP, Framer Motion |
| Database | PostgreSQL (Neon Serverless) |
| Authentication | NextAuth.js |
| Email | Resend |
| Deployment | Vercel / VPS with Nginx |

### Key Features

- Budget Tracker with sector/county breakdowns
- Educational Learn modules
- Blog/Stories content management
- Podcast episode hosting
- Video content library
- Newsletter subscription system
- Admin dashboard for content management

---

## API Reference

### Base URL

```
Production: https://budgetndiostory.com/api
Development: http://localhost:3000/api
```

### Response Format

All API responses follow a consistent structure:

```typescript
// Success Response
{
  success: boolean;
  data: any;
  message?: string;
  timestamp: string;
}

// Error Response
{
  success: false;
  error: string;
  statusCode: number;
}
```

---

### 1. Blog API

#### GET /api/blog

Fetch all blog posts with optional filtering.

**Query Parameters:**

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| status | string | Filter by status (draft, published, all) | all |
| category | string | Filter by category | all |
| search | string | Search in title, excerpt, content | - |

**Example Request:**
```bash
GET /api/blog?status=published&category=education&search=budget
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Understanding the 2025 Budget",
      "slug": "understanding-2025-budget",
      "excerpt": "A deep dive into Kenya's national budget...",
      "content": "Full article content...",
      "category": "education",
      "author": "Budget Ndio Story Team",
      "status": "published",
      "publishedAt": "2025-01-15T10:00:00Z",
      "readTime": 5,
      "featured": true
    }
  ],
  "total": 1,
  "timestamp": "2025-02-13T12:00:00Z"
}
```

#### POST /api/blog

Create a new blog post.

**Headers:**
```
Content-Type: application/json
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Post title |
| content | string | Yes | Full content (Markdown supported) |
| category | string | Yes | Category (education, news, analysis, story) |
| excerpt | string | No | Short description (auto-generated if not provided) |
| author | string | No | Author name (default: "Budget Ndio Story Team") |
| tags | string[] | No | Array of tags |
| status | string | No | draft or published (default: draft) |
| featured | boolean | No | Featured flag (default: false) |

**Example Request:**
```bash
POST /api/blog
Content-Type: application/json

{
  "title": "How County Budgets Work",
  "content": "# Introduction\n\nKenya has 47 counties...",
  "category": "education",
  "tags": ["county", "budget", "kenya"],
  "status": "published"
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {
    "id": "post_abc123",
    "title": "How County Budgets Work",
    "slug": "how-county-budgets-work",
    "status": "published",
    "createdAt": "2025-02-13T12:00:00Z"
  }
}
```

#### GET /api/blog/[id]

Get a single blog post by ID.

**Example Request:**
```bash
GET /api/blog/post_abc123
```

---

### 2. Subscribe API

#### POST /api/subscribe

Subscribe to the newsletter.

**Rate Limiting:** 5 requests per minute per IP address

**Headers:**
```
Content-Type: application/json
```

**Request Body:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | string | Yes | Valid email format |
| name | string | No | User's name |

**Example Request:**
```bash
POST /api/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!",
  "data": {
    "email": "user@example.com",
    "subscribedAt": "2025-02-13T12:00:00Z"
  }
}
```

**Error Responses:**

| Status | Error Message |
|--------|---------------|
| 400 | Missing required fields: title, content, category |
| 400 | This email is already subscribed. |
| 429 | Too many requests. Please try again later. |
| 500 | Something went wrong. Please try again. |

**Database Integration:**
- Inserts/updates `newsletter_subscriptions` table in PostgreSQL
- Sends welcome email via Resend API

---

### 3. Unsubscribe API

#### POST /api/unsubscribe

Unsubscribe from the newsletter.

**Rate Limiting:** 10 requests per minute per IP address

**Request Body:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | string | Yes | Valid email format |

**Example Request:**
```bash
POST /api/unsubscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter."
}
```

**Error Responses:**

| Status | Error Message |
|--------|---------------|
| 400 | Please enter a valid email address |
| 400 | This email is not subscribed to our newsletter. |
| 400 | This email is already unsubscribed. |

---

### 4. Stories API

#### GET /api/stories

Fetch all stories with optional filtering.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category |
| search | string | Search in title, excerpt |

**Example Request:**
```bash
GET /api/stories?category=investigation&search=health
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "story_1",
      "title": "Healthcare Budget in Nairobi",
      "excerpt": "An investigation into health sector spending...",
      "category": "investigation",
      "author": "Jane Doe",
      "publishedAt": "2025-01-20T10:00:00Z"
    }
  ],
  "timestamp": "2025-02-13T12:00:00Z"
}
```

#### POST /api/stories

Submit a new story.

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| title | string | Yes |
| content | string | Yes |
| author | string | Yes |
| category | string | No |

---

### 5. Podcasts API

#### GET /api/podcasts

Fetch all podcast episodes.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| featured | boolean | Filter featured episodes |
| category | string | Filter by category |

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "podcast_1",
      "title": "Episode 1: Understanding the Budget Cycle",
      "description": "In this episode we discuss...",
      "audioUrl": "https://cdn.example.com/podcast-1.mp3",
      "duration": 1800,
      "publishedAt": "2025-01-01T10:00:00Z",
      "isFeatured": true
    }
  ],
  "timestamp": "2025-02-13T12:00:00Z"
}
```

#### POST /api/podcasts

Submit podcast subscription or feedback.

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| email | string | No |
| message | string | No |

---

### 6. Tracker API

#### GET /api/tracker

Fetch budget tracker data.

**Example Response:**
```json
{
  "success": true,
  "data": {
    "sectors": [
      {
        "id": 1,
        "name": "Education",
        "allocated": 15000000000,
        "released": 12000000000,
        "spent": 10000000000
      }
    ],
    "counties": [
      {
        "id": 1,
        "name": "Nairobi",
        "totalBudget": 5000000000
      }
    ]
  },
  "timestamp": "2025-02-13T12:00:00Z"
}
```

#### POST /api/tracker

Submit new project/update to tracker.

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| title | string | Yes |
| category | string | Yes |
| budget | number | Yes |

---

### 7. Participate API

#### POST /api/participate

Submit participation form.

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| name | string | Yes |
| email | string | Yes |
| message | string | Yes |
| type | string | No |

---

## Component Library

### Core UI Components

#### Button

Location: `components/Button.tsx`

```typescript
interface ButtonProps {
  title: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
```

**Usage:**
```tsx
import Button from '@/components/Button';

<Button 
  title="View Reports" 
  href="/reports" 
  variant="primary"
  size="lg"
/>
```

#### Navbar

Location: `components/Navbar.tsx`

Primary navigation component with mobile responsiveness.

**Features:**
- Logo display
- Main navigation links
- Mobile hamburger menu
- Theme toggle support

#### Footer

Location: `components/Footer.tsx`

**Variants:**
- `Footer.tsx` - Standard footer
- `FooterV2.tsx` - Alternative footer
- `MainFooter.tsx` - Main site footer
- `LandingFooter.tsx` - Landing page footer

#### Card Components

| Component | Location | Purpose |
|-----------|----------|---------|
| ProjectCard | `components/ProjectCard.tsx` | Content card with image |
| FlipCard | `components/FlipCard.tsx` | Interactive flip card |
| TrackerCard | `components/TrackerCard.tsx` | Budget tracker item |

---

### Visualization Components

#### BudgetBarChart

Location: `components/visualizations/BudgetBarChart.tsx`

```typescript
interface BudgetBarChartProps {
  data: BudgetData[];
  height?: number;
  showLegend?: boolean;
  animate?: boolean;
}

interface BudgetData {
  label: string;
  value: number;
  color?: string;
}
```

**Usage:**
```tsx
import { BudgetBarChart } from '@/components/visualizations';

<BudgetBarChart 
  data={[
    { label: 'Education', value: 15000000000 },
    { label: 'Health', value: 12000000000 },
  ]}
  height={400}
  showLegend={true}
/>
```

#### BudgetLineChart

Location: `components/visualizations/BudgetLineChart.tsx`

```typescript
interface BudgetLineChartProps {
  data: TimeSeriesData[];
  xKey: string;
  yKey: string;
  showArea?: boolean;
  showTooltip?: boolean;
}

interface TimeSeriesData {
  year: string;
  budget: number;
  actual: number;
}
```

#### BudgetPieChart

Location: `components/visualizations/BudgetPieChart.tsx`

```typescript
interface BudgetPieChartProps {
  data: PieData[];
  size?: number;
  showLabels?: boolean;
  innerRadius?: number;
}

interface PieData {
  name: string;
  value: number;
  color: string;
}
```

#### BudgetHeatmap

Location: `components/visualizations/BudgetHeatmap.tsx`

```typescript
interface BudgetHeatmapProps {
  data: HeatmapData[];
  xCategories: string[];
  yCategories: string[];
  colorScale?: string[];
}
```

#### YearSelector

Location: `components/year-selector/YearSelector.tsx`

```typescript
interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  label?: string;
}
```

---

### Media Components

#### YouTubePlayer

Location: `components/YouTubePlayer.tsx`

```typescript
interface YouTubePlayerProps {
  videoId: string;
  autoplay?: boolean;
  controls?: boolean;
  mute?: boolean;
  loop?: boolean;
  playlist?: string;
  startTime?: number;
  endTime?: number;
  responsive?: boolean;
}
```

**Usage:**
```tsx
import YouTubePlayer from '@/components/YouTubePlayer';

<YouTubePlayer 
  videoId="dQw4w9WgXcQ"
  autoplay={false}
  controls={true}
  responsive={true}
/>
```

#### SelfHostedVideoPlayer

Location: `components/SelfHostedVideoPlayer.tsx`

Custom video player with:
- Play/pause controls
- Volume control
- Progress bar
- Fullscreen toggle
- Quality selector

#### VideoThumbnail

Location: `components/VideoThumbnail.tsx`

Thumbnail component with:
- Play overlay
- Duration badge
- Title overlay
- Hover effects

---

### Animation Components

#### LinkHover

Location: `animation/LinkHover.tsx`

Animated link with hover effects.

#### TextHover

Location: `animation/TextHover.tsx`

Text animation on hover.

#### TextMask

Location: `animation/TextMask.tsx`

Text reveal animation using mask.

#### PageAnimations

Location: `animation/PageAnimations.tsx`

Page-level entrance animations.

---

## Code Architecture

### Project Structure

```
budgetndiostory/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── auth/               # Authentication endpoints
│   │   ├── blog/               # Blog API
│   │   ├── subscribe/          # Newsletter API
│   │   ├── tracker/            # Budget tracker API
│   │   └── ...
│   ├── admin/                  # Admin dashboard
│   │   ├── analytics/
│   │   ├── blog/
│   │   ├── config/
│   │   ├── content/
│   │   ├── subscribers/
│   │   └── users/
│   └── auth/                   # Auth pages (signin, signup)
├── pages/                       # Pages Router (legacy)
│   ├── home/                   # Home page
│   ├── tracker/                # Budget tracker
│   ├── learn/                  # Educational modules
│   ├── stories/                # Stories/Blog
│   ├── podcasts/               # Podcast episodes
│   ├── about/                  # About page
│   └── contact/                # Contact page
├── components/                  # Reusable UI components
│   ├── visualizations/         # Chart components
│   ├── year-selector/         # Year filter component
│   └── analytics/             # Analytics components
├── container/                   # Page-specific containers
│   ├── home-page/
│   ├── about-page/
│   ├── contact-page/
│   └── ...
├── constants/                   # Configuration
│   ├── routes.ts              # Route definitions
│   ├── index.ts               # App constants
│   └── animation/             # Animation configs
├── lib/                        # Utilities & helpers
│   ├── db.ts                 # Database connection
│   ├── blog-data.ts          # Blog mock data
│   ├── blog-types.ts         # Blog type definitions
│   ├── seo.ts                # SEO utilities
│   └── routes.ts             # Route helpers
├── types/                       # TypeScript definitions
├── hooks/                       # Custom React hooks
├── mockdata/                    # Development mock data
├── database/                    # Database schema
├── public/                      # Static assets
├── styles/                      # Global styles
├── utils/                       # Utility functions
└── design-library/             # Design system
```

### Route Organization

#### Public Routes

```typescript
// constants/routes.ts
export const PUBLIC_ROUTES = {
  HOME: "/" as const,
  ABOUT: "/about" as const,
  CONTACT: "/contact" as const,
  PRIVACY: "/privacy" as const,
  TERMS: "/terms" as const,
  SEARCH: "/search" as const,
};
```

#### Feature Routes

```typescript
export const FEATURE_ROUTES = {
  TRACKER: "/tracker" as const,
  STORIES: "/stories" as const,
  PODCASTS: "/podcasts" as const,
  SHORTS: "/shorts" as const,
  PARTICIPATE: "/participate" as const,
  LEARN: "/learn" as const,
  BUDGET_SIMPLIFIED: "/budget-simplified" as const,
};
```

#### Admin Routes

```typescript
export const ADMIN_ROUTES = {
  ADMIN: "/admin" as const,
  ADMIN_CONTENT: "/admin/content" as const,
  ADMIN_USERS: "/admin/users" as const,
  ADMIN_ANALYTICS: "/admin/analytics" as const,
};
```

### Data Flow

```mermaid
graph TD
    A[User Request] --> B[Next.js Page/App]
    B --> C{Data Source}
    C -->|Static Data| D[Mock JSON]
    C -->|Dynamic| E[API Routes]
    E --> F[Database]
    E --> G[External Services]
    F --> H[Neon PostgreSQL]
    G --> I[Resend Email]
    I --> J[Response]
    D --> J
```

### State Management

The application uses React's built-in state management:

- **useState** - Local component state
- **useContext** - Theme and auth context
- **useEffect** - Side effects and data fetching

### Theming

The application uses Tailwind CSS with custom theme configuration:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: '#...',
        secondary: '#...',
      },
      fontFamily: {
        heading: ['...'],
        body: ['...'],
      },
    },
  },
}
```

---

## Page Documentation

### Home Page (`/`)

**Components:**
- Hero section with video background
- Latest content sections (Stories, Videos, Updates)
- Newsletter signup
- CTA strips

**Route File:** `pages/home/index.tsx`

### Budget Tracker (`/tracker`)

**Features:**
- Sector-based budget visualization
- Year selector (2020-2025)
- National/County level toggle
- Budget line items tracking
- Interactive charts

**Route File:** `pages/tracker/index.tsx`

### Learn (`/learn`)

**Features:**
- Educational modules list
- Course detail pages
- Progress tracking
- Interactive lessons

**Route Files:**
- `pages/learn/index.tsx` - Module listing
- `pages/learn/[id].tsx` - Course detail

### Stories/Blog (`/stories`)

**Features:**
- Article listing with filters
- Category tabs (Stories, Videos, Updates)
- Featured content
- Search functionality

**Route Files:**
- `pages/stories/index.tsx` - Listing
- `pages/blog/[slug].tsx` - Article detail

### Podcasts (`/podcasts`)

**Features:**
- Episode listing
- Audio player
- Show notes
- Episode detail pages

**Route Files:**
- `pages/podcasts/index.tsx` - Listing
- `pages/podcasts/[id].tsx` - Episode detail

### About (`/about`)

**Components:**
- Mission statement
- Team section
- Partners
- Principles/Values

**Route File:** `pages/about/index.tsx`

### Contact (`/contact`)

**Features:**
- Contact form
- FAQ section
- Social media links

**Route File:** `pages/contact/index.tsx`

---

## Data Structures

### TypeScript Types

#### Animation Types (`types/index.ts`)

```typescript
export type TtextHoverProps = {
  titile1: string;
  titile2: string;
};

export type TlogoMarqueeProps = {
  children: React.ReactNode;
  baseVelocity: string | number;
};

export type TLinkHoverProps = {
  title: string;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
};

export type TButtonProps = {
  title: string;
  href: string;
};
```

#### Blog Types (`lib/blog-types.ts`)

```typescript
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: Author;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  readTime: number;
  featured: boolean;
  seo: SEOData;
}

export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}
```

### Database Schema

See [`DATABASE_DOCUMENTATION.md`](../DATABASE_DOCUMENTATION.md) for detailed schema.

**Key Tables:**

| Table | Purpose |
|-------|---------|
| `users` | User accounts |
| `budget_allocations` | Budget data |
| `contents` | CMS content |
| `newsletter_subscriptions` | Newsletter |
| `analytics_logs` | User analytics |
| `counties` | Kenya's 47 counties |
| `sectors` | Budget sectors |
| `fiscal_years` | Fiscal year management |

---

## Integration Guides

### Environment Variables

Create a `.env` file in the project root:

```env
# Database (Neon)
DATABASE_URL=postgresql://user:password@ep-xxx.region.neon.tech/neon_database?sslmode=require

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-in-production

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=Budget Ndio Story <newsletter@budgetndiostory.com>

# Analytics
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Neon Database Setup

1. Create account at [Neon.dev](https://neon.dev)
2. Create new project
3. Copy connection string
4. Add to `.env`

### Resend Email Setup

1. Create account at [Resend.com](https://resend.com)
2. Create API key
3. Add to `.env`
4. Verify sending domain

### Authentication Setup

1. Configure NextAuth with credentials provider in `lib/auth.ts`:
   ```typescript
   import CredentialsProvider from "next-auth/providers/credentials";
   ```
2. Set `NEXTAUTH_URL` and `NEXTAUTH_SECRET`
3. Email/password authentication with Neon database

**Note:** Google OAuth has been removed. The application now uses email/password authentication only.

---

## Quick Reference

### Common Imports

```typescript
// Routes
import { ROUTES, FEATURE_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';

// Components
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Visualizations
import { BudgetBarChart, BudgetPieChart } from '@/components/visualizations';

// Database
import { sql } from '@/lib/db';
```

### API Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limited |
| 500 | Server Error |

---

## Contributing

When adding new features:

1. Add API routes in `app/api/`
2. Create components in `components/`
3. Add routes to `constants/routes.ts`
4. Update documentation
5. Add tests

---

**Document Version:** 2.0  
**Last Updated:** February 2026  
**Maintainers:** Budget Ndio Story Development Team
