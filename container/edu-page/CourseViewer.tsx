import YouTubePlayer, { extractYouTubeId } from "@/components/YouTubePlayer";
import Link from "next/link";
import { useState } from "react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "article" | "quiz";
  completed: boolean;
  videoUrl?: string; // YouTube video URL
}

interface Course {
  id: string;
  title: string;
  description: string;
  totalDuration: string;
  lessons: Lesson[];
}

interface CourseViewerProps {
  courseId: string;
}

export default function CourseViewer({ courseId }: CourseViewerProps) {
  const [activeLesson, setActiveLesson] = useState("lesson-1");
  const [completedLessons, setCompletedLessons] = useState<string[]>([
    "lesson-1",
  ]);

  const courses: Record<string, Course> = {
    basics: {
      id: "basics",
      title: "Budget Basics",
      description:
        "Understand how Kenya's national and county budgets work, from formulation to approval.",
      totalDuration: "15 min",
      lessons: [
        {
          id: "lesson-1",
          title: "What is a Budget?",
          duration: "3 min",
          type: "video" as const,
          completed: true,
          videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
        },
        {
          id: "lesson-2",
          title: "Types of Budgets",
          duration: "4 min",
          type: "video" as const,
          completed: false,
          videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
        },
        {
          id: "lesson-3",
          title: "Budget Cycle Overview",
          duration: "4 min",
          type: "article" as const,
          completed: false,
        },
        {
          id: "lesson-4",
          title: "Knowledge Check",
          duration: "4 min",
          type: "quiz" as const,
          completed: false,
        },
      ],
    },
    reading: {
      id: "reading",
      title: "Reading the Budget",
      description:
        "Learn to read and interpret budget documents, spreadsheets, and financial reports.",
      totalDuration: "20 min",
      lessons: [
        {
          id: "lesson-1",
          title: "Understanding Budget Documents",
          duration: "4 min",
          type: "video" as const,
          completed: false,
          videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
        },
        {
          id: "lesson-2",
          title: "Reading Revenue Tables",
          duration: "5 min",
          type: "article" as const,
          completed: false,
        },
        {
          id: "lesson-3",
          title: "Expenditure Categories",
          duration: "4 min",
          type: "video" as const,
          completed: false,
          videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
        },
        {
          id: "lesson-4",
          title: "Programme-Based Budgeting",
          duration: "4 min",
          type: "video" as const,
          completed: false,
          videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
        },
        {
          id: "lesson-5",
          title: "Final Assessment",
          duration: "3 min",
          type: "quiz" as const,
          completed: false,
        },
      ],
    },
    tracking: {
      id: "tracking",
      title: "Tracking Spending",
      description:
        "Follow the money from budget allocation to actual spending and project completion.",
      totalDuration: "25 min",
      lessons: [
        {
          id: "lesson-1",
          title: "From Allocation to Spending",
          duration: "4 min",
          type: "video" as const,
          completed: false,
          videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
        },
        {
          id: "lesson-2",
          title: "Public Finance Management Act",
          duration: "5 min",
          type: "article" as const,
          completed: false,
        },
        {
          id: "lesson-3",
          title: "Tracking Government Expenditure",
          duration: "4 min",
          type: "video" as const,
          completed: false,
          videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
        },
        {
          id: "lesson-4",
          title: "Audit Reports Explained",
          duration: "4 min",
          type: "video" as const,
          completed: false,
          videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
        },
        {
          id: "lesson-5",
          title: "Using IFMIS Data",
          duration: "4 min",
          type: "article" as const,
          completed: false,
        },
        {
          id: "lesson-6",
          title: "Case Study: Project Tracking",
          duration: "4 min",
          type: "quiz" as const,
          completed: false,
        },
      ],
    },
    civic: {
      id: "civic",
      title: "Civic Action",
      description:
        "How to participate in budget processes, advocate for change, and hold leaders accountable.",
      totalDuration: "30 min",
      lessons: [
        {
          id: "lesson-1",
          title: "Your Right to Participate",
          duration: "4 min",
          type: "video" as const,
          completed: false,
          videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
        },
        {
          id: "lesson-2",
          title: "Budget Public Participation",
          duration: "6 min",
          type: "article" as const,
          completed: false,
        },
        {
          id: "lesson-3",
          title: "Writing Submission Letters",
          duration: "6 min",
          type: "video" as const,
          completed: false,
          videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
        },
        {
          id: "lesson-4",
          title: "Advocacy Strategies",
          duration: "14 min",
          type: "article" as const,
          completed: false,
        },
      ],
    },
  };

  const course = courses[courseId] || courses["basics"];
  const progress = Math.round(
    (completedLessons.length / course.lessons.length) * 100,
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return (
          <svg
            className="w-[16px] h-[16px]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        );
      case "article":
        return (
          <svg
            className="w-[16px] h-[16px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case "quiz":
        return (
          <svg
            className="w-[16px] h-[16px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleLessonClick = (lessonId: string) => {
    setActiveLesson(lessonId);
  };

  const handleCompleteLesson = () => {
    if (!completedLessons.includes(activeLesson)) {
      setCompletedLessons([...completedLessons, activeLesson]);
    }
  };

  const currentLesson = course.lessons.find((l) => l.id === activeLesson);

  return (
    <section className="w-full min-h-screen bg-[#f1f1f1]" data-scroll-section>
      {/* BACK BUTTON */}
      <div className="w-full border-b border-[#21212122] bg-white">
        <div className="w-full mx-auto max-w-[1400px] px-[24px] py-[12px]">
          <Link
            href="/edu"
            className="inline-flex items-center gap-[8px] text-[14px] font-NeueMontreal text-gray-500 hover:text-[#212121] transition-colors"
          >
            <svg
              className="w-[16px] h-[16px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Learning Path
          </Link>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div className="w-full border-b border-[#21212122] bg-white">
        <div className="w-full mx-auto max-w-[1400px] px-[24px] py-[16px]">
          <div className="flex items-center gap-[12px]">
            <Link
              href="/edu"
              className="text-[14px] font-NeueMontreal text-gray-500 hover:text-[#212121] transition-colors"
            >
              Learning Path
            </Link>
            <svg
              className="w-[16px] h-[16px] text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-[14px] font-NeueMontreal text-[#212121]">
              {course.title}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex">
        {/* SIDEBAR - LESSON LIST */}
        <div className="w-[400px] h-[calc(100vh-80px)] overflow-y-auto border-r border-[#21212122] bg-white sticky top-[80px]">
          <div className="p-[24px] border-b border-[#21212122]">
            <h2 className="text-[20px] font-FoundersGrotesk font-medium text-[#212121] uppercase">
              {course.title}
            </h2>
            <p className="paragraph font-NeueMontreal text-gray-500 mt-[8px]">
              {course.totalDuration} • {course.lessons.length} lessons
            </p>
            <div className="mt-[16px] w-full h-[8px] bg-[#f1f1f1] rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[12px] font-NeueMontreal text-gray-500 mt-[8px]">
              {completedLessons.length} of {course.lessons.length} completed
            </p>
          </div>

          <div className="py-[8px]">
            {course.lessons.map((lesson, idx) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isActive = activeLesson === lesson.id;

              return (
                <button
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson.id)}
                  className={`w-full flex items-center gap-[12px] px-[24px] py-[16px] text-left transition-all duration-200 ${
                    isActive
                      ? "bg-[#f1f1f1] border-r-2 border-[#212121]"
                      : "hover:bg-[#f9f9f9]"
                  }`}
                >
                  <div
                    className={`w-[32px] h-[32px] rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-[#212121] text-white"
                          : "bg-[#f1f1f1] text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-[16px] h-[16px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="text-[12px] font-medium">{idx + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-[14px] font-NeueMontreal truncate ${
                        isActive ? "text-[#212121]" : "text-gray-700"
                      }`}
                    >
                      {lesson.title}
                    </p>
                    <div className="flex items-center gap-[8px] mt-[4px]">
                      <span className="text-[11px] text-gray-400 flex items-center gap-[4px]">
                        {getTypeIcon(lesson.type)}
                        {lesson.type.charAt(0).toUpperCase() +
                          lesson.type.slice(1)}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        • {lesson.duration}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 p-[40px] max-w-[900px]">
          {currentLesson && (
            <div className="animate-fade-in">
              {/* LESSON HEADER */}
              <div className="mb-[32px]">
                <div className="flex items-center gap-[12px] mb-[16px]">
                  <span className="px-[10px] py-[4px] rounded-full bg-[#f1f1f1] text-[12px] font-NeueMontreal text-gray-600 flex items-center gap-[6px]">
                    {getTypeIcon(currentLesson.type)}
                    {currentLesson.type.charAt(0).toUpperCase() +
                      currentLesson.type.slice(1)}
                  </span>
                  <span className="text-[12px] font-NeueMontreal text-gray-500">
                    {currentLesson.duration}
                  </span>
                </div>
                <h1 className="text-[32px] font-FoundersGrotesk font-medium text-[#212121] uppercase">
                  {currentLesson.title}
                </h1>
              </div>

              {/* LESSON CONTENT - YouTube Video Player */}
              {currentLesson.type === "video" ? (
                <div className="mb-[32px]">
                  {currentLesson.videoUrl ? (
                    <YouTubePlayer
                      videoId={extractYouTubeId(currentLesson.videoUrl)}
                      autoplay={false}
                    />
                  ) : (
                    <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-[16px] flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-[80px] h-[80px] rounded-full bg-[#212121] flex items-center justify-center mx-auto mb-[16px]">
                          <svg
                            className="w-[32px] h-[32px] text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </div>
                        <p className="text-[16px] font-NeueMontreal text-gray-600">
                          No video available for this lesson
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : currentLesson.type === "quiz" ? (
                <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-[16px] flex items-center justify-center mb-[32px]">
                  <div className="text-center">
                    <div className="w-[80px] h-[80px] rounded-full bg-[#212121] flex items-center justify-center mx-auto mb-[16px]">
                      <svg
                        className="w-[32px] h-[32px] text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                    </div>
                    <p className="text-[16px] font-NeueMontreal text-gray-600">
                      Start Quiz
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-[16px] flex items-center justify-center mb-[32px]">
                  <div className="text-center">
                    <div className="w-[80px] h-[80px] rounded-full bg-[#212121] flex items-center justify-center mx-auto mb-[16px]">
                      <svg
                        className="w-[32px] h-[32px] text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <p className="text-[16px] font-NeueMontreal text-gray-600">
                      Read Article
                    </p>
                  </div>
                </div>
              )}

              {/* LESSON TEXT CONTENT */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-[24px] font-FoundersGrotesk font-medium text-[#212121] uppercase mb-[16px]">
                  About this lesson
                </h2>
                <p className="paragraph font-NeueMontreal text-gray-700 mb-[16px]">
                  In this lesson, you will learn the fundamentals of{" "}
                  {currentLesson.title.toLowerCase()}. This knowledge is
                  essential for understanding how budgets work in Kenya and how
                  you can engage with the process.
                </p>
                <p className="paragraph font-NeueMontreal text-gray-700 mb-[16px]">
                  We recommend taking notes as you go through the material. The
                  key concepts covered here will be tested in the final quiz for
                  this course.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-[12px] p-[20px] mt-[24px]">
                  <h3 className="text-[16px] font-FoundersGrotesk font-medium text-[#212121] mb-[8px]">
                    Key Takeaways
                  </h3>
                  <ul className="list-disc list-inside paragraph font-NeueMontreal text-gray-700 space-y-[8px]">
                    <li>Understanding core concepts and terminology</li>
                    <li>Practical application in real-world scenarios</li>
                    <li>How to apply this knowledge in your community</li>
                  </ul>
                </div>
              </div>

              {/* COMPLETE BUTTON */}
              <div className="flex items-center justify-between mt-[40px] pt-[24px] border-t border-[#21212122]">
                <button
                  onClick={handleCompleteLesson}
                  disabled={completedLessons.includes(activeLesson)}
                  className={`px-[24px] py-[12px] rounded-full text-[14px] font-NeueMontreal font-medium transition-all duration-300 ${
                    completedLessons.includes(activeLesson)
                      ? "bg-green-500 text-white cursor-default"
                      : "bg-[#212121] text-white hover:bg-gray-800"
                  }`}
                >
                  {completedLessons.includes(activeLesson)
                    ? "✓ Lesson Completed"
                    : "Mark as Complete"}
                </button>

                <div className="flex items-center gap-[12px]">
                  {course.lessons.findIndex((l) => l.id === activeLesson) >
                    0 && (
                    <button
                      onClick={() => {
                        const currentIndex = course.lessons.findIndex(
                          (l) => l.id === activeLesson,
                        );
                        setActiveLesson(course.lessons[currentIndex - 1].id);
                      }}
                      className="px-[16px] py-[12px] rounded-full border border-[#21212122] text-[14px] font-NeueMontreal text-[#212121] hover:bg-[#f1f1f1] transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  {course.lessons.findIndex((l) => l.id === activeLesson) <
                    course.lessons.length - 1 && (
                    <button
                      onClick={() => {
                        const currentIndex = course.lessons.findIndex(
                          (l) => l.id === activeLesson,
                        );
                        setActiveLesson(course.lessons[currentIndex + 1].id);
                      }}
                      className="px-[16px] py-[12px] rounded-full bg-[#212121] text-[14px] font-NeueMontreal font-medium text-white hover:bg-gray-800 transition-colors"
                    >
                      Next Lesson
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
