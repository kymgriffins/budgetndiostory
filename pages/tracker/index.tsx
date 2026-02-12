"use client";

import { NavbarLanding } from "@/components";
import unifiedTrackerData from "@/mockdata/tracker-unified.json";
import { UnifiedTrackerData } from "@/mockdata/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  Mail,
  MapPin,
  Map,
  Moon,
  Search,
  Share2,
  SlidersHorizontal,
  Sun,
  TrendingUp,
  Users,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Cast the imported JSON to the proper type
const trackerData = unifiedTrackerData as unknown as UnifiedTrackerData;

// Kenyan Counties
const kenyanCounties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet",
  "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
  "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga",
  "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia",
  "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi",
  "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River",
  "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu",
  "Vihiga", "Wajir", "West Pokot",
];

// Budget Milestones
const budgetMilestones = [
  { year: 2000, event: "Decentralization begins", icon: "🏛️" },
  { year: 2003, event: "POZA Act enacted", icon: "📜" },
  { year: 2010, event: "New Constitution", icon: "✨" },
  { year: 2013, event: "County Governments established", icon: "🗺️" },
  { year: 2018, event: "Big Four Agenda launched", icon: "🎯" },
  { year: 2024, event: "Ksh 4.0T Budget", icon: "💰" },
];

// Historical Trends Data
const historicalTrends = [
  { year: 2000, national: 310, county: 45 },
  { year: 2005, national: 420, county: 65 },
  { year: 2010, national: 780, county: 120 },
  { year: 2015, national: 1200, county: 280 },
  { year: 2020, national: 2100, county: 420 },
  { year: 2024, national: 3500, county: 520 },
];

// Sample Projects for Search
const sampleProjects = [
  {
    id: "road-001",
    title: "Nairobi-Mombasa Highway Expansion",
    sector: "Infrastructure",
    county: "Mombasa",
    budget: "Ksh 120B",
    status: "In Progress",
    progress: 65,
  },
  {
    id: "health-001",
    title: "County Hospital Equipment Upgrade",
    sector: "Health",
    county: "Kakamega",
    budget: "Ksh 2.5B",
    status: "Completed",
    progress: 100,
  },
  {
    id: "edu-001",
    title: "ECDE Classroom Construction",
    sector: "Education",
    county: "Nairobi",
    budget: "Ksh 800M",
    status: "In Progress",
    progress: 80,
  },
  {
    id: "agri-001",
    title: "Irrigation Scheme Development",
    sector: "Agriculture",
    county: "Turkana",
    budget: "Ksh 1.2B",
    status: "Allocated",
    progress: 0,
  },
  {
    id: "water-001",
    title: "Rural Water Supply Project",
    sector: "Water",
    county: "West Pokot",
    budget: "Ksh 450M",
    status: "Stalled",
    progress: 30,
  },
];

