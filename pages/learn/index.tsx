"use client";

import { NavbarLanding } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText,
  Mail,
  MapPin,
  Moon,
  Play,
  Sun,
  Users
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    progress: 0,
  },
  {
    id: "reading-budgets",
    title: "Reading Budgets",
    description:
      "Understand budget documents, allocations, and how to read fiscal reports.",
    lessons: 6,
    duration: "25 min",
    category: "Skills",
    color: "#3b82f6",
    progress: 0,
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
    progress: 0,
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
    progress: 0,
  },
];

const categories = [
  "All",
  "Foundation",
  "Skills",
  "Accountability",
  "Engagement",
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
    icon: <Users size={24} />,
    title: "Community Support",
    description: "Join other learners and share your insights.",
    color: "#f59e0b",
  },
];

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isDark, setIsDark] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

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

      <div className="bg-[#0a0a0a] text-white min-h-screen">
        {/* Navigation */}
        <NavbarLanding />

        <main>
          {/* HERO */}
          <section className="padding-x pt-32 pb-16">
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

                <h1 className="font-FoundersGrotesk text-4xl lg:text-7xl font-semibold tracking-tight uppercase leading-tight">
                  Master Kenya's <br />
                  <span className="text-[#00aa55]">Public Budget</span>
                </h1>

                <p className="mt-6 text-lg font-NeueMontreal text-white/60 max-w-xl leading-relaxed">
                  Learn to read, understand, and engage with Kenya's national
                  and county budgets. Become an informed citizen who can hold
                  leaders accountable.
                </p>

                <div className="mt-8 flex items-center gap-4 flex-wrap">
                  <Link
                    href="#courses"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/90 transition-colors"
                  >
                    Start Learning <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm font-NeueMontreal hover:bg-white/10 transition-colors"
                  >
                    How it works
                  </Link>
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                  {[
                    { value: "4", label: "Courses" },
                    { value: "20", label: "Lessons" },
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
          <section id="features" className="padding-x py-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  How It Works
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold tracking-tight mt-3">
                  Everything You Need to Learn
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors"
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
                    <h3 className="font-FoundersGrotesk text-xl font-medium">
                      {feature.title}
                    </h3>
                    <p className="font-NeueMontreal text-white/60 mt-3 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* COURSES */}
          <section id="courses" className="padding-x py-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold uppercase">
                  Learning Paths
                </h2>
                <p className="mt-2 text-sm font-NeueMontreal text-white/60">
                  Structured courses to build your budget literacy skills
                </p>
              </motion.div>

              {/* Category Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-NeueMontreal font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-white text-black"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>

              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <Link
                      href="/edu"
                      className="block rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all group h-full"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${course.color}20` }}
                          >
                            <BookOpen
                              size={24}
                              style={{ color: course.color }}
                            />
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-NeueMontreal bg-white/10 text-white/70">
                            {course.category}
                          </span>
                        </div>

                        <h3 className="font-FoundersGrotesk text-xl font-medium text-white group-hover:text-[#00aa55] transition-colors">
                          {course.title}
                        </h3>
                        <p className="font-NeueMontreal text-white/60 mt-2 leading-relaxed">
                          {course.description}
                        </p>

                        <div className="mt-4 flex items-center gap-4 text-sm font-NeueMontreal text-white/50">
                          <span>{course.lessons} lessons</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-sm font-NeueMontreal text-[#00aa55]">
                          Start Course <ArrowRight size={14} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="padding-x py-16">
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
                  <Link
                    href="/edu"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/90 transition-colors whitespace-nowrap"
                  >
                    Browse All Courses
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="padding-x py-16">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  FAQ
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold tracking-tight mt-3">
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
        <footer className="py-16 px-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="font-FoundersGrotesk text-lg font-medium text-white uppercase mb-6">
                  Contact Info
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-white/60" />
                    <div>
                      <p className="text-xs font-NeueMontreal text-white/50 mb-0.5">
                        Email
                      </p>
                      <Link
                        href="mailto:hello@budgetndiostory.org"
                        className="text-sm font-NeueMontreal text-white/80 hover:text-white transition-colors"
                      >
                        hello@budgetndiostory.org
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-white/60" />
                    <div>
                      <p className="text-xs font-NeueMontreal text-white/50 mb-0.5">
                        Location
                      </p>
                      <p className="text-sm font-NeueMontreal text-white/80">
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-FoundersGrotesk text-lg font-medium text-white uppercase mb-6">
                  Quick Links
                </h3>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/tracker"
                    className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Budget Tracker
                  </Link>
                  <Link
                    href="/blog"
                    className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/edustories"
                    className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Edu Stories
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Theme Toggle */}
              <div>
                <h3 className="font-FoundersGrotesk text-lg font-medium text-white uppercase mb-6">
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
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-sm font-NeueMontreal text-white/50">
                © {new Date().getFullYear()} Budget Ndio Story. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
