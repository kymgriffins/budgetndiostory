# /Tracker Implementation Documentation

## Overview

The `/tracker` section of Budget Ndio Story is a comprehensive budget tracking and visualization platform that allows users to explore Kenya's government spending at both national and county levels. It provides visual indicators of budget allocations, project statuses, and historical data from 2000 to present.

## Architecture Overview

```
/pages/tracker/index.tsx              # Main tracker landing page
/components/TrackerCard.tsx           # Reusable tracker card component
/mockdata/tracker-unified.json         # Main data source (sectors + historical data)
/mockdata/types.ts                    # TypeScript interfaces for tracker data
```

## Page Structure (`pages/tracker/index.tsx`)

### Hero Section
- **Badge**: "Visual Budget Tracker" with trending up icon
- **Headline**: "See Where the Money Went" with green accent (#00aa55)
- **Subtitle**: Explains the mission - visual indicators vs spreadsheets
- **CTA**: "Explore Stories" link to blog
- **Stats**: Optional progress tracking display

### Government Spending Breakdown Section

#### Tab Navigation
Two main tabs toggle between:

| Tab | Color | Icon | Focus Areas |
|-----|-------|------|-------------|
| **National Government** | Blue (#1e40af) | Building icon | High-level policy, major infrastructure, national security, debt servicing |
| **County Government** | Green (#059669) | Grid icon | Local service delivery: health, agriculture, ECDE, last-mile infrastructure |

#### Tab Description
Dynamic text explaining what each tab focuses on:
- **National**: Policy, infrastructure, security, debt
- **County**: Health, agriculture, early childhood education, local roads

#### Sector Cards Grid
Displays sectors as cards with:

| Element | Description |
|---------|-------------|
| Icon | 56x56px rounded square with colored background |
| Budget | Total allocation (e.g., "Ksh 701–718B") |
| Title | Sector name (e.g., "Education") |
| Category | Category label and scope (Nationwide/47 Counties) |
| Status | Color-coded dot + status text (allocated/in-progress) |
| CTA | "View Details" arrow |

#### Quick Links Section
Two card links:
1. **Detailed Analytics** (Blue gradient) - Links to `/tracker/details/2024`
   - Kenya Budget 2024/25 badge
   - Explores Ksh 4.0T budget with pie charts, bar graphs
   
2. **Browse by Year** (White/gray) - Links to `/tracker/2000`
   - Historical Data badge
   - View allocations from 2000 to present

### FAQ Section
Accordion-style expandable questions:
- Data accuracy sourcing
- Update frequency (within 2 weeks of budget releases)
- Data download availability (CSV format)

### Footer
- Contact info (email, location)
- Quick links (Blog, Learn, Edu Stories)
- Theme toggle (dark/light mode)

## Data Structure

### Unified Tracker Data (`tracker-unified.json`)

#### Sectors Array
Contains 8 sector items (4 national, 4 county):

| Field | Type | Description |
|-------|------|-------------|
| slug | string | URL-friendly identifier (e.g., "national-education") |
| name | string | Display name (e.g., "Education") |
| type | "national" \| "county" | Government level |
| budget | string | Budget allocation (e.g., "Ksh 701–718B") |
| status | "allocated" \| "in-progress" | Current status |
| county | string | Scope ("National" or "County") |
| icon | string | Emoji icon |
| description | string | Brief description |
| timeline | string | Fiscal year (e.g., "FY 2024/25") |
| impact | string | Impact metric (e.g., "10M+ students supported") |
| category | string | Category name |
| breakdown | string[] | Key budget line items |

**National Sectors:**
1. Education (📚) - Ksh 701-718B - Teacher salaries, free basic education, HELB
2. Infrastructure (⚡) - Ksh 500-554B - Roads, railways, digital superhighway
3. National Security (🛡️) - Ksh 251-279B - Defence, police, intelligence
4. Debt Servicing (💰) - Ksh 1.2T - Public debt interest, pensions

**County Sectors:**
1. Health (🏥) - Ksh 380-400B - County hospitals, dispensaries
2. Agriculture (🌾) - Equitable Share - Extension services, livestock, irrigation
3. ECDE & Vocational (👶) - Equitable Share - Pre-primary, polytechnics
4. Local Infrastructure (🛣️) - Equitable Share - Feeder roads, street lighting

#### Years Array
Historical data from 2000-2003+ with yearly entries:

| Field | Type | Description |
|-------|------|-------------|
| year | number | Year (e.g., 2000) |
| totalBudget | string | Total budget for year (e.g., "Ksh 310B") |
| totalProjects | number | Number of projects tracked |
| completed | number | Completed projects count |
| inProgress | number | In-progress projects count |
| allocated | number | Allocated-only count |
| stalled | number | Stalled projects count |
| items | YearlyTrackerItem[] | Array of project items |

### Yearly Tracker Item

| Field | Type | Description |
|-------|------|-------------|
| slug | string | URL-friendly identifier |
| category | string | Project category |
| title | string | Project title |
| description | string | Brief description |
| budget | string | Project budget |
| allocated | number | Allocation percentage (0-100) |
| status | "Completed" \| "In Progress" \| "Allocated" \| "Stalled" |
| progress | number | Progress percentage (0-100) |
| icon | string | Emoji icon |
| sector | "National" \| "County" | Government level |
| quarter | string | Completion quarter (e.g., "Q4 2000") |
| beneficiaries | string | Impact metric |

## Component: TrackerCard (`components/TrackerCard.tsx`)

A reusable card component for displaying yearly tracker items.

### Props Interface
```typescript
interface TrackerCardProps {
  item: YearlyTrackerItem;
  year: number;
}
```

### Visual Features

#### Status Badges
Color-coded status indicators:
| Status | Color | CSS Class |
|--------|-------|-----------|
| Completed | Green | `bg-green-500` |
| In Progress | Blue | `bg-blue-500` |
| Allocated | Yellow | `bg-yellow-500` |
| Stalled | Red | `bg-red-500` |

#### Sector Styling
| Sector | Border Color | Background |
|--------|--------------|------------|
| National | Blue (#1e40af) | `bg-blue-50/50` |
| County | Emerald (#059669) | `bg-emerald-50/50` |

#### Card Sections
1. **Header**: Icon + category + title
2. **Description**: Two-line truncated description
3. **Budget Info**: Budget amount + allocation percentage
4. **Progress Bar**: Visual progress with color-coded fill
5. **Footer**: Beneficiaries count + completion date + details link

### Navigation
Links to `/tracker/${year}/${item.slug}` for detailed project views.

## TypeScript Interfaces (`mockdata/types.ts`)

```typescript
interface TrackerSectorItem {
  slug: string;
  name: string;
  type: "national" | "county";
  budget: string;
  status: TrackerStatus | string;
  county: string;
  icon: string;
  description: string;
  timeline?: string;
  impact?: string;
  category: string;
  breakdown?: string[];
}

interface YearlyTrackerItem {
  slug: string;
  year?: number;
  category: string;
  title: string;
  description: string;
  budget: string;
  allocated: number;
  status: TrackerStatus | string;
  progress: number;
  icon: string;
  sector: TrackerSector | string;
  quarter?: string;
  beneficiaries?: string;
  completionDate?: string;
}

interface YearlyTrackerData {
  year: number;
  totalBudget: string;
  totalProjects: number;
  completed: number;
  inProgress: number;
  allocated: number;
  stalled: number;
  items: YearlyTrackerItem[];
}

interface UnifiedTrackerData {
  sectors: TrackerSectorItem[];
  years: YearlyTrackerData[];
}
```

## UI/UX Features

### Animations
- **Framer Motion** for smooth transitions
- Staggered card animations (50ms delay between cards)
- Hover effects: scale, shadow, arrow translation
- Accordion animations for FAQ section
- Progress bar animations

### Responsive Design
| Breakpoint | Grid Columns |
|------------|--------------|
| Mobile (<640px) | 1 |
| Tablet (640-1024px) | 2 |
| Desktop (>1024px) | 2 (with xl variant) |

### Theme Support
- Dark mode default (background `#0a0a0a`)
- Light mode toggle via button
- CSS custom properties via Tailwind

### Color Scheme

**Dark Theme:**
- Background: `#0a0a0a`
- Cards: `white/5` with `white/10` border
- Text: White with `white/60` and `white/40` opacity variants
- Accents: `#00aa55` (green), `#1e40af` (national blue), `#059669` (county green)

**Status Colors:**
| Status | Dark Theme | Light Theme (TrackerCard) |
|--------|------------|--------------------------|
| Completed | Green | Green |
| In Progress | Blue | Blue |
| Allocated | Yellow | Yellow |
| Stalled | Red | Red |

### Typography
- Headings: `FoundersGrotesk` font
- Body: `NeueMontreal` font
- Small text: 12px-14px
- Headings: 20px-48px

## Route Structure

| Route | Component | Purpose |
|-------|-----------|---------|
| `/tracker` | `pages/tracker/index.tsx` | Main tracker page |
| `/tracker/sector/[slug]` | Dynamic route | Sector detail page |
| `/tracker/details/[year]` | Dynamic route | Yearly analytics |
| `/tracker/[year]` | Dynamic route | Year overview page |
| `/tracker/[year]/[slug]` | Dynamic route | Individual project details |

## State Management

### Component State
```typescript
const [activeTab, setActiveTab] = useState<"national" | "county">("national");
const [isDark, setIsDark] = useState(true);
const [openFaq, setOpenFaq] = useState<number | null>(null);
```

### Data Fetching
- Data imported directly from JSON file
- Filtering by tab selection using `.filter()`
- No external API calls in current implementation

## Features Summary

### Current Features
1. ✅ National/County tab navigation
2. ✅ Sector cards with budget information
3. ✅ Status indicators (allocated/in-progress)
4. ✅ Historical data from 2000 onwards
5. ✅ Progress tracking visualization
6. ✅ FAQ accordion
7. ✅ Quick links to detailed views
8. ✅ Theme toggle
9. ✅ Responsive grid layout
10. ✅ Animated transitions

### Missing/Broken Features
1. ❌ Dynamic route pages (`/tracker/[year]`, `/tracker/sector/[slug]`) not implemented
2. ❌ Quiz functionality placeholder (not applicable to tracker)
3. ❌ Data download functionality mentioned but not implemented
4. ❌ Actual API integration (currently uses mock JSON)

## Files Reference

| File | Purpose |
|------|---------|
| [`pages/tracker/index.tsx`](/pages/tracker/index.tsx) | Main tracker landing page |
| [`components/TrackerCard.tsx`](/components/TrackerCard.tsx) | Reusable tracker card |
| [`mockdata/tracker-unified.json`](/mockdata/tracker-unified.json) | Tracker data (sectors + historical) |
| [`mockdata/types.ts`](/mockdata/types.ts) | TypeScript interfaces |

## Recommended Next Steps

1. **Implement Dynamic Routes**: Create `/tracker/[year]/[slug].tsx` for project details
2. **Data Download**: Implement CSV export functionality for the tracker data
3. **Analytics Dashboard**: Build `/tracker/details/[year]` page with charts
4. **API Integration**: Replace mock JSON with actual budget API
5. **Search/Filter**: Add search functionality and advanced filters
6. **County Drill-down**: Allow clicking on county sectors to see county-specific data
7. **Comparison View**: Add ability to compare national vs county spending



{/* FEATURED IMPACT STORY - Positive Government Success */}
<section id="featured-story" className="padding-x py-16" aria-labelledby="featured-story-heading">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-gradient-to-br from-[#00aa55]/15 via-[#0a0a0a] to-[#00aa55]/15 border border-white/10 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: Story Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#00aa55]/20 text-[#00aa55] text-xs font-medium uppercase tracking-wider rounded-full">
              Featured Success Story
            </span>
            <span className="text-white/50 text-xs uppercase tracking-wider">
              Government Digital Inclusion
            </span>
          </div>
          <h2 id="featured-story-heading" className="font-FoundersGrotesk text-2xl lg:text-4xl font-semibold tracking-tight mt-3">
            How Government is Bringing Digital Learning to Every Kenyan Child
          </h2>
          <p className="font-NeueMontreal text-white/70 mt-5 leading-relaxed text-lg">
            Through the **Digital Literacy Programme (DigiSchool)**, the Kenyan government has delivered over **1.2 million tablets and laptops** to public primary schools nationwide — connecting more than **20,000 schools** to high-speed internet and transforming classrooms across all 47 counties.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { icon: <CheckCircle size={16} />, text: "Government-Led" },
              { icon: <FileText size={16} />, text: "Ministry of ICT & Education" },
              { icon: <MapPin size={16} />, text: "All 47 Counties" },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full"
              >
                <span className="text-[#00aa55]">{badge.icon}</span>
                <span className="text-white/70 text-xs font-medium">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal font-medium text-sm uppercase tracking-wider hover:bg-[#00cc66] hover:scale-105 transition-all duration-300"
            >
              Explore More Success Stories <ArrowRight size={16} />
            </Link>
            <Link
              href="/tracker"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full font-NeueMontreal font-medium text-sm uppercase tracking-wider hover:bg-white/20 transition-all duration-300"
            >
              View Education Budget Data <ExternalLink size={14} />
            </Link>
          </div>
        </div>

        {/* Right: Impact Numbers */}
        <div className="bg-white/5 border-t lg:border-t-0 lg:border-l border-white/10 p-8 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {/* Devices Distributed */}
            <div className="rounded-2xl bg-[#00aa55]/10 border border-[#00aa55]/30 p-6 flex flex-col justify-center">
              <p className="text-xs font-NeueMontreal text-[#00aa55]/70 uppercase tracking-wider mb-2">
                Delivered
              </p>
              <p className="font-FoundersGrotesk text-4xl font-bold text-[#00aa55]">
                1.2M+
              </p>
              <p className="font-NeueMontreal text-white/60 text-sm mt-2">
                Tablets & Laptops to Schools
              </p>
            </div>

            {/* Schools Connected */}
            <div className="rounded-2xl bg-white/10 border border-white/20 p-6 flex flex-col justify-center">
              <p className="text-xs font-NeueMontreal text-white/60 uppercase tracking-wider mb-2">
                Connected
              </p>
              <p className="font-FoundersGrotesk text-4xl font-bold text-white">
                20,000+
              </p>
              <p className="font-NeueMontreal text-white/60 text-sm mt-2">
                Public Primary Schools
              </p>
            </div>

            {/* Reach & Impact */}
            <div className="rounded-2xl bg-[#00aa55]/10 border border-[#00aa55]/30 p-6 sm:col-span-2">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#00aa55]/20 rounded-lg">
                  <Users size={20} className="text-[#00aa55]" />
                </div>
                <div>
                  <p className="text-xs font-NeueMontreal text-[#00aa55]/70 uppercase tracking-wider mb-1">
                    Real Impact
                  </p>
                  <p className="font-NeueMontreal text-white/80 leading-relaxed">
                    Millions of pupils now access digital learning, teachers use modern tools, and rural schools bridge the digital divide — building a brighter, tech-ready future for Kenya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>