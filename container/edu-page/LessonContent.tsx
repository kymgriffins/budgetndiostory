"use client";

import { motion, AnimatePresence } from "framer-motion";
import YouTubePlayer, { extractYouTubeId } from "@/components/YouTubePlayer";
import { Lesson } from "@/lib/edu-data";

interface LessonContentProps {
  lesson: Lesson;
  onComplete: () => void;
  isCompleted: boolean;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default function LessonContent({
  lesson,
  onComplete,
  isCompleted,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: LessonContentProps) {
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
    <AnimatePresence mode="wait">
      <motion.div
        key={lesson.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="animate-fade-in"
      >
        {/* Lesson Header */}
        <div className="mb-[32px]">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-[12px] mb-[16px]"
          >
            <span className="px-[10px] py-[4px] rounded-full bg-[#f1f1f1] text-[12px] font-NeueMontreal text-gray-600 flex items-center gap-[6px]">
              {getTypeIcon(lesson.type)}
              {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
            </span>
            <span className="text-[12px] font-NeueMontreal text-gray-500">
              {lesson.duration}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[32px] font-FoundersGrotesk font-medium text-[#212121] uppercase"
          >
            {lesson.title}
          </motion.h1>
        </div>

        {/* Lesson Content - Video Player */}
        {lesson.type === "video" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-[32px]"
          >
            {lesson.videoUrl ? (
              <YouTubePlayer
                videoId={extractYouTubeId(lesson.videoUrl)}
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
          </motion.div>
        ) : lesson.type === "quiz" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-[16px] flex items-center justify-center mb-[32px]"
          >
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
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-[16px] flex items-center justify-center mb-[32px]"
          >
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
          </motion.div>
        )}

        {/* Lesson Text Content */}
        {lesson.content && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        )}

        {/* Complete Button & Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between mt-[40px] pt-[24px] border-t border-[#21212122]"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            disabled={isCompleted}
            className={`px-[24px] py-[12px] rounded-full text-[14px] font-NeueMontreal font-medium transition-all duration-300 ${
              isCompleted
                ? "bg-green-500 text-white cursor-default"
                : "bg-[#212121] text-white hover:bg-gray-800"
            }`}
          >
            {isCompleted ? "✓ Lesson Completed" : "Mark as Complete"}
          </motion.button>

          <div className="flex items-center gap-[12px]">
            {hasPrevious && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onPrevious}
                className="px-[16px] py-[12px] rounded-full border border-[#21212122] text-[14px] font-NeueMontreal text-[#212121] hover:bg-[#f1f1f1] transition-colors"
              >
                Previous
              </motion.button>
            )}
            {hasNext && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNext}
                className="px-[16px] py-[12px] rounded-full bg-[#212121] text-[14px] font-NeueMontreal font-medium text-white hover:bg-gray-800 transition-colors"
              >
                Next Lesson
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
