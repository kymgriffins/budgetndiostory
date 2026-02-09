 I'll create a comprehensive implementation document for an AI agent to build this Kenyan civic education platform. This will include detailed technical specifications, task lists, and progress tracking.

```markdown
# Kenya Civic Budget Education Platform
## AI Agent Implementation Specification v2.0

**Project:** MzalendoWatch (Working Title)
**Domain:** Kenyan Public Finance & Civic Education
**Target Users:** Kenyan citizens, journalists, CSOs, MCAs/MPs
**Tech Stack:** Nextjs 16 + TypeScript + TanStack Query + Tailwind + Node.js/Express + PostgreSQL + Redis

---

## 1. SYSTEM ARCHITECTURE

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  Nextjs 16 + TanStack Router + TanStack Query + Recharts     │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     API GATEWAY                              │
│  Express + Helmet + Rate Limiting + Request Validation      │
│  Auth: JWT + Phone OTP (Africa's Talking)                   │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐    ┌─────────────────┐    ┌──────────────┐
│  BUDGET      │    │   CIVIC         │    │  USER        │
│  SERVICE     │    │   EDUCATION     │    │  SERVICE     │
│  (Node.js)   │    │   SERVICE       │    │  (Node.js)   │
└──────────────┘    └─────────────────┘    └──────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                               │
│  PostgreSQL (Primary) + Redis (Cache) + S3 (Documents)      │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                EXTERNAL INTEGRATIONS                         │
│  Treasury API │ CoB Reports │ World Bank │ Africa's Talking │
│  PPIP (Procurement) │ Google Maps │ MPesa (Future)          │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Database Schema (Prisma)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==================== CORE BUDGET DATA ====================

model FiscalYear {
  id          String   @id @default(uuid())
  year        String   // "2024/25"
  startDate   DateTime
  endDate     DateTime
  isCurrent   Boolean  @default(false)
  status      BudgetStatus
  createdAt   DateTime @default(now())

  nationalBudget NationalBudget?
  countyBudgets  CountyBudget[]
  sectors        SectorAllocation[]
}

enum BudgetStatus {
  DRAFT
  READING
  APPROVED
  IMPLEMENTATION
  AUDIT
  CLOSED
}

model NationalBudget {
  id                String   @id @default(uuid())
  fiscalYearId      String   @unique
  fiscalYear        FiscalYear @relation(fields: [fiscalYearId], references: [id])

  totalAllocation   Decimal  @db.Decimal(15, 2)
  totalExpenditure  Decimal? @db.Decimal(15, 2)
  absorptionRate    Float?

  // Breakdowns
  recurrentExpenditure Decimal @db.Decimal(15, 2)
  developmentExpenditure Decimal @db.Decimal(15, 2)
  countyEquitableShare Decimal @db.Decimal(15, 2)

  sectors           SectorAllocation[]
  projects          NationalProject[]
}

model CountyBudget {
  id              String   @id @default(uuid())
  countyId        String
  county          County   @relation(fields: [countyId], references: [id])
  fiscalYearId    String
  fiscalYear      FiscalYear @relation(fields: [fiscalYearId], references: [id])

  totalAllocation Decimal  @db.Decimal(15, 2)
  totalExpenditure Decimal? @db.Decimal(15, 2)
  absorptionRate  Float?

  // Revenue sources
  equitableShare  Decimal  @db.Decimal(15, 2)
  conditionalGrants Decimal @db.Decimal(15, 2)
  ownSourceRevenue Decimal @db.Decimal(15, 2)
  loansGrants     Decimal  @db.Decimal(15, 2)

  sectors         CountySectorAllocation[]
  projects        CountyProject[]

  @@unique([countyId, fiscalYearId])
}

model County {
  id            String   @id @default(uuid())
  code          String   @unique // 001-047
  name          String   // "Mombasa"
  capital       String
  governor      String?
  website       String?
  population    Int?
  areaSqKm      Float?

  budgets       CountyBudget[]
  constituencies Constituency[]
  clinics       BudgetClinic[]

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Constituency {
  id          String   @id @default(uuid())
  countyId    String
  county      County   @relation(fields: [countyId], references: [id])
  name        String   // "Kisauni"
  mpName      String?
  mpParty     String?
  wardCount   Int
  population  Int?

  projects    ConstituencyProject[]
  clinics     BudgetClinic[]
}

// ==================== SECTORS & ALLOCATIONS ====================

model Sector {
  id          String   @id @default(uuid())
  code        String   @unique
  name        String   // "Agriculture"
  description String?
  icon        String   // Lucide icon name
  color       String   // Hex color for charts

  nationalAllocations SectorAllocation[]
  countyAllocations   CountySectorAllocation[]
}

model SectorAllocation {
  id              String   @id @default(uuid())
  sectorId        String
  sector          Sector   @relation(fields: [sectorId], references: [id])
  fiscalYearId    String
  fiscalYear      FiscalYear @relation(fields: [fiscalYearId], references: [id])
  nationalBudgetId String?
  nationalBudget  NationalBudget? @relation(fields: [nationalBudgetId], references: [id])

  allocation      Decimal  @db.Decimal(15, 2)
  expenditure     Decimal? @db.Decimal(15, 2)
  recurrent       Decimal  @db.Decimal(15, 2)
  development     Decimal  @db.Decimal(15, 2)

  subSectors      SubSectorAllocation[]
}

model CountySectorAllocation {
  id            String   @id @default(uuid())
  sectorId      String
  sector        Sector   @relation(fields: [sectorId], references: [id])
  countyBudgetId String
  countyBudget  CountyBudget @relation(fields: [countyBudgetId], references: [id])

  allocation    Decimal  @db.Decimal(15, 2)
  expenditure   Decimal? @db.Decimal(15, 2)

  projects      CountyProject[]
}

model SubSector {
  id          String   @id @default(uuid())
  sectorId    String
  sector      Sector   @relation(fields: [sectorId], references: [id])
  name        String   // "Coffee", "Tea", "Livestock"

  allocations SubSectorAllocation[]
}

model SubSectorAllocation {
  id              String   @id @default(uuid())
  subSectorId     String
  subSector       SubSector @relation(fields: [subSectorId], references: [id])
  sectorAllocationId String
  sectorAllocation SectorAllocation @relation(fields: [sectorAllocationId], references: [id])

  allocation      Decimal  @db.Decimal(15, 2)
}

// ==================== PROJECTS TRACKING ====================

model NationalProject {
  id              String   @id @default(uuid())
  nationalBudgetId String
  nationalBudget  NationalBudget @relation(fields: [nationalBudgetId], references: [id])

  name            String
  description     String?
  location        String?  // Generic location description
  sectorId        String?
  sector          Sector?  @relation(fields: [sectorId], references: [id])

  totalBudget     Decimal  @db.Decimal(15, 2)
  spentToDate     Decimal? @db.Decimal(15, 2)
  progress        Float?   // 0-100

  status          ProjectStatus
  startDate       DateTime?
  completionDate  DateTime?

  milestones      ProjectMilestone[]
  reports         ProjectReport[]
  procurement     ProcurementLink?
}

model CountyProject {
  id              String   @id @default(uuid())
  countyBudgetId  String
  countyBudget    CountyBudget @relation(fields: [countyBudgetId], references: [id])
  sectorAllocationId String?
  sectorAllocation CountySectorAllocation? @relation(fields: [sectorAllocationId], references: [id])

  name            String
  description     String?
  wardId          String?
  ward            Ward?    @relation(fields: [wardId], references: [id])

  totalBudget     Decimal  @db.Decimal(15, 2)
  spentToDate     Decimal? @db.Decimal(15, 2)
  progress        Float?

  status          ProjectStatus
  startDate       DateTime?
  completionDate  DateTime?

  milestones      ProjectMilestone[]
  reports         ProjectReport[]
}

model ConstituencyProject {
  id              String   @id @default(uuid())
  constituencyId  String
  constituency    Constituency @relation(fields: [constituencyId], references: [id])

  name            String
  description     String?
  cdfAllocation   Decimal  @db.Decimal(15, 2)
  spentToDate     Decimal?
  status          ProjectStatus

  reports         ProjectReport[]
}

model Ward {
  id            String   @id @default(uuid())
  constituencyId String
  constituency  Constituency @relation(fields: [constituencyId], references: [id])
  name          String
  mcaName       String?

  projects      CountyProject[]
}

enum ProjectStatus {
  PLANNED
  TENDERING
  IN_PROGRESS
  STALLED
  COMPLETED
  ABANDONED
  UNDER_INVESTIGATION
}

model ProjectMilestone {
  id          String   @id @default(uuid())
  projectId   String
  project     NationalProject @relation(fields: [projectId], references: [id])

  title       String
  description String?
  deadline    DateTime?
  completed   Boolean  @default(false)
  completedAt DateTime?
}

model ProjectReport {
  id          String   @id @default(uuid())
  projectId   String?
  nationalProject NationalProject? @relation(fields: [projectId], references: [id])
  countyProjectId String?
  countyProject CountyProject? @relation(fields: [countyProjectId], references: [id])
  constituencyProjectId String?
  constituencyProject ConstituencyProject? @relation(fields: [constituencyProjectId], references: [id])

  reportedBy  String   // User ID or "SYSTEM"
  reportType  ReportType
  description String
  mediaUrls   String[] // S3 URLs
  location    Json?    // {lat, lng}
  status      ReportVerificationStatus @default(PENDING)

  createdAt   DateTime @default(now())
}

enum ReportType {
  PROGRESS_UPDATE
  DELAY_ALERT
  CORRUPTION_TIP
  QUALITY_ISSUE
  COMPLETION_CONFIRMATION
}

enum ReportVerificationStatus {
  PENDING
  VERIFIED
  REJECTED
  UNDER_INVESTIGATION
}

// ==================== CIVIC EDUCATION ====================

model Course {
  id          String   @id @default(uuid())
  slug        String   @unique
  title       String
  description String
  duration    Int      // minutes
  difficulty  Difficulty
  icon        String
  color       String

  modules     Module[]
  completions UserCourseCompletion[]
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

model Module {
  id          String   @id @default(uuid())
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id])

  order       Int
  title       String
  content     String   // Markdown
  videoUrl    String?
  quiz        Json?    // Quiz questions
  duration    Int      // minutes
}

model UserCourseCompletion {
  id          String   @id @default(uuid())
  userId      String
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id])
  completedAt DateTime @default(now())
  score       Int?     // Quiz score
}

model Toolkit {
  id          String   @id @default(uuid())
  slug        String   @unique
  title       String
  description String
  category    ToolkitCategory
  fileUrl     String   // S3 URL
  fileSize    Int
  language    String   // "en", "sw"
  downloadCount Int    @default(0)

  createdAt   DateTime @default(now())
}

enum ToolkitCategory {
  BUDGET_GUIDE
  PARTICIPATION_TEMPLATE
  INFOGRAPHIC
  VIDEO
  PRESENTATION
  RESEARCH_PAPER
}

model BudgetCalendarEvent {
  id          String   @id @default(uuid())
  fiscalYearId String
  fiscalYear  FiscalYear @relation(fields: [fiscalYearId], references: [id])

  title       String
  description String?
  eventType   CalendarEventType
  startDate   DateTime
  endDate     DateTime?
  isMandatory Boolean  @default(false)
  entityType  EntityType // NATIONAL or COUNTY
  countyId    String?  // NULL for national events

  remindersSent Boolean @default(false)
}

enum CalendarEventType {
  PUBLIC_PARTICIPATION
  BUDGET_READING
  APPROVAL_DEADLINE
  QUARTERLY_REPORT
  AUDIT_RELEASE
  COUNTY_BUDGET_CYCLE
}

enum EntityType {
  NATIONAL
  COUNTY
}

// ==================== BUDGET CLINICS ====================

model BudgetClinic {
  id          String   @id @default(uuid())
  title       String
  description String?

  // Location
  countyId    String
  county      County   @relation(fields: [countyId], references: [id])
  constituencyId String?
  constituency Constituency? @relation(fields: [constituencyId], references: [id])
  venue       String
  coordinates Json?    // {lat, lng}

  // Timing
  scheduledAt DateTime
  duration    Int      // hours
  timezone    String   @default("Africa/Nairobi")

  // Organization
  organizedBy String   // Organization name
  contactPhone String
  contactEmail String?

  // Officials
  officials   ClinicOfficial[]

  // Participation
  maxAttendees Int?
  registeredAttendees Int @default(0)
  attendanceMode AttendanceMode

  // Outcomes
  status      ClinicStatus @default(SCHEDULED)
  outcomes    Json?        // Summary of commitments, questions, etc.

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum AttendanceMode {
  PHYSICAL
  VIRTUAL
  HYBRID
}

enum ClinicStatus {
  SCHEDULED
  ONGOING
  COMPLETED
  CANCELLED
  POSTPONED
}

model ClinicOfficial {
  id          String   @id @default(uuid())
  clinicId    String
  clinic      BudgetClinic @relation(fields: [clinicId], references: [id])

  name        String
  role        OfficialRole
  party       String?
  confirmed   Boolean  @default(false)
  attended    Boolean?
  commitments String?  // What they promised
}

enum OfficialRole {
  GOVERNOR
  DEPUTY_GOVERNOR
  SENATOR
  WOMAN_REP
  MP
  MCA
  CS
  PS
  CEC
  CHIEF_OFFICER
  OTHER
}

// ==================== USERS & ENGAGEMENT ====================

model User {
  id          String   @id @default(uuid())
  phone       String   @unique // Kenya phone format
  email       String?  @unique
  name        String?
  countyId    String?
  county      County?  @relation(fields: [countyId], references: [id])
  constituencyId String?

  // Preferences
  languages   String[] @default(["en"])
  notificationPrefs Json // SMS, WhatsApp, Email preferences

  // Engagement
  courseCompletions UserCourseCompletion[]
  projectReports    ProjectReport[]
  clinicRegistrations ClinicRegistration[]
  subscriptions     UserSubscription[]

  createdAt   DateTime @default(now())
  lastActive  DateTime @default(now())
}

model ClinicRegistration {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  clinicId    String
  clinic      BudgetClinic @relation(fields: [clinicId], references: [id])

  registeredAt DateTime @default(now())
  attended    Boolean?
  feedback    String?

  @@unique([userId, clinicId])
}

model UserSubscription {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])

  type        SubscriptionType
  entityId    String   // County ID, Sector ID, or Project ID
  frequency   NotificationFrequency

  lastNotified DateTime?
  isActive    Boolean  @default(true)
}

enum SubscriptionType {
  COUNTY_BUDGET
  SECTOR_UPDATE
  PROJECT_TRACKING
  CALENDAR_EVENT
  CLINIC_NEARBY
}

enum NotificationFrequency {
  IMMEDIATE
  DAILY_DIGEST
  WEEKLY_DIGEST
}

// ==================== PROCUREMENT INTEGRATION ====================

model ProcurementLink {
  id          String   @id @default(uuid())
  projectId   String   @unique
  project     NationalProject @relation(fields: [projectId], references: [id])

  ppipId      String?  // Public Procurement ID
  tenderNo    String?
  tenderTitle String?
  supplier    String?
  contractValue Decimal? @db.Decimal(15, 2)
  awardDate   DateTime?
  status      ProcurementStatus
}

enum ProcurementStatus {
  TENDER_PUBLISHED
  EVALUATION
  AWARDED
  CONTRACT_SIGNED
  IMPLEMENTATION
  COMPLETED
  CANCELLED
}

// ==================== AUDIT & SCANDAL TRACKING ====================

model AuditReport {
  id          String   @id @default(uuid())
  reportDate  DateTime
  entityType  EntityType
  countyId    String?
  county      County?  @relation(fields: [countyId], references: [id])
  nationalEntity String? // Ministry/Department name

  auditorGeneralReport String // URL to PDF
  findings    Json     // Structured findings
  amountLost  Decimal? @db.Decimal(15, 2)
  status      AuditStatus
  followUpActions String?
}

enum AuditStatus {
  ISSUED
  RESPONSE_RECEIVED
  UNDER_IMPLEMENTATION
  CLOSED
  IGNORED
}

model ScandalCase {
  id          String   @id @default(uuid())
  title       String
  description String
  amountInvolved Decimal? @db.Decimal(15, 2)
  entitiesInvolved String[]
  status      ScandalStatus
  reportedAt  DateTime @default(now())
  resolvedAt  DateTime?
  mediaLinks  String[]

  // Educational content
  explanation String?  // Simplified explanation
  lessonsLearned String?
  relatedProjects String[] // Project IDs
}

enum ScandalStatus {
  ALLEGED
  UNDER_INVESTIGATION
  CONFIRMED
  PROSECUTION_ONGOING
  CONVICTED
  ACQUITTED
  UNRESOLVED
}
```

