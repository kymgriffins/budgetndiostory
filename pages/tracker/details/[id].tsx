import {
  BudgetBarChart,
  BudgetHeatmap,
  BudgetLineChart,
  BudgetPieChart,
  EfficiencyScoreCard,
  YearSelector,
} from "@/components/visualizations";
import unifiedTrackerData from "@/mockdata/tracker-unified.json";
import { UnifiedTrackerData } from "@/mockdata/types";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

// Cast the imported JSON to the proper type
const trackerData = unifiedTrackerData as unknown as UnifiedTrackerData;

// Mock data for visualizations
const pieChartData = [
  { name: "Education", value: 710000000000, color: "#1e40af" },
  { name: "Infrastructure", value: 527000000000, color: "#3b82f6" },
  { name: "Debt Servicing", value: 1200000000000, color: "#dc2626" },
  { name: "Security", value: 265000000000, color: "#7c3aed" },
  { name: "Health", value: 150000000000, color: "#059669" },
  { name: "Agriculture", value: 85000000000, color: "#10b981" },
  { name: "Other", value: 1068000000000, color: "#94a3b8" },
];

const barChartData = [
  { name: "Education", value: 710000000000, comparison: 650000000000 },
  { name: "Infrastructure", value: 527000000000, comparison: 480000000000 },
  { name: "Health", value: 150000000000, comparison: 138000000000 },
  { name: "Security", value: 265000000000, comparison: 252000000000 },
  { name: "Agriculture", value: 85000000000, comparison: 78000000000 },
];

const lineChartData = [
  { year: "FY 2020/21", value: 2700000000000 },
  { year: "FY 2021/22", value: 3000000000000 },
  { year: "FY 2022/23", value: 3400000000000 },
  { year: "FY 2023/24", value: 3700000000000 },
  { year: "FY 2024/25", value: 4000000000000 },
];

const heatmapData = [
  { x: "Nairobi", y: "Education", value: 52000000000 },
  { x: "Nairobi", y: "Health", value: 35000000000 },
  { x: "Nairobi", y: "Infrastructure", value: 45000000000 },
  { x: "Mombasa", y: "Education", value: 28000000000 },
  { x: "Mombasa", y: "Health", value: 18000000000 },
  { x: "Mombasa", y: "Infrastructure", value: 25000000000 },
  { x: "Kisumu", y: "Education", value: 27000000000 },
  { x: "Kisumu", y: "Health", value: 17000000000 },
  { x: "Kisumu", y: "Infrastructure", value: 22000000000 },
  { x: "Nakuru", y: "Education", value: 35000000000 },
  { x: "Nakuru", y: "Health", value: 22000000000 },
  { x: "Nakuru", y: "Infrastructure", value: 28000000000 },
];

const yearlyTrends = [
  { year: "FY 2020/21", value: 450000000000 },
  { year: "FY 2021/22", value: 520000000000 },
  { year: "FY 2022/23", value: 580000000000 },
  { year: "FY 2023/24", value: 650000000000 },
  { year: "FY 2024/25", value: 710000000000 },
];

const latestYear = 2024;

