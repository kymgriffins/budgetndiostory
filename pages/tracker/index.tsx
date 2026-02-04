import LandingFooter from "@/components/LandingFooter";
import trackerYearlyData from "@/mockdata/tracker-yearly.json";
import { YearlyTrackerData } from "@/mockdata/types";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Tracker() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useRef(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  // Helper function to safely get the last year data with proper typing
  const getLatestYearData = (
    data: typeof trackerYearlyData,
  ): YearlyTrackerData | null => {
    const { years } = data;
    if (years.length === 0) return null;
    // Type assertion to ensure proper typing from JSON data
    return years[years.length - 1] as YearlyTrackerData;
  };

  const [selectedYear, setSelectedYear] = useState<YearlyTrackerData | null>(
    () => getLatestYearData(trackerYearlyData),
  );
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    let loco: any;
    let ctx: any;
    let gsap: any;
    let ScrollTrigger: any;

    const el = scrollerRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    let cancelled = false;

    (async () => {
      try {
        isMobile.current = window.innerWidth < 768;

        if (
          typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
        ) {
          return;
        }

        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        const gsapModule: any = await import("gsap");
        const stModule: any = await import("gsap/ScrollTrigger");

        gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;
        ScrollTrigger = stModule.ScrollTrigger ?? stModule.default ?? stModule;

        if (!gsap?.registerPlugin || !ScrollTrigger) return;
        gsap.registerPlugin(ScrollTrigger);

        if (getComputedStyle(el).position === "static") {
          el.style.position = "relative";
        }

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

        const getScrollY = () =>
          loco?.lenisInstance?.scroll ?? el.scrollTop ?? 0;

        ScrollTrigger.scrollerProxy(el, {
          scrollTop(value?: number) {
            if (typeof value === "number") {
              return loco?.scrollTo?.(value, { immediate: true });
            }
            return getScrollY();
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

        ScrollTrigger.defaults({ scroller: el });
        ScrollTrigger.addEventListener("refresh", () => loco?.update?.());

        ctx = gsap.context(() => {
          gsap.fromTo(
            "[data-hero='sub']",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          );
          gsap.fromTo(
            "[data-hero='title']",
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              delay: 0.05,
            },
          );
          gsap.fromTo(
            "[data-hero='cta']",
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power3.out",
              delay: 0.12,
            },
          );

          (
            gsap.utils.toArray("[data-animate='fade-up']") as HTMLElement[]
          ).forEach((node) => {
            gsap.fromTo(
              node,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: node, start: "top 85%" },
              },
            );
          });

          // Card hover animations
          (gsap.utils.toArray("[data-hover='card']") as HTMLElement[]).forEach(
            (node) => {
              const card = node as HTMLElement;
              const icon = card.querySelector(
                "[data-hover='icon']",
              ) as HTMLElement;
              const arrow = card.querySelector(
                "[data-hover='arrow']",
              ) as HTMLElement;

              card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  duration: 0.4,
                  ease: "power3.out",
                });
                gsap.to(icon, {
                  scale: 1.1,
                  duration: 0.3,
                  ease: "power2.out",
                });
                gsap.to(arrow, {
                  x: 8,
                  opacity: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
              });

              card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  duration: 0.3,
                  ease: "power3.out",
                });
                gsap.to(icon, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                });
                gsap.to(arrow, {
                  x: 0,
                  opacity: 0.7,
                  duration: 0.3,
                  ease: "power2.out",
                });
              });
            },
          );
        });

        return () => {
          cancelled = true;
          ctx?.revert?.();
          loco?.destroy?.();
          ScrollTrigger?.getAll?.().forEach?.((t: any) => t.kill?.());
        };
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const [activeTab, setActiveTab] = useState<"national" | "county">("national");

  const nationalSpending = [
    {
      id: 1,
      name: "Education",
      budget: "Ksh 701–718B",
      status: "allocated",
      county: "National",
      icon: "📚",
      description:
        "Funds teacher salaries through TSC, free basic education, and university funding via HELB.",
      timeline: "FY 2024/25",
      impact: "10M+ students supported",
      category: "Education",
      breakdown: [
        "Teacher salaries (TSC)",
        "Free basic education",
        "University funding (HELB)",
      ],
    },
    {
      id: 2,
      name: "Infrastructure (Energy & ICT)",
      budget: "Ksh 500–554B",
      status: "in-progress",
      county: "National",
      icon: "⚡",
      description:
        "Major projects including road maintenance (Ksh 190B+), railway expansion, and digital superhighway initiatives.",
      timeline: "FY 2024/25",
      impact: "National connectivity",
      category: "Infrastructure",
      breakdown: [
        "Road maintenance (Ksh 190B+)",
        "Railway expansion",
        "Digital superhighway",
      ],
    },
    {
      id: 3,
      name: "National Security",
      budget: "Ksh 251–279B",
      status: "allocated",
      county: "National",
      icon: "🛡️",
      description:
        "Funding for Ministry of Defence, National Police Service, and National Intelligence Service.",
      timeline: "FY 2024/25",
      impact: "Nationwide security",
      category: "Security",
      breakdown: [
        "Ministry of Defence",
        "National Police Service",
        "National Intelligence Service",
      ],
    },
    {
      id: 4,
      name: "Debt Servicing (CFS)",
      budget: "Ksh 1.2T",
      status: "allocated",
      county: "National",
      icon: "💰",
      description:
        "Consolidated Fund Services for public debt interest payments and pensions.",
      timeline: "FY 2024/25",
      impact: "Debt sustainability",
      category: "Debt",
      breakdown: ["Public debt interest", "Pension payments", "Fund services"],
    },
  ];

  const countySpending = [
    {
      id: 5,
      name: "Health",
      budget: "Ksh 380–400B",
      status: "in-progress",
      county: "County",
      icon: "🏥",
      description:
        "Fully devolved function managing County Referral Hospitals, dispensaries, and healthcare workers.",
      timeline: "FY 2024/25",
      impact: "47 Counties covered",
      category: "Health",
      breakdown: [
        "County Referral Hospitals",
        "Dispensaries",
        "Doctors & nurses",
      ],
    },
    {
      id: 6,
      name: "Agriculture",
      budget: "Equitable Share",
      status: "allocated",
      county: "County",
      icon: "🌾",
      description:
        "Crop and animal husbandry, livestock auctions, and local irrigation projects for food security.",
      timeline: "FY 2024/25",
      impact: "Smallholder farmers",
      category: "Agriculture",
      breakdown: [
        "Extension services",
        "Livestock programs",
        "Local irrigation",
      ],
    },
    {
      id: 7,
      name: "ECDE & Vocational",
      budget: "Equitable Share",
      status: "allocated",
      county: "County",
      icon: "👶",
      description:
        "Early Childhood Education and village polytechnics funding (devolved from national).",
      timeline: "FY 2024/25",
      impact: "Pre-primary education",
      category: "Education",
      breakdown: [
        "Pre-primary schools",
        "Village polytechnics",
        "Vocational training",
      ],
    },
    {
      id: 8,
      name: "Local Infrastructure",
      budget: "Equitable Share",
      status: "in-progress",
      county: "County",
      icon: "🛣️",
      description:
        "Last-mile access roads, street lighting, and local markets development.",
      timeline: "FY 2024/25",
      impact: "47 Counties",
      category: "Infrastructure",
      breakdown: ["Feeder roads", "Street lighting", "Local markets"],
    },
  ];

  const currentProjects =
    activeTab === "national" ? nationalSpending : countySpending;

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        ref={scrollerRef}
        data-scroll-container
        className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#f1f1f1] text-[#212121]"
        style={{ position: "relative" }}
      >
        <div ref={contentRef} data-scroll-content>
          {/* Spacer for fixed navbar height */}
          <div className="h-[8vh]" />

          <a
            href="#tracker-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full"
          >
            Skip to content
          </a>

          <main id="tracker-content" className="w-full relative z-10">
            {/* HERO */}
            <section className="padding-x pt-[36px] smOnly:pt-[28px] xm:pt-[22px]">
              <div className="max-w-[1200px] mx-auto w-full">
                <div data-hero="sub" className="inline-block mb-[20px]">
                  <span className="px-[14px] py-[8px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/70">
                    📊 Visual Budget Tracker
                  </span>
                </div>

                <h1
                  data-hero="title"
                  className="sub-heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]"
                >
                  See Where the Money Went
                </h1>

                <p
                  data-hero="sub"
                  className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]"
                >
                  Not spreadsheets or audit reports. Just visual indicators of
                  what's allocated, in progress, completed, or stalled.
                </p>

                <div
                  data-hero="cta"
                  className="mt-[32px] flex items-center gap-[12px] flex-wrap"
                >
                  <Link
                    href="/home"
                    className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </section>

            {/* SPENDING BREAKDOWN - CARDS WITH TABS */}
            <section className="padding-x padding-y bg-[#fafafa]">
              <div className="max-w-[1200px] mx-auto">
                <div data-animate="fade-up" className="mb-[22px]">
                  <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                    Government Spending Breakdown
                  </h2>
                  <p className="mt-[8px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[600px]">
                    Explore how Kenya's budget is allocated between National and
                    County governments. Click on cards for in-depth data.
                  </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-[12px] mb-[32px] flex-wrap">
                  <button
                    onClick={() => {
                      setActiveTab("national");
                      setExpandedId(null);
                    }}
                    className={`px-[24px] py-[14px] rounded-full text-[15px] font-NeueMontreal font-medium transition-all duration-300 ${
                      activeTab === "national"
                        ? "bg-[#1e40af] text-white shadow-lg"
                        : "bg-white text-[#212121] border border-[#e5e7eb] hover:border-[#1e40af] hover:text-[#1e40af]"
                    }`}
                  >
                    <span className="flex items-center gap-[8px]">
                      <svg
                        className="w-[18px] h-[18px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                        />
                      </svg>
                      National Government
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("county");
                      setExpandedId(null);
                    }}
                    className={`px-[24px] py-[14px] rounded-full text-[15px] font-NeueMontreal font-medium transition-all duration-300 ${
                      activeTab === "county"
                        ? "bg-[#059669] text-white shadow-lg"
                        : "bg-white text-[#212121] border border-[#e5e7eb] hover:border-[#059669] hover:text-[#059669]"
                    }`}
                  >
                    <span className="flex items-center gap-[8px]">
                      <svg
                        className="w-[18px] h-[18px]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8m-2 0h2m-2 0h-2m-2 0h-2m-2 0h-2m-2 0H5m-2 0h2m0 0h2m0 0h2m0 0h2m0 0h2m0 0H3m0 0h2m0 0h2m0 0h2m0 0h2"
                        />
                      </svg>
                      County Government
                    </span>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="mb-[24px] flex items-center gap-[16px]">
                  <span className="text-[13px] font-NeueMontreal text-[#6b7280]">
                    National Budget Focus:
                  </span>
                  {activeTab === "national" ? (
                    <span className="text-[14px] font-NeueMontreal text-[#111]">
                      High-level policy, major infrastructure, national security
                      & debt servicing
                    </span>
                  ) : (
                    <span className="text-[14px] font-NeueMontreal text-[#111]">
                      Local service delivery: health, agriculture, ECDE &
                      last-mile infrastructure
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-[14px] mdOnly:grid-cols-1 smOnly:grid-cols-2 xm:grid-cols-1 mb-[16px]">
                  {currentProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() =>
                        setExpandedId(
                          expandedId === project.id ? null : project.id,
                        )
                      }
                      className={`group relative overflow-hidden rounded-[26px] bg-white border transition-all duration-500 cursor-pointer ${
                        expandedId === project.id
                          ? "border-[#1e40af] shadow-[0_20px_60px_rgba(30,64,175,0.15)]"
                          : "border-black/10 hover:border-black/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
                      }`}
                    >
                      {/* Linked chain indicator for expanded item */}
                      {expandedId === project.id && (
                        <div className="absolute top-4 right-4 z-20">
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e40af]/10 border border-[#1e40af]/30 text-[#1e40af] text-[12px] font-NeueMontreal">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                              />
                            </svg>
                            Linked Data
                          </div>
                        </div>
                      )}

                      {/* Subtle gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          activeTab === "national"
                            ? "from-[#1e40af]/5 via-transparent to-transparent"
                            : "from-[#059669]/5 via-transparent to-transparent"
                        } transition-opacity duration-500`}
                      />

                      {/* Card content */}
                      <div className="relative z-10 h-full p-[26px] flex flex-col">
                        <div className="flex items-start justify-between mb-[16px]">
                          <div className="relative">
                            <div
                              className={`w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-[28px] ${
                                activeTab === "national"
                                  ? "bg-[#1e40af]/10"
                                  : "bg-[#059669]/10"
                              } transition-all duration-500`}
                            >
                              {project.icon}
                            </div>
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                activeTab === "national"
                                  ? "bg-[#1e40af]"
                                  : "bg-[#059669]"
                              }`}
                            />
                          </div>
                          <div className="text-right">
                            <p className="text-[24px] font-FoundersGrotesk font-medium text-[#111]">
                              {project.budget}
                            </p>
                            <p className="text-[11px] font-NeueMontreal uppercase tracking-wider mt-[4px] text-[#212121]/40">
                              Total Allocation
                            </p>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="text-[22px] font-FoundersGrotesk leading-tight text-[#111]">
                            {project.name}
                          </h3>
                          <div
                            className={`mt-[12px] w-[40px] h-[3px] rounded-full ${
                              activeTab === "national"
                                ? "bg-[#1e40af]"
                                : "bg-[#059669]"
                            } transition-all duration-500`}
                          />
                          <p className="mt-[12px] text-[13px] font-NeueMontreal leading-relaxed text-[#212121]/60">
                            {project.category} •{" "}
                            {activeTab === "national"
                              ? "Nationwide"
                              : "47 Counties"}
                          </p>
                        </div>

                        <div className="mt-auto pt-[16px] border-t border-black/5 flex items-center justify-between">
                          <div className="flex items-center gap-[6px]">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                activeTab === "national"
                                  ? "bg-[#1e40af]"
                                  : "bg-[#059669]"
                              }`}
                            />
                            <span className="text-[12px] font-NeueMontreal text-[#212121]/60 capitalize">
                              {project.status.replace("-", " ")}
                            </span>
                          </div>
                          <span className="text-[12px] font-NeueMontreal text-[#212121]/40 flex items-center gap-[6px] transition-all duration-300">
                            <span>
                              {expandedId === project.id
                                ? "Close"
                                : "View Details"}
                            </span>
                            <svg
                              className={`w-4 h-4 transition-transform duration-300 ${
                                expandedId === project.id ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Expanded content - Linked chain data visualization */}
                      <div
                        className={`absolute inset-x-0 bottom-0 z-20 p-[26px] bg-white/95 backdrop-blur-sm transition-all duration-500 ease-out ${
                          expandedId === project.id
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-full pointer-events-none"
                        }`}
                      >
                        {/* Chain link lines */}
                        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#1e40af]/30 to-transparent" />

                        {/* Connected nodes visualization */}
                        <div className="mb-4">
                          <p className="text-[11px] font-NeueMontreal text-[#1e40af] uppercase tracking-wide mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#1e40af]" />
                            Data Chain
                          </p>
                          <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            {/* Chain items */}
                            <div className="flex-shrink-0 px-4 py-2 rounded-lg bg-[#1e40af]/10 border border-[#1e40af]/20 text-[#111] text-[13px] font-NeueMontreal">
                              {project.category}
                            </div>
                            <svg
                              className="w-4 h-4 text-[#1e40af]/50 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                            <div className="flex-shrink-0 px-4 py-2 rounded-lg bg-[#1e40af]/10 border border-[#1e40af]/20 text-[#111] text-[13px] font-NeueMontreal">
                              {project.timeline}
                            </div>
                            <svg
                              className="w-4 h-4 text-[#1e40af]/50 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                            <div className="flex-shrink-0 px-4 py-2 rounded-lg bg-[#1e40af]/10 border border-[#1e40af]/20 text-[#111] text-[13px] font-NeueMontreal">
                              {project.impact}
                            </div>
                          </div>
                        </div>

                        {/* Detailed breakdown */}
                        <div className="mt-4 grid grid-cols-2 gap-[12px]">
                          <div className="bg-[#f5f5f5] rounded-[12px] p-[12px]">
                            <div className="flex items-center gap-[8px] text-[#212121]/40">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-[11px] font-NeueMontreal uppercase">
                                Timeline
                              </span>
                            </div>
                            <p className="mt-[6px] text-[14px] font-NeueMontreal text-[#111]">
                              {project.timeline}
                            </p>
                          </div>
                          <div className="bg-[#f5f5f5] rounded-[12px] p-[12px]">
                            <div className="flex items-center gap-[8px] text-[#212121]/40">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                              </svg>
                              <span className="text-[11px] font-NeueMontreal uppercase">
                                Impact
                              </span>
                            </div>
                            <p className="mt-[6px] text-[14px] font-NeueMontreal text-[#111]">
                              {project.impact}
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 text-[13px] font-NeueMontreal text-[#212121]/70 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Key components as chain */}
                        <div className="mt-4">
                          <p className="text-[11px] font-NeueMontreal text-[#212121]/50 uppercase tracking-wide mb-[8px]">
                            Key Components Chain
                          </p>
                          <div className="flex flex-wrap gap-[8px]">
                            {project.breakdown.map((item, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full bg-[#f5f5f5] border border-black/10 text-[12px] font-NeueMontreal text-[#212121]/70"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-4 pt-[16px] border-t border-black/5">
                          <div className="w-full bg-[#f5f5f5] rounded-full h-[6px] overflow-hidden">
                            <div
                              className={`h-full ${
                                activeTab === "national"
                                  ? "bg-[#1e40af]"
                                  : "bg-[#059669]"
                              } transition-all duration-700`}
                              style={{
                                width:
                                  project.status === "allocated"
                                    ? "20%"
                                    : project.status === "in-progress"
                                      ? "65%"
                                      : "100%",
                              }}
                            />
                          </div>
                          <div className="flex justify-between items-center mt-[8px]">
                            <span className="text-[12px] font-NeueMontreal text-[#212121]/60 capitalize">
                              {activeTab === "national" ? "National" : "County"}{" "}
                              Budget
                            </span>
                            <span className="text-[12px] font-NeueMontreal text-[#212121]/50">
                              {project.status === "allocated"
                                ? "Not started"
                                : project.status === "in-progress"
                                  ? "65%"
                                  : "100%"}{" "}
                              Progress
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sector Comparison Table */}
                <div className="mt-[40px] rounded-[24px] bg-white border border-black/10 p-[32px]">
                  <h3 className="text-[20px] font-FoundersGrotesk uppercase text-[#111] mb-[24px]">
                    Sector Responsibilities Comparison
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-black/10">
                          <th className="text-left py-[16px] px-[12px] text-[13px] font-NeueMontreal uppercase tracking-wide text-[#6b7280]">
                            Sector
                          </th>
                          <th className="text-left py-[16px] px-[12px] text-[13px] font-NeueMontreal uppercase tracking-wide text-[#1e40af]">
                            National Responsibility
                          </th>
                          <th className="text-left py-[16px] px-[12px] text-[13px] font-NeueMontreal uppercase tracking-wide text-[#059669]">
                            County Responsibility
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-black/5">
                          <td className="py-[16px] px-[12px] text-[14px] font-NeueMontreal text-[#111]">
                            Education
                          </td>
                          <td className="py-[16px] px-[12px] text-[13px] font-NeueMontreal text-[#6b7280]">
                            Higher education, Secondary/Primary schools, Teacher
                            recruitment
                          </td>
                          <td className="py-[16px] px-[12px] text-[13px] font-NeueMontreal text-[#6b7280]">
                            Early Childhood (ECDE), Village polytechnics
                          </td>
                        </tr>
                        <tr className="border-b border-black/5">
                          <td className="py-[16px] px-[12px] text-[14px] font-NeueMontreal text-[#111]">
                            Health
                          </td>
                          <td className="py-[16px] px-[12px] text-[13px] font-NeueMontreal text-[#6b7280]">
                            National Referral Hospitals (KNH), Policy & Vaccines
                          </td>
                          <td className="py-[16px] px-[12px] text-[13px] font-NeueMontreal text-[#6b7280]">
                            County hospitals, health centers, community health
                            workers
                          </td>
                        </tr>
                        <tr className="border-b border-black/5">
                          <td className="py-[16px] px-[12px] text-[14px] font-NeueMontreal text-[#111]">
                            Agriculture
                          </td>
                          <td className="py-[16px] px-[12px] text-[13px] font-NeueMontreal text-[#6b7280]">
                            National policy, large-scale irrigation, subsidies
                          </td>
                          <td className="py-[16px] px-[12px] text-[13px] font-NeueMontreal text-[#6b7280]">
                            Extension services, livestock, local farming support
                          </td>
                        </tr>
                        <tr>
                          <td className="py-[16px] px-[12px] text-[14px] font-NeueMontreal text-[#111]">
                            Roads
                          </td>
                          <td className="py-[16px] px-[12px] text-[13px] font-NeueMontreal text-[#6b7280]">
                            Major highways (KENHA, KERRA)
                          </td>
                          <td className="py-[16px] px-[12px] text-[13px] font-NeueMontreal text-[#6b7280]">
                            Rural access and feeder roads
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CTA for County Data */}
                <div className="mt-[32px] rounded-[20px] bg-gradient-to-r from-[#1e40af]/5 via-white to-[#059669]/5 border border-black/5 p-[24px] flex items-center justify-between gap-[16px] flex-wrap">
                  <div>
                    <p className="text-[14px] font-NeueMontreal text-[#111]">
                      <strong>Want to see your specific county budget?</strong>
                    </p>
                    <p className="text-[13px] font-NeueMontreal text-[#6b7280] mt-[4px]">
                      Check the latest Quarterly Budget Implementation Reports
                      from the Office of the Controller of Budget.
                    </p>
                  </div>
                  <a
                    href="https://www.ocb.go.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-[18px] py-[12px] rounded-full bg-[#111] text-white text-[13px] font-NeueMontreal hover:opacity-90 transition"
                  >
                    View OCB Reports
                  </a>
                </div>
              </div>
            </section>
            {/* HISTORICAL BUDGET TRACKER */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div data-animate="fade-up" className="mb-[22px]">
                  <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                    Historical Budget Tracker (2000-2025)
                  </h2>
                  <p className="mt-[8px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[600px]">
                    Select a year to explore budget allocations, projects, and
                    progress over time.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Year Selector - Left Side */}
                  <div data-animate="fade-up" className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <h3 className="font-FoundersGrotesk text-sm font-semibold text-[#111] mb-3">
                        Select Year
                      </h3>
                      <div className="max-h-[400px] overflow-y-auto space-y-1 pr-2">
                        {trackerYearlyData.years.map((year) => (
                          <button
                            key={year.year}
                            onClick={() => {
                              setSelectedYear(year);
                              setSelectedItem(null);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                              selectedYear?.year === year.year
                                ? "bg-[#212121] text-white shadow-md"
                                : "bg-gray-50 text-[#212121] hover:bg-gray-100"
                            }`}
                          >
                            <span className="flex items-center justify-between">
                              <span>{year.year}</span>
                              <span
                                className={`text-xs ${
                                  selectedYear?.year === year.year
                                    ? "text-white/60"
                                    : "text-gray-400"
                                }`}
                              >
                                {year.totalProjects} items
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Details - Right Side */}
                  <div data-animate="fade-up" className="lg:col-span-3">
                    {selectedYear ? (
                      <div className="space-y-4">
                        {/* Year Summary Card */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-FoundersGrotesk text-xl font-bold text-[#111]">
                                {selectedYear.year} Budget Overview
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {selectedYear.totalBudget} •{" "}
                                {selectedYear.totalProjects} Projects
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                {selectedYear.completed} Completed
                              </span>
                              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                                {selectedYear.inProgress} In Progress
                              </span>
                            </div>
                          </div>

                          {/* Progress bars */}
                          <div className="grid grid-cols-4 gap-4">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">
                                Completed
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{
                                    width: `${(selectedYear.completed / selectedYear.totalProjects) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">
                                In Progress
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{
                                    width: `${(selectedYear.inProgress / selectedYear.totalProjects) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">
                                Allocated
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-500 rounded-full"
                                  style={{
                                    width: `${(selectedYear.allocated / selectedYear.totalProjects) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">
                                Stalled
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-red-500 rounded-full"
                                  style={{
                                    width: `${(selectedYear.stalled / selectedYear.totalProjects) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Project Items List */}
                        <div className="space-y-3">
                          {selectedYear.items.map((item) => (
                            <div
                              key={item.id}
                              onClick={() =>
                                setSelectedItem(
                                  selectedItem?.id === item.id ? null : item,
                                )
                              }
                              className={`bg-white rounded-xl border transition-all cursor-pointer ${
                                selectedItem?.id === item.id
                                  ? "border-blue-500 shadow-lg"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="p-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                                    {item.icon}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                                        {item.category}
                                      </span>
                                      <span
                                        className={`text-xs px-2 py-0.5 rounded ${
                                          item.sector === "National"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-emerald-100 text-emerald-700"
                                        }`}
                                      >
                                        {item.sector}
                                      </span>
                                    </div>
                                    <h4 className="font-FoundersGrotesk font-semibold text-[#111] mt-1">
                                      {item.title}
                                    </h4>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium text-[#111]">
                                      {item.budget}
                                    </div>
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded-full ${
                                        item.status === "Completed"
                                          ? "bg-green-100 text-green-700"
                                          : item.status === "In Progress"
                                            ? "bg-blue-100 text-blue-700"
                                            : item.status === "Allocated"
                                              ? "bg-yellow-100 text-yellow-700"
                                              : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {item.status}
                                    </span>
                                  </div>
                                  <svg
                                    className={`w-5 h-5 text-gray-400 transition-transform ${
                                      selectedItem?.id === item.id
                                        ? "rotate-90"
                                        : ""
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </div>

                                {/* Expanded Details */}
                                {selectedItem?.id === item.id && (
                                  <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-600 mb-4">
                                      {item.description}
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                      <div>
                                        <div className="text-xs text-gray-500">
                                          Budget
                                        </div>
                                        <div className="font-medium">
                                          {item.budget}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-xs text-gray-500">
                                          Allocated
                                        </div>
                                        <div className="font-medium">
                                          {item.allocated}%
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-xs text-gray-500">
                                          Progress
                                        </div>
                                        <div className="font-medium">
                                          {item.progress}%
                                        </div>
                                      </div>
                                      {item.beneficiaries && (
                                        <div>
                                          <div className="text-xs text-gray-500">
                                            Beneficiaries
                                          </div>
                                          <div className="font-medium">
                                            {item.beneficiaries}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <Link
                                      href={`/tracker/${selectedYear.year}/${item.id}`}
                                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#212121] text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
                                    >
                                      View Full Details
                                      <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                      </svg>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* View All Link */}
                        <Link
                          href={`/tracker/${selectedYear.year}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
                        >
                          View All {selectedYear.year} Data
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
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                        <p className="text-gray-500">
                          Select a year to view budget details
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            {/* INSIGHTS CTA */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="rounded-[28px] bg-gradient-to-br from-white via-white to-white/70 border border-black/5 p-[26px] flex items-end justify-between gap-[16px] flex-wrap"
                >
                  <div>
                    <h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                      Want the Full Story?
                    </h3>
                    <p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[62ch]">
                      Click on any project to read the investigation, see
                      photos, or watch the documentary.
                    </p>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <Link
                      href="/stories"
                      className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition"
                    >
                      Read Stories
                    </Link>
                    <Link
                      href="/home"
                      className="px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 transition"
                    >
                      Home
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <LandingFooter />
        </div>
      </div>
    </>
  );
}