---

## 2. API SPECIFICATION

### 2.1 Budget Service API

```typescript
// src/services/budget/types.ts

// GET /api/v1/budgets/current
interface CurrentBudgetResponse {
  fiscalYear: {
    id: string;
    year: string;
    status: BudgetStatus;
  };
  national: {
    totalAllocation: number;
    totalExpenditure: number;
    absorptionRate: number;
    breakdown: {
      recurrent: number;
      development: number;
      countyShare: number;
    };
  };
  counties: {
    aggregate: {
      totalAllocation: number;
      totalExpenditure: number;
      absorptionRate: number;
    };
    topPerformers: CountySnapshot[];
    underPerformers: CountySnapshot[];
  };
}

// GET /api/v1/sectors
interface SectorsResponse {
  sectors: SectorSummary[];
  comparison: {
    yearOverYear: SectorTrend[];
    nationalVsCounty: SectorSplit[];
  };
}

// GET /api/v1/sectors/:id/allocations
interface SectorAllocationDetail {
  sector: Sector;
  currentYear: {
    national: AllocationDetail;
    countyAggregate: AllocationDetail;
    byCounty: CountySectorAllocation[];
  };
  historical: YearlyAllocation[];
  projects: ProjectSummary[];
  subSectors: SubSectorDetail[];
}

// GET /api/v1/counties/:id/budget
interface CountyBudgetDetail {
  county: County;
  currentBudget: {
    summary: BudgetSummary;
    revenue: RevenueBreakdown;
    expenditure: ExpenditureBreakdown;
    absorptionBySector: SectorAbsorption[];
  };
  historical: YearlyBudget[];
  comparisonToNational: ComparisonMetrics;
  projects: ProjectSummary[];
}

// GET /api/v1/projects?county=:id&status=:status&sector=:sector
interface ProjectSearchParams {
  county?: string;
  constituency?: string;
  sector?: string;
  status?: ProjectStatus;
  budgetMin?: number;
  budgetMax?: number;
  query?: string;
  page: number;
  limit: number;
}

interface ProjectSearchResponse {
  projects: ProjectDetail[];
  total: number;
  page: number;
  totalPages: number;
  facets: {
    byStatus: Record<ProjectStatus, number>;
    bySector: Record<string, number>;
    byCounty: Record<string, number>;
  };
}
```

