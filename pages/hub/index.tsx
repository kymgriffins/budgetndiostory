"use client";

import { MainFooter, NavbarLanding, YouTubePlayer } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  Globe,
  Heart,
  MapPin,
  Play,
  Search,
  Share2,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

/**
 * Budget Ndio Story - Hub Page - ULTIMATE VERSION
 * The BEST hub experience with premium animations, interactivity, and social proof
 */

type TabType = "stories" | "videos" | "updates";

type VideoCategory = "all" | "basics" | "finance-bill" | "national" | "county" | "sector" | "tracker-stories";

interface VideoItem {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnail?: string;
  videoUrl: string;
  category: VideoCategory;
  date: string;
  views: number;
  likes: number;
  isPlaceholder?: boolean;
  requestedTopic?: string;
}

// Sample video data - enhanced with more engaging titles
const sampleVideos: VideoItem[] = [
  {
    id: 1,
    title: "What is the Finance Bill? 60-sec Explainer 💰",
    description: "Breaking down the Finance Bill in under 1 minute. Learn what it means for your daily life.",
    duration: "1:02",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "finance-bill",
    date: "2026-02-10",
    views: 12450,
    likes: 892,
  },
  {
    id: 2,
    title: "Kenya's Budget in 2 Minutes 📊",
    description: "How does money flow from Treasury to your county? Watch and learn!",
    duration: "2:15",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "basics",
    date: "2026-02-08",
    views: 28930,
    likes: 2105,
  },
  {
    id: 3,
    title: "Health Budget 2026: Where's the Money? 🏥",
    description: "Key takeaways from the new health sector allocation and what it means for you.",
    duration: "3:45",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "national",
    date: "2026-02-05",
    views: 8450,
    likes: 567,
  },
  {
    id: 4,
    title: "County CFSP Explained - Ruiru Example 🏘️",
    description: "Understanding Ruiru's County Fiscal Strategy Paper and what changed this year.",
    duration: "4:20",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "county",
    date: "2026-02-01",
    views: 5230,
    likes: 341,
  },
  {
    id: 5,
    title: "Education Sector: Budget Cuts Explained 📚",
    description: "What the budget cuts mean for universities and TVET institutions.",
    duration: "5:10",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "sector",
    date: "2026-01-28",
    views: 9870,
    likes: 723,
  },
  {
    id: 6,
    title: "Tracking Road Projects: From Budget to Tarmac 🛣️",
    description: "Following KSh 500M allocated to rural roads in Kiambu County.",
    duration: "6:30",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "tracker-stories",
    date: "2026-01-25",
    views: 6720,
    likes: 489,
  },
  {
    id: 7,
    title: "Coming Soon: Agriculture Budget Explainer 🌾",
    description: "Request this topic or suggest your own!",
    duration: "--:--",
    videoUrl: "#",
    category: "sector",
    date: "2026-03-01",
    views: 0,
    likes: 0,
    isPlaceholder: true,
    requestedTopic: "Agriculture Budget",
  },
  {
    id: 8,
    title: "Coming Soon: Water & Sanitation 💧",
    description: "Be the first to know when this drops!",
    duration: "--:--",
    videoUrl: "#",
    category: "sector",
    date: "2026-03-15",
    views: 0,
    likes: 0,
    isPlaceholder: true,
    requestedTopic: "Water Budget",
  },
];

const videoCategories: { id: VideoCategory; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "🎬" },
  { id: "basics", label: "Basics", emoji: "📖" },
  { id: "finance-bill", label: "Finance Bill", emoji: "💰" },
  { id: "national", label: "National", emoji: "🇰🇪" },
  { id: "county", label: "County", emoji: "🏘️" },
  { id: "sector", label: "Sector", emoji: "📊" },
  { id: "tracker-stories", label: "Tracker", emoji: "🔍" },
];

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Helper to format view counts
const formatViews = (views: number) => {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
};

