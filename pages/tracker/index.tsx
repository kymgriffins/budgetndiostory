import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import unifiedTrackerData from "@/mockdata/tracker-unified.json";
import { TrackerSectorItem, UnifiedTrackerData } from "@/mockdata/types";

// Cast the imported JSON to the proper type
const trackerData = unifiedTrackerData as unknown as UnifiedTrackerData;

export default function Tracker() {
  const router = useRouter();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<"national" | "county">("national");

  // Get sectors from unified data based on tab
  const sectors = trackerData.sectors.filter(
    (sector) => sector.type === activeTab
  );

  // Scroll animations
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
                  {sectors.map((sector) => (
                    <div
                      key={sector.slug}
                      onClick={() => router.push(`/tracker/sector/${sector.slug}`)}
                      className="group relative rounded-[26px] bg-white border border-black/10 hover:border-black/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer"
                    >
                      {/* Subtle gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          activeTab === "national"
                            ? "from-[#1e40af]/5 via-transparent to-transparent"
                            : "from-[#059669]/5 via-transparent to-transparent"
                        } transition-opacity duration-500 rounded-[26px]`}
                      />

                      {/* Card content */}
                      <div className="relative z-10 p-[26px] flex flex-col">
                        <div className="flex items-start justify-between mb-[16px]">
                          <div className="relative">
                            <div
                              className={`w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-[28px] ${
                                activeTab === "national"
                                  ? "bg-[#1e40af]/10"
                                  : "bg-[#059669]/10"
                              } transition-all duration-500`}
                            >
                              {sector.icon}
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
                              {sector.budget}
                            </p>
                            <p className="text-[11px] font-NeueMontreal uppercase tracking-wider mt-[4px] text-[#212121]/40">
                              Total Allocation
                            </p>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="text-[22px] font-FoundersGrotesk leading-tight text-[#111]">
                            {sector.name}
                          </h3>
                          <div
                            className={`mt-[12px] w-[40px] h-[3px] rounded-full ${
                              activeTab === "national"
                                ? "bg-[#1e40af]"
                                : "bg-[#059669]"
                            } transition-all duration-500`}
                          />
                          <p className="mt-[12px] text-[13px] font-NeueMontreal leading-relaxed text-[#212121]/60">
                            {sector.category} •{" "}
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
                              {sector.status.replace("-", " ")}
                            </span>
                          </div>
                          <span className="text-[12px] font-NeueMontreal text-[#212121]/40 flex items-center gap-[6px] transition-all duration-300">
                            <span>View Details</span>
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
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Yearly Tracker Link */}
                <div className="mt-[40px] grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                  {/* Latest Budget Details Card */}
                  <Link
                    href="/tracker/details/2024"
                    className="rounded-[24px] bg-gradient-to-br from-[#1e40af] to-[#3b82f6] border border-black/10 p-[24px] hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-NeueMontreal uppercase tracking-wide mb-3">
                          📊 KENYA BUDGET 2024/25
                        </span>
                        <h3 className="text-[20px] font-FoundersGrotesk uppercase text-white mb-2">
                          Detailed Analytics
                        </h3>
                        <p className="text-[14px] font-NeueMontreal text-white/70">
                          Explore Ksh 4.0T budget with pie charts, bar graphs, heatmaps, and data science insights.
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-[14px] font-NeueMontreal">
                      <span>Explore Visualizations</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>

                  {/* Browse by Year */}
                  <Link
                    href="/tracker/2000"
                    className="rounded-[24px] bg-white border border-black/10 p-[24px] hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-[#f1f1f1] text-[#666] text-[11px] font-NeueMontreal uppercase tracking-wide mb-3">
                          📅 HISTORICAL DATA
                        </span>
                        <h3 className="text-[20px] font-FoundersGrotesk uppercase text-[#111] mb-2">
                          Browse by Year
                        </h3>
                        <p className="text-[14px] font-NeueMontreal text-[#666]">
                          View budget allocations and project progress from 2000 to present.
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#1e40af]/10 flex items-center justify-center group-hover:bg-[#1e40af]/20 transition-colors">
                        <svg className="w-6 h-6 text-[#1e40af]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#1e40af] text-[14px] font-NeueMontreal">
                      <span>View All Years</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* Footer placeholder */}
          <div className="py-[40px] text-center text-[#212121]/40 text-sm">
            <p>© 2024 Budget Ndio Story</p>
          </div>
        </div>
      </div>
    </>
  );
}