### 2.2 Civic Education API

```typescript
// GET /api/v1/courses
interface CoursesResponse {
  courses: Course[];
  userProgress?: {
    courseId: string;
    completedModules: number;
    totalModules: number;
    isCompleted: boolean;
  }[];
}

// GET /api/v1/courses/:slug
interface CourseDetail {
  course: Course;
  modules: Module[];
  quiz?: Quiz;
  relatedContent: RelatedResource[];
}

// POST /api/v1/courses/:id/complete
interface CompleteCourseRequest {
  moduleScores: Record<string, number>;
  totalScore: number;
}

// GET /api/v1/toolkits?category=:cat&lang=:lang
interface ToolkitsResponse {
  toolkits: Toolkit[];
  categories: ToolkitCategory[];
  languages: string[];
}

// GET /api/v1/calendar?county=:id&from=:date&to=:date
interface CalendarResponse {
  events: BudgetCalendarEvent[];
  milestones: {
    nextDeadline: BudgetCalendarEvent;
    urgentActions: BudgetCalendarEvent[];
  };
}

// GET /api/v1/clinics?county=:id&upcoming=:boolean
interface ClinicsResponse {
  clinics: BudgetClinic[];
  stats: {
    totalThisMonth: number;
    byCounty: Record<string, number>;
    attendanceRate: number;
  };
}

// POST /api/v1/clinics/:id/register
interface RegisterClinicRequest {
  userId: string;
  phone: string;
  smsReminders: boolean;
}
```

