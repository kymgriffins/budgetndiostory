"use client";

import { NavbarLanding } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  Moon,
  Play,
  Sun,
  Users,
  Video,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const courseLessons = {
  "budget-basics": [
    { title: "What is a Budget?", duration: "5 min", type: "video" },
    { title: "Why Budgets Matter", duration: "4 min", type: "video" },
    { title: "Kenya's Budget Process", duration: "6 min", type: "article" },
    { title: "Types of Budgets", duration: "4 min", type: "video" },
    { title: "Quiz: Budget Basics", duration: "5 min", type: "quiz" },
  ],
  "reading-budgets": [
    {
      title: "Understanding Budget Documents",
      duration: "6 min",
      type: "video",
    },
    { title: "Reading Financial Statements", duration: "5 min", type: "video" },
    { title: "Allocation vs Expenditure", duration: "4 min", type: "article" },
    {
      title: "Identifying Budget Line Items",
      duration: "5 min",
      type: "video",
    },
    { title: "Quiz: Reading Budgets", duration: "5 min", type: "quiz" },
  ],
  "tracking-spending": [
    { title: "Tracking Public Funds", duration: "5 min", type: "video" },
    { title: "Procurement Records", duration: "4 min", type: "article" },
    { title: "Field Verification", duration: "6 min", type: "video" },
    { title: "Finding Discrepancies", duration: "5 min", type: "video" },
  ],
  "civic-action": [
    { title: "Your Right to Know", duration: "4 min", type: "video" },
    { title: "Participatory Budgeting", duration: "5 min", type: "video" },
    { title: "Advocacy Strategies", duration: "6 min", type: "article" },
    { title: "Writing to Representatives", duration: "4 min", type: "video" },
    { title: "Taking Action", duration: "5 min", type: "video" },
  ],
};

const courses = [
  {
    id: "budget-basics",
    title: "Budget Basics",
    description:
      "Learn what a budget is, why it matters, and how Kenya's budget process works.",
    lessons: 5,
    duration: "20 min",
    category: "Foundation",
    color: "#00aa55",
    icon: <BookOpen size={24} />,
  },
  {
    id: "reading-budgets",
    title: "Reading Budgets",
    description:
      "Understand budget documents, allocations, and how to read fiscal reports.",
    lessons: 5,
    duration: "25 min",
    category: "Skills",
    color: "#3b82f6",
    icon: <FileText size={24} />,
  },
  {
    id: "tracking-spending",
    title: "Tracking Spending",
    description:
      "Learn techniques to track public spending and identify discrepancies.",
    lessons: 4,
    duration: "20 min",
    category: "Accountability",
    color: "#f59e0b",
    icon: <Users size={24} />,
  },
  {
    id: "civic-action",
    title: "Civic Action",
    description:
      "Discover how to participate in budget processes and advocate for change.",
    lessons: 5,
    duration: "25 min",
    category: "Engagement",
    color: "#ef4444",
    icon: <Video size={24} />,
  },
];

