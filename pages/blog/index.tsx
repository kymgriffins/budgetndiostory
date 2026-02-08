"use client";

import { NavbarLanding } from "@/components";
import { blogPosts, getFeaturedPosts } from "@/lib/blog-data";
import { CATEGORY_CONFIG } from "@/lib/blog-types";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Mail, MapPin, Moon, Phone, Sun } from "lucide-react";

// Get unique categories
const categories = Array.from(
  new Set(blogPosts.map((post) => post.category)),
).map((category) => ({
  id: category.toLowerCase(),
  label: category,
  ...CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG],
}));

export default function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedPosts, setDisplayedPosts] = useState(blogPosts);
  const [isDark, setIsDark] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const featuredPosts = getFeaturedPosts();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Filter posts based on category and search
  useEffect(() => {
    let filtered = blogPosts.filter((post) => post.status === "published");

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (post) =>
          post.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    setDisplayedPosts(filtered);
  }, [selectedCategory, searchQuery]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do you verify budget information?",
      answer:
        "Our team analyzes official budget documents, procurement records, and spending reports. We then cross-reference this data by visiting project sites and interviewing local communities.",
    },
    {
      question: "Can I contribute a story?",
      answer:
        "Yes! We welcome contributions from citizens, journalists, and researchers. Contact us at hello@budgetndiostory.org to discuss your story ideas.",
    },
    {
      question: "Is the content free to use?",
      answer:
        "Yes! All our content is freely available for educational and civic purposes. We encourage sharing with attribution to Budget Ndio Story.",
    },
  ];

  return (
    <>
      <Head>
        <title>Blog - Budget Ndio Story</title>
        <meta
          name="description"
          content="In-depth analysis, investigations, and opinions on Kenya's public budgets and spending."
        />
        <meta property="og:title" content="Blog - Budget Ndio Story" />
        <meta
          property="og:description"
          content="In-depth analysis, investigations, and opinions on Kenya's public budgets."
        />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      <div className="bg-[#0a0a0a] text-white min-h-screen">
        {/* Navigation */}
        <NavbarLanding />

        <main>
          {/* HERO SECTION */}
          <section className="padding-x pt-32 pb-12">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-NeueMontreal text-white/70 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#00aa55] animate-pulse" />
                  Latest Insights & Analysis
                </span>

                <h1 className="font-FoundersGrotesk text-4xl lg:text-6xl font-semibold tracking-tight uppercase">
                  Budget <span className="text-[#00aa55]">Stories</span>
                </h1>

                <p className="mt-4 text-lg font-NeueMontreal text-white/60 max-w-xl leading-relaxed">
                  Deep dives, investigations, and expert analysis on Kenya's
                  public finances and how they impact citizens.
                </p>

                {/* Search Bar */}
                <div className="mt-8 max-w-md">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-5 py-3 pr-12 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40">
                      🔍
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CATEGORY TABS */}
          <section className="padding-x pb-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-5 py-2.5 rounded-full text-sm font-NeueMontreal font-medium transition-all ${
                    selectedCategory === "all"
                      ? "bg-white text-black"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  📚 All Posts
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-NeueMontreal font-medium transition-all ${
                      selectedCategory === cat.id
                        ? "bg-white text-black"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </motion.div>
            </div>
          </section>

          {/* BLOG POSTS GRID */}
          <section className="padding-x py-8 pb-16">
            <div className="max-w-6xl mx-auto">
              {displayedPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedPosts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all group h-full"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_CONFIG[post.category as keyof typeof CATEGORY_CONFIG]?.color || "from-gray-400 to-gray-600"}`}
                          />
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 rounded-full text-xs font-NeueMontreal font-medium bg-black/50 backdrop-blur-sm text-white/90">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3 text-xs font-NeueMontreal text-white/40">
                            <span>
                              {new Date(
                                post.publishedAt || post.createdAt,
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="font-FoundersGrotesk text-lg font-medium text-white group-hover:text-[#00aa55] transition-colors">
                            {post.title}
                          </h3>
                          <p className="mt-2 text-sm font-NeueMontreal text-white/60 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="mt-4 flex items-center gap-2 flex-wrap">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-NeueMontreal px-2 py-1 rounded-full bg-white/5 text-white/50"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-sm font-NeueMontreal text-[#00aa55]">
                            Read More <ArrowRight size={14} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <span className="text-6xl mb-4 block">📭</span>
                  <h3 className="font-FoundersGrotesk text-2xl text-white/70 mb-2">
                    No articles found
                  </h3>
                  <p className="font-NeueMontreal text-white/50">
                    {searchQuery
                      ? `No results for "${searchQuery}". Try a different search term.`
                      : "No articles in this category yet."}
                  </p>
                </motion.div>
              )}
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

          {/* CTA Section */}
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
                  Have a story to share?
                </h2>
                <p className="font-NeueMontreal text-white/70 mt-4 max-w-xl mx-auto">
                  Contact us with your budget story ideas, tips, or partnership
                  opportunities.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/90 transition-colors whitespace-nowrap"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
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
