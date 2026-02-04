"use client";

import {
  Course,
  getCompletedLessons,
  getCourseById,
  getNextLesson,
  getPreviousLesson,
  markLessonComplete,
  setLastAccessedLesson,
} from "@/lib/edu-data";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import LessonContent from "./LessonContent";
import LessonSidebar from "./LessonSidebar";

interface CourseViewerProps {
  courseId: string;
  /** Parent route for back navigation (defaults to /learn) */
  parentRoute?: string;
}

export default function CourseViewer({
  courseId,
  parentRoute = "/learn",
}: CourseViewerProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<string>("lesson-1");
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load course data
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const courseData = getCourseById(courseId);
    console.log(
      `[CourseViewer] Fetching course: ${courseId}, Found:`,
      !!courseData,
    );

    if (!courseData) {
      setError("Course not found");
      setIsLoading(false);
      return;
    }

    setCourse(courseData);

    // Load saved progress
    const savedCompleted = getCompletedLessons(courseId);
    setCompletedLessons(savedCompleted);

    // Set active lesson to first incomplete or first lesson
    const firstIncomplete = courseData.lessons.find(
      (l) => !savedCompleted.includes(l.id),
    );
    const initialLesson = firstIncomplete?.id || courseData.lessons[0]?.id;

    if (initialLesson) {
      setActiveLesson(initialLesson);
      setLastAccessedLesson(courseId, initialLesson);
    }

    setIsLoading(false);
  }, [courseId]);

  // Mark first lesson as completed if no progress
  useEffect(() => {
    if (course && completedLessons.length === 0 && course.lessons.length > 0) {
      const firstLessonId = course.lessons[0].id;
      setCompletedLessons([firstLessonId]);
      markLessonComplete(courseId, firstLessonId);
    }
  }, [course, courseId, completedLessons.length]);

  const handleLessonClick = useCallback(
    (lessonId: string) => {
      setActiveLesson(lessonId);
      setLastAccessedLesson(courseId, lessonId);
    },
    [courseId],
  );

  const handleCompleteLesson = useCallback(() => {
    if (!activeLesson) return;

    markLessonComplete(courseId, activeLesson);
    setCompletedLessons((prev) => {
      if (!prev.includes(activeLesson)) {
        return [...prev, activeLesson];
      }
      return prev;
    });
  }, [courseId, activeLesson]);

  const handleNext = useCallback(() => {
    if (!course || !activeLesson) return;

    const nextLesson = getNextLesson(courseId, activeLesson);
    if (nextLesson) {
      handleLessonClick(nextLesson.id);
    }
  }, [course, courseId, activeLesson, handleLessonClick]);

  const handlePrevious = useCallback(() => {
    if (!course || !activeLesson) return;

    const prevLesson = getPreviousLesson(courseId, activeLesson);
    if (prevLesson) {
      handleLessonClick(prevLesson.id);
    }
  }, [course, courseId, activeLesson, handleLessonClick]);

  const currentLesson = course?.lessons.find((l) => l.id === activeLesson);

  if (isLoading) {
    return (
      <section className="w-full min-h-screen bg-[#f1f1f1] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-2 border-[#212121]/20 border-t-[#212121] rounded-full animate-spin" />
          <p className="text-[14px] font-NeueMontreal text-gray-500">
            Loading course...
          </p>
        </motion.div>
      </section>
    );
  }

  if (error || !course) {
    return (
      <section className="w-full min-h-screen bg-[#f1f1f1] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-[32px] font-FoundersGrotesk font-medium text-[#212121] uppercase mb-4">
            Course Not Found
          </h1>
          <p className="text-[16px] font-NeueMontreal text-gray-500 mb-8">
            The course you're looking for doesn't exist.
          </p>
          <Link
            href={parentRoute}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#212121] text-white rounded-full text-[14px] font-NeueMontreal font-medium hover:bg-gray-800 transition-colors"
          >
            <svg
              className="w-4 h-4"
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
        </motion.div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen bg-[#f1f1f1]">
      {/* BACK BUTTON */}
      <div className="w-full border-b border-[#21212122] bg-white">
        <div className="w-full mx-auto max-w-[1400px] px-[24px] py-[12px]">
          <Link
            href={parentRoute}
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
              href={parentRoute}
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
        <LessonSidebar
          course={course}
          activeLesson={activeLesson}
          completedLessons={completedLessons}
          onLessonClick={handleLessonClick}
        />

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 p-[40px] max-w-[900px]">
          <AnimatePresence mode="wait">
            {currentLesson && (
              <LessonContent
                lesson={currentLesson}
                onComplete={handleCompleteLesson}
                isCompleted={completedLessons.includes(activeLesson)}
                onNext={handleNext}
                onPrevious={handlePrevious}
                hasNext={!!getNextLesson(courseId, activeLesson)}
                hasPrevious={!!getPreviousLesson(courseId, activeLesson)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
