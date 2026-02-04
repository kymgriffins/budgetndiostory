"use client";

import { ScrollReveal, Tags } from "@/components";
import { motion } from "framer-motion";

const topics = [
  { id: 1, title: "Budget Basics", href: "/learn#basics" },
  { id: 2, title: "Reading Budgets", href: "/learn#reading" },
  { id: 3, title: "Tracking Spending", href: "/learn#tracking" },
  { id: 4, title: "Civic Action", href: "/learn#civic" },
];

export default function LearnHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#f1f1f1]">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-blue-500/10 to-transparent blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 lg:pt-32 pb-16">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/70">
              Free Courses
            </span>
            <span className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm font-medium text-emerald-400">
              4 Courses • 90 min total
            </span>
          </div>
        </ScrollReveal>

        {/* Main Heading */}
        <ScrollReveal delay={0.1}>
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-FoundersGrotesk font-bold text-white tracking-tight leading-[1.1] mb-6">
            Master Kenya's
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              Public Budget
            </span>
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={0.2}>
          <p className="text-lg lg:text-xl text-white/60 max-w-2xl mb-10 font-NeueMontreal leading-relaxed">
            Learn to read, understand, and engage with Kenya's national and
            county budgets. Become an informed citizen who can hold leaders
            accountable.
          </p>
        </ScrollReveal>

        {/* CTA Buttons */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="#courses"
              className="group relative px-8 py-4 bg-white text-black font-medium rounded-full overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Learning
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              How it works
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-16 border-t border-white/10 pt-10">
            {[
              { value: "4", label: "Courses" },
              { value: "18", label: "Lessons" },
              { value: "90min", label: "Total Time" },
              { value: "Free", label: "For Everyone" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center lg:text-left"
              >
                <div className="text-3xl lg:text-4xl font-FoundersGrotesk font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50 font-NeueMontreal">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Topics */}
        <ScrollReveal delay={0.6}>
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
            <span className="text-sm text-white/50 font-NeueMontreal">
              Explore:
            </span>
            {topics.map((item) => (
              <Tags
                key={item.id}
                bgcolor="transparent"
                item={item}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              />
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
