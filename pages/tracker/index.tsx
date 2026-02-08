"use client";

import { NavbarLanding } from "@/components";
import unifiedTrackerData from "@/mockdata/tracker-unified.json";
import { UnifiedTrackerData } from "@/mockdata/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Mail,
  MapPin,
  Moon,
  Sun,
  TrendingUp
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Cast the imported JSON to the proper type
const trackerData = unifiedTrackerData as unknown as UnifiedTrackerData;

export default function Tracker() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"national" | "county">("national");
  const [isDark, setIsDark] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Get sectors from unified data based on tab
  const sectors = trackerData.sectors.filter(
    (sector) => sector.type === activeTab,
  );

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How accurate is this data?",
      answer:
        "We source our data from official government budget documents, procurement records, and public spending reports. We then verify this information through field visits and community interviews.",
    },
    {
      question: "How often is the tracker updated?",
      answer:
        "We update the tracker within 2 weeks of new budget releases from the National Treasury or County governments.",
    },
    {
      question: "Can I download the data?",
      answer:
        "Yes! All our data is available for download in CSV format for research and civic engagement purposes.",
    },
  ];

  return (
    <>
      <Head>
        <title>
          Budget Spending Breakdown - National vs County | Budget Ndio Story
        </title>
        <meta
          name="description"
          content="Explore Kenya's government spending breakdown between National and County budgets. See allocations for education, health, infrastructure, and more."
        />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      <div className="bg-[#0a0a0a] text-white min-h-screen">
        {/* Navigation */}
        <NavbarLanding />

        <main>
          {/* HERO */}
          <section className="padding-x pt-32 pb-12">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-NeueMontreal text-white/70 mb-6">
                  <TrendingUp size={16} className="text-[#00aa55]" />
                  Visual Budget Tracker
                </span>

                <h1 className="font-FoundersGrotesk text-4xl lg:text-6xl font-semibold tracking-tight uppercase">
                  See Where the <span className="text-[#00aa55]">Money</span>{" "}
                  Went
                </h1>

                <p className="mt-4 text-lg font-NeueMontreal text-white/60 max-w-xl leading-relaxed">
                  Not spreadsheets or audit reports. Just visual indicators of
                  what's allocated, in progress, completed, or stalled.
                </p>

                <div className="mt-8 flex items-center gap-4 flex-wrap">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-[#00cc66] transition-colors"
                  >
                    Explore Stories <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* SPENDING BREAKDOWN */}
          <section className="padding-x py-12">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="font-FoundersGrotesk text-2xl lg:text-3xl font-semibold uppercase">
                  Government Spending Breakdown
                </h2>
                <p className="mt-2 text-sm font-NeueMontreal text-white/60 max-w-lg">
                  Explore how Kenya's budget is allocated between National and
                  County governments. Click on cards for in-depth data.
                </p>
              </motion.div>

              {/* Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-4 mb-8 flex-wrap"
              >
                <button
                  onClick={() => setActiveTab("national")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-NeueMontreal font-medium transition-all ${
                    activeTab === "national"
                      ? "bg-[#1e40af] text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
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
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                  </svg>
                  National Government
                </button>
                <button
                  onClick={() => setActiveTab("county")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-NeueMontreal font-medium transition-all ${
                    activeTab === "county"
                      ? "bg-[#059669] text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
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
                      d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8m-2 0h2m-2 0h-2m-2 0h-2m-2 0h-2m-2 0H5m-2 0h2m0 0h2m0 0h2m0 0h2m0 0h2"
                    />
                  </svg>
                  County Government
                </button>
              </motion.div>

              {/* Tab Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mb-8 flex items-center gap-3"
              >
                <span className="text-xs font-NeueMontreal text-white/50 uppercase tracking-wider">
                  {activeTab === "national" ? "National" : "County"} Budget
                  Focus:
                </span>
                <span className="text-sm font-NeueMontreal text-white/80">
                  {activeTab === "national"
                    ? "High-level policy, major infrastructure, national security & debt servicing"
                    : "Local service delivery: health, agriculture, ECDE & last-mile infrastructure"}
                </span>
              </motion.div>

              {/* Sector Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-12">
                {sectors.map((sector, i) => (
                  <motion.div
                    key={sector.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    onClick={() =>
                      router.push(`/tracker/sector/${sector.slug}`)
                    }
                    className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        activeTab === "national"
                          ? "from-[#1e40af]/10 via-transparent to-transparent"
                          : "from-[#059669]/10 via-transparent to-transparent"
                      } transition-opacity duration-500 rounded-2xl`}
                    />

                    <div className="relative z-10 p-6 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                            activeTab === "national"
                              ? "bg-[#1e40af]/20"
                              : "bg-[#059669]/20"
                          }`}
                        >
                          {sector.icon}
                        </div>
                        <div className="text-right">
                          <p className="font-FoundersGrotesk text-2xl font-medium text-white">
                            {sector.budget}
                          </p>
                          <p className="text-xs font-NeueMontreal uppercase tracking-wider text-white/40 mt-1">
                            Total Allocation
                          </p>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-FoundersGrotesk text-xl font-medium text-white">
                          {sector.name}
                        </h3>
                        <div
                          className={`mt-3 w-12 h-1 rounded-full ${
                            activeTab === "national"
                              ? "bg-[#1e40af]"
                              : "bg-[#059669]"
                          }`}
                        />
                        <p className="mt-3 text-sm font-NeueMontreal text-white/60">
                          {sector.category} •{" "}
                          {activeTab === "national"
                            ? "Nationwide"
                            : "47 Counties"}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              activeTab === "national"
                                ? "bg-[#1e40af]"
                                : "bg-[#059669]"
                            }`}
                          />
                          <span className="text-xs font-NeueMontreal text-white/60 capitalize">
                            {sector.status.replace("-", " ")}
                          </span>
                        </div>
                        <span className="text-xs font-NeueMontreal text-white/40 flex items-center gap-1">
                          View Details <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/tracker/details/2024"
                  className="group rounded-2xl bg-gradient-to-br from-[#1e40af] to-[#3b82f6] border border-white/10 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-NeueMontreal uppercase tracking-wide mb-3">
                        📊 KENYA BUDGET 2024/25
                      </span>
                      <h3 className="font-FoundersGrotesk text-xl uppercase text-white">
                        Detailed Analytics
                      </h3>
                      <p className="text-sm font-NeueMontreal text-white/70 mt-2">
                        Explore Ksh 4.0T budget with pie charts, bar graphs, and
                        data insights.
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-NeueMontreal">
                    <span>Explore</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>

                <Link
                  href="/tracker/2000"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-NeueMontreal uppercase tracking-wide mb-3">
                        📅 HISTORICAL DATA
                      </span>
                      <h3 className="font-FoundersGrotesk text-xl uppercase text-white">
                        Browse by Year
                      </h3>
                      <p className="text-sm font-NeueMontreal text-white/60 mt-2">
                        View budget allocations from 2000 to present.
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <svg
                        className="w-6 h-6 text-white/60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm font-NeueMontreal">
                    <span>View All Years</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </Link>
              </div>
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
                    href="/blog"
                    className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Blog Stories
                  </Link>
                  <Link
                    href="/learn"
                    className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Learn
                  </Link>
                  <Link
                    href="/edustories"
                    className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Edu Stories
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
