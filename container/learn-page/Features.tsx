"use client";

import { ScrollReveal } from "@/components";
import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Video Lessons",
    description:
      "Engaging video content that breaks down complex budget concepts into easy-to-understand explanations.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
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
    ),
    title: "Reading Materials",
    description:
      "In-depth articles and guides that you can read at your own pace for deeper understanding.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    title: "Quizzes & Tests",
    description:
      "Interactive quizzes to test your knowledge and reinforce what you've learned.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Self-Paced Learning",
    description:
      "Learn at your own speed. Access courses anytime, anywhere, on any device.",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Track Progress",
    description:
      "Visual progress tracking shows how far you've come and what's left to learn.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Free Access",
    description:
      "All courses and materials are completely free. No hidden fees or subscriptions.",
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function Features() {
  return (
    <section id="how-it-works" className="w-full py-20 bg-[#fafafa]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/70 mb-4 inline-block">
              How It Works
            </span>
            <h2 className="text-4xl lg:text-5xl font-FoundersGrotesk font-bold text-white mb-4">
              Everything You Need to Learn
            </h2>
            <p className="text-white/60 font-NeueMontreal max-w-2xl mx-auto">
              Our learning platform provides all the tools and resources you
              need to become budget literate and actively participate in Kenya's
              public finance processes.
            </p>
          </div>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4`}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-FoundersGrotesk font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 font-NeueMontreal text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