// Video Card with Hover Preview
function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  if (video.isPlaceholder) {
    return (
      <Link
        href="/contact"
        className="block rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-[#00aa55]/50 transition-all group"
      >
        <div className="aspect-video bg-gradient-to-br from-[#00aa55]/10 to-[#ff2f55]/10 relative flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#00aa55]/20 flex items-center justify-center mx-auto mb-2">
              <span className="text-3xl">🔔</span>
            </div>
            <p className="text-white/50 text-sm font-NeueMontreal">Coming Soon</p>
          </div>
          {video.requestedTopic && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#00aa55]/30 text-[#00aa55] text-xs font-medium">
              🔎 {video.requestedTopic}
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-FoundersGrotesk text-lg font-medium group-hover:text-[#00aa55] transition-colors">
            {video.title}
          </h3>
          <p className="font-NeueMontreal text-white/50 text-sm mt-2">{video.description}</p>
          <div className="flex items-center gap-2 mt-3 text-xs text-[#00aa55]">
            <span>Request this topic →</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={video.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-[#00aa55]/50 transition-all group"
      >
        <div className="aspect-video bg-gradient-to-br from-[#00aa55]/20 via-[#00aa55]/10 to-[#ff2f55]/20 relative group-hover:scale-[1.02] transition-transform duration-300">
          {/* Animated play button on hover */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1.1 : 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#00aa55]/90 flex items-center justify-center shadow-lg shadow-[#00aa55]/30 group-hover:scale-110 transition-transform duration-300">
              <Play size={20} className="text-black ml-1" fill="black" />
            </div>
          </motion.div>
          
          {/* Glow effect on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-[#00aa55]/20 to-transparent pointer-events-none"
          />
          
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-xs font-medium">
            {video.duration}
          </div>
          <div className="absolute top-3 left-3 flex gap-1">
            <span className="px-2 py-1 rounded bg-black/50 backdrop-blur-sm text-xs text-white/80">
              {videoCategories.find(c => c.id === video.category)?.emoji} {videoCategories.find(c => c.id === video.category)?.label}
            </span>
            {video.views >= 5000 && (
              <span className="px-2 py-1 rounded bg-[#ff2f55]/80 backdrop-blur-sm text-xs text-white flex items-center gap-1">
                🔥 Trending
              </span>
            )}
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="font-FoundersGrotesk text-lg font-medium group-hover:text-[#00aa55] transition-colors line-clamp-2">
            {video.title}
          </h3>
          <p className="font-NeueMontreal text-white/50 text-sm mt-2 line-clamp-2">
            {video.description}
          </p>
          
          <div className="flex items-center gap-4 mt-4 text-xs text-white/40">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{formatViews(video.views)} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={14} />
              <span>{formatViews(video.likes)}</span>
            </div>
            <div className="flex items-center gap-1 ml-auto hover:text-[#00aa55] transition-colors cursor-pointer">
              <Share2 size={14} />
              <span>Share</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Hub() {
  const [activeTab, setActiveTab] = useState<TabType>("stories");
  const [videoCategory, setVideoCategory] = useState<VideoCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [year] = useState(2026);

  // Filter videos by category and search
  const filteredVideos = sampleVideos
    .filter(v => videoCategory === "all" || v.category === videoCategory)
    .filter(v => 
      searchQuery === "" || 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
          {/* ULTIMATE HERO SECTION */}
          <section className="relative pt-32 pb-24 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#00aa55]/10 to-transparent blur-3xl"
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#ff2f55]/10 to-transparent blur-3xl"
              />
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMCAwaDFWNDBIMHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvZz48L3N2Zz4=')] opacity-30" />
            </div>

            <div className="relative max-w-5xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                >
                  <Zap size={14} className="text-[#00aa55]" />
                  <span className="text-sm font-NeueMontreal text-white/70">Kenya's #1 Budget Platform</span>
                  <span className="w-2 h-2 rounded-full bg-[#00aa55] animate-pulse" />
                </motion.div>

                <h1 className="font-FoundersGrotesk text-[clamp(40px,7vw,80px)] font-bold tracking-tight leading-[1.05]">
                  Follow the Budget.
                  <br />
                  <span className="bg-gradient-to-r from-[#00aa55] via-[#00cc66] to-[#00ff85] bg-clip-text text-transparent">
                    Find the Story.
                  </span>
                </h1>
                
                <p className="font-NeueMontreal text-lg text-white/70 mt-6 max-w-2xl mx-auto leading-relaxed">
                  We turn national and county budgets into clear insights, practical analysis, and trackable evidence to enhance youth participation and demand accountability from leaders.
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/50 font-NeueMontreal">
                  <span className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-[#00aa55]" />
                    Plain language
                  </span>
                  <span className="flex items-center gap-2">
                    <Globe size={16} className="text-[#00aa55]" />
                    Source-linked
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={16} className="text-[#00aa55]" />
                    Youth-first
                  </span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap justify-center gap-4 mt-10">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/budget-simplified"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-[#00aa55] text-black rounded-full font-NeueMontreal font-medium uppercase tracking-wider hover:bg-[#00cc66] transition-colors shadow-lg shadow-[#00aa55]/25"
                    >
                      View Latest Report <ArrowRight size={18} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/participate"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-NeueMontreal font-medium uppercase tracking-wider hover:bg-white/20 transition-colors"
                    >
                      Take Action
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative max-w-4xl mx-auto mt-16 px-6"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Budget Lines Tracked", value: 2500, suffix: "+" },
                  { label: "Youth Engaged", value: 50000, suffix: "+" },
                  { label: "Counties Covered", value: 47, suffix: "" },
                  { label: "Reports Published", value: 120, suffix: "+" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="text-center p-4 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="text-2xl md:text-3xl font-FoundersGrotesk font-bold text-[#00aa55]">
                      <AnimatedCounter end={stat.value} />{stat.suffix}
                    </div>
                    <div className="text-xs text-white/50 mt-1 font-NeueMontreal">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* START HERE SECTION - Enhanced */}
          <section className="padding-x py-20">
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
                  New to Budgets?
                </h2>
                <p className="font-NeueMontreal text-white/60 mt-3 max-w-xl mx-auto">
                  Start here if you want to understand how budgets work and why they matter to you.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <BookOpen size={24} />,
                    title: "Budget Basics",
                    desc: "Learn the fundamentals of how budgets work",
                    href: "/learn",
                    color: "#00aa55",
                    steps: "3 lessons",
                  },
                  {
                    icon: <MapPin size={24} />,
                    title: "National vs County",
                    desc: "Understand the difference between national and county budgets",
                    href: "/learn",
                    color: "#00cc66",
                    steps: "5 lessons",
                  },
                  {
                    icon: <Calendar size={24} />,
                    title: "Budget Calendar",
                    desc: "Know when key budget decisions happen",
                    href: "/learn",
                    color: "#00aa55",
                    steps: "4 lessons",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link
                      href={item.href}
                      className="block rounded-2xl bg-white/5 border border-white/10 p-8 hover:border-[#00aa55]/50 transition-all group h-full relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 px-3 py-1 bg-white/5 text-white/40 text-xs rounded-bl-lg">
                        {item.steps}
                      </div>
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <div style={{ color: item.color }}>{item.icon}</div>
                      </div>
                      <h3 className="font-FoundersGrotesk text-xl font-medium group-hover:text-[#00aa55] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-NeueMontreal text-white/60 mt-3">
                        {item.desc}
                      </p>
                      <div className="flex items-center gap-1 mt-5 text-[#00aa55] text-sm font-medium">
                        Start learning <ChevronRight size={16} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-white/20 transition-colors"
                >
                  Browse All Lessons
                </Link>
              </div>
            </div>
          </section>

          {/* FEATURED STORY SHOWCASE */}
          <section className="padding-x py-20">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[#ff2f55]">
                  ⭐ Featured Story
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold mt-2">
                  This Week's Spotlight
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
                <div className="h-[400px] bg-gradient-to-br from-[#00aa55]/20 via-[#0a0a0a] to-[#ff2f55]/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-[#00aa55]/20 flex items-center justify-center backdrop-blur-sm">
                      <Play size={40} className="text-white ml-2" fill="white" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-[#ff2f55] text-white text-xs rounded-full font-medium">
                      🔥 Trending Now
                    </span>
                    <span className="text-white/60 text-sm">Feb 10, 2026</span>
                  </div>
                  <h3 className="font-FoundersGrotesk text-2xl lg:text-3xl font-semibold mb-2">
                    Health Budget 2026: Where's the Money Going?
                  </h3>
                  <p className="font-NeueMontreal text-white/70 max-w-xl mb-4">
                    Key takeaways from the new health sector allocation and what it means for Kenyan families. We break down KSh 120B in simple terms.
                  </p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal font-medium hover:bg-[#00cc66] transition-colors"
                  >
                    Read Full Story <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* LATEST SECTION - Stories | Videos | Updates */}
          <section className="padding-x py-20">
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
                    Latest Content
                  </span>
                  <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold mt-2">
                    Explore & Learn
                  </h2>
                </div>
              </motion.div>

              {/* Tabs */}
              <div className="flex gap-2 mb-8 border-b border-white/10">
                {(["stories", "videos", "updates"] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-NeueMontreal uppercase text-sm tracking-wider transition-colors relative ${
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "stories" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Health Budget 2026",
                          desc: "Key takeaways from the new health sector allocation",
                          category: "National",
                          featured: true,
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
                          className="block rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-[#00aa55]/50 transition-all group relative overflow-hidden"
                        >
                          {story.featured && (
                            <div className="absolute top-4 right-4">
                              <Star size={16} className="text-[#ff2f55] fill-[#ff2f55]" />
                            </div>
                          )}
                          <span className="text-xs text-[#00aa55] uppercase tracking-wider">
                            {story.category}
                          </span>
                          <h3 className="font-FoundersGrotesk text-lg font-medium mt-3 group-hover:text-[#00aa55] transition-colors">
                            {story.title}
                          </h3>
                          <p className="font-NeueMontreal text-white/60 text-sm mt-2">
                            {story.desc}
                          </p>
                          <div className="flex items-center gap-2 mt-4 text-xs text-white/40">
                            <Clock size={14} />
                            <span>5 min read</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {activeTab === "videos" && (
                    <div className="space-y-8">
                      {/* Search Bar */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                      >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                        <input
                          type="text"
                          placeholder="Search videos..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 font-NeueMontreal focus:outline-none focus:border-[#00aa55]/50 transition-colors"
                        />
                      </motion.div>

                      {/* Category Filter */}
                      <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        <div className="flex gap-2 min-w-max">
                          {videoCategories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => setVideoCategory(cat.id)}
                              className={`px-5 py-2.5 rounded-full text-sm font-NeueMontreal uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                                videoCategory === cat.id
                                  ? "bg-[#00aa55] text-black"
                                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                              }`}
                            >
                              <span className="mr-1.5">{cat.emoji}</span>
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Video Results Count */}
                      <div className="flex items-center justify-between text-sm text-white/50">
                        <span>Showing {filteredVideos.length} videos</span>
                        {searchQuery && (
                          <button 
                            onClick={() => setSearchQuery("")}
                            className="text-[#00aa55] hover:underline"
                          >
                            Clear search
                          </button>
                        )}
                      </div>

                      {/* Video Grid */}
                      <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                      >
                        <AnimatePresence mode="popLayout">
                          {filteredVideos.map((video, index) => (
                            <VideoCard key={video.id} video={video} index={index} />
                          ))}
                        </AnimatePresence>
                      </motion.div>

                      {/* CTA Strip */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#00aa55]/10 via-[#0a0a0a] to-[#00aa55]/10 border border-white/10 text-center"
                      >
                        <p className="font-NeueMontreal text-white/70 text-lg mb-4">
                          🎥 Want us to cover a specific topic?
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-[#00cc66] transition-colors"
                          >
                            Request a Topic
                          </Link>
                          <Link
                            href="/learn"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/20 transition-colors"
                          >
                            Join Training
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  )}

                  {activeTab === "updates" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { tag: "Participation", title: "Public hearings scheduled for FY 2026/27", date: "Feb 10, 2026", icon: "📢" },
                        { tag: "New Report", title: "County Budget Analysis now available", date: "Feb 5, 2026", icon: "📄" },
                        { tag: "Training", title: "Youth Budget Training registrations open", date: "Jan 28, 2026", icon: "📚" },
                        { tag: "Event", title: "Budget literacy workshop in Nakuru", date: "Jan 20, 2026", icon: "🎯" },
                      ].map((update, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Link
                            href="/stories"
                            className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-[#00aa55]/50 transition-all group"
                          >
                            <span className="text-2xl">{update.icon}</span>
                            <div className="flex-1">
                              <span className="px-2 py-1 bg-[#00aa55]/20 text-[#00aa55] text-xs rounded uppercase tracking-wider">
                                {update.tag}
                              </span>
                              <h3 className="font-FoundersGrotesk font-medium mt-2 group-hover:text-[#00aa55] transition-colors">
                                {update.title}
                              </h3>
                              <p className="text-white/50 text-sm mt-1">{update.date}</p>
                            </div>
                            <ChevronRight size={20} className="text-white/30 group-hover:text-[#00aa55] transition-colors" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* WHAT YOU CAN DO SECTION - Enhanced */}
          <section className="padding-x py-20">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[#00aa55]">
                  Take Action
                </span>
                <h2 className="font-FoundersGrotesk text-3xl lg:text-4xl font-semibold mt-3">
                  What you can do today
                </h2>
                <p className="font-NeueMontreal text-white/60 mt-4 max-w-xl mx-auto">
                  Your voice matters. Here's how you can participate in Kenya's budget process.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Simplified Reports",
                    desc: "Key takeaways from major budget documents—fast, clear, shareable.",
                    cta: "Browse Reports",
                    href: "/budget-simplified",
                    icon: <FileText size={24} />,
                  },
                  {
                    title: "Budget Analysis",
                    desc: "What changed, what it means, and what to watch—national, county, sector.",
                    cta: "Explore Analysis",
                    href: "/budget-simplified",
                    icon: <TrendingUp size={24} />,
                  },
                  {
                    title: "Budget Tracker",
                    desc: "Follow selected lines from allocation → release → delivery (where visible).",
                    cta: "Open Tracker",
                    href: "/tracker",
                    icon: <MapPin size={24} />,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="rounded-2xl bg-white/5 border border-white/10 p-8 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#00aa55]/20 flex items-center justify-center mb-5 text-[#00aa55] group-hover:bg-[#00aa55] group-hover:text-black transition-colors">
                      {item.icon}
                    </div>
                    <h3 className="font-FoundersGrotesk text-xl font-medium">{item.title}</h3>
                    <p className="font-NeueMontreal text-white/60 mt-3">{item.desc}</p>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 mt-5 text-[#00aa55] font-medium group-hover:gap-2 transition-all"
                    >
                      {item.cta} <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* TAKE ACTION THIS WEEK - Enhanced */}
          <section className="padding-x py-20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl bg-gradient-to-br from-[#00aa55]/20 via-[#0a0a0a] to-[#ff2f55]/20 border border-white/10 p-10 text-center relative overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#00aa55]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#ff2f55]/10 rounded-full blur-3xl" />
                
                <span className="text-xs uppercase tracking-[0.2em] text-[#00aa55] relative z-10">
                  Take Action This Week
                </span>
                <h2 className="font-FoundersGrotesk text-2xl lg:text-3xl font-semibold mt-3 relative z-10">
                  Pick one action—start in minutes.
                </h2>
                <p className="font-NeueMontreal text-white/60 mt-3 max-w-lg mx-auto relative z-10">
                  Join thousands of Kenyan youth who are actively participating in the budget process.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8 relative z-10">
                  <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-[#00cc66] transition-colors"
                  >
                    Join a Training
                  </Link>
                  <Link
                    href="/participate"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    Use Submission Template
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    Join a County Chapter
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* BUDGET REPORTS SECTION */}
          <section className="padding-x py-20">
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
                  { title: "Budget Policy Statement", category: "National", icon: "📊" },
                  { title: "Estimates of Revenue & Expenditure", category: "National", icon: "💵" },
                  { title: "Finance Bill", category: "National", icon: "⚖️" },
                  { title: "County Budget Estimates", category: "County", icon: "🏘️" },
                  { title: "County Fiscal Strategy Paper", category: "County", icon: "📋" },
                  { title: "Appropriation Act", category: "National", icon: "✅" },
                  { title: "Audit Highlights", category: "Oversight", icon: "🔍" },
                  { title: "Budget at a Glance", category: "County", icon: "👁️" },
                ].map((report, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link
                      href="/budget-simplified"
                      className="block rounded-xl bg-white/5 border border-white/10 p-5 hover:border-[#00aa55]/50 transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{report.icon}</span>
                        <span className="text-xs text-white/50 uppercase tracking-wider">
                          {report.category}
                        </span>
                      </div>
                      <h3 className="font-FoundersGrotesk font-medium group-hover:text-[#00aa55] transition-colors">
                        {report.title}
                      </h3>
                    </Link>
                  </motion.div>
                ))}
              </div>

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
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full font-NeueMontreal uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    Take Action
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* BUDGET INSIGHTS SECTION */}
          <section className="padding-x py-20">
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
                  Deep Dives
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
                    stat: "47 sectors",
                  },
                  {
                    title: "County Analysis",
                    desc: "County budgets shape daily life. Understand what's planned.",
                    cta: "Choose County",
                    href: "/budget-simplified",
                    stat: "47 counties",
                  },
                  {
                    title: "Sector Analysis",
                    desc: "What Kenya is prioritising and what outcomes to demand.",
                    cta: "Explore",
                    href: "/budget-simplified",
                    stat: "12 sectors",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl bg-white/5 border border-white/10 p-8 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 px-3 py-1 bg-white/5 text-white/40 text-xs rounded-bl-lg">
                      {item.stat}
                    </div>
                    <h3 className="font-FoundersGrotesk text-xl font-medium">{item.title}</h3>
                    <p className="font-NeueMontreal text-white/60 mt-3">{item.desc}</p>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 mt-5 text-[#00aa55] font-medium group-hover:gap-2 transition-all"
                    >
                      {item.cta} <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* NEWSLETTER SIGNUP */}
          <section className="padding-x py-20">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl bg-gradient-to-br from-[#00aa55]/10 via-[#0a0a0a] to-[#00aa55]/10 border border-white/10 p-10 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#00aa55]/20 flex items-center justify-center mx-auto mb-6">
                  <Zap size={32} className="text-[#00aa55]" />
                </div>
                <h2 className="font-FoundersGrotesk text-2xl lg:text-3xl font-semibold">
                  Stay in the Loop
                </h2>
                <p className="font-NeueMontreal text-white/60 mt-3 max-w-lg mx-auto">
                  Get budget updates, new reports, and action alerts delivered to your inbox weekly.
                </p>
                <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 font-NeueMontreal focus:outline-none focus:border-[#00aa55]/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-[#00aa55] text-black rounded-full font-NeueMontreal font-medium uppercase tracking-wider hover:bg-[#00cc66] transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-white/40 text-sm mt-4">
                  No spam. Unsubscribe anytime.
                </p>
              </motion.div>
            </div>
          </section>

          {/* BUDGET TRACKER SECTION */}
          <section className="padding-x py-20">
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
          <section className="padding-x py-20">
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
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="px-5 py-3 bg-white/10 border border-white/20 rounded-full text-sm font-NeueMontreal hover:bg-white/20 hover:border-[#00aa55]/50 transition-colors cursor-pointer"
                      >
                        {module}
                      </motion.span>
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

          {/* FINAL CTA */}
          <section className="padding-x py-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-10 text-center"
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