### 2.3 User & Engagement API

```typescript
// POST /api/v1/auth/otp/send
interface SendOTPRequest {
  phone: string; // +254 format
}

// POST /api/v1/auth/otp/verify
interface VerifyOTPRequest {
  phone: string;
  code: string;
}

// GET /api/v1/users/me
interface UserProfile {
  user: User;
  subscriptions: UserSubscription[];
  achievements: UserAchievement[];
  impact: UserImpactStats;
}

// POST /api/v1/subscriptions
interface CreateSubscriptionRequest {
  type: SubscriptionType;
  entityId: string;
  frequency: NotificationFrequency;
}

// POST /api/v1/reports/projects
interface SubmitProjectReportRequest {
  projectId: string;
  projectType: 'national' | 'county' | 'constituency';
  reportType: ReportType;
  description: string;
  media: File[]; // Multipart upload
  location?: { lat: number; lng: number };
  anonymous: boolean;
}
```

---

## 3. FRONTEND ARCHITECTURE

### 3.1 Route Structure (TanStack Router)

```typescript
// src/routes/__root.tsx
// Layout with navigation, footer, global providers

// src/routes/index.tsx
// Hero + Featured Stats + Quick Actions + Recent Updates

// src/routes/learn.tsx
// Course catalog + User progress dashboard

// src/routes/learn/$courseSlug.tsx
// Course content viewer with module navigation

// src/routes/explore.tsx
// Interactive budget explorer (national/county toggle)

// src/routes/explore/sectors.tsx
// Sector comparison visualization

// src/routes/explore/sectors/$sectorId.tsx
// Deep-dive sector page with allocations and projects

// src/routes/explore/counties.tsx
// County map + list view with performance metrics

// src/routes/explore/counties/$countyId.tsx
// County dashboard with budget, projects, officials

// src/routes/explore/counties/$countyId/projects.tsx
// Filterable project list for county

// src/routes/track.tsx
// Project tracking search + user tracked projects

// src/routes/track/projects/$projectId.tsx
// Detailed project timeline + progress + reports

// src/routes/participate.tsx
// Public participation hub + calendar + clinic finder

// src/routes/participate/clinics.tsx
// Clinic list + map + registration

// src/routes/participate/calendar.tsx
// Budget calendar with subscription options

// src/routes/scandals.tsx
// Educational scandal breakdowns (Arror/Kimwarer, etc.)

// src/routes/about.tsx
// About the platform + data sources + methodology

// src/routes/profile.tsx
// User dashboard (protected)
```

