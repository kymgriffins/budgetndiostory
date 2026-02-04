/**
 * Edu Data Service
 * Centralized data management for education pages
 */

// ============================================
// TypeScript Interfaces
// ============================================

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "article" | "quiz";
  completed: boolean;
  videoUrl?: string;
  content?: string;
  quizQuestions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  totalDuration: string;
  lessons: Lesson[];
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  thumbnail?: string;
}

export interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  currentLesson: string;
  percentComplete: number;
}

// ============================================
// Course Data
// ============================================

const coursesData: Record<string, Course> = {
  basics: {
    id: "basics",
    title: "Budget Basics",
    description:
      "Understand how Kenya's national and county budgets work, from formulation to approval.",
    totalDuration: "15 min",
    category: "Foundation",
    difficulty: "beginner",
    lessons: [
      {
        id: "lesson-1",
        title: "What is a Budget?",
        duration: "3 min",
        type: "video",
        completed: false,
        videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
      },
      {
        id: "lesson-2",
        title: "Types of Budgets",
        duration: "4 min",
        type: "video",
        completed: false,
        videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
      },
      {
        id: "lesson-3",
        title: "Budget Cycle Overview",
        duration: "4 min",
        type: "article",
        completed: false,
        content: `
          <h2>Understanding the Budget Cycle</h2>
          <p>The budget cycle is the process through which governments plan, approve, and implement their spending plans.</p>

          <h3>Key Stages</h3>
          <ul>
            <li><strong>Formulation:</strong> Government agencies develop budget proposals based on policy priorities</li>
            <li><strong>Approval:</strong> The legislature reviews and approves the budget</li>
            <li><strong>Implementation:</strong> Funds are allocated and spent according to the approved budget</li>
            <li><strong>Audit:</strong> Spending is reviewed for compliance and effectiveness</li>
          </ul>

          <h3>In Kenya</h3>
          <p>Kenya's budget cycle follows the Public Finance Management Act (PFMA) and involves multiple stakeholders including the National Treasury, county governments, and parliament.</p>
        `,
      },
      {
        id: "lesson-4",
        title: "Knowledge Check",
        duration: "4 min",
        type: "quiz",
        completed: false,
        quizQuestions: [
          {
            id: "q1",
            question: "What is the first stage of the budget cycle?",
            options: ["Implementation", "Formulation", "Audit", "Approval"],
            correctAnswer: 1,
          },
          {
            id: "q2",
            question: "Which act governs Kenya's public finance management?",
            options: [
              "Constitution of Kenya",
              "PFMA",
              "County Government Act",
              "Finance Act",
            ],
            correctAnswer: 1,
          },
        ],
      },
    ],
  },
  reading: {
    id: "reading",
    title: "Reading the Budget",
    description:
      "Learn to read and interpret budget documents, spreadsheets, and financial reports.",
    totalDuration: "20 min",
    category: "Skills",
    difficulty: "intermediate",
    lessons: [
      {
        id: "lesson-1",
        title: "Understanding Budget Documents",
        duration: "4 min",
        type: "video",
        completed: false,
        videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
      },
      {
        id: "lesson-2",
        title: "Reading Revenue Tables",
        duration: "5 min",
        type: "article",
        completed: false,
        content: `
          <h2>Revenue Tables Explained</h2>
          <p>Revenue tables show where government money comes from. Understanding these is key to tracking public finances.</p>

          <h3>Types of Revenue</h3>
          <ul>
            <li><strong>Tax Revenue:</strong> Income from taxes (income tax, VAT, excise duties)</li>
            <li><strong>Non-Tax Revenue:</strong> Fees, fines, and other charges</li>
            <li><strong>Grants:</strong> Transfers from other governments or organizations</li>
            <li><strong>Borrowing:</strong> Loans and debt financing</li>
          </ul>
        `,
      },
      {
        id: "lesson-3",
        title: "Expenditure Categories",
        duration: "4 min",
        type: "video",
        completed: false,
        videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
      },
      {
        id: "lesson-4",
        title: "Programme-Based Budgeting",
        duration: "4 min",
        type: "video",
        completed: false,
        videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
      },
      {
        id: "lesson-5",
        title: "Final Assessment",
        duration: "3 min",
        type: "quiz",
        completed: false,
        quizQuestions: [
          {
            id: "qa1",
            question: "What does VAT stand for?",
            options: [
              "Value Added Tax",
              "Variable Accounting Tax",
              "Voluntary Assessment Tax",
              "Verified Accounting Transaction",
            ],
            correctAnswer: 0,
          },
        ],
      },
    ],
  },
  tracking: {
    id: "tracking",
    title: "Tracking Spending",
    description:
      "Follow the money from budget allocation to actual spending and project completion.",
    totalDuration: "25 min",
    category: "Accountability",
    difficulty: "intermediate",
    lessons: [
      {
        id: "lesson-1",
        title: "From Allocation to Spending",
        duration: "4 min",
        type: "video",
        completed: false,
        videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
      },
      {
        id: "lesson-2",
        title: "Public Finance Management Act",
        duration: "5 min",
        type: "article",
        completed: false,
        content: `
          <h2>The PFMA Framework</h2>
          <p>The Public Finance Management Act (PFMA) provides the legal framework for managing public finances in Kenya.</p>

          <h3>Key Provisions</h3>
          <ul>
            <li>Principles of responsible fiscal management</li>
            <li>Roles and responsibilities in public finance</li>
            <li>Budget preparation and approval processes</li>
            <li>Financial reporting and accountability requirements</li>
          </ul>
        `,
      },
      {
        id: "lesson-3",
        title: "Tracking Government Expenditure",
        duration: "4 min",
        type: "video",
        completed: false,
        videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
      },
      {
        id: "lesson-4",
        title: "Audit Reports Explained",
        duration: "4 min",
        type: "video",
        completed: false,
        videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
      },
      {
        id: "lesson-5",
        title: "Using IFMIS Data",
        duration: "4 min",
        type: "article",
        completed: false,
        content: `
          <h2>IFMIS: Integrated Financial Management Information System</h2>
          <p>IFMIS is Kenya's digital platform for managing government financial transactions.</p>
        `,
      },
      {
        id: "lesson-6",
        title: "Case Study: Project Tracking",
        duration: "4 min",
        type: "quiz",
        completed: false,
        quizQuestions: [
          {
            id: "qt1",
            question: "What does IFMIS stand for?",
            options: [
              "Integrated Financial Management Information System",
              "International Finance Management Information System",
              "Integrated Funds Management Information System",
              "International Funds Management Information System",
            ],
            correctAnswer: 0,
          },
        ],
      },
    ],
  },
  civic: {
    id: "civic",
    title: "Civic Action",
    description:
      "How to participate in budget processes, advocate for change, and hold leaders accountable.",
    totalDuration: "30 min",
    category: "Engagement",
    difficulty: "advanced",
    lessons: [
      {
        id: "lesson-1",
        title: "Your Right to Participate",
        duration: "4 min",
        type: "video",
        completed: false,
        videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
      },
      {
        id: "lesson-2",
        title: "Budget Public Participation",
        duration: "6 min",
        type: "article",
        completed: false,
        content: `
          <h2>Participating in the Budget Process</h2>
          <p>Citizens have the constitutional right to participate in the budget process at both national and county levels.</p>

          <h3>How to Participate</h3>
          <ul>
            <li>Attend public hearings and town halls</li>
            <li>Submit written comments on budget proposals</li>
            <li>Join civil society organizations advocating for transparency</li>
            <li>Use information request mechanisms (Access to Information Act)</li>
          </ul>
        `,
      },
      {
        id: "lesson-3",
        title: "Writing Submission Letters",
        duration: "6 min",
        type: "video",
        completed: false,
        videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
      },
      {
        id: "lesson-4",
        title: "Advocacy Strategies",
        duration: "14 min",
        type: "article",
        completed: false,
        content: `
          <h2>Effective Budget Advocacy</h2>
          <p>Learn strategies to effectively advocate for budget priorities that matter to your community.</p>
        `,
      },
    ],
  },
};

