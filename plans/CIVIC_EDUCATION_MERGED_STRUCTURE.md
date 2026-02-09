# Merged Civic Education Structure

## New Unified Page: `/civieducation`

This page consolidates the existing `/learn` content with the new Civic Education features.

---

## Page Structure

```
/civieducation
├── #hero              Hero section with intro
├── #learn             Courses from existing /learn
│   ├── Budget Basics
│   ├── Reading Budgets
│   ├── Tracking Spending
│   └── Civic Action
├── #civic-education   New Civic Education content
│   ├── Budget Basics (new content)
│   ├── National vs County
│   ├── Budget Calendar
│   ├── Public Participation
│   ├── Toolkits
│   └── Budget Clinics
├── #track             Track a Project (links to /tracker)
└── #analysis          Budget Analysis Hub preview
    ├── Sector Breakdowns
    └── County Profiles
```

---

## Section Details

### 1. Hero Section

- Title: "Civic Education - Understand Kenya's Budget"
- Subtitle: "Learn, track, and engage with public finances"
- CTAs: Start Learning, Download Toolkits, Find a Clinic

### 2. Learn Section (from existing /learn)

Keep the existing 4 courses:

- **Budget Basics** - Introduction to budgets
- **Reading Budgets** - How to read budget documents
- **Tracking Spending** - Follow the money
- **Civic Action** - How to participate

### 3. Civic Education Section (NEW)

| Subsection           | Content                        | Link to                          |
| -------------------- | ------------------------------ | -------------------------------- |
| Budget Basics        | Deep-dive into budget concepts | `/civieducation/basics`          |
| National vs County   | Revenue allocation, comparison | `/civieducation/national-county` |
| Budget Calendar      | Timeline of budget process     | `/civieducation/calendar`        |
| Public Participation | How to submit comments         | `/civieducation/participate`     |
| Toolkits             | Downloadable resources         | `/civieducation/toolkits`        |
| Budget Clinics       | Find/host clinics              | `/civieducation/clinics`         |

### 4. Track a Project Section

- "Track a Project" CTA linking to `/tracker`
- Show featured/featured projects from tracker
- Quick search to find projects

### 5. Budget Analysis Hub Preview

- **Sector Breakdowns** - Link to `/analysis/sectors`
- **County Profiles** - Link to `/analysis/counties`
- Quick stats overview

---

## Sub-Pages Structure

```
pages/civieducation/
├── index.tsx              # Main landing (all sections)
├── basics/
│   └── index.tsx         # Budget Basics deep-dive
├── national-county/
│   └── index.tsx         # National vs County comparison
├── calendar/
│   └── index.tsx         # Budget Calendar
├── participate/
│   └── index.tsx         # Public Participation guide
├── toolkits/
│   └── index.tsx         # Downloadable resources
└── clinics/
    └── index.tsx         # Budget Clinics
```

---

## Budget Analysis Hub (Separate)

```
pages/analysis/
├── index.tsx             # Hub landing
├── sectors/
│   ├── index.tsx        # All sectors overview
│   └── [slug]/          # Specific sector
│       └── index.tsx
└── counties/
    ├── index.tsx        # All counties overview
    └── [slug]/          # Specific county
        └── index.tsx
```

---

## Integration with Routes

Update `lib/router.tsx`:

```typescript
// Civic Education Routes
export const civieducationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "civieducation",
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <CivieducationPage />
    </Suspense>
  ),
});

export const civieducationBasicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "civieducation/basics",
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <CivieducationBasicsPage />
    </Suspense>
  ),
});

// Analysis Routes
export const analysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "analysis",
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <AnalysisPage />
    </Suspense>
  ),
});

export const analysisSectorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "analysis/sectors",
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <AnalysisSectorsPage />
    </Suspense>
  ),
});

export const analysisCountiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "analysis/counties",
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <AnalysisCountiesPage />
    </Suspense>
  ),
});
```

Update `lib/routes.ts`:

```typescript
// Civic Education Routes
CIVIC_EDUCATION: "/civieducation",
CIVIC_EDUCATION_BASICS: "/civieducation/basics",
CIVIC_EDUCATION_NATIONAL_COUNTY: "/civieducation/national-county",
CIVIC_EDUCATION_CALENDAR: "/civieducation/calendar",
CIVIC_EDUCATION_PARTICIPATE: "/civieducation/participate",
CIVIC_EDUCATION_TOOLKITS: "/civieducation/toolkits",
CIVIC_EDUCATION_CLINICS: "/civieducation/clinics",

// Analysis Routes
ANALYSIS: "/analysis",
ANALYSIS_SECTORS: "/analysis/sectors",
ANALYSIS_COUNTIES: "/analysis/counties",
```

---

## Component Architecture

```
components/
├── civieducation/
│   ├── CivieducationHero.tsx
│   ├── LearnCourses.tsx           # From existing /learn
│   ├── CivicTopics.tsx
│   ├── BudgetBasicsSection.tsx
│   ├── NationalVsCountySection.tsx
│   ├── BudgetCalendarSection.tsx
│   ├── ParticipationSection.tsx
│   ├── ToolkitsSection.tsx
│   ├── ClinicsSection.tsx
│   └── TrackProjectSection.tsx    # Links to /tracker
│
└── analysis/
    ├── AnalysisHero.tsx
    ├── SectorOverview.tsx
    ├── SectorCard.tsx
    ├── CountyOverview.tsx
    ├── CountyCard.tsx
    └── QuickStats.tsx
```