### 3.2 Component Hierarchy

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              // County selector, search, auth
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx             // Contextual navigation
│   │   └── MobileNav.tsx
│   │
│   ├── ui/                         // shadcn/ui components
│   │
│   ├── data-visualization/
│   │   ├── BudgetChart.tsx         // Recharts wrapper
│   │   ├── CountyMap.tsx           // Kenya GeoJSON map
│   │   ├── SankeyDiagram.tsx       // Budget flow visualization
│   │   ├── ProjectTimeline.tsx
│   │   └── ComparisonTool.tsx      // Side-by-side county compare
│   │
│   ├── budget/
│   │   ├── BudgetSummaryCard.tsx
│   │   ├── SectorBreakdown.tsx
│   │   ├── RevenueSources.tsx
│   │   ├── ExpenditureTree.tsx
│   │   └── AbsorptionIndicator.tsx
│   │
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectFilter.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── MilestoneTracker.tsx
│   │   └── ReportButton.tsx
│   │
│   ├── education/
│   │   ├── CourseCard.tsx
│   │   ├── ModuleViewer.tsx
│   │   ├── QuizComponent.tsx
│   │   ├── ProgressRing.tsx
│   │   └── ToolkitDownloader.tsx
│   │
│   ├── participation/
│   │   ├── ClinicCard.tsx
│   │   ├── ClinicMap.tsx
│   │   ├── CalendarWidget.tsx
│   │   ├── OfficialAttendance.tsx
│   │   └── SubscriptionManager.tsx
│   │
│   └── shared/
│       ├── LoadingSkeleton.tsx
│       ├── ErrorBoundary.tsx
│       ├── ShareButtons.tsx        // WhatsApp, Twitter, etc.
│       ├── LanguageSwitcher.tsx    // EN/SW
│       └── DataAttribution.tsx
│
├── hooks/
│   ├── useBudgetData.ts            // TanStack Query hooks
│   ├── useProjects.ts
│   ├── useUser.ts
│   ├── useCalendar.ts
│   ├── useLocalization.ts          // Swahili support
│   └── useOffline.ts               // Service worker sync
│
├── lib/
│   ├── api/
│   │   ├── client.ts               // Axios/fetch wrapper
│   │   ├── budgets.ts
│   │   ├── projects.ts
│   │   ├── education.ts
│   │   └── user.ts
│   │
│   ├── utils/
│   │   ├── formatters.ts           // KES formatting, dates
│   │   ├── validators.ts           // Phone, email validation
│   │   └── calculations.ts         // Budget math utilities
│   │
│   └── constants/
│       ├── counties.ts             // 47 counties metadata
│       ├── sectors.ts
│       └── routes.ts
│
├── routes/                         // TanStack Router file routes
│
├── styles/
│   └── globals.css
│
└── types/
    └── index.ts                    // Shared TypeScript types
