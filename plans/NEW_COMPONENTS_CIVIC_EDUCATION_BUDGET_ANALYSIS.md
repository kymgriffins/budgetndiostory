# Civic Education & Budget Analysis Hub - Feature Plan

## Overview

Two new components to enhance the Budget Ndio Story platform:

1. **Civic Education** - Educational content for citizens to understand budget processes
2. **Budget Analysis Hub** - Data visualization and analysis of budget allocations

---

## 1. Civic Education Component

### Structure

```
pages/civic-education/
├── index.tsx                  # Landing page
├── budget-basics/
│   └── index.tsx              # Introduction to budgets
├── national-vs-county/
│   └── index.tsx              # National vs County comparison
├── budget-calendar/
│   └── index.tsx              # Timeline of budget process
├── public-participation/
│   └── index.tsx              # How to participate
├── toolkits/
│   └── index.tsx              # Downloadable resources
└── budget-clinics/
    └── index.tsx              # Find/host budget clinics
```

### Pages Breakdown

#### 1.1 Budget Basics (`/civic-education/budget-basics`)

**Content:**

- What is a budget?
- Revenue sources (taxes, grants, loans)
- Expenditure categories
- Budget cycle overview
- Key terminology glossary

**Components:**

- `BudgetBasicsHero.tsx`
- `Term Glossary.tsx`
- `BudgetCycleDiagram.tsx`
- `QuizComponent.tsx`

#### 1.2 National vs County (`/civic-education/national-vs-county`)

**Content:**

- Comparison of national vs county government budgets
- Revenue allocation formula (CARA)
- Who spends what?
- Case studies

**Components:**

- `ComparisonTable.tsx`
- `RevenueAllocationChart.tsx`
- `CaseStudyCard.tsx`

#### 1.3 Budget Calendar (`/civic-education/budget-calendar`)

**Content:**

- Interactive timeline of the budget process
- Key dates for each phase
- Public participation deadlines
- Approval milestones

**Components:**

- `BudgetTimeline.tsx`
- `PhaseCard.tsx`
- `DeadlineAlerts.tsx`
- `CalendarView.tsx`

#### 1.4 Public Participation (`/civic-education/public-participation`)

**Content:**

- Why participate?
- How to submit comments
- Template letters
- Success stories

**Components:**

- `ParticipationGuide.tsx`
- `TemplateLibrary.tsx`
- `SuccessStories.tsx`
- `SubmissionTracker.tsx`

#### 1.5 Toolkits (`/civic-education/toolkits`)

**Content:**

- Downloadable PDFs
- Presentation slides
- Social media graphics
- Community organizer guides

**Components:**

- `ToolkitCard.tsx`
- `DownloadButton.tsx`
- `CategoryFilter.tsx`

#### 1.6 Budget Clinics (`/civic-education/budget-clinics`)

**Content:**

- Find a clinic near you
- Host your own clinic
- Clinic materials
- Upcoming events

**Components:**

- `ClinicLocator.tsx`
- `EventCard.tsx`
- `HostForm.tsx`
- `MaterialsList.tsx`

---

## 2. Budget Analysis Hub Component

### Structure

```
pages/analysis/
├── index.tsx                  # Hub landing
├── sectors/
│   ├── index.tsx             # Sector overview
│   └── [sectorSlug]/         # Specific sector
│       └── index.tsx
├── counties/
│   ├── index.tsx             # All counties
│   └── [countySlug]/         # Specific county
│       └── index.tsx
└── compare/
    └── index.tsx             # Compare tools
```

### Pages Breakdown

#### 2.1 Sector Breakdowns (`/analysis/sectors`)

**National Level:**

- Agriculture
- Education
- Health
- Infrastructure
- Security
- Governance
- etc.

**Components:**

- `SectorOverview.tsx`
- `AllocationChart.tsx`
- `YearOverYearComparison.tsx`
- `CountyComparisonTable.tsx`

**Data Visualization:**

- Pie charts for allocation
- Bar charts for trends
- Map visualization for geographic distribution

#### 2.2 County Profiles (`/analysis/counties`)

**For each of Kenya's 47 counties:**

- Budget allocation
- Sector breakdown
- Population vs budget ratio
- Development indicators
- Compare with national average

**Components:**

- `CountyMap.tsx`
- `CountyStats.tsx`
- `CountyComparison.tsx`
- `DevelopmentIndicators.tsx`

#### 2.3 Compare Tool (`/analysis/compare`)

**Features:**

- Compare two sectors
- Compare two counties
- Compare county vs national
- Custom comparison builder

**Components:**

- `CompareSelector.tsx`
- `ComparisonChart.tsx`
- `ComparisonTable.tsx`
- `ExportButton.tsx`

---

## Proposed Route Structure

Add to `lib/router.tsx`:

```typescript
// Civic Education Routes
export const civicEducationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "civic-education",
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <CivicEducationPage />
    </Suspense>
  ),
});

export const budgetBasicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "civic-education/budget-basics",
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <BudgetBasicsPage />
    </Suspense>
  ),
});

// Analysis Routes
export const analysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "analysis",
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <AnalysisHubPage />
    </Suspense>
  ),
});

export const sectorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "analysis/sectors",
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <SectorsPage />
    </Suspense>
  ),
});

export const countiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "analysis/counties",
  component: () => (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <CountiesPage />
    </Suspense>
  ),
});
```

