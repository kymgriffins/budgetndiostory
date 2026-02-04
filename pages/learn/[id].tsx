"use client";

import { PageTransition, SmoothScrollGsap } from "@/components";
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
      <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-[14px] font-NeueMontreal text-white/50">
            Loading course...
          </p>
        </div>
      </div>
    ),
  },
);

export default function LearnCoursePage() {
  const params = useParams();
  const router = useRouter();

  // Properly extract courseId from params (handles array or single value)
  const courseId = params?.id
    ? (Array.isArray(params.id) ? params.id[0] : params.id).toLowerCase()
    : "";

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
      router.replace("/learn");
    }
  }, [courseId, router]);

  // Show loading state while checking
  if (isChecking) {
    return (
      <PageTransition>
        <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-[14px] font-NeueMontreal text-white/50">
              Loading course...
            </p>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  // Show not found if course is invalid
  if (!isValidCourse && !isChecking) {
    return (
      <PageTransition>
        <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-6"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl lg:text-4xl font-FoundersGrotesk font-bold text-white mb-4">
              Course Not Found
            </h1>
            <p className="text-white/60 font-NeueMontreal mb-8 max-w-md mx-auto">
              The course you're looking for doesn't exist or has been moved.
            </p>
            <button
              onClick={() => router.push("/learn")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-[14px] font-NeueMontreal font-medium hover:bg-white/90 transition-colors"
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
              Back to Learn
            </button>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SmoothScrollGsap className="min-h-screen overflow-y-auto overflow-x-hidden w-full bg-[#0a0a0a]">
        <CourseViewer courseId={courseId} parentRoute="/learn" />
      </SmoothScrollGsap>
    </PageTransition>
  );
}
