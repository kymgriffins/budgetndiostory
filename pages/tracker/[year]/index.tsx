import LandingFooter from "@/components/LandingFooter";
import TrackerCard from "@/components/TrackerCard";
import trackerYearlyData from "@/mockdata/tracker-yearly.json";
import { YearlyTrackerData } from "@/mockdata/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface YearTrackerPageProps {
  yearData: YearlyTrackerData | null;
}

export default function YearTrackerPage({ yearData }: YearTrackerPageProps) {
  const router = useRouter();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Handle undefined yearData during static generation
  if (!yearData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f1f1]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#212121] mx-auto mb-4"></div>
          <p className="text-[#212121]">Loading...</p>
        </div>
      </div>
    );
  }

  // Animation effect
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
            return loco?.lenisInstance?.scroll ?? el.scrollTop ?? 0;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
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

  const filteredItems =
    filterStatus === "all"
      ? yearData.items
      : yearData.items.filter((item) => item.status === filterStatus);

  const statusCounts = {
    all: yearData.items.length,
    Completed: yearData.items.filter((i) => i.status === "Completed").length,
    "In Progress": yearData.items.filter((i) => i.status === "In Progress")
      .length,
    Allocated: yearData.items.filter((i) => i.status === "Allocated").length,
    Stalled: yearData.items.filter((i) => i.status === "Stalled").length,
  };

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f1f1]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#212121] mx-auto mb-4"></div>
          <p className="text-[#212121]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          Budget Tracker {yearData.year} - Kenya Government Spending
        </title>
        <meta
          name="description"
          content={`Explore Kenya's government budget spending for ${yearData.year}. Track projects, allocations, and progress across national and county sectors.`}
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
                <Link
                  href="/tracker"
                  className="inline-flex items-center gap-2 text-sm text-[#212121]/60 hover:text-[#212121] mb-[20px] transition-colors"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Tracker
                </Link>

                <div data-hero="sub" className="inline-block mb-[20px]">
                  <span className="px-[14px] py-[8px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/70">
                    📊 {yearData.year} Budget Tracker
                  </span>
                </div>

                <h1
                  data-hero="title"
                  className="sub-heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]"
                >
                  Where the Money Went: {yearData.year}
                </h1>

                <p
                  data-hero="sub"
                  className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]"
                >
                  Visual indicators of Kenya's government spending for{" "}
                  {yearData.year}. Track allocations, progress, and outcomes.
                </p>

                {/* Stats Overview */}
                <div
                  data-animate="fade-up"
                  className="mt-[32px] grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-2xl font-FoundersGrotesk font-bold text-[#111]">
                      {yearData.totalBudget}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Total Budget
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-2xl font-FoundersGrotesk font-bold text-green-600">
                      {yearData.completed}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Completed</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-2xl font-FoundersGrotesk font-bold text-blue-600">
                      {yearData.inProgress}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      In Progress
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-2xl font-FoundersGrotesk font-bold text-[#111]">
                      {yearData.totalProjects}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Total Projects
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FILTERS */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="flex flex-wrap items-center gap-3"
                >
                  <span className="text-sm font-medium text-gray-600">
                    Filter by Status:
                  </span>
                  {[
                    { key: "all", label: "All", color: "bg-gray-600" },
                    {
                      key: "Completed",
                      label: "Completed",
                      color: "bg-green-500",
                    },
                    {
                      key: "In Progress",
                      label: "In Progress",
                      color: "bg-blue-500",
                    },
                    {
                      key: "Allocated",
                      label: "Allocated",
                      color: "bg-yellow-500",
                    },
                    { key: "Stalled", label: "Stalled", color: "bg-red-500" },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setFilterStatus(filter.key)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        filterStatus === filter.key
                          ? "bg-[#212121] text-white shadow-lg"
                          : "bg-white text-[#212121] border border-gray-200 hover:border-[#212121]"
                      }`}
                    >
                      {filter.label}
                      <span className="ml-2 opacity-60">
                        ({statusCounts[filter.key as keyof typeof statusCounts]}
                        )
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* PROJECTS GRID */}
            <section className="padding-x padding-y bg-[#fafafa]">
              <div className="max-w-[1200px] mx-auto">
                <div data-animate="fade-up" className="mb-[32px]">
                  <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                    Tracked Items {yearData.year}
                  </h2>
                  <p className="mt-[8px] paragraph font-NeueMontreal text-[#212121]/70 max-w-[600px]">
                    {filteredItems.length} items found. Click on any item to
                    view detailed information.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <TrackerCard
                      key={item.id}
                      item={item}
                      year={yearData.year}
                    />
                  ))}
                </div>

                {filteredItems.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No items match the selected filter.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* YEAR NAVIGATION */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="bg-white rounded-xl p-6 border border-gray-200"
                >
                  <h3 className="font-FoundersGrotesk text-lg font-semibold text-[#111] mb-4">
                    Browse Other Years
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trackerYearlyData.years.map((year) => (
                      <Link
                        key={year.year}
                        href={`/tracker/${year.year}`}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          year.year === yearData.year
                            ? "bg-[#212121] text-white"
                            : "bg-gray-100 text-[#212121] hover:bg-gray-200"
                        }`}
                      >
                        {year.year}
                      </Link>
                    ))}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = trackerYearlyData.years.map((year) => ({
    params: { year: year.year.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const year = parseInt(params?.year as string);
  const yearData = trackerYearlyData.years.find((y) => y.year === year);

  if (!yearData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      yearData,
    },
    revalidate: 60,
  };
};
