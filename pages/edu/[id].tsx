"use client";

import { courseExists } from "@/lib/edu-data";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CourseViewer = dynamic(
  () => import("@/container/edu-page/CourseViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-screen bg-[#f1f1f1] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#212121]/20 border-t-[#212121] rounded-full animate-spin" />
          <p className="text-[14px] font-NeueMontreal text-gray-500">
            Loading course...
          </p>
        </div>
      </div>
    ),
  },
);

export default function EduCourse() {
  const params = useParams();
  const router = useRouter();

  // Properly extract courseId from params (handles array or single value)
  const courseId = params?.id
    ? (Array.isArray(params.id) ? params.id[0] : params.id).toLowerCase()
    : "";

  console.log(
    "Received ID:",
    params?.id,
    "Processed ID:",
    courseId,
    "Type:",
    typeof params?.id,
  );

  const [isValidCourse, setIsValidCourse] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Validate course exists
  useEffect(() => {
    if (!courseId) {
      setIsChecking(false);
      return;
    }

    setIsChecking(true);
    const exists = courseExists(courseId);
    setIsValidCourse(exists);
    setIsChecking(false);

    // Redirect if course doesn't exist
    if (!exists && typeof window !== "undefined") {
      // Only redirect after client-side validation
      router.replace("/edu");
    }
  }, [courseId, router]);

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className="w-full min-h-screen bg-[#f1f1f1] flex items-center justify-center">
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
      </div>
    );
  }

  // Show not found if course is invalid
  if (!isValidCourse && !isChecking) {
    return (
      <div className="w-full min-h-screen bg-[#f1f1f1] flex items-center justify-center">
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
          <button
            onClick={() => router.back()}
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
          </button>
        </motion.div>
      </div>
    );
  }

  return <CourseViewer courseId={courseId} parentRoute="/edu" />;
}
