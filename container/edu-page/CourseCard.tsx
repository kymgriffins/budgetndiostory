"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Course } from "@/lib/edu-data";

interface CourseCardProps {
  course: Course;
  index: number;
  progress?: number;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export default function CourseCard({
  course,
  index,
  progress = 0,
  isCompleted = false,
  isCurrent = false,
}: CourseCardProps) {
  // Color mapping for course categories
  const colorMap: Record<string, string> = {
    Foundation: "from-green-400 to-emerald-500",
    Skills: "from-blue-400 to-indigo-500",
    Accountability: "from-orange-400 to-amber-500",
    Engagement: "from-purple-400 to-violet-500",
  };

  const gradientMap: Record<string, string> = {
    Foundation: "bg-gradient-to-br from-green-400/20 to-emerald-500/20",
    Skills: "bg-gradient-to-br from-blue-400/20 to-indigo-500/20",
    Accountability: "bg-gradient-to-br from-orange-400/20 to-amber-500/20",
    Engagement: "bg-gradient-to-br from-purple-400/20 to-violet-500/20",
  };

  const colorClass = colorMap[course.category] || "from-gray-400 to-gray-500";
  const gradientClass =
    gradientMap[course.category] || "bg-gradient-to-br from-gray-400/20 to-gray-500/20";

  return (
    <Link href={`/edu/${course.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className={`group relative overflow-hidden rounded-[16px] ${gradientClass} ${colorClass} p-[20px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300 border border-[#212121]/10`}
        data-animate="card"
      >
        <div className="flex items-center justify-between gap-[12px]">
          <div className="flex items-center gap-[12px]">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-[48px] h-[48px] rounded-full bg-[#212121]/20 flex items-center justify-center text-[20px] text-[#212121]"
            >
              {isCompleted ? (
                <svg
                  className="w-[24px] h-[24px]"
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
              ) : isCurrent ? (
                <svg
                  className="w-[20px] h-[20px] pl-[2px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <span className="font-FoundersGrotesk">{index + 1}</span>
              )}
            </motion.div>
            <div>
              <h3 className="text-[18px] font-FoundersGrotesk font-medium text-[#212121]">
                {course.title}
              </h3>
              <p className="text-[12px] font-NeueMontreal text-[#212121]/70 mt-[2px]">
                {course.totalDuration} • {course.lessons.length} lessons
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
            {isCurrent && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-[10px] py-[4px] rounded-full bg-[#212121]/20 text-[10px] font-NeueMontreal font-medium text-[#212121]"
              >
                In Progress
              </motion.span>
            )}
            {isCompleted && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-[10px] py-[4px] rounded-full bg-green-500/20 text-[10px] font-NeueMontreal font-medium text-green-600"
              >
                Completed
              </motion.span>
            )}
            <motion.div
              whileHover={{ x: 5 }}
              className="w-[36px] h-[36px] rounded-full bg-[#212121]/10 flex items-center justify-center text-[#212121]/50 group-hover:bg-[#212121] group-hover:text-white transition-all duration-300"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        <p className="mt-[12px] text-[14px] font-NeueMontreal text-[#212121]/80 line-clamp-2">
          {course.description}
        </p>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="mt-[16px]">
            <div className="flex items-center justify-between mb-[8px]">
              <span className="text-[11px] font-NeueMontreal text-[#212121]/50">
                Progress
              </span>
              <span className="text-[11px] font-NeueMontreal text-[#212121]/70">
                {progress}%
              </span>
            </div>
            <div className="w-full h-[6px] bg-[#212121]/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full bg-[#212121] rounded-full"
              />
            </div>
          </div>
        )}

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="mt-[16px] flex items-center gap-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="flex -space-x-[4px]">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-[24px] h-[24px] rounded-full bg-[#212121]/20 border border-[#212121]/30 flex items-center justify-center text-[8px] text-[#212121]"
              >
                {i}
              </div>
            ))}
          </div>
          <span className="text-[11px] font-NeueMontreal text-[#212121]/50">
            and others started this course
          </span>
        </motion.div>
      </motion.div>
    </Link>
  );
}