const features = [
  {
    icon: <Play size={24} />,
    title: "Video Lessons",
    description:
      "Engaging video content that breaks down complex budget concepts.",
    color: "#3b82f6",
  },
  {
    icon: <FileText size={24} />,
    title: "Reading Materials",
    description: "In-depth articles and guides for deeper understanding.",
    color: "#00aa55",
  },
  {
    icon: <Check size={24} />,
    title: "Quizzes",
    description: "Test your knowledge and track your progress.",
    color: "#f59e0b",
  },
];

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDark, setIsDark] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<{
    courseId: string;
    lessonIndex: number;
  } | null>(null);
  const [completedLessons, setCompletedLessons] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
    setActiveLesson(null);
  };

  const openLesson = (courseId: string, lessonIndex: number) => {
    setActiveLesson({ courseId, lessonIndex });
    setExpandedCourse(courseId);
  };

  const closeLesson = () => {
    setActiveLesson(null);
  };

  const toggleLesson = (lessonKey: string) => {
    setCompletedLessons((prev) => ({
      ...prev,
      [lessonKey]: !prev[lessonKey],
    }));
  };

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  const totalLessons = courses.reduce((acc, course) => acc + course.lessons, 0);
  const completedCount = Object.keys(completedLessons).filter(
    (key) => completedLessons[key],
  ).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const faqs = [
    {
      question: "How long do courses take?",
      answer:
        "Each course takes between 15-30 minutes to complete. You can learn at your own pace and revisit content anytime.",
    },
    {
      question: "Are the courses free?",
      answer:
        "Yes! All our courses and learning materials are completely free. We believe budget literacy should be accessible to everyone.",
    },
    {
      question: "Do I need prior knowledge?",
      answer:
        "No! Our courses start from the basics and build up. Even if you've never looked at a budget before, you'll be able to follow along.",
    },
  ];

  return (
    <>
      <Head>
        <title>Learn - Budget Ndio Story</title>
        <meta
          name="description"
          content="Learn to understand and engage with Kenya's public budgets through our free courses and learning materials."
        />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
        {/* Navigation */}
        <NavbarLanding />

        <main>
          {/* HERO */}
          <section className="px-4 sm:px-6 lg:px-8 pt-32 pb-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-NeueMontreal text-white/70 mb-6">
                  <BookOpen size={16} className="text-[#00aa55]" />
                  Free Courses
                </span>

                <h1 className="font-FoundersGrotesk text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight uppercase leading-tight">
                  Master Kenya's <br />
                  <span className="text-[#00aa55]">Public Budget</span>
                </h1>

                <p className="mt-6 text-lg font-NeueMontreal text-white/60 max-w-xl leading-relaxed">
                  Learn to read, understand, and engage with Kenya's national
                  and county budgets. Become an informed citizen who can hold
                  leaders accountable.
                </p>

                <div className="mt-8 flex items-center gap-4 flex-wrap">
                  <button
                    onClick={() =>
                      document
                        .getElementById("courses")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/90 transition-colors"
                  >
                    Start Learning <ArrowRight size={14} />
                  </button>
                </div>

                {/* Progress Overview */}
                {progressPercent > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[#00aa55]/10 to-transparent border border-[#00aa55]/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#00aa55]/20 flex items-center justify-center">
                          <Check size={20} className="text-[#00aa55]" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {completedCount} of {totalLessons} lessons completed
                          </p>
                          <p className="text-sm text-white/50">
                            {progressPercent}% complete - Keep going!
                          </p>
                        </div>
                      </div>
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-[#00aa55] rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stats */}
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                  {[
                    { value: "4", label: "Courses" },
                    { value: "19", label: "Lessons" },
                    { value: "90min", label: "Total Time" },
                    { value: "Free", label: "For Everyone" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-FoundersGrotesk font-semibold text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm font-NeueMontreal text-white/50">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* FEATURES */}
          <section className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="font-FoundersGrotesk text-2xl lg:text-3xl font-semibold uppercase">
                  What You'll Get
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: `${feature.color}20`,
                        color: feature.color,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="font-FoundersGrotesk text-lg font-medium">
                      {feature.title}
                    </h3>
                    <p className="font-NeueMontreal text-white/60 mt-2 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* COURSES */}
          <section id="courses" className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="font-FoundersGrotesk text-2xl lg:text-3xl font-semibold uppercase">
                  Learning Paths
                </h2>
                <p className="mt-2 text-sm font-NeueMontreal text-white/60">
                  Choose a course and start learning right here
                </p>
              </motion.div>

              {/* Category Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {[
                  "All",
                  "Foundation",
                  "Skills",
                  "Accountability",
                  "Engagement",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-NeueMontreal font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-white text-black"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>

              {/* Course List */}
              <div className="space-y-4">
                {filteredCourses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                  >
                    {/* Course Header */}
                    <button
                      onClick={() => toggleCourse(course.id)}
                      className="w-full p-6 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: `${course.color}20`,
                            color: course.color,
                          }}
                        >
                          {course.icon}
                        </div>
                        <div>
                          <h3 className="font-FoundersGrotesk text-lg font-medium">
                            {course.title}
                          </h3>
                          <p className="font-NeueMontreal text-white/60 text-sm mt-1">
                            {course.lessons} lessons • {course.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-NeueMontreal bg-white/10 text-white/70">
                          {course.category}
                        </span>
                        {expandedCourse === course.id ? (
                          <ChevronUp size={20} className="text-white/60" />
                        ) : (
                          <ChevronDown size={20} className="text-white/60" />
                        )}
                      </div>
                    </button>

                    {/* Course Content */}
                    <AnimatePresence>
                      {expandedCourse === course.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-white/10">
                            <div className="py-4 space-y-2">
                              {courseLessons[
                                course.id as keyof typeof courseLessons
                              ]?.map((lesson, idx) => {
                                const lessonKey = `${course.id}-${idx}`;
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => openLesson(course.id, idx)}
                                    className="w-full p-3 flex items-center justify-between rounded-lg hover:bg-white/5 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                          completedLessons[lessonKey]
                                            ? "bg-[#00aa55] text-white"
                                            : "bg-white/10 text-white/60"
                                        }`}
                                      >
                                        {completedLessons[lessonKey] ? (
                                          <Check size={14} />
                                        ) : (
                                          <span className="text-xs">
                                            {idx + 1}
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-left">
                                        <p className="font-NeueMontreal text-sm text-white/80">
                                          {lesson.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                          {lesson.type === "video" && (
                                            <Video
                                              size={12}
                                              className="text-white/40"
                                            />
                                          )}
                                          {lesson.type === "article" && (
                                            <FileText
                                              size={12}
                                              className="text-white/40"
                                            />
                                          )}
                                          {lesson.type === "quiz" && (
                                            <Check
                                              size={12}
                                              className="text-white/40"
                                            />
                                          )}
                                          <span className="text-xs font-NeueMontreal text-white/40">
                                            {lesson.duration}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <Play size={16} className="text-white/40" />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* LESSON CONTENT DISPLAY */}
          <AnimatePresence>
            {activeLesson && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={closeLesson}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a0a0a] border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(() => {
                    const course = courses.find(
                      (c) => c.id === activeLesson.courseId,
                    );
                    const lesson =
                      courseLessons[
                        activeLesson.courseId as keyof typeof courseLessons
                      ]?.[activeLesson.lessonIndex];
                    if (!course || !lesson) return null;

                    return (
                      <div className="p-8">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{
                                backgroundColor: `${course.color}20`,
                                color: course.color,
                              }}
                            >
                              {course.icon}
                            </div>
                            <div>
                              <p className="text-xs font-NeueMontreal text-white/50 uppercase tracking-wider">
                                {course.title}
                              </p>
                              <h3 className="font-FoundersGrotesk text-xl font-semibold">
                                {lesson.title}
                              </h3>
                            </div>
                          </div>
                          <button
                            onClick={closeLesson}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                          >
                            <ChevronDown size={20} className="rotate-45" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="mb-6">
                          {lesson.type === "video" && (
                            <div className="aspect-video rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                              <div className="text-center">
                                <Play
                                  size={48}
                                  className="mx-auto mb-4 text-white/40"
                                />
                                <p className="font-NeueMontreal text-white/60">
                                  Video content coming soon
                                </p>
                              </div>
                            </div>
                          )}
                          {lesson.type === "article" && (
                            <div className="prose prose-invert max-w-none">
                              <h4 className="font-FoundersGrotesk text-lg font-semibold mb-4">
                                {lesson.title}
                              </h4>
                              <p className="font-NeueMontreal text-white/70 leading-relaxed">
                                Article content coming soon. This lesson will
                                cover important concepts related to{" "}
                                {lesson.title.toLowerCase()} in Kenya's public
                                budget process.
                              </p>
                            </div>
                          )}
                          {lesson.type === "quiz" && (
                            <div className="text-center py-8">
                              <Check
                                size={48}
                                className="mx-auto mb-4 text-[#00aa55]"
                              />
                              <p className="font-NeueMontreal text-white/60">
                                Quiz content coming soon
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          {(() => {
                            const lessonKey = `${activeLesson.courseId}-${activeLesson.lessonIndex}`;
                            const isCompleted = completedLessons[lessonKey];
                            return (
                              <button
                                onClick={() => toggleLesson(lessonKey)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center ${isCompleted ? "bg-[#00aa55]" : "border border-white/30"}`}
                                >
                                  {isCompleted && <Check size={12} />}
                                </div>
                                <span className="text-sm font-NeueMontreal">
                                  {isCompleted
                                    ? "Completed"
                                    : "Mark as complete"}
                                </span>
                              </button>
                            );
                          })()}

                          <div className="flex items-center gap-2">
                            {activeLesson.lessonIndex > 0 && (
                              <button
                                onClick={() =>
                                  setActiveLesson({
                                    courseId: activeLesson.courseId,
                                    lessonIndex: activeLesson.lessonIndex - 1,
                                  })
                                }
                                className="px-4 py-2 text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                              >
                                Previous
                              </button>
                            )}
                            <button
                              onClick={() => {
                                const lessonKey = `${activeLesson.courseId}-${activeLesson.lessonIndex}`;
                                toggleLesson(lessonKey);
                                if (
                                  activeLesson.lessonIndex <
                                  (courseLessons[
                                    activeLesson.courseId as keyof typeof courseLessons
                                  ]?.length || 1) -
                                    1
                                ) {
                                  setActiveLesson({
                                    courseId: activeLesson.courseId,
                                    lessonIndex: activeLesson.lessonIndex + 1,
                                  });
                                }
                              }}
                              className="px-6 py-2 rounded-full bg-[#00aa55] text-black text-sm font-NeueMontreal hover:bg-[#00cc66] transition-colors"
                            >
                              Next Lesson
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <section className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl bg-gradient-to-br from-[#00aa55]/20 via-white/5 to-transparent border border-white/10 p-8 lg:p-12 text-center"
              >
                <h2 className="font-FoundersGrotesk text-2xl lg:text-4xl font-semibold tracking-tight">
                  Ready to start your journey?
                </h2>
                <p className="font-NeueMontreal text-white/70 mt-4 max-w-xl mx-auto">
                  Join thousands of Kenyans who are learning about public
                  budgets and becoming informed citizens.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <button
                    onClick={() => {
                      setActiveCategory("Foundation");
                      document
                        .getElementById("courses")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/90 transition-colors whitespace-nowrap"
                  >
                    Start First Course
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-FoundersGrotesk text-2xl lg:text-3xl font-semibold tracking-tight">
                  Frequently Asked Questions
                </h2>
              </motion.div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left"
                    >
                      <span className="font-FoundersGrotesk text-lg font-medium">
                        {faq.question}
                      </span>
                      {openFaq === i ? (
                        <ChevronUp size={20} className="text-white/60" />
                      ) : (
                        <ChevronDown size={20} className="text-white/60" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5">
                            <p className="font-NeueMontreal text-white/70 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Contact Info */}
              <div>
                <h3 className="font-FoundersGrotesk text-sm font-medium text-white uppercase mb-4">
                  Contact
                </h3>
                <div className="space-y-2">
                  <a
                    href="mailto:info@budgetndiostory.org"
                    className="block text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    info@budgetndiostory.org
                  </a>
                  <p className="text-sm font-NeueMontreal text-white/60">
                    Nairobi, Kenya
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-FoundersGrotesk text-sm font-medium text-white uppercase mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/tracker"
                    className="block text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Budget Tracker
                  </Link>
                  <Link
                    href="/blog"
                    className="block text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Theme Toggle */}
              <div>
                <h3 className="font-FoundersGrotesk text-sm font-medium text-white uppercase mb-4">
                  Appearance
                </h3>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </div>

              {/* Copyright */}
              <div>
                <h3 className="font-FoundersGrotesk text-sm font-medium text-white uppercase mb-4">
                  Budget Ndio Story
                </h3>
                <p className="text-xs font-NeueMontreal text-white/40">
                  © {new Date().getFullYear()} All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