// ============================================
// Data Access Functions
// ============================================

/**
 * Get all courses
 */
export function getAllCourses(): Course[] {
  return Object.values(coursesData);
}

/**
 * Get course by ID (case-insensitive)
 */
export function getCourseById(courseId: string): Course | null {
  if (!courseId) return null;
  const normalizedId = courseId.toLowerCase();
  // Try exact match first, then case-insensitive
  if (coursesData[normalizedId]) {
    return coursesData[normalizedId];
  }
  // Fallback: find by case-insensitive match
  const foundKey = Object.keys(coursesData).find(
    (key) => key.toLowerCase() === normalizedId,
  );
  return foundKey ? coursesData[foundKey] : null;
}

/**
 * Get lesson by course and lesson ID
 */
export function getLessonById(
  courseId: string,
  lessonId: string,
): Lesson | null {
  const normalizedCourseId = courseId.toLowerCase();
  const course = getCourseById(normalizedCourseId);
  if (!course) return null;
  return course.lessons.find((l) => l.id === lessonId) || null;
}

/**
 * Get next lesson in course
 */
export function getNextLesson(
  courseId: string,
  currentLessonId: string,
): Lesson | null {
  const normalizedCourseId = courseId.toLowerCase();
  const course = getCourseById(normalizedCourseId);
  if (!course) return null;

  const currentIndex = course.lessons.findIndex(
    (l) => l.id === currentLessonId,
  );
  if (currentIndex === -1 || currentIndex >= course.lessons.length - 1) {
    return null;
  }
  return course.lessons[currentIndex + 1];
}