```

### 3.3 State Management

```typescript
// src/lib/store/index.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // User preferences
  language: 'en' | 'sw';
  setLanguage: (lang: 'en' | 'sw') => void;

  // Location context
  selectedCounty: string | null;
  setSelectedCounty: (countyId: string | null) => void;

  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;

  // Cached data (offline support)
  cachedBudgets: Record<string, BudgetData>;
  cacheBudget: (key: string, data: BudgetData) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      selectedCounty: null,
      setSelectedCounty: (countyId) => set({ selectedCounty: countyId }),
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      activeModal: null,
      setActiveModal: (modal) => set({ activeModal: modal }),
      cachedBudgets: {},
      cacheBudget: (key, data) =>
        set((state) => ({
          cachedBudgets: { ...state.cachedBudgets, [key]: data }
        })),
    }),
    {
      name: 'mzalendo-watch-storage',
      partialize: (state) => ({
        language: state.language,
        selectedCounty: state.selectedCounty
      }),
    }
  )
);
```

---

## 4. DATA INTEGRATION STRATEGY

### 4.1 External Data Sources

| Source | Data Type | Integration Method | Frequency |
|--------|-----------|-------------------|-----------|
| **Kenya Treasury** | National budget, appropriations | REST API (if available) or PDF parsing | Daily during reading season |
| **Controller of Budget** | Expenditure reports, absorption rates | PDF scraping + manual entry | Quarterly |
| **World Bank Kenya** | Economic indicators, development projects | WB Open Data API | Monthly |
| **PPIP (Procurement)** | Tender awards, contractor info | Web scraping | Weekly |
| **Auditor General** | Audit reports, scandal references | PDF monitoring + NLP extraction | Bi-annually |
| **Kenya Open Data** | County profiles, demographic data | CKAN API | Monthly |
| **Google Maps** | Clinic locations, project sites | Maps JavaScript API | Real-time |
| **Africa's Talking** | SMS notifications, OTP | REST API | Real-time |

### 4.2 ETL Pipeline Architecture

```typescript
// services/etl/pipeline.ts

interface DataSource {
  name: string;
  fetch(): Promise<RawData>;
  validate(data: RawData): boolean;
  transform(data: RawData): CleanData;
  load(data: CleanData): Promise<void>;
}

class TreasuryETL implements DataSource {
  async fetch() {
    // Try API first, fallback to PDF scraping
    const apiData = await this.tryAPI();
    if (apiData) return apiData;
    return await this.scrapePDFs();
  }

  transform(raw: TreasuryRawData): BudgetInsert[] {
    // Normalize to our schema
    return raw.allocations.map(alloc => ({
      sectorId: this.mapSectorCode(alloc.sectorCode),
      allocation: this.parseKenyanCurrency(alloc.amount),
      // ... mapping logic
    }));
  }

  async load(data: BudgetInsert[]) {
    // Upsert to PostgreSQL
    await prisma.$transaction(
      data.map(item =>
        prisma.sectorAllocation.upsert({
          where: { id: item.id },
          update: item,
          create: item,
        })
      )
    );

    // Invalidate cache
    await redis.del('budgets:current');
  }
}

// Scheduled jobs (node-cron or Bull Queue)
cron.schedule('0 6 * * *', () => new TreasuryETL().run()); // Daily 6 AM
cron.schedule('0 0 1 */3 *', () => new COB_ETL().run());   // Quarterly
```

---

## 5. FEATURE IMPLEMENTATION DETAILS

### 5.1 "My Money" Tax Calculator

```typescript
// Feature: Personal budget contribution calculator
// src/components/budget/TaxCalculator.tsx

interface TaxCalculatorProps {
  annualIncome: number;
  county: string;
}

const calculateContributions = (income: number, countyId: string) => {
  // PAYE calculation (Kenyan tax brackets 2024)
  const paye = calculatePAYE(income);
  const nhif = calculateNHIF(income);
  const nssf = calculateNSSF(income);
  const housingLevy = income * 0.015; // 1.5%

  const totalTax = paye + nhif + nssf + housingLevy;

  // Estimate allocation based on national budget proportions
  const allocations = {
    education: totalTax * 0.25,
    health: totalTax * 0.12,
    infrastructure: totalTax * 0.18,
    agriculture: totalTax * 0.05,
    // ... etc
  };

  return {
    totalTax,
    breakdown: allocations,
    countyShare: totalTax * 0.20, // 20% to counties
    visibleProjects: getProjectsFundedBy(totalTax * 0.20, countyId),
  };
};
```

### 5.2 WhatsApp Integration

```typescript
// services/notifications/whatsapp.ts
import AfricasTalking from 'africastalking';

const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
});

export const sendBudgetAlert = async (
  phone: string,
  message: string,
  template: 'clinic_reminder' | 'milestone_alert' | 'deadline_warning'
) => {
  // Format for WhatsApp if user prefers
  const formatted = formatForWhatsApp(message, template);

  await at.SMS.send({
    to: phone,
    message: formatted.sms,
    from: 'MzalendoWatch',
  });

  // If WhatsApp opt-in, send rich message
  if (await hasWhatsAppOptIn(phone)) {
    await sendWhatsAppTemplate(phone, template, formatted.data);
  }
};
```

### 5.3 Offline-First Architecture

```typescript
// src/lib/offline/sync.ts
// Using Workbox for service worker + Background Sync API

export const setupOfflineSync = () => {
  // Register background sync for reports submitted offline
  navigator.serviceWorker.ready.then(registration => {
    registration.sync.register('sync-reports');
  });
};