export default function TrackerDetails() {
  const router = useRouter();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "national" | "county" | "analytics"
  >("overview");

  // Get sectors from unified data
  const nationalSectors = trackerData.sectors.filter(
    (s) => s.type === "national",
  );
  const countySectors = trackerData.sectors.filter((s) => s.type === "county");

  // Scroll animations
  useEffect(() => {
    let loco: any;
    let ctx: any;

    const el = scrollerRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    let cancelled = false;

    (async () => {
      try {
        if (
          typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
        ) {
          return;
        }

        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        const gsapModule: any = await import("gsap");
        const stModule: any = await import("gsap/ScrollTrigger");

        const gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;
        const ScrollTrigger =
          stModule.ScrollTrigger ?? stModule.default ?? stModule;

        if (!gsap?.registerPlugin || !ScrollTrigger) return;
        gsap.registerPlugin(ScrollTrigger);

        loco = new LocomotiveScroll({
          lenisOptions: {
            wrapper: el,
            content,
            lerp: 0.08,
            smoothWheel: true,
            smoothTouch: true,
          } as any,
          scrollCallback: () => ScrollTrigger.update(),
          autoStart: true,
        });

        if (cancelled) return;

        ScrollTrigger.scrollerProxy(el, {
          scrollTop(value?: number) {
            if (typeof value === "number") {
              return loco?.scrollTo?.(value, { immediate: true });
            }
            return el.scrollTop;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType:
            getComputedStyle(el).transform !== "none" ? "transform" : "fixed",
        });

        ScrollTrigger.addEventListener("refresh", () => loco?.update?.());
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelled = true;
      ctx?.revert?.();
      loco?.destroy?.();
      ScrollTrigger?.getAll?.().forEach?.((t: any) => t.kill?.());
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          Kenya Budget 2024/25 - Detailed Analysis | Budget Ndio Story
        </title>
        <meta
          name="description"
          content="Explore Kenya's comprehensive budget breakdown for FY 2024/25 with detailed visualizations, analytics, and data science insights."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        data-scroll-container
        className="relative bg-[#f1f1f1] text-[#212121]"
      >
        <div ref={contentRef} data-scroll-content>
          <a
            href="#tracker-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full"
          >
            Skip to content
          </a>

          <main id="tracker-content" className="w-full relative z-10">
            {/* HERO SECTION */}
            <section className="padding-x pt-[36px] smOnly:pt-[28px] xm:pt-[22px]">
              <div className="max-w-[1400px] mx-auto w-full">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div>
                    <div
                      data-animate="fade-up"
                      className="inline-block mb-[20px]"
                    >
                      <span className="px-[14px] py-[8px] rounded-full bg-[#1e40af]/10 border border-[#1e40af]/20 small-text font-NeueMontreal text-[#1e40af]">
                        📊 KENYA BUDGET 2024/25
                      </span>
                    </div>

                    <h1
                      data-animate="fade-up"
                      className="sub-heading font-FoundersGrotesk text-[#111] uppercase leading-[1.1] max-w-[700px]"
                    >
                      Ksh 4.0 Trillion
                    </h1>

                    <p
                      data-animate="fade-up"
                      className="mt-[16px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[500px]"
                    >
                      Comprehensive budget breakdown with data science insights
                    </p>

                    <div
                      data-animate="fade-up"
                      className="mt-[24px] flex items-center gap-[16px] flex-wrap"
                    >
                      <Link
                        href="/tracker"
                        className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition"
                      >
                        ← Back to Tracker
                      </Link>
                      <div className="px-[18px] py-[12px] rounded-full bg-[#1e40af] text-white paragraph font-NeueMontreal">
                        📅 FY 2024/25
                      </div>
                    </div>
                  </div>

                  {/* Year Selector */}
                  <div data-animate="fade-up">
                    <YearSelector
                      years={[
                        2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
                        2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
                        2018, 2019, 2020, 2021, 2022, 2023, 2024,
                      ]}
                      currentYear={latestYear}
                      latestYear={latestYear}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SUMMARY STATS */}
            <section className="padding-x py-[32px]">
              <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
                  {[
                    {
                      label: "Total Budget",
                      value: "Ksh 4.0T",
                      color: "#1e40af",
                    },
                    { label: "National", value: "Ksh 2.87T", color: "#3b82f6" },
                    { label: "County", value: "Ksh 3.98T", color: "#059669" },
                    { label: "Efficiency", value: "78%", color: "#10b981" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-[20px] p-[24px] shadow-sm border border-black/5"
                    >
                      <p className="text-[12px] font-NeueMontreal text-[#666] uppercase tracking-wide mb-2">
                        {stat.label}
                      </p>
                      <p
                        className="text-[32px] font-FoundersGrotesk font-bold"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* TABS */}
            <section className="padding-x">
              <div className="max-w-[1400px] mx-auto">
                <div className="flex items-center gap-[12px] mb-[32px] flex-wrap">
                  {[
                    { id: "overview", label: "Overview", icon: "📈" },
                    { id: "national", label: "National", icon: "🏛️" },
                    { id: "county", label: "County", icon: "🏢" },
                    { id: "analytics", label: "Analytics", icon: "🔬" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-[24px] py-[14px] rounded-full text-[15px] font-NeueMontreal font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-[#212121] text-white shadow-lg"
                          : "bg-white text-[#212121] border border-[#e5e7eb] hover:border-[#212121] hover:bg-[#f5f5f5]"
                      }`}
                    >
                      <span className="flex items-center gap-[8px]">
                        <span>{tab.icon}</span>
                        {tab.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <>
                {/* Budget Distribution Pie Chart */}
                <section className="padding-x py-[32px]">
                  <div className="max-w-[1400px] mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-[24px] p-[32px] shadow-sm border border-black/5"
                    >
                      <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111] mb-2">
                        Budget Distribution
                      </h2>
                      <p className="text-[#666] font-NeueMontreal mb-8 max-w-[600px]">
                        Kenya's Ksh 4.0 Trillion budget allocated across key
                        sectors
                      </p>
                      <BudgetPieChart
                        data={pieChartData}
                        title=""
                        centerValue="Ksh 4.0T"
                        centerLabel="Total Budget"
                        size="large"
                      />
                    </motion.div>
                  </div>
                </section>

                {/* Year-over-Year Comparison */}
                <section className="padding-x py-[32px]">
                  <div className="max-w-[1400px] mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-[24px] p-[32px] shadow-sm border border-black/5"
                    >
                      <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111] mb-2">
                        Year-over-Year Comparison
                      </h2>
                      <p className="text-[#666] font-NeueMontreal mb-8 max-w-[600px]">
                        Comparing current budget allocation with previous fiscal
                        year
                      </p>
                      <BudgetBarChart
                        data={barChartData}
                        title=""
                        showComparison={true}
                      />
                    </motion.div>
                  </div>
                </section>

                {/* Budget Trend */}
                <section className="padding-x py-[32px]">
                  <div className="max-w-[1400px] mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-[24px] p-[32px] shadow-sm border border-black/5"
                    >
                      <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111] mb-2">
                        Budget Growth Trend
                      </h2>
                      <p className="text-[#666] font-NeueMontreal mb-8 max-w-[600px]">
                        Kenya's budget evolution from FY 2020/21 to FY 2024/25
                      </p>
                      <BudgetLineChart
                        data={lineChartData}
                        title=""
                        showArea={true}
                      />
                    </motion.div>
                  </div>
                </section>
              </>
            )}

            {/* NATIONAL TAB */}
            {activeTab === "national" && (
              <>
                {/* Sector Cards */}
                <section className="padding-x py-[32px]">
                  <div className="max-w-[1400px] mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8"
                    >
                      <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                        National Budget Sectors
                      </h2>
                      <p className="text-[#666] font-NeueMontreal mt-2 max-w-[600px]">
                        High-level policy, major infrastructure, national
                        security & debt servicing
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                      {nationalSectors.map((sector, index) => (
                        <motion.div
                          key={sector.slug}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() =>
                            router.push(`/tracker/sector/${sector.slug}`)
                          }
                          className="bg-white rounded-[24px] p-[28px] shadow-sm border border-black/5 hover:shadow-lg hover:border-[#1e40af]/30 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-[60px] h-[60px] rounded-[16px] bg-[#1e40af]/10 flex items-center justify-center text-[28px] group-hover:bg-[#1e40af] group-hover:text-white transition-all duration-300">
                              {sector.icon}
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-NeueMontreal uppercase tracking-wide ${
                                sector.status === "allocated"
                                  ? "bg-[#dcfce7] text-[#16a34a]"
                                  : "bg-[#fef3c7] text-[#d97706]"
                              }`}
                            >
                              {sector.status}
                            </span>
                          </div>

                          <h3 className="text-[20px] font-FoundersGrotesk font-medium text-[#111] mb-2">
                            {sector.name}
                          </h3>

                          <p className="text-[28px] font-FoundersGrotesk font-bold text-[#1e40af] mb-1">
                            {sector.budget}
                          </p>

                          <p className="text-[12px] font-NeueMontreal text-[#666] uppercase tracking-wide mb-4">
                            Total Allocation
                          </p>

                          <div className="flex items-center gap-2 text-[12px] text-[#666]">
                            <span className="w-2 h-2 rounded-full bg-[#1e40af]" />
                            <span>{sector.category}</span>
                            <span>•</span>
                            <span>Nationwide</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Education Sector Detail */}
                <section className="padding-x py-[32px]">
                  <div className="max-w-[1400px] mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-[24px] p-[32px] shadow-sm border border-black/5"
                    >
                      <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">📚</span>
                            <div>
                              <h3 className="text-[28px] font-FoundersGrotesk font-bold text-[#111]">
                                Education
                              </h3>
                              <p className="text-[14px] font-NeueMontreal text-[#666]">
                                FY 2024/25 • Ksh 710-718 Billion
                              </p>
                            </div>
                          </div>

                          <p className="text-[16px] font-NeueMontreal text-[#212121]/70 leading-relaxed mb-6">
                            The education sector receives the largest allocation
                            in Kenya's history, funding teacher salaries through
                            TSC, free basic education, and university funding
                            via HELB. Over 10M students are supported across all
                            levels.
                          </p>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 rounded-[12px] p-4">
                              <p className="text-[12px] font-NeueMontreal text-[#666] uppercase">
                                Efficiency
                              </p>
                              <p className="text-[24px] font-FoundersGrotesk font-bold text-[#059669]">
                                82%
                              </p>
                            </div>
                            <div className="bg-gray-50 rounded-[12px] p-4">
                              <p className="text-[12px] font-NeueMontreal text-[#666] uppercase">
                                Utilization
                              </p>
                              <p className="text-[24px] font-FoundersGrotesk font-bold text-[#1e40af]">
                                94%
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="lg:w-[400px]">
                          <BudgetLineChart
                            data={yearlyTrends}
                            title="Education Budget Trend"
                            strokeColor="#1e40af"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </section>
              </>
            )}

            {/* COUNTY TAB */}
            {activeTab === "county" && (
              <>
                {/* County Heatmap */}
                <section className="padding-x py-[32px]">
                  <div className="max-w-[1400px] mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-[24px] p-[32px] shadow-sm border border-black/5"
                    >
                      <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111] mb-2">
                        County Budget Allocation
                      </h2>
                      <p className="text-[#666] font-NeueMontreal mb-8 max-w-[600px]">
                        Comparing budget allocations across major counties and
                        sectors
                      </p>
                      <BudgetHeatmap
                        data={heatmapData}
                        xLabels={["Nairobi", "Mombasa", "Kisumu", "Nakuru"]}
                        yLabels={["Education", "Health", "Infrastructure"]}
                      />
                    </motion.div>
                  </div>
                </section>

                {/* County Cards */}
                <section className="padding-x py-[32px]">
                  <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
                      {countySectors.map((sector, index) => (
                        <motion.div
                          key={sector.slug}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-[24px] p-[28px] shadow-sm border border-black/5 hover:shadow-lg hover:border-[#059669]/30 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-[60px] h-[60px] rounded-[16px] bg-[#059669]/10 flex items-center justify-center text-[28px] group-hover:bg-[#059669] group-hover:text-white transition-all duration-300">
                              {sector.icon}
                            </div>
                            <span className="px-3 py-1 rounded-full text-[11px] font-NeueMontreal uppercase tracking-wide bg-[#dcfce7] text-[#16a34a]">
                              {sector.status}
                            </span>
                          </div>

                          <h3 className="text-[20px] font-FoundersGrotesk font-medium text-[#111] mb-2">
                            {sector.name}
                          </h3>

                          <p className="text-[28px] font-FoundersGrotesk font-bold text-[#059669] mb-1">
                            {sector.budget === "Equitable Share"
                              ? "Equitable Share"
                              : sector.budget}
                          </p>

                          <p className="text-[12px] font-NeueMontreal text-[#666] uppercase tracking-wide mb-4">
                            {sector.county} Functions
                          </p>

                          <div className="flex items-center gap-2 text-[12px] text-[#666]">
                            <span className="w-2 h-2 rounded-full bg-[#059669]" />
                            <span>{sector.impact || "47 Counties"}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* ANALYTICS TAB */}
            {activeTab === "analytics" && (
              <>
                {/* Efficiency Scores */}
                <section className="padding-x py-[32px]">
                  <div className="max-w-[1400px] mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8"
                    >
                      <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                        Data Science Analytics
                      </h2>
                      <p className="text-[#666] font-NeueMontreal mt-2 max-w-[600px]">
                        Budget efficiency scores and performance metrics
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] mb-8">
                      <EfficiencyScoreCard
                        score={82}
                        label="Overall Efficiency"
                        description="Weighted score across all sectors"
                        color="blue"
                        showDetails
                        details={[
                          { label: "Budget Used", value: "94%" },
                          { label: "Projects Done", value: "78%" },
                        ]}
                      />
                      <EfficiencyScoreCard
                        score={94}
                        label="Utilization Rate"
                        description="Percentage of budget effectively utilized"
                        color="green"
                        showDetails
                        details={[
                          { label: "Allocated", value: "Ksh 3.7T" },
                          { label: "Spent", value: "Ksh 3.5T" },
                        ]}
                      />
                      <EfficiencyScoreCard
                        score={75}
                        label="Completion Rate"
                        description="Projects completed on schedule"
                        color="yellow"
                        showDetails
                        details={[
                          { label: "Completed", value: "142" },
                          { label: "In Progress", value: "78" },
                        ]}
                      />
                      <EfficiencyScoreCard
                        score={78}
                        label="Performance Score"
                        description="Overall budget performance index"
                        color="blue"
                        showDetails
                        details={[
                          { label: "GDP Share", value: "28.5%" },
                          { label: "Per Capita", value: "Ksh 80K" },
                        ]}
                      />
                    </div>
                  </div>
                </section>

                {/* Budget Distribution */}
                <section className="padding-x py-[32px]">
                  <div className="max-w-[1400px] mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-[24px] p-[32px] shadow-sm border border-black/5"
                    >
                      <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111] mb-2">
                        Sector Breakdown
                      </h2>
                      <p className="text-[#666] font-NeueMontreal mb-8 max-w-[600px]">
                        Detailed breakdown of Kenya's budget allocation by
                        sector
                      </p>
                      <BudgetBarChart
                        data={barChartData}
                        title=""
                        layout="vertical"
                      />
                    </motion.div>
                  </div>
                </section>

                {/* Key Insights */}
                <section className="padding-x py-[32px] pb-[80px]">
                  <div className="max-w-[1400px] mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-[24px] p-[32px] text-white"
                    >
                      <h2 className="sub-heading font-FoundersGrotesk uppercase mb-6">
                        Key Budget Insights
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                          {
                            title: "Record Allocation",
                            value: "Ksh 4.0T",
                            desc: "Largest budget in Kenya's history",
                          },
                          {
                            title: "Education Focus",
                            value: "Ksh 718B",
                            desc: "Highest sector allocation",
                          },
                          {
                            title: "Debt Servicing",
                            value: "Ksh 1.2T",
                            desc: "30% of total budget",
                          },
                          {
                            title: "Infrastructure",
                            value: "Ksh 554B",
                            desc: "Major development investment",
                          },
                          {
                            title: "UHC Expansion",
                            value: "Ksh 45B",
                            desc: "Universal health coverage",
                          },
                          {
                            title: "Per Capita",
                            value: "Ksh 80K",
                            desc: "Average per Kenyan",
                          },
                        ].map((insight, index) => (
                          <div
                            key={index}
                            className="bg-white/10 rounded-[16px] p-6 backdrop-blur-sm"
                          >
                            <p className="text-[12px] font-NeueMontreal opacity-70 uppercase tracking-wide mb-2">
                              {insight.title}
                            </p>
                            <p className="text-[28px] font-FoundersGrotesk font-bold mb-2">
                              {insight.value}
                            </p>
                            <p className="text-[14px] font-NeueMontreal opacity-80">
                              {insight.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </section>
              </>
            )}
          </main>

          {/* Footer */}
          <footer className="padding-x py-[40px] bg-white border-t border-black/5">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[14px] font-NeueMontreal text-[#666]">
                © 2026 Budget Ndio Story • Kenya Budget Tracker
              </p>
              <p className="text-[12px] font-NeueMontreal text-[#999]">
                Data sourced from Kenya Treasury • FY 2024/25
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