/**
 * Get previous lesson in course
 */
export function getPreviousLesson(
  courseId: string,
  currentLessonId: string,
): Lesson | null {
  const normalizedCourseId = courseId.toLowerCase();
  const course = getCourseById(normalizedCourseId);
  if (!course) return null;

  const currentIndex = course.lessons.findIndex(
    (l) => l.id === currentLessonId,
  );
  if (currentIndex <= 0) return null;
  return course.lessons[currentIndex - 1];
}

/**
 * Check if course exists (case-insensitive)
 */
export function courseExists(courseId: string): boolean {
  if (!courseId) return false;
  const normalizedId = courseId.toLowerCase();
  // Check exact match first
  if (normalizedId in coursesData) return true;
  // Fallback: case-insensitive check
  return Object.keys(coursesData).some(
    (key) => key.toLowerCase() === normalizedId,
  );
}

/**
 * Get course categories
 */
export function getCourseCategories(): string[] {
  const categories = new Set<string>();
  Object.values(coursesData).forEach((course) => {
    categories.add(course.category);
  });
  return Array.from(categories);
}

/**
 * Calculate total lessons across all courses
 */
export function getTotalLessonsCount(): number {
  return Object.values(coursesData).reduce(
    (total, course) => total + course.lessons.length,
    0,
  );
}

/**
 * Calculate total duration across all courses
 */
export function getTotalDuration(): string {
  let totalMinutes = 0;
  Object.values(coursesData).forEach((course) => {
    course.lessons.forEach((lesson) => {
      const match = lesson.duration.match(/(\d+)/);
      if (match) {
        totalMinutes += parseInt(match[1]);
      }
    });
  });
  return `${totalMinutes} min`;
}

// ============================================
// Progress Management (Client-side only)
// ============================================

const PROGRESS_STORAGE_KEY = "edu_progress";

export interface StoredProgress {
  [courseId: string]: {
    completedLessons: string[];
    lastAccessedLesson: string;
  };
}

/**
 * Get progress from localStorage
 */
export function getProgress(): StoredProgress {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Save progress to localStorage
 */
export function saveProgress(progress: StoredProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress:", e);
  }
}

/**
 * Mark lesson as complete
 */
export function markLessonComplete(courseId: string, lessonId: string): void {
  const progress = getProgress();
  if (!progress[courseId]) {
    progress[courseId] = { completedLessons: [], lastAccessedLesson: lessonId };
  }
  if (!progress[courseId].completedLessons.includes(lessonId)) {
    progress[courseId].completedLessons.push(lessonId);
  }
  saveProgress(progress);
}

/**
 * Get completed lessons for a course (case-insensitive)
 */
export function getCompletedLessons(courseId: string): string[] {
  const normalizedCourseId = courseId.toLowerCase();
  const progress = getProgress();
  // Try exact match first
  if (progress[normalizedCourseId]) {
    return progress[normalizedCourseId].completedLessons || [];
  }
  // Fallback: find by case-insensitive match
  const foundKey = Object.keys(progress).find(
    (key) => key.toLowerCase() === normalizedCourseId,
  );
  return foundKey ? progress[foundKey].completedLessons || [] : [];
}

/**
 * Get last accessed lesson for a course (case-insensitive)
 */
export function getLastAccessedLesson(courseId: string): string | null {
  const normalizedCourseId = courseId.toLowerCase();
  const progress = getProgress();
  // Try exact match first
  if (progress[normalizedCourseId]) {
    return progress[normalizedCourseId].lastAccessedLesson || null;
  }
  // Fallback: find by case-insensitive match
  const foundKey = Object.keys(progress).find(
    (key) => key.toLowerCase() === normalizedCourseId,
  );
  return foundKey ? progress[foundKey].lastAccessedLesson || null : null;
}

/**
 * Set last accessed lesson for a course (case-insensitive)
 */
export function setLastAccessedLesson(
  courseId: string,
  lessonId: string,
): void {
  const normalizedCourseId = courseId.toLowerCase();
  const progress = getProgress();
  if (!progress[normalizedCourseId]) {
    progress[normalizedCourseId] = {
      completedLessons: [],
      lastAccessedLesson: lessonId,
    };
  }
  progress[normalizedCourseId].lastAccessedLesson = lessonId;
  saveProgress(progress);
}

/**
 * Calculate progress percentage for a course
 */
export function calculateProgressPercent(courseId: string): number {
  const normalizedCourseId = courseId.toLowerCase();
  const course = coursesData[normalizedCourseId];
  if (!course) return 0;
  const completed = getCompletedLessons(normalizedCourseId);
  return Math.round((completed.length / course.lessons.length) * 100);
}
