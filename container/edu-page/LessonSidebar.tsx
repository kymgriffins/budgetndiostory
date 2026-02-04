"use client";

import { Course } from "@/lib/edu-data";
import { motion } from "framer-motion";

interface LessonSidebarProps {
  course: Course;
  activeLesson: string;
  completedLessons: string[];
  onLessonClick: (lessonId: string) => void;
}

export default function LessonSidebar({
  course,
  activeLesson,
  completedLessons,
  onLessonClick,
}: LessonSidebarProps) {
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

  return (
    <aside className="w-[400px] h-[calc(100vh-80px)] overflow-y-auto border-r border-[#21212122] bg-white sticky top-[80px]">
      {/* Course Header */}
      <div className="p-[24px] border-b border-[#21212122]">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[20px] font-FoundersGrotesk font-medium text-[#212121] uppercase"
        >
          {course.title}
        </motion.h2>
        <p className="paragraph font-NeueMontreal text-gray-500 mt-[8px]">
          {course.totalDuration} • {course.lessons.length} lessons
        </p>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-[16px]"
        >
          <div className="flex items-center justify-between mb-[8px]">
            <span className="text-[12px] font-NeueMontreal text-gray-500">
              {completedLessons.length} of {course.lessons.length} completed
            </span>
            <span className="text-[12px] font-NeueMontreal text-gray-700 font-medium">
              {progress}%
            </span>
          </div>
          <div className="w-full h-[8px] bg-[#f1f1f1] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-green-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Lesson List */}
      <nav className="py-[8px]">
        {course.lessons.map((lesson, idx) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isActive = activeLesson === lesson.id;

          return (
            <motion.button
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onLessonClick(lesson.id)}
              className={`w-full flex items-center gap-[12px] px-[24px] py-[16px] text-left transition-all duration-200 ${
                isActive
                  ? "bg-[#f1f1f1] border-r-2 border-[#212121]"
                  : "hover:bg-[#f9f9f9]"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
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
              </motion.div>

              <div className="flex-1 min-w-0">
                <motion.p
                  className={`text-[14px] font-NeueMontreal truncate ${
                    isActive ? "text-[#212121]" : "text-gray-700"
                  }`}
                >
                  {lesson.title}
                </motion.p>
                <div className="flex items-center gap-[8px] mt-[4px]">
                  <span className="text-[11px] text-gray-400 flex items-center gap-[4px]">
                    {getTypeIcon(lesson.type)}
                    {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    • {lesson.duration}
                  </span>
                </div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="w-[8px] h-[8px] rounded-full bg-[#212121]"
                />
              )}
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}
