"use client";

import { NavbarLanding } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Mail,
  MapPin,
  Moon,
  Sun,
  Users,
  Video
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const stories = [
  {
    id: 1,
    title: "Where did the health budget go?",
    excerpt:
      "We traced KSh 12 billion allocated for county health facilities. Here's what we found on the ground versus what's in the records.",
    category: "Health",
    readTime: "8 min read",
    date: "Jan 15, 2026",
    thumbnail: "bg-gradient-to-br from-[#ef4444]/40 to-[#dc2626]/20",
  },
  {
    id: 2,
    title: "The hidden costs of free primary education",
    excerpt:
      "Despite the government's free primary education policy, parents still pay hidden costs. Our investigation reveals the truth.",
    category: "Education",
    readTime: "12 min read",
    date: "Jan 8, 2026",
    thumbnail: "bg-gradient-to-br from-[#3b82f6]/40 to-[#2563eb]/20",
  },
  {
    id: 3,
    title: "Tracking health equipment in Nairobi County",
    excerpt:
      "We followed the procurement trail of medical equipment purchased for Nairobi hospitals. Not everything adds up.",
    category: "Health",
    readTime: "10 min read",
    date: "Dec 28, 2025",
    thumbnail: "bg-gradient-to-br from-[#10b981]/40 to-[#059669]/20",
  },
  {
    id: 4,
    title: "Understanding the county budget process",
    excerpt:
      "A step-by-step guide to how county budgets are created, approved, and where citizens can participate.",
    category: "Guide",
    readTime: "15 min read",
    date: "Dec 20, 2025",
    thumbnail: "bg-gradient-to-br from-[#8b5cf6]/40 to-[#7c3aed]/20",
  },
  {
    id: 5,
    title: "Road construction: Promise vs Reality",
    excerpt:
      "We visited 10 road projects funded by the national budget. Here's our field report on progress and delays.",
    category: "Infrastructure",
    readTime: "9 min read",
    date: "Dec 15, 2025",
    thumbnail: "bg-gradient-to-br from-[#f59e0b]/40 to-[#d97706]/20",
  },
  {
    id: 6,
    title: "Water projects that never materialized",
    excerpt:
      "County water budgets show allocations for projects that exist only on paper. Our verification team investigates.",
    category: "Water",
    readTime: "11 min read",
    date: "Dec 8, 2025",
    thumbnail: "bg-gradient-to-br from-[#06b6d4]/40 to-[#0891b2]/20",
  },
];

const categories = [
  "All",
  "Health",
  "Education",
  "Infrastructure",
  "Water",
  "Guide",
];

export default function EduStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDark, setIsDark] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [filteredStories, setFilteredStories] = useState(stories);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredStories(stories);
    } else {
      setFilteredStories(
        stories.filter((s) => s.category === selectedCategory),
      );
    }
  }, [selectedCategory]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What are field reports?",
      answer:
        "Field reports are investigative pieces where our team visits project sites to verify if budget allocations match reality on the ground. We interview communities, take photos, and cross-reference with official records.",
    },
    {
      question: "How do you choose which stories to cover?",
      answer:
        "We prioritize stories based on public interest, budget significance, and verification feasibility. We also consider tips from citizens and emerging issues in public discourse.",
    },
    {
      question: "Can I contribute a field report?",
      answer:
        "Yes! We welcome citizen journalism. Contact us at hello@budgetndiostory.org if you have information about a budget project that needs investigation.",
    },
  ];

  return (
    <>
      <Head>
        <title>EduStories - Budget Ndio Story</title>
        <meta
          name="description"
          content="Educational stories and field reports to help you understand budgeting and financial management"
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
                  <Video size={16} className="text-[#ff2f55]" />
                  Field Reports & Stories
                </span>

                <h1 className="font-FoundersGrotesk text-4xl lg:text-6xl font-semibold tracking-tight uppercase">
                  Stories From{" "}
                  <span className="text-[#ff2f55]">The Ground</span>
                </h1>

                <p className="mt-4 text-lg font-NeueMontreal text-white/60 max-w-xl leading-relaxed">
                  Real stories from real communities. We visit project sites,
                  interview locals, and verify if your tax money is being spent
                  as promised.
                </p>

                <div className="mt-8 flex items-center gap-4 flex-wrap">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/90 transition-colors"
                  >
                    Read Latest Stories <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CATEGORY FILTER */}
          <section className="padding-x pb-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap gap-3"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-NeueMontreal font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-white text-black"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            </div>
          </section>

          {/* STORIES GRID */}
          <section className="padding-x py-8 pb-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story, i) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <Link
                      href="/blog"
                      className="block rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all group h-full"
                    >
                      <div className={`relative h-48 ${story.thumbnail}`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full text-xs font-NeueMontreal font-medium bg-black/50 backdrop-blur-sm text-white">
                            {story.category}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="text-xs font-NeueMontreal text-white/80">
                            {story.date}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-FoundersGrotesk text-lg font-medium text-white group-hover:text-[#ff2f55] transition-colors">
                          {story.title}
                        </h3>
                        <p className="mt-2 text-sm font-NeueMontreal text-white/60 leading-relaxed line-clamp-3">
                          {story.excerpt}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-sm font-NeueMontreal text-[#ff2f55]">
                          Read Report <ArrowRight size={14} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="padding-x py-16">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Our Process
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold tracking-tight mt-3">
                  From Numbers to Narratives
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: "01",
                    title: "Research",
                    desc: "We analyze budget documents, procurement records, and spending reports from national and county governments.",
                    icon: <FileText size={24} />,
                  },
                  {
                    step: "02",
                    title: "Verify",
                    desc: "Our team visits project sites, interviews local communities, and cross-references data with on-ground reality.",
                    icon: <Users size={24} />,
                  },
                  {
                    step: "03",
                    title: "Report",
                    desc: "We transform findings into accessible videos, articles, and interactive tools that empower citizens to act.",
                    icon: <Video size={24} />,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-xs font-NeueMontreal text-[#ff2f55] uppercase tracking-wider">
                      {item.step}
                    </span>
                    <div className="mt-4 mb-3 text-white/60">{item.icon}</div>
                    <h3 className="font-FoundersGrotesk text-xl font-medium">
                      {item.title}
                    </h3>
                    <p className="font-NeueMontreal text-white/60 mt-3 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
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
                    href="/learn"
                    className="text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    Learn
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
