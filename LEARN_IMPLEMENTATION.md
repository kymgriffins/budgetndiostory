# /Learn Implementation Documentation

## Overview

The `/learn` section of Budget Ndio Story is a comprehensive educational platform designed to teach citizens about Kenya's public budget system. The implementation consists of multiple components across two main page structures and a shared data layer.

## Architecture Overview

```
/pages/learn/index.tsx          # Main landing page (standalone)
/pages/learn/[courseId]/index.tsx # Dynamic course viewer page (using CourseViewer)
/container/learn-page/          # New container components (in development)
  - Hero.tsx
  - CourseList.tsx
  - CourseCard.tsx
  - Features.tsx
/container/edu-page/           # Course viewer components
  - CourseViewer.tsx
  - LessonSidebar.tsx
  - LessonContent.tsx
  - LearningPath.tsx
/lib/edu-data.ts                # Centralized data & progress management
```

## Page Structures

### 1. Main Landing Page (`pages/learn/index.tsx`)

The main landing page is a standalone page with a dark theme (`#0a0a0a` background). It includes:

#### Hero Section
- **Title**: "Master Kenya's Public Budget" with green accent (#00aa55)
- **Tagline**: Explains the mission to help citizens understand and engage with budgets
- **Stats Display**: Shows 4 courses, 19 lessons, 90min total, "Free for Everyone"
- **Progress Overview**: Dynamic progress bar showing completed lessons (stored in localStorage)
- **CTA**: "Start Learning" button with arrow icon

#### Features Section
Three feature cards displayed in a grid:
- **Video Lessons** (Blue) - Engaging video content breaking down complex concepts
- **Reading Materials** (Green) - In-depth articles and guides
- **Quizzes** (Amber) - Interactive knowledge testing

#### Courses Section
- **Category Filters**: All, Foundation, Skills, Accountability, Engagement
- **Expandable Course List**: Click to expand/collapse course details
- **Lesson List**: Shows all lessons with type icons (video, article, quiz) and completion status
- **Progress Tracking**: Individual lesson checkmarks, overall course progress

### 2. Course Viewer Page (`container/edu-page/CourseViewer.tsx`)

The course viewer is used via the `LearningPath` component on the main page. It provides:

#### Navigation Header
- **Back Button**: Returns to learning path
- **Breadcrumb**: Shows current location (Learning Path > Course Title)

#### Sidebar (`LessonSidebar.tsx`)
- Fixed position on the left (400px width, sticky)
- Course title and metadata
- Progress bar showing completed/total lessons
- Lesson list with:
  - Numbered indicators
  - Type icons (video/article/quiz)
  - Duration
  - Completion checkmarks
  - Active lesson highlighting

#### Main Content Area (`LessonContent.tsx`)
- **Header**: Lesson type badge, duration, title
- **Content Display**:
  - Video lessons: Embedded YouTube player
  - Article lessons: Rendered HTML content
  - Quiz lessons: Placeholder for quiz interface
- **Navigation**: Previous/Next buttons
- **Completion**: Mark as Complete button (changes to checkmark when completed)

### 3. New Container Components (`container/learn-page/`)

A newer implementation in development with modern styling:

#### Hero (`Hero.tsx`)
- Full-screen section with animated background
- Gradient orbs for visual interest
- Grid pattern overlay
- Topics navigation links
- Animated scroll indicator

#### CourseList (`CourseList.tsx`)
- Filter tabs for categories
- Progress summary card
- Grid of CourseCard components

#### CourseCard (`CourseCard.tsx`)
- Visual cards with category-based theming:
  - Foundation: Green gradient
  - Skills: Blue gradient
  - Accountability: Orange gradient
  - Engagement: Purple gradient
- Status badges (Completed, In Progress)
- Lesson type indicators
- Progress bar
- Hover effects with scale and shadow

#### Features (`Features.tsx`)
- 6-feature grid with icons and descriptions:
  - Video Lessons
  - Reading Materials
  - Quizzes & Tests
  - Self-Paced Learning
  - Track Progress
  - Free Access

## Data Layer (`lib/edu-data.ts`)

### TypeScript Interfaces

```typescript
interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "article" | "quiz";
  completed: boolean;
  videoUrl?: string;
  content?: string;
  quizQuestions?: QuizQuestion[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  totalDuration: string;
  lessons: Lesson[];
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface StoredProgress {
  [courseId: string]: {
    completedLessons: string[];
    lastAccessedLesson: string;
  };
}
```

### Course Data Structure

| Course ID | Title | Category | Difficulty | Lessons | Duration |
|-----------|-------|----------|------------|--------|----------|
| basics | Budget Basics | Foundation | beginner | 4 | 15 min |
| reading | Reading the Budget | Skills | intermediate | 5 | 20 min |
| tracking | Tracking Spending | Accountability | intermediate | 6 | 25 min |
| civic | Civic Action | Engagement | advanced | 4 | 30 min |

### Data Access Functions

| Function | Purpose |
|----------|---------|
| `getAllCourses()` | Returns array of all courses |
| `getCourseById(id)` | Gets single course by ID (case-insensitive) |
| `getLessonById(courseId, lessonId)` | Gets specific lesson |
| `getNextLesson(courseId, lessonId)` | Navigation helper |
| `getPreviousLesson(courseId, lessonId)` | Navigation helper |
| `calculateProgressPercent(courseId)` | Returns completion percentage |

### Progress Management

Progress is stored in `localStorage` under the key `edu_progress`:

```typescript
{
  "basics": {
    "completedLessons": ["lesson-1", "lesson-2"],
    "lastAccessedLesson": "lesson-3"
  },
  "reading": {
    "completedLessons": ["lesson-1"],
    "lastAccessedLesson": "lesson-2"
  }
}
```

**Key Functions:**
- `getProgress()` - Retrieves stored progress
- `saveProgress(progress)` - Saves to localStorage
- `markLessonComplete(courseId, lessonId)` - Marks lesson complete
- `getCompletedLessons(courseId)` - Returns completed lesson IDs
- `setLastAccessedLesson(courseId, lessonId)` - Tracks last viewed

## UI Components & Styling

### Color Scheme (Legacy Page)
- Background: `#0a0a0a` (dark)
- Text: White with white/60 and white/50 opacity variants
- Accents: `#00aa55` (green), `#3b82f6` (blue), `#f59e0b` (amber)
- Borders: White/10 opacity

### Color Scheme (Container Components)
- Background: `#f1f1f1` (light gray)
- Text: `#212121` (dark)
- Cards: White with border `#21212122`
- Category colors:
  - Foundation: Green `#00aa55`
  - Skills: Blue `#3b82f6`
  - Accountability: Orange `#f59e0b`
  - Engagement: Red `#ef4444`

### Typography
- Headings: `FoundersGrotesk` font
- Body: `NeueMontreal` font
- Scaled typography (16px base, 14px for metadata)

### Animations
- Framer Motion for transitions
- ScrollReveal for scroll-based animations
- Hover effects: scale, shadow, color changes
- Progress bar animations

### Responsive Design
- Grid layouts adapt to screen size
- Mobile: Single column, full-width elements
- Tablet: Two columns
- Desktop: Multi-column grids
- Sidebar becomes scrollable on mobile

## Component Relationships

```
pages/learn/index.tsx
├── NavbarLanding
├── Hero Section
├── Features Section
├── Course List (expandable accordion)
│   └── Course Card (click to expand)
│       └── Lesson List
│           └── Lesson Items (click to view)
└── FAQ Section

container/edu-page/CourseViewer.tsx
├── Back Button
├── Breadcrumb
├── LessonSidebar
│   └── Lesson List (clickable)
└── LessonContent
    ├── Video Player / Article / Quiz
    └── Navigation Buttons
```

## Route Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/learn` | `pages/learn/index.tsx` | Main landing page with course list |
| `/learn/[courseId]` | `container/edu-page/CourseViewer` | Course viewer (accessed via link) |

## Key Features

### 1. Progress Persistence
- All progress saved to localStorage
- Survives page refreshes
- Shows completion status across sessions

### 2. Course Navigation
- Sequential lesson progression
- Previous/Next buttons
- Direct lesson selection via sidebar
- Auto-advance to first incomplete lesson

### 3. Multiple Content Types
- **Video**: YouTube embeds with player controls
- **Article**: HTML content rendering
- **Quiz**: Placeholder for quiz interface (needs implementation)

### 4. Filtering & Organization
- Category-based course filtering
- Visual differentiation by course type
- Difficulty levels for learner guidance

## Implementation Notes

### Current State
- Main landing page (`pages/learn/index.tsx`) is the primary implementation
- Container components in `container/learn-page/` appear to be a newer/redesign version not yet fully integrated
- Course viewer uses `CourseViewer` from `container/edu-page/`
- Progress tracking works via localStorage

### Missing/Broken Features
- Quiz functionality is only a placeholder
- `/learn/[courseId]/index.tsx` route file doesn't exist (would need to be created)
- The two implementations (legacy vs container) need consolidation

### Recommended Next Steps
1. Consolidate to single implementation approach
2. Complete quiz functionality
3. Implement actual `/learn/[courseId]` route if needed
4. Unify color schemes between implementations
5. Add proper quiz question handling

## Files Reference

| File | Purpose |
|------|---------|
| [`pages/learn/index.tsx`](/pages/learn/index.tsx) | Main landing page |
| [`container/edu-page/CourseViewer.tsx`](/container/edu-page/CourseViewer.tsx) | Course viewer container |
| [`container/edu-page/LessonSidebar.tsx`](/container/edu-page/LessonSidebar.tsx) | Sidebar lesson navigation |
| [`container/edu-page/LessonContent.tsx`](/container/edu-page/LessonContent.tsx) | Lesson content display |
| [`container/edu-page/LearningPath.tsx`](/container/edu-page/LearningPath.tsx) | Learning path with course cards |
| [`container/learn-page/Hero.tsx`](/container/learn-page/Hero.tsx) | New hero component |
| [`container/learn-page/CourseList.tsx`](/container/learn-page/CourseList.tsx) | New course list |
| [`container/learn-page/CourseCard.tsx`](/container/learn-page/CourseCard.tsx) | New course card |
| [`container/learn-page/Features.tsx`](/container/learn-page/Features.tsx) | New features section |
| [`lib/edu-data.ts`](/lib/edu-data.ts) | Data layer & progress management |
