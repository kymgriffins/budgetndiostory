"use client";

import { MainFooter, NavbarLanding, YouTubePlayer } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  FileText,
  MapPin,
  Play,
  TrendingUp,
  Users,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

/**
 * Budget Ndio Story - Hub Page
 * Built per BNSCLIENT1.md specification
 * This is the new hub page with all sections from the spec
 */

type TabType = "stories" | "videos" | "updates";

export default function Hub() {
  const [activeTab, setActiveTab] = useState<TabType>("stories");
  const [year] = useState(2026);

  return (
    <>
      <Head>
        <title>Budget Ndio Story — Follow the Budget. Find the Story.</title>
        <meta
          name="description"
          content="We turn national and county budgets into clear insights, practical analysis, and trackable evidence to enhance youth participation, and accountability by leaders."
        />
        <meta property="og:title" content="Budget Ndio Story — Follow the Budget. Find the Story." />
        <meta
          property="og:description"
          content="We turn national and county budgets into clear insights, practical analysis, and trackable evidence to enhance youth participation."
        />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      <div className="bg-[#0a0a0a] text-white min-h-screen">
        {/* Navigation */}
        <NavbarLanding />

        <main>
          {/* HERO SECTION */}
          <section className="padding-x pt-32 pb-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-FoundersGrotesk text-[clamp(36px,6vw,72px)] font-bold tracking-tight leading-[1.1]">
                  Follow the Budget.
                  <br />
                  Find the Story.
                </h1>
                <p className="font-NeueMontreal text-lg text-white/70 mt-6 max-w-2xl mx-auto leading-relaxed">
                  We turn national and county budgets into clear insights, practical analysis, and trackable evidence to enhance youth participation, and accountability by leaders.
                </p>

                {/* Trust Line */}
                <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-white/50 font-NeueMontreal">
                  <span>Plain language</span>
                  <span className="w-1 h-1 bg-white/30 rounded-full mt-2" />
                  <span>Source-linked</span>
                  <span className="w-1 h-1 bg-white/30 rounded-full mt-2" />
                  <span>Youth-first</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap justify-center gap-4 mt-10">
                  <Link
                    href="/budget-simplified"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal font-medium uppercase tracking-wider hover:bg-[#00cc66] transition-colors"
                  >
                    View Latest Report <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/participate"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-full font-NeueMontreal font-medium uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    Take Action
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* START HERE SECTION */}
          <section className="padding-x py-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[#00aa55]">
                  Start Here
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold mt-3">
                  Start Here
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <BookOpen size={24} />,
                    title: "Budget Basics",
                    desc: "Learn the fundamentals of how budgets work",
                    href: "/learn",
                    color: "#00aa55",
                  },
                  {
                    icon: <MapPin size={24} />,
                    title: "National vs County",
                    desc: "Understand the difference between national and county budgets",
                    href: "/learn",
                    color: "#00cc66",
                  },
                  {
                    icon: <Calendar size={24} />,
                    title: "Budget Calendar",
                    desc: "Know when key budget decisions happen",
                    href: "/learn",
                    color: "#00aa55",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block rounded-2xl bg-white/5 border border-white/10 p-8 hover:border-[#00aa55]/50 transition-all group h-full"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <div style={{ color: item.color }}>{item.icon}</div>
                      </div>
                      <h3 className="font-FoundersGrotesk text-xl font-medium group-hover:text-[#00aa55] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-NeueMontreal text-white/60 mt-2">
                        {item.desc}
                      </p>
                      <div className="flex items-center gap-1 mt-4 text-[#00aa55] text-sm font-medium">
                        Learn more <ChevronRight size={16} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-white/20 transition-colors"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </section>

          {/* LATEST SECTION - Stories | Videos | Updates */}
          <section className="padding-x py-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap items-end justify-between gap-4 mb-10"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#00aa55]">
                    Latest
                  </span>
                  <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold mt-2">
                    Latest
                  </h2>
                </div>
                <Link
                  href="/stories"
                  className="inline-flex items-center gap-1 text-[#00aa55] hover:underline"
                >
                  View all <ChevronRight size={16} />
                </Link>
              </motion.div>

              {/* Tabs */}
              <div className="flex gap-2 mb-8 border-b border-white/10">
                {(["stories", "videos", "updates"] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3 font-NeueMontreal uppercase text-sm tracking-wider transition-colors relative ${
                      activeTab === tab ? "text-[#00aa55]" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {tab === "stories" ? "Stories" : tab === "videos" ? "Videos" : "Updates"}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00aa55]"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "stories" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Health Budget 2026",
                          desc: "Key takeaways from the new health sector allocation",
                          category: "National",
                        },
                        {
                          title: "Education Funding Gap",
                          desc: "What the county allocations mean for schools",
                          category: "County",
                        },
                        {
                          title: "Road Projects Tracker",
                          desc: "Following KSh 500M allocated to rural roads",
                          category: "Tracker",
                        },
                      ].map((story, i) => (
                        <Link
                          key={i}
                          href="/stories"
                          className="block rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-[#00aa55]/50 transition-all group"
                        >
                          <span className="text-xs text-[#00aa55] uppercase tracking-wider">
                            {story.category}
                          </span>
                          <h3 className="font-FoundersGrotesk text-lg font-medium mt-3 group-hover:text-[#00aa55] transition-colors">
                            {story.title}
                          </h3>
                          <p className="font-NeueMontreal text-white/60 text-sm mt-2">
                            {story.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}

                  {activeTab === "videos" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { title: "Budget Basics Explained", duration: "5:30", category: "Basics" },
                        { title: "Finance Bill 2026", duration: "8:45", category: "Finance Bill" },
                        { title: "County Budget Breakdown", duration: "12:20", category: "County" },
                      ].map((video, i) => (
                        <Link
                          key={i}
                          href="/video-landing"
                          className="block rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-[#00aa55]/50 transition-all group"
                        >
                          <div className="aspect-video bg-gradient-to-br from-[#00aa55]/20 to-[#ff2f55]/20 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-14 h-14 rounded-full bg-[#00aa55]/90 flex items-center justify-center">
                                <Play size={20} className="text-black ml-1" fill="black" />
                              </div>
                            </div>
                            <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-xs">
                              {video.duration}
                            </div>
                          </div>
                          <div className="p-5">
                            <span className="text-xs text-[#00aa55] uppercase tracking-wider">
                              {video.category}
                            </span>
                            <h3 className="font-FoundersGrotesk text-lg font-medium mt-2 group-hover:text-[#00aa55] transition-colors">
                              {video.title}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {activeTab === "updates" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { tag: "Participation", title: "Public hearings scheduled for FY 2026/27", date: "Feb 10, 2026" },
                        { tag: "New Report", title: "County Budget Analysis now available", date: "Feb 5, 2026" },
                        { tag: "Training", title: "Youth Budget Training registrations open", date: "Jan 28, 2026" },
                        { tag: "Event", title: "Budget literacy workshop in Nakuru", date: "Jan 20, 2026" },
                      ].map((update, i) => (
                        <Link
                          key={i}
                          href="/stories"
                          className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-[#00aa55]/50 transition-all group"
                        >
                          <span className="px-2 py-1 bg-[#00aa55]/20 text-[#00aa55] text-xs rounded uppercase tracking-wider whitespace-nowrap">
                            {update.tag}
                          </span>
                          <div>
                            <h3 className="font-FoundersGrotesk font-medium group-hover:text-[#00aa55] transition-colors">
                              {update.title}
                            </h3>
                            <p className="text-white/50 text-sm mt-1">{update.date}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* WHAT YOU CAN DO SECTION */}
          <section className="padding-x py-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold">
                  What you can do today
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Simplified Reports",
                    desc: "Key takeaways from major budget documents—fast, clear, shareable.",
                    cta: "Browse Reports",
                    href: "/budget-simplified",
                  },
                  {
                    title: "Budget Analysis",
                    desc: "What changed, what it means, and what to watch—national, county, sector.",
                    cta: "Explore Analysis",
                    href: "/budget-simplified",
                  },
                  {
                    title: "Budget Tracker",
                    desc: "Follow selected lines from allocation → release → delivery (where visible).",
                    cta: "Open Tracker",
                    href: "/tracker",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl bg-white/5 border border-white/10 p-8"
                  >
                    <h3 className="font-FoundersGrotesk text-xl font-medium">{item.title}</h3>
                    <p className="font-NeueMontreal text-white/60 mt-3">{item.desc}</p>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 mt-5 text-[#00aa55] font-medium"
                    >
                      {item.cta} <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* TAKE ACTION THIS WEEK */}
          <section className="padding-x py-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl bg-gradient-to-br from-[#00aa55]/15 via-[#0a0a0a] to-[#00aa55]/15 border border-white/10 p-10 text-center"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[#00aa55]">
                  Take Action This Week
                </span>
                <h2 className="font-FoundersGrotesk text-2xl lg:text-3xl font-semibold mt-3">
                  Pick one action—start in minutes.
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-[#00cc66] transition-colors"
                  >
                    Join a Training
                  </Link>
                  <Link
                    href="/participate"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/20 rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    Use Submission Template
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/20 rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    Join a County Chapter
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* BUDGET REPORTS SECTION */}
          <section className="padding-x py-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[#00aa55]">
                  Budget Reports
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold mt-2">
                  Simplified Reports
                </h2>
                <p className="font-NeueMontreal text-white/60 mt-4 max-w-2xl mx-auto">
                  Explore short briefs from major budget documents. Uncover what changed, what it means, what to do next.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Budget Policy Statement", category: "National" },
                  { title: "Estimates of Revenue & Expenditure", category: "National" },
                  { title: "Finance Bill", category: "National" },
                  { title: "County Budget Estimates", category: "County" },
                  { title: "County Fiscal Strategy Paper", category: "County" },
                  { title: "Appropriation Act", category: "National" },
                  { title: "Audit Highlights", category: "Oversight" },
                  { title: "Budget at a Glance", category: "County" },
                ].map((report, i) => (
                  <Link
                    key={i}
                    href="/budget-simplified"
                    className="block rounded-xl bg-white/5 border border-white/10 p-5 hover:border-[#00aa55]/50 transition-all group"
                  >
                    <span className="text-xs text-white/50 uppercase tracking-wider">
                      {report.category}
                    </span>
                    <h3 className="font-FoundersGrotesk font-medium mt-2 group-hover:text-[#00aa55] transition-colors">
                      {report.title}
                    </h3>
                  </Link>
                ))}
              </div>

              {/* CTA Strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mt-10"
              >
                <p className="font-NeueMontreal text-white/70 mb-4">
                  Need a brief for your county or sector?
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00aa55] text-black rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-[#00cc66] transition-colors"
                  >
                    Request a Report
                  </Link>
                  <Link
                    href="/participate"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    Take Action
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* BUDGET INSIGHTS SECTION */}
          <section className="padding-x py-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[#00aa55]">
                  Budget Insights
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold mt-2">
                  Budget Insights
                </h2>
                <p className="font-NeueMontreal text-white/60 mt-4 max-w-2xl mx-auto">
                  National, county, and sector breakdowns built for clarity and accountability.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "National Analysis",
                    desc: "The big shifts explained simply, with youth implications.",
                    cta: "Explore",
                    href: "/budget-simplified",
                  },
                  {
                    title: "County Analysis",
                    desc: "County budgets shape daily life. Understand what's planned.",
                    cta: "Choose County",
                    href: "/budget-simplified",
                  },
                  {
                    title: "Sector Analysis",
                    desc: "What Kenya is prioritising and what outcomes to demand.",
                    cta: "Explore",
                    href: "/budget-simplified",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl bg-white/5 border border-white/10 p-8"
                  >
                    <h3 className="font-FoundersGrotesk text-xl font-medium">{item.title}</h3>
                    <p className="font-NeueMontreal text-white/60 mt-3">{item.desc}</p>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 mt-5 text-[#00aa55] font-medium"
                    >
                      {item.cta} <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* BUDGET TRACKER SECTION */}
          <section className="padding-x py-16">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[#00aa55]">
                  Budget Tracker
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold mt-2">
                  Track delivery, not promises.
                </h2>
                <p className="font-NeueMontreal text-white/60 mt-4 max-w-xl mx-auto">
                  Follow selected lines from allocation → release → delivery (where visible).
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Link
                    href="/tracker"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-[#00cc66] transition-colors"
                  >
                    Open Tracker
                  </Link>
                  <Link
                    href="/participate"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    Submit a Tip
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* LEARN SECTION */}
          <section className="padding-x py-16">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[#00aa55]">
                  Learn
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold mt-2">
                  Budget 101
                </h2>
                <p className="font-NeueMontreal text-white/60 mt-4 max-w-xl mx-auto">
                  Practical lessons designed for Kenyan youth; precise and usable.
                </p>

                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  {["Basics", "Budget Cycle", "Roles", "Reading Tables", "Participation", "Tracking"].map(
                    (module, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-NeueMontreal"
                      >
                        {module}
                      </span>
                    )
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-[#00cc66] transition-colors"
                  >
                    Start Learning
                  </Link>
                  <Link
                    href="/budget-simplified"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    View Reports
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* HOME CTA STRIP */}
          <section className="padding-x py-12">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center"
              >
                <h2 className="font-FoundersGrotesk text-2xl font-semibold">
                  Follow the Budget. Find the Story.
                </h2>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00aa55] text-black rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-[#00cc66] transition-colors"
                  >
                    Subscribe
                  </Link>
                  <Link
                    href="/budget-simplified"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    View Latest Report
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <MainFooter />
      </div>
    </>
  );
}