Add to `lib/routes.ts`:

```typescript
// Civic Education Routes
CIVIC_EDUCATION: "/civic-education",
CIVIC_EDUCATION_BUDGET_BASICS: "/civic-education/budget-basics",
CIVIC_EDUCATION_NATIONAL_COUNTY: "/civic-education/national-vs-county",
CIVIC_EDUCATION_CALENDAR: "/civic-education/budget-calendar",
CIVIC_EDUCATION_PARTICIPATION: "/civic-education/public-participation",
CIVIC_EDUCATION_TOOLKITS: "/civic-education/toolkits",
CIVIC_EDUCATION_CLINICS: "/civic-education/budget-clinics",

// Analysis Routes
ANALYSIS: "/analysis",
ANALYSIS_SECTORS: "/analysis/sectors",
ANALYSIS_COUNTIES: "/analysis/counties",
ANALYSIS_COMPARE: "/analysis/compare",
```

---

## Component Architecture

### New Directory Structure

```
components/
├── civic-education/
│   ├── CivicEducationHero.tsx
│   ├── TopicCard.tsx
│   ├── BudgetTimeline.tsx
│   ├── TerminologyGlossary.tsx
│   ├── QuizComponent.tsx
│   ├── ParticipationGuide.tsx
│   ├── ToolkitCard.tsx
│   └── ClinicLocator.tsx
│
└── analysis/
    ├── SectorOverview.tsx
    ├── SectorChart.tsx
    ├── CountyMap.tsx
    ├── CountyCard.tsx
    ├── CountyComparison.tsx
    ├── CompareSelector.tsx
    ├── DataTable.tsx
    └── ExportButton.tsx
```

---

## Data Requirements

### Civic Education Content

- Static content for basics
- Calendar events database
- Toolkit file metadata
- Clinic location data

### Budget Analysis Data

- Historical budget data (national + county)
- Sector classifications
- County metadata (population, area, etc.)
- Development indicators

**Data Sources:**

- National Treasury data
- County Budgets information
- Commission on Revenue Allocation (CRA)
- KNBS statistics

---

## Navigation Integration

Update `lib/routes.ts` NAV_ITEMS:

```typescript
export const NAV_ITEMS = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "Tracker", href: "/tracker" },
  { id: 3, title: "Learn", href: "/learn" },
  { id: 4, title: "Civic Education", href: "/civic-education" }, // NEW
  { id: 5, title: "Analysis", href: "/analysis" }, // NEW
  { id: 6, title: "Blog", href: "/blog" },
  { id: 7, title: "Contact", href: "/contact" },
];
```

---

## Implementation Phases

### Phase 1: Civic Education Landing + Basics

- [ ] Create `pages/civic-education/index.tsx`
- [ ] Create `pages/civic-education/budget-basics/index.tsx`
- [ ] Add navigation items
- [ ] Create core components

### Phase 2: Budget Calendar + Participation

- [ ] Create interactive timeline component
- [ ] Create participation guide page
- [ ] Add template library

### Phase 3: Toolkits + Clinics

- [ ] Create toolkit download system
- [ ] Create clinic locator
- [ ] Add event management UI

### Phase 4: Analysis Hub Landing

- [ ] Create `pages/analysis/index.tsx`
- [ ] Create sector overview
- [ ] Add county overview

### Phase 5: Sector Deep Dives

- [ ] Create individual sector pages
- [ ] Add data visualizations
- [ ] Implement year-over-year comparisons

### Phase 6: County Profiles

- [ ] Create county profile pages
- [ ] Add map visualizations
- [ ] Implement comparison features

### Phase 7: Compare Tool

- [ ] Build comparison UI
- [ ] Add export functionality
- [ ] Implement custom comparisons

---

## Mock Data Needed

Create `mockdata/civic-education.json`:

```json
{
  "glossary": [
    { "term": "Budget", "definition": "..." },
    { "term": "Appropriation", "definition": "..." }
  ],
  "calendar": [
    {
      "phase": "Budget Preparation",
      "timeline": "January - April",
      "keyDates": [...]
    }
  ],
  "toolkits": [
    {
      "title": "Understanding the Budget",
      "type": "pdf",
      "url": "/downloads/..."
    }
  ],
  "clinics": [
    {
      "county": "Nairobi",
      "date": "2024-03-15",
      "location": "..."
    }
  ]
}
```

Create `mockdata/budget-analysis.json`:

```json
{
  "sectors": [
    {
      "id": "agriculture",
      "name": "Agriculture",
      "allocation_2023": "45.2B",
      "allocation_2024": "52.1B",
      "growth": "15.3%"
    }
  ],
  "counties": [
    {
      "id": "nairobi",
      "name": "Nairobi",
      "population": "4.4M",
      "budget": "32.5B",
      "per_capita": "7384"
    }
  ]
}
```

---

## Next Steps

1. **Confirm structure** - Are these pages aligned with your vision?
2. **Prioritize phases** - Which phase should we start with?
3. **Content review** - Do you have content for each section?
4. **Data availability** - What budget data is already available?

Would you like me to:

1. Start implementing Phase 1 (Civic Education landing + basics)?
2. Create the data structures first?
3. Design specific components in more detail?
