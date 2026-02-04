import LandingFooter from "@/components/LandingFooter";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/mockdata";

export default function Tracker() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useRef(false);

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

            {/* SPENDING BREAKDOWN - FLIP CARDS WITH TABS */}
            <section className="padding-x padding-y bg-[#fafafa]">
              <div className="max-w-[1200px] mx-auto">
                <div data-animate="fade-up" className="mb-[22px]">
                  <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                    Government Spending Breakdown
                  </h2>
                  <p className="mt-[8px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[600px]">
                    Explore how Kenya's budget is allocated between National and
                    County governments. Hover over cards for details.
                  </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-[12px] mb-[32px] flex-wrap">
                  <button
                    onClick={() => setActiveTab("national")}
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
                    onClick={() => setActiveTab("county")}
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
                      className="group relative overflow-hidden rounded-[26px] bg-white border border-black/10 transition-all duration-500 hover:border-black/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                    >
                      {/* Animated gradient background on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${activeTab === "national" ? "from-[#1e40af]" : "from-[#059669]"} via-[#2a2a2a] to-[#1a1a1a] transition-opacity duration-700 opacity-0 group-hover:opacity-100`}
                      />

                      {/* Front content */}
                      <div className="relative z-10 h-full p-[26px] flex flex-col transition-all duration-500 group-hover:opacity-0 group-hover:pointer-events-none">
                        <div className="flex items-start justify-between mb-[16px]">
                          <div className="relative">
                            <div className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-[28px] bg-[#f5f5f5] group-hover:bg-white/10 transition-all duration-500">
                              {project.icon}
                            </div>
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${activeTab === "national" ? "bg-[#1e40af]" : "bg-[#059669]"}`}
                            />
                          </div>
                          <div className="text-right">
                            <p className="text-[24px] font-FoundersGrotesk font-medium">
                              {project.budget}
                            </p>
                            <p className="text-[11px] font-NeueMontreal uppercase tracking-wider mt-[4px] opacity-60">
                              Total Allocation
                            </p>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="text-[22px] font-FoundersGrotesk leading-tight">
                            {project.name}
                          </h3>
                          <div
                            className={`mt-[12px] w-[40px] h-[3px] rounded-full bg-[#111]/10 group-hover:bg-white/30 transition-all duration-500`}
                          />
                          <p className="mt-[12px] text-[13px] font-NeueMontreal leading-relaxed opacity-60">
                            {project.category} •{" "}
                            {activeTab === "national"
                              ? "Nationwide"
                              : "47 Counties"}
                          </p>
                        </div>

                        <div className="mt-auto pt-[16px] border-t border-black/5 group-hover:border-white/10 transition-all duration-500 flex items-center justify-between">
                          <div className="flex items-center gap-[6px]">
                            <span
                              className={`w-2 h-2 rounded-full ${activeTab === "national" ? "bg-[#1e40af]" : "bg-[#059669]"}`}
                            />
                            <span className="text-[12px] font-NeueMontreal opacity-60 capitalize">
                              {project.status.replace("-", " ")}
                            </span>
                          </div>
                          <span className="text-[12px] font-NeueMontreal opacity-50 flex items-center gap-[6px] group-hover:opacity-0 group-hover:-translate-x-2 transition-all duration-300">
                            <span>Details</span>
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
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>

                      {/* Hover details overlay */}
                      <div className="absolute inset-0 z-20 p-[26px] flex flex-col opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-[12px]">
                            <div className="w-[48px] h-[48px] rounded-xl bg-white/10 flex items-center justify-center text-[24px]">
                              {project.icon}
                            </div>
                            <div>
                              <p className="text-[14px] font-NeueMontreal text-white/60 uppercase tracking-wide">
                                {project.category}
                              </p>
                              <p className="text-[18px] font-FoundersGrotesk text-white mt-[2px]">
                                {project.budget}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-[11px] font-NeueMontreal font-medium text-white ${activeTab === "national" ? "bg-[#1e40af]" : "bg-[#059669]"}`}
                          >
                            {project.timeline}
                          </div>
                        </div>

                        <h3 className="mt-[20px] text-[24px] font-FoundersGrotesk leading-tight text-white">
                          {project.name}
                        </h3>

                        <div className="mt-[16px] grid grid-cols-2 gap-[12px]">
                          <div className="bg-white/5 rounded-[12px] p-[12px]">
                            <div className="flex items-center gap-[8px] text-white/40">
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
                            <p className="mt-[6px] text-[14px] font-NeueMontreal text-white">
                              {project.timeline}
                            </p>
                          </div>
                          <div className="bg-white/5 rounded-[12px] p-[12px]">
                            <div className="flex items-center gap-[8px] text-white/40">
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
                            <p className="mt-[6px] text-[14px] font-NeueMontreal text-white">
                              {project.impact}
                            </p>
                          </div>
                        </div>

                        <p className="mt-[16px] text-[13px] font-NeueMontreal text-white/50 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Breakdown items */}
                        <div className="mt-[16px]">
                          <p className="text-[11px] font-NeueMontreal text-white/40 uppercase tracking-wide mb-[8px]">
                            Key Components
                          </p>
                          <div className="flex flex-wrap gap-[8px]">
                            {project.breakdown.map((item, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full bg-white/10 text-[12px] font-NeueMontreal text-white/70"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto pt-[16px]">
                          <div className="w-full bg-white/10 rounded-full h-[6px] overflow-hidden">
                            <div
                              className={`h-full ${activeTab === "national" ? "bg-[#1e40af]" : "bg-[#059669]"} transition-all duration-700`}
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
                            <span className="text-[12px] font-NeueMontreal text-white/50 capitalize">
                              {activeTab === "national" ? "National" : "County"}{" "}
                              Budget
                            </span>
                            <span className="text-[12px] font-NeueMontreal text-white/40">
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