// Queue for offline actions
export const offlineQueue = {
  async addReport(report: ProjectReportDraft) {
    await db.offlineReports.add({
      ...report,
      status: 'pending',
      createdAt: new Date(),
    });

    // Try to sync immediately if online
    if (navigator.onLine) {
      await this.sync();
    }
  },

  async sync() {
    const pending = await db.offlineReports
      .where('status')
      .equals('pending')
      .toArray();

    for (const report of pending) {
      try {
        await api.reports.submit(report);
        await db.offlineReports.delete(report.id);
      } catch (error) {
        console.error('Sync failed for report:', report.id);
      }
    }
  }
};
```

---

## 6. AI AGENT TASK LIST

### Phase 0: Foundation (Weeks 1-2)

| ID | Task | Priority | Status | Acceptance Criteria |
|----|------|----------|--------|---------------------|
| 0.1 | Initialize monorepo with Turborepo | 🔴 Critical | ⬜ | pnpm workspaces, shared types, ESLint/Prettier config |
| 0.2 | Setup PostgreSQL with Docker | 🔴 Critical | ⬜ | Docker Compose with PG 15, Redis, initial schema |
| 0.3 | Initialize Prisma schema | 🔴 Critical | ⬜ | All models from Section 1.2 defined, migrations working |
| 0.4 | Setup Express API boilerplate | 🔴 Critical | ⬜ | TypeScript, routing, error handling, validation (Zod) |
| 0.5 | Setup React frontend with Vite | 🔴 Critical | ⬜ | TanStack Router, Query, Tailwind, shadcn/ui initialized |
| 0.6 | Configure CI/CD (GitHub Actions) | 🟡 High | ⬜ | Lint, test, build checks on PR |
| 0.7 | Setup staging environment | 🟡 High | ⬜ | Deploy to Render/Railway with env vars |

### Phase 1: Core Budget Data (Weeks 3-4)

| ID | Task | Priority | Status | Acceptance Criteria |
|----|------|----------|--------|---------------------|
| 1.1 | Create Kenya counties seed data | 🔴 Critical | ⬜ | All 47 counties with codes, names, capitals, coordinates |
| 1.2 | Implement Treasury API client | 🔴 Critical | ⬜ | Fetch FY2024/25 data, handle auth, rate limiting |
| 1.3 | Build ETL for national budget | 🔴 Critical | ⬜ | Parse allocations, sectors, recurrent vs development |
| 1.4 | Build ETL for county budgets | 🔴 Critical | ⬜ | Equitable share, conditional grants, OSR |
| 1.5 | Create budget API endpoints | 🔴 Critical | ⬜ | GET /budgets/current, /sectors, /counties/:id |
| 1.6 | Build budget summary dashboard | 🔴 Critical | ⬜ | React component with key stats, charts |
| 1.7 | Implement Redis caching layer | 🟡 High | ⬜ | Cache budget data, 1-hour TTL |
| 1.8 | Add data validation tests | 🟡 High | ⬜ | Jest tests for ETL logic, API responses |

### Phase 2: Project Tracking (Weeks 5-6)

| ID | Task | Priority | Status | Acceptance Criteria |
|----|------|----------|--------|---------------------|
| 2.1 | Design project data model | 🔴 Critical | ⬜ | Schema supports national, county, CDF projects |
| 2.2 | Import sample project data | 🔴 Critical | ⬜ | 50+ real projects from selected counties |
| 2.3 | Build project search API | 🔴 Critical | ⬜ | Full-text search, filters, pagination |
| 2.4 | Create project detail pages | 🔴 Critical | ⬜ | Timeline, budget, progress, milestones |
| 2.5 | Implement project reporting | 🔴 Critical | ⬜ | Photo upload, geolocation, status updates |
| 2.6 | Build project tracker UI | 🟡 High | ⬜ | Map view, list view, filter sidebar |
| 2.7 | Add PPIP procurement links | 🟡 High | ⬜ | Scrape/link tender data where available |
| 2.8 | Create admin review dashboard | 🟡 High | ⬜ | Moderate citizen reports |

### Phase 3: Civic Education (Weeks 7-8)

| ID | Task | Priority | Status | Acceptance Criteria |
|----|------|----------|--------|---------------------|
| 3.1 | Create course content structure | 🔴 Critical | ⬜ | 4 courses: Basics, Reading, Tracking, Action |
| 3.2 | Write Budget Basics module | 🔴 Critical | ⬜ | 5 lessons with quizzes, Swahili translations |
| 3.3 | Build course player UI | 🔴 Critical | ⬜ | Progress tracking, video support, quiz interaction |
| 3.4 | Create toolkit repository | 🟡 High | ⬜ | PDF uploads, categorization, download tracking |
| 3.5 | Build "My Money" calculator | 🟡 High | ⬜ | Input income, see tax breakdown + project funding |
| 3.6 | Implement user progress tracking | 🟡 High | ⬜ | Course completions stored per user |
| 3.7 | Create scandal case studies | 🟢 Medium | ⬜ | Arror/Kimwarer, KEMSA, simplified explanations |
| 3.8 | Add shareable infographics | 🟢 Medium | ⬜ | Social media optimized images |

### Phase 4: Participation & Clinics (Weeks 9-10)

| ID | Task | Priority | Status | Acceptance Criteria |
|----|------|----------|--------|---------------------|
| 4.1 | Build budget calendar system | 🔴 Critical | ⬜ | FY2024/25 key dates, reminders |
| 4.2 | Create clinic management | 🔴 Critical | ⬜ | CRUD for clinics, official invites |
| 4.3 | Implement clinic finder | 🔴 Critical | ⬜ | Map view, county filter, registration |
| 4.4 | Build official attendance tracking | 🟡 High | ⬜ | Confirm attendance, record commitments |
| 4.5 | Add SMS/WhatsApp reminders | 🟡 High | ⬜ | Africa's Talking integration |
| 4.6 | Create public participation guide | 🟡 High | ⬜ | Step-by-step submission workflows |
| 4.7 | Build subscription system | 🟢 Medium | ⬜ | County/sector/project alerts |
| 4.8 | Add community forum (optional) | 🟢 Low | ⬜ | Discourse integration or custom |

### Phase 5: Analysis & Visualization (Weeks 11-12)

| ID | Task | Priority | Status | Acceptance Criteria |
|----|------|----------|--------|---------------------|
| 5.1 | Build sector comparison tool | 🔴 Critical | ⬜ | Side-by-side sector budgets, trends |
| 5.2 | Create county ranking dashboard | 🔴 Critical | ⬜ | Absorption rates, performance metrics |
| 5.3 | Implement Sankey diagrams | 🟡 High | ⬜ | Budget flow visualization (national→county→sector) |
| 5.4 | Add historical trend analysis | 🟡 High | ⬜ | 5-year comparisons, projections |
| 5.5 | Build "Compare Counties" feature | 🟡 High | ⬜ | Select 2-3 counties, compare metrics |
| 5.6 | Create audit findings tracker | 🟢 Medium | ⬜ | Link to Auditor General reports |
| 5.7 | Add data export functionality | 🟢 Medium | ⬜ | CSV/Excel download for researchers |
| 5.8 | Implement embeddable widgets | 🟢 Low | ⬜ | Iframe code for external sites |

### Phase 6: Polish & Launch (Week 13+)

| ID | Task | Priority | Status | Acceptance Criteria |
|----|------|----------|--------|---------------------|
| 6.1 | Performance optimization | 🔴 Critical | ⬜ | Lighthouse score >90, bundle analysis |
| 6.2 | Accessibility audit | 🔴 Critical | ⬜ | WCAG 2.1 AA compliance |
| 6.3 | Security hardening | 🔴 Critical | ⬜ | Rate limiting, input sanitization, CSP |
| 6.4 | Swahili localization | 🟡 High | ⬜ | All UI text, key content translated |
| 6.5 | Mobile responsiveness | 🟡 High | ⬜ | Tested on devices, touch optimizations |
| 6.6 | User testing sessions | 🟡 High | ⬜ | 10+ Kenyan users, feedback incorporated |
| 6.7 | Content seeding | 🟢 Medium | ⬜ | Real budget data, sample clinics |
| 6.8 | Launch marketing site | 🟢 Medium | ⬜ | Landing page, about, contact, social links |

---

## 7. PROGRESS TRACKER

### Current Sprint: [SPRINT_NAME]
**Start Date:** [DATE]
**End Date:** [DATE]
**Sprint Goal:** [ONE SENTENCE GOAL]

#### Sprint Board

| To Do | In Progress | Review | Done |
|-------|-------------|--------|------|
| Task 1.3 | Task 0.5 | Task 0.2 | Task 0.1 |
| Task 1.4 | Task 0.4 | | Task 0.3 |
| | | | |

#### Burndown Chart
```
[ASCII or link to chart]
```

#### Blockers
- [ ] Blocker 1: [Description + Owner]
- [ ] Blocker 2: [Description + Owner]

---

## 8. QUALITY ASSURANCE

### 8.1 Testing Strategy

```typescript
// Testing Pyramid

