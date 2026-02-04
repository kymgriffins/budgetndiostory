"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  getAllCourses,
  getCompletedLessons,
  calculateProgressPercent,
} from "@/lib/edu-data";
import CourseCard from "./CourseCard";

export default function LearningPath() {
  const [courses, setCourses] = useState<ReturnType<typeof getAllCourses>>([]);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    // Load courses
    const allCourses = getAllCourses();
    setCourses(allCourses);

    // Load progress for each course
    const progress: Record<string, number> = {};
    allCourses.forEach((course) => {
      const percent = calculateProgressPercent(course.id);
      console.log(`[LearningPath] Course: ${course.id}, Progress: ${percent}%`);
      progress[course.id] = percent;
    });
    setProgressMap(progress);
  }, []);

  const completedCount = courses.filter(
    (course) => progressMap[course.id] === 100
  ).length;
  const progressPercent = courses.length > 0
    ? Math.round((completedCount / courses.length) * 100)
    : 0;

  return (
    <>
      {/* LEARNING PATH SECTION */}
      <section
        id="learning-path"
        className="w-full min-h-screen bg-[#f1f1f1] rounded-t-[20px]"
      >
        <div className="w-full bg-white pt-[60px] pb-[60px] min-h-screen">
          <div className="w-full mx-auto max-w-[1200px] px-[24px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between gap-[16px] flex-wrap mb-[24px]"
              data-animate="fade-up"
            >
              <div>
                <h2 className="text-[24px] font-FoundersGrotesk font-medium text-[#212121] leading-[1.2]">
                  Your Learning Path
                </h2>
                <p className="mt-[8px] text-[14px] font-NeueMontreal text-[#212121]/60">
                  Complete these courses to master budget literacy
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-right"
              >
                <span className="text-[14px] font-NeueMontreal text-[#212121]/50">
                  {completedCount} of {courses.length} completed
                </span>
                <div className="mt-[8px] w-[120px] h-[6px] bg-[#f1f1f1] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-[16px] lg:grid-cols-1 mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1"
              data-animate="cards"
            >
              {courses.map((course, idx) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={idx}
                  progress={progressMap[course.id]}
                  isCompleted={progressMap[course.id] === 100}
                  isCurrent={
                    progressMap[course.id] > 0 &&
                    progressMap[course.id] < 100
                  }
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL RESOURCES */}
      <section
        className="w-full flex justify-between gap-y-[30px] padding-x py-[40px] flex-wrap bg-[#f1f1f1]"
        data-animate="cards"
      >
        <div className="w-full mb-[20px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[32px] font-FoundersGrotesk font-medium text-[#212121] uppercase"
          >
            Quick Resources
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="paragraph mt-[8px] text-gray-500 font-NeueMontreal"
          >
            Additional materials to support your learning journey
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-[32%] smOnly:w-full xm:w-full"
          data-animate="card"
        >
          <div className="w-full rounded-[12px] overflow-hidden border border-[#21212122] bg-white hover:scale-[0.99] transition-transform duration-300">
            <div className="w-full h-[160px] bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
              <svg
                className="w-[48px] h-[48px] text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="p-[16px]">
              <h3 className="text-[18px] font-FoundersGrotesk font-medium text-[#212121]">
                Budget Glossary
              </h3>
              <p className="paragraph font-NeueMontreal text-gray-500 mt-[8px]">
                Essential terms and definitions every budget literate person
                should know.
              </p>
              <Link
                href="/resources/glossary"
                className="paragraph font-NeueMontreal text-[#212121] mt-[14px] underline underline-offset-4 hover:text-gray-600"
              >
                View Glossary
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-[32%] smOnly:w-full xm:w-full"
          data-animate="card"
        >
          <div className="w-full rounded-[12px] overflow-hidden border border-[#21212122] bg-white hover:scale-[0.99] transition-transform duration-300">
            <div className="w-full h-[160px] bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <svg
                className="w-[48px] h-[48px] text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div className="p-[16px]">
              <h3 className="text-[18px] font-FoundersGrotesk font-medium text-[#212121]">
                Data Tools
              </h3>
              <p className="paragraph font-NeueMontreal text-gray-500 mt-[8px]">
                Interactive tools and databases to explore budget data yourself.
              </p>
              <Link
                href="/resources/tools"
                className="paragraph font-NeueMontreal text-[#212121] mt-[14px] underline underline-offset-4 hover:text-gray-600"
              >
                Explore Tools
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-[32%] smOnly:w-full xm:w-full"
          data-animate="card"
        >
          <div className="w-full rounded-[12px] overflow-hidden border border-[#21212122] bg-white hover:scale-[0.99] transition-transform duration-300">
            <div className="w-full h-[160px] bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center">
              <svg
                className="w-[48px] h-[48px] text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="p-[16px]">
              <h3 className="text-[18px] font-FoundersGrotesk font-medium text-[#212121]">
                Community
              </h3>
              <p className="paragraph font-NeueMontreal text-gray-500 mt-[8px]">
                Join other learners and share your insights on budget matters.
              </p>
              <Link
                href="/community"
                className="paragraph font-NeueMontreal text-[#212121] mt-[14px] underline underline-offset-4 hover:text-gray-600"
              >
                Join Community
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