---

## Navigation Updates

Update `lib/routes.ts` NAV_ITEMS:

```typescript
export const NAV_ITEMS = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "Tracker", href: "/tracker" },
  { id: 3, title: "Civic Education", href: "/civieducation" }, // Merged!
  { id: 4, title: "Analysis", href: "/analysis" }, // New!
  { id: 5, title: "Blog", href: "/blog" },
  { id: 6, title: "Contact", href: "/contact" },
];
```

---

## Implementation Plan

### Phase 1: Create `/civieducation` Landing

- [ ] Create `pages/civieducation/index.tsx`
- [ ] Migrate hero section with new design
- [ ] Import existing Learn Courses section
- [ ] Add Civic Education topics grid

### Phase 2: Add Track Project Section

- [ ] Create TrackProjectSection component
- [ ] Link to `/tracker`
- [ ] Add featured projects

### Phase 3: Add Analysis Preview

- [ ] Create AnalysisPreviewSection component
- [ ] Link to `/analysis/sectors` and `/analysis/counties`
- [ ] Add quick stats

### Phase 4: Create Sub-Pages

- [ ] Create `pages/civieducation/basics/index.tsx`
- [ ] Create `pages/civieducation/national-county/index.tsx`
- [ ] Create `pages/civieducation/calendar/index.tsx`
- [ ] Create `pages/civieducation/participate/index.tsx`
- [ ] Create `pages/civieducation/toolkits/index.tsx`
- [ ] Create `pages/civieducation/clinics/index.tsx`

### Phase 5: Create Analysis Hub

- [ ] Create `pages/analysis/index.tsx`
- [ ] Create `pages/analysis/sectors/index.tsx`
- [ ] Create `pages/analysis/counties/index.tsx`

---

## Mock Data Structure

Create `mockdata/civieducation.json`:

```json
{
  "courses": [
    {
      "id": "basics",
      "title": "Budget Basics",
      "description": "Understand the fundamentals of government budgets",
      "duration": "15 min",
      "lessons": 5
    },
    {
      "id": "reading",
      "title": "Reading Budgets",
      "description": "Learn to read and interpret budget documents",
      "duration": "20 min",
      "lessons": 6
    },
    {
      "id": "tracking",
      "title": "Tracking Spending",
      "description": "Follow the money - where does it go?",
      "duration": "25 min",
      "lessons": 7
    },
    {
      "id": "civic",
      "title": "Civic Action",
      "description": "How to participate in the budget process",
      "duration": "30 min",
      "lessons": 8
    }
  ],
  "civicTopics": [
    {
      "id": "national-county",
      "title": "National vs County",
      "description": "Understanding the relationship between national and county budgets",
      "icon": "🏛️"
    },
    {
      "id": "calendar",
      "title": "Budget Calendar",
      "description": "Key dates in Kenya's budget process",
      "icon": "📅"
    },
    {
      "id": "participate",
      "title": "Public Participation",
      "description": "How to make your voice heard",
      "icon": "🗣️"
    },
    {
      "id": "toolkits",
      "title": "Download Toolkits",
      "description": "Resources for learning and teaching",
      "icon": "📥"
    },
    {
      "id": "clinics",
      "title": "Budget Clinics",
      "description": "Find or host a budget clinic near you",
      "icon": "🏥"
    }
  ],
  "featuredProjects": [
    {
      "title": "Road Construction",
      "county": "Nairobi",
      "budget": "KES 2.5B",
      "status": "In Progress"
    },
    {
      "title": "Hospital Upgrade",
      "county": "Mombasa",
      "budget": "KES 800M",
      "status": "Completed"
    }
  ]
}
```

Create `mockdata/analysis.json`:

```json
{
  "sectors": [
    {
      "id": "agriculture",
      "name": "Agriculture",
      "icon": "🌾",
      "nationalAllocation": "KES 52.1B",
      "countyAllocation": "KES 45.2B",
      "growth": "+15.3%"
    },
    {
      "id": "education",
      "name": "Education",
      "icon": "📚",
      "nationalAllocation": "KES 78.5B",
      "countyAllocation": "KES 62.3B",
      "growth": "+8.7%"
    },
    {
      "id": "health",
      "name": "Health",
      "icon": "🏥",
      "nationalAllocation": "KES 45.2B",
      "countyAllocation": "KES 38.9B",
      "growth": "+12.1%"
    }
  ],
  "stats": {
    "totalBudget": "KES 3.6T",
    "countyBudget": "KES 1.8T",
    "sectors": 12,
    "counties": 47
  }
}
```

---

## Summary

| Feature              | Path                                | Status           |
| -------------------- | ----------------------------------- | ---------------- |
| Learn Courses        | `/civieducation#learn`              | Migrate existing |
| Budget Basics        | `/civieducation/basics`             | Create           |
| National vs County   | `/civieducation/national-county`    | Create           |
| Budget Calendar      | `/civieducation/calendar`           | Create           |
| Public Participation | `/civieducation/participate`        | Create           |
| Toolkits             | `/civieducation/toolkits`           | Create           |
| Budget Clinics       | `/civieducation/clinics`            | Create           |
| Track a Project      | `/civieducation#track` → `/tracker` | Link             |
| Sector Analysis      | `/analysis/sectors`                 | Create           |
| County Profiles      | `/analysis/counties`                | Create           |