// Unit Tests (Jest) - 70%
- ETL transformation logic
- Utility functions (formatters, calculators)
- Component logic hooks

// Integration Tests (Supertest + React Testing Library) - 20%
- API endpoint testing
- Database query testing
- Component interaction testing

// E2E Tests (Playwright) - 10%
- Critical user journeys:
  1. New user → Complete course → Track project
  2. Find clinic → Register → Receive reminder
  3. Explore county budget → Compare sectors → Download data
```

### 8.2 Performance Budgets

| Metric | Target | Maximum |
|--------|--------|---------|
| First Contentful Paint | <1.5s | 2.5s |
| Time to Interactive | <3.5s | 5s |
| Cumulative Layout Shift | <0.1 | 0.25 |
| Total Bundle Size | <200KB | 500KB |
| API Response Time (p95) | <200ms | 500ms |

---

## 9. DEPLOYMENT & INFRASTRUCTURE

### 9.1 Environment Setup

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mzalendo
      - REDIS_URL=redis://redis:6379

  api:
    build: ./apps/api
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mzalendo
      - TREASURY_API_KEY=${TREASURY_API_KEY}

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

### 9.2 Production Checklist

- [ ] SSL certificates (Let's Encrypt)
- [ ] Database backups (daily automated)
- [ ] Log aggregation (CloudWatch/Datadog)
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] DDoS protection (Cloudflare)
- [ ] GDPR/Data Protection Act compliance audit

---

## 10. DOCUMENTATION

### 10.1 API Documentation
- OpenAPI/Swagger spec at `/api/docs`
- Postman collection in `/docs/postman/`

### 10.2 User Documentation
- `/help` route with searchable FAQ
- Video tutorials for key features
- Printable guides for offline use

### 10.3 Developer Documentation
- Architecture Decision Records (ADRs) in `/docs/adr/`
- Onboarding guide for new developers
- Data dictionary for budget terminology

---

**Document Version:** 2.0
**Last Updated:** 2026-02-09
**Next Review:** 2026-02-23
**Owner:** AI Implementation Agent
```

---

This comprehensive specification provides your AI agent with:

1. **Complete database schema** with all relationships for Kenyan budget data
2. **Detailed API specifications** for all features
3. **Component architecture** with file organization
4. **Integration strategy** for real Kenyan government data sources
5. **Task list with 60+ specific tasks** organized by priority and phase
6. **Progress tracking template** for sprint management
7. **Quality standards** and deployment guidelines

The agent can now execute this systematically, starting with Phase 0 (foundation) and moving through each phase with clear acceptance criteria.