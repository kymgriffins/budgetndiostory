"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Course } from "@/lib/edu-data";

interface CourseCardProps {
  course: Course;
  index: number;
  progress?: number;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

const categoryConfig = {
  Foundation: {
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    border: "border-green-500/30",
    accent: "bg-green-500",
    icon: "📚",
    shadow: "shadow-green-500/20",
  },
  Skills: {
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    border: "border-blue-500/30",
    accent: "bg-blue-500",
    icon: "⚡",
    shadow: "shadow-blue-500/20",
  },
  Accountability: {
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    border: "border-orange-500/30",
    accent: "bg-orange-500",
    icon: "🔍",
    shadow: "shadow-orange-500/20",
  },
  Engagement: {
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    border: "border-purple-500/30",
    accent: "bg-purple-500",
    icon: "🗣️",
    shadow: "shadow-purple-500/20",
  },
};

export default function LearnCourseCard({
  course,
  index,
  progress = 0,
  isCompleted = false,
  isCurrent = false,
}: CourseCardProps) {
  const config = categoryConfig[course.category as keyof typeof categoryConfig] || categoryConfig.Foundation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/learn/${course.id}`}>
        <div
          className={`
            relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.gradient}
            border ${config.border} p-6 transition-all duration-500
            hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-[1.02] hover:border-opacity-50
          `}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-bl from-white/5 to-transparent blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-2xl" />
          </div>

          {/* Card Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl"
                >
                  {config.icon}
                </motion.div>
                <div>
                  <h3 className="text-xl font-FoundersGrotesk font-semibold text-white">
                    {course.title}
                  </h3>
                  <p className="text-xs text-white/50 font-NeueMontreal mt-0.5">
                    {course.category} • {course.difficulty}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              {isCompleted && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Completed
                </motion.span>
              )}
              {isCurrent && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium flex items-center gap-1"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  In Progress
                </motion.span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/70 font-NeueMontreal text-sm leading-relaxed mb-4 line-clamp-2">
              {course.description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-4 text-xs text-white/50 font-NeueMontreal">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.totalDuration}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {course.lessons.length} lessons
              </span>
              {progress > 0 && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {progress}% complete
                </span>
              )}
            </div>

            {/* Progress Bar */}
            {progress > 0 && (
              <div className="mb-4">
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`h-full rounded-full ${config.accent}`}
                  />
                </div>
              </div>
            )}

            {/* Lesson Types Preview */}
            <div className="flex items-center gap-2 mb-4">
              {course.lessons.some((l) => l.type === "video") && (
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 text-xs flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Video
                </span>
              )}
              {course.lessons.some((l) => l.type === "article") && (
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 text-xs flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Reading
                </span>
              )}
              {course.lessons.some((l) => l.type === "quiz") && (
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 text-xs flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Quiz
                </span>
              )}
            </div>

            {/* CTA Button */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {isCompleted ? "Review Course" : isCurrent ? "Continue" : "Start Course"}
              </span>
              <motion.div
                whileHover={{ x: 5 }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 group-hover:bg-white group-hover:text-black transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
