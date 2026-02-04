"use client";

import { calculateProgressPercent, getAllCourses } from "@/lib/edu-data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LearnCourseCard from "./CourseCard";

const categoryOrder = ["Foundation", "Skills", "Accountability", "Engagement"];

export default function CourseList() {
  const [courses, setCourses] = useState<ReturnType<typeof getAllCourses>>([]);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [activeFilter, setActiveFilter] = useState<string>("All");

  useEffect(() => {
    const allCourses = getAllCourses();
    setCourses(allCourses);

    const progress: Record<string, number> = {};
    allCourses.forEach((course) => {
      progress[course.id] = calculateProgressPercent(course.id);
    });
    setProgressMap(progress);
  }, []);

  const completedCount = courses.filter(
    (course) => progressMap[course.id] === 100,
  ).length;
  const progressPercent =
    courses.length > 0
      ? Math.round((completedCount / courses.length) * 100)
      : 0;

  const filters = [
    { id: "All", label: "All Courses" },
    { id: "Foundation", label: "Foundation" },
    { id: "Skills", label: "Skills" },
    { id: "Accountability", label: "Accountability" },
    { id: "Engagement", label: "Engagement" },
  ];

  const filteredCourses =
    activeFilter === "All"
      ? courses
      : courses.filter((course) => course.category === activeFilter);

  return (
    <section id="courses" className="w-full py-20 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                Courses
              </span>
              {progressPercent > 0 && (
                <span className="text-sm text-white/50">
                  {progressPercent}% complete
                </span>
              )}
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-FoundersGrotesk font-bold text-white mb-2">
              Learning Paths
            </h2>
            <p className="text-white/60 font-NeueMontreal">
              Structured courses to build your budget literacy skills
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Progress Summary */}
        {progressPercent > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">
                    {completedCount} of {courses.length} courses completed
                  </p>
                  <p className="text-sm text-white/50">
                    Keep going! You're making great progress.
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course, index) => (
            <LearnCourseCard
              key={course.id}
              course={course}
              index={index}
              progress={progressMap[course.id]}
              isCompleted={progressMap[course.id] === 100}
              isCurrent={
                progressMap[course.id] > 0 && progressMap[course.id] < 100
              }
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/50">No courses found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