export default function Tracker() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"national" | "county">("national");
  const [isDark, setIsDark] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedYear, setSelectedYear] = useState(2024);
  const [searchQuery, setSearchQuery] = useState("");
  const [showYearSlider, setShowYearSlider] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

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

  // Filter projects based on search
  const filteredProjects = sampleProjects.filter((project) => {
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.county.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
    {
      question: "How do I report an issue with a project?",
      answer:
        "Use the 'Report Issue' button on any project detail page to submit information. Our team verifies submissions before updating the tracker.",
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
                  <button
                    onClick={() =>
                      document
                        .getElementById("search-section")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00aa55] text-black rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-[#00cc66] transition-colors"
                  >
                    <Search size={14} />
                    Search Projects
                  </button>
                  <button
                    onClick={() =>
                      document
                        .getElementById("timeline-section")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-NeueMontreal text-sm uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    <Calendar size={14} />
                    Timeline View
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                  {[
                    { value: "Ksh 4.0T", label: "2024/25 Budget" },
                    { value: "47", label: "Counties" },
                    { value: "8", label: "Sectors" },
                    { value: "2,500+", label: "Projects Tracked" },
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

          {/* COUNTY SELECTOR */}
          <section className="padding-x py-8 bg-white/5">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <Map size={20} className="text-[#00aa55]" />
                  <span className="text-sm font-NeueMontreal text-white/70">
                    Select County:
                  </span>
                </div>
                <div className="relative flex-1 max-w-md">
                  <select
                    value={selectedCounty}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white appearance-none cursor-pointer hover:bg-white/20 transition-colors"
                  >
                    <option value="" className="bg-[#0a0a0a]">
                      All Counties
                    </option>
                    {kenyanCounties.map((county) => (
                      <option key={county} value={county} className="bg-[#0a0a0a]">
                        {county}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={20}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"
                  />
                </div>
                {selectedCounty && (
                  <Link
                    href={`/tracker/county/${selectedCounty.toLowerCase().replace(/ /g, "-")}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#3b82f6] text-white rounded-full font-NeueMontreal text-sm hover:bg-[#4b82f6] transition-colors"
                  >
                    View {selectedCounty} Profile
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </section>

          {/* SEARCH SECTION */}
          <section id="search-section" className="padding-x py-12">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="font-FoundersGrotesk text-2xl lg:text-3xl font-semibold uppercase">
                  Search Projects
                </h2>
                <p className="mt-2 text-sm font-NeueMontreal text-white/60">
                  Find specific projects by name, sector, or location
                </p>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative mb-8"
              >
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by project name, sector, or county..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00aa55] transition-colors"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Filter size={20} className="text-white/60" />
                </button>
              </motion.div>

              {/* Search Results */}
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-NeueMontreal text-white/60 mb-4">
                    {filteredProjects.length} projects found
                  </p>
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <h3 className="font-FoundersGrotesk text-lg font-medium">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs font-NeueMontreal text-white/50">
                              {project.sector}
                            </span>
                            <span className="text-xs font-NeueMontreal text-white/50">
                              {project.county}
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs font-NeueMontreal ${
                                project.status === "Completed"
                                  ? "bg-green-500/20 text-green-400"
                                  : project.status === "In Progress"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : project.status === "Allocated"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-FoundersGrotesk text-lg text-white">
                            {project.budget}
                          </p>
                          <div className="w-32 h-1.5 bg-white/10 rounded-full mt-2">
                            <div
                              className={`h-full rounded-full ${
                                project.progress === 100
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                              }`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                <button
                  onClick={() => setShowShareModal(true)}
                  className="group rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all text-left"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-NeueMontreal uppercase tracking-wide mb-3">
                        📤 SHARE
                      </span>
                      <h3 className="font-FoundersGrotesk text-xl uppercase text-white">
                        Share Insights
                      </h3>
                      <p className="text-sm font-NeueMontreal text-white/60 mt-2">
                        Share budget insights with your network.
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Share2 className="w-6 h-6 text-white/60" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm font-NeueMontreal">
                    <span>Share Now</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* TIMELINE SECTION */}
          <section id="timeline-section" className="padding-x py-12 bg-white/5">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="font-FoundersGrotesk text-2xl lg:text-3xl font-semibold uppercase">
                  Budget Timeline
                </h2>
                <p className="mt-2 text-sm font-NeueMontreal text-white/60">
                  Key milestones in Kenya's budget decentralization journey
                </p>
              </motion.div>

              {/* Year Slider */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Calendar size={20} className="text-[#00aa55]" />
                  <span className="text-sm font-NeueMontreal text-white/70">
                    Select Year: {selectedYear}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="2000"
                    max="2024"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00aa55] [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-xs font-NeueMontreal text-white/40">
                    <span>2000</span>
                    <span>2012</span>
                    <span>2024</span>
                  </div>
                </div>
              </motion.div>

              {/* Milestones Timeline */}
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10" />
                <div className="space-y-6">
                  {budgetMilestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className={`relative z-10 w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${
                          milestone.year <= selectedYear
                            ? "bg-[#00aa55]/20"
                            : "bg-white/10"
                        }`}
                      >
                        {milestone.icon}
                      </div>
                      <div className="pt-2">
                        <p
                          className={`text-sm font-NeueMontreal ${
                            milestone.year <= selectedYear
                              ? "text-[#00aa55]"
                              : "text-white/40"
                          }`}
                        >
                          {milestone.year}
                        </p>
                        <p
                          className={`font-FoundersGrotesk text-lg ${
                            milestone.year <= selectedYear
                              ? "text-white"
                              : "text-white/40"
                          }`}
                        >
                          {milestone.event}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Historical Trends Chart Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="font-FoundersGrotesk text-lg font-medium mb-4">
                  Budget Growth Over Time (Ksh Billions)
                </h3>
                <div className="h-48 flex items-end gap-2">
                  {historicalTrends.map((item, index) => (
                    <div key={item.year} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(item.national / 4000) * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="w-full bg-gradient-to-t from-[#1e40af] to-[#3b82f6] rounded-t-lg"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(item.county / 4000) * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                        className="w-full bg-gradient-to-t from-[#059669] to-[#10b981] rounded-t-lg"
                      />
                      <span className="text-xs font-NeueMontreal text-white/50">
                        {item.year}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#3b82f6]" />
                    <span className="text-xs font-NeueMontreal text-white/60">
                      National
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#10b981]" />
                    <span className="text-xs font-NeueMontreal text-white/60">
                      County
                    </span>
                  </div>
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

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowShareModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md rounded-2xl bg-[#0a0a0a] border border-white/10 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-FoundersGrotesk text-xl font-semibold mb-4">
                  Share Budget Insights
                </h3>
                <p className="font-NeueMontreal text-white/60 text-sm mb-6">
                  Share this budget tracker with your network to promote civic
                  engagement.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    <span className="font-NeueMontreal">Twitter</span>
                  </button>
                  <button className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                    <span className="font-NeueMontreal">Facebook</span>
                  </button>
                  <button className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                    </svg>
                    <span className="font-NeueMontreal">LinkedIn</span>
                  </button>
                  <button className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <Mail size={24} className="text-white/60" />
                    <span className="font-NeueMontreal">Email</span>
                  </button>
                </div>
                <div className="mt-6">
                  <label className="text-sm font-NeueMontreal text-white/60 mb-2 block">
                    Or copy link:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="https://budgetndiostory.org/tracker"
                      readOnly
                      className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
                    />
                    <button className="px-4 py-2 rounded-lg bg-[#00aa55] text-black text-sm font-NeueMontreal hover:bg-[#00cc66] transition-colors">
                      Copy
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                        href="mailto:info@budgetndiostory.org"
                        className="text-sm font-NeueMontreal text-white/80 hover:text-white transition-colors"
                      >
                        info@budgetndiostory.org
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

              {/* Theme Toggle & Export */}
              <div>
                <h3 className="font-FoundersGrotesk text-lg font-medium text-white uppercase mb-6">
                  Tools
                </h3>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors"
                  >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors">
                    <Download size={16} />
                    Download CSV
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-NeueMontreal text-white/60 hover:text-white transition-colors">
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
