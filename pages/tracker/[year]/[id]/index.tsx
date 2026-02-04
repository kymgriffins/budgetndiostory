import LandingFooter from "@/components/LandingFooter";
import trackerYearlyData from "@/mockdata/tracker-yearly.json";
import { YearlyTrackerItem } from "@/mockdata/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

interface ItemDetailPageProps {
  item: YearlyTrackerItem;
  year: number;
  yearData: any;
}

// Define valid status keys
type StatusKey = "Completed" | "In Progress" | "Allocated" | "Stalled";

const statusColors: Record<StatusKey, string> = {
  Completed: "bg-green-500",
  "In Progress": "bg-blue-500",
  Allocated: "bg-yellow-500",
  Stalled: "bg-red-500",
};

// Helper function to safely get status color
export function getStatusColor(status: string): string {
  return statusColors[status as StatusKey] || "bg-gray-500";
}

export default function ItemDetailPage({
  item,
  year,
  yearData,
}: ItemDetailPageProps) {
  const router = useRouter();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

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
          {item.title} - {year} Budget Tracker | Budget Ndio Story
        </title>
        <meta name="description" content={item.description} />
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
            href="#item-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full"
          >
            Skip to content
          </a>

          <main id="item-content" className="w-full relative z-10">
            {/* HERO */}
            <section className="padding-x pt-[36px] smOnly:pt-[28px] xm:pt-[22px]">
              <div className="max-w-[1200px] mx-auto w-full">
                <Link
                  href={`/tracker/${year}`}
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
                  Back to {year} Tracker
                </Link>

                <div
                  data-hero="sub"
                  className="inline-flex items-center gap-3 mb-[20px]"
                >
                  <span className="px-[14px] py-[8px] rounded-full bg-black/5 border border-black/10 small-text font-NeueMontreal text-[#212121]/70">
                    📊 {year} Budget Tracker
                  </span>
                  <span className="px-[14px] py-[8px] rounded-full bg-gray-200 small-text font-NeueMontreal text-[#212121]/70">
                    {item.category}
                  </span>
                  <span
                    className={`px-[14px] py-[8px] rounded-full text-white small-text font-NeueMontreal ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>

                <h1
                  data-hero="title"
                  className="sub-heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]"
                >
                  {item.title}
                </h1>

                <p
                  data-hero="sub"
                  className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[700px]"
                >
                  {item.description}
                </p>

                {/* Quick Stats */}
                <div
                  data-animate="fade-up"
                  className="mt-[32px] grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-sm text-gray-500">Budget</div>
                    <div className="text-xl font-FoundersGrotesk font-bold text-[#111]">
                      {item.budget}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-sm text-gray-500">Allocated</div>
                    <div className="text-xl font-FoundersGrotesk font-bold text-blue-600">
                      {item.allocated}%
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-sm text-gray-500">Progress</div>
                    <div className="text-xl font-FoundersGrotesk font-bold text-[#111]">
                      {item.progress}%
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="text-sm text-gray-500">Sector</div>
                    <div className="text-xl font-FoundersGrotesk font-bold text-emerald-600">
                      {item.sector}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* DETAILS */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Progress Section */}
                    <div
                      data-animate="fade-up"
                      className="bg-white rounded-xl p-6 border border-gray-200"
                    >
                      <h2 className="font-FoundersGrotesk text-lg font-semibold text-[#111] mb-4">
                        Progress Overview
                      </h2>
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-500">
                            Overall Progress
                          </span>
                          <span className="font-medium">{item.progress}%</span>
                        </div>
                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              item.status === "Completed"
                                ? "bg-green-500"
                                : item.status === "In Progress"
                                  ? "bg-blue-500"
                                  : item.status === "Allocated"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500">Category</div>
                          <div className="font-medium">{item.category}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-500">Sector</div>
                          <div className="font-medium">{item.sector}</div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div
                      data-animate="fade-up"
                      className="bg-white rounded-xl p-6 border border-gray-200"
                    >
                      <h2 className="font-FoundersGrotesk text-lg font-semibold text-[#111] mb-4">
                        Description
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Info Card */}
                    <div
                      data-animate="fade-up"
                      className="bg-white rounded-xl p-6 border border-gray-200"
                    >
                      <h3 className="font-FoundersGrotesk text-lg font-semibold text-[#111] mb-4">
                        Project Details
                      </h3>
                      <div className="space-y-4">
                        {item.beneficiaries && (
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-5 h-5 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">
                                Beneficiaries
                              </div>
                              <div className="font-medium">
                                {item.beneficiaries}
                              </div>
                            </div>
                          </div>
                        )}
                        {item.quarter && (
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-5 h-5 text-emerald-600"
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
                            <div>
                              <div className="text-sm text-gray-500">
                                Timeline
                              </div>
                              <div className="font-medium">{item.quarter}</div>
                            </div>
                          </div>
                        )}
                        {item.completionDate && (
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-5 h-5 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">
                                Completion Date
                              </div>
                              <div className="font-medium">
                                {item.completionDate}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status Card */}
                    <div
                      data-animate="fade-up"
                      className="bg-white rounded-xl p-6 border border-gray-200"
                    >
                      <h3 className="font-FoundersGrotesk text-lg font-semibold text-[#111] mb-4">
                        Status
                      </h3>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${getStatusColor(item.status)}`}
                        />
                        <span className="font-medium">{item.status}</span>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-gray-500 mb-1">
                          Allocation
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getStatusColor(item.status)}`}
                            style={{ width: `${item.allocated}%` }}
                          />
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.allocated}% funded
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* NAVIGATION */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="bg-white rounded-xl p-6 border border-gray-200"
                >
                  <h3 className="font-FoundersGrotesk text-lg font-semibold text-[#111] mb-4">
                    Explore More in {year}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/tracker/${year}`}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-[#212121] text-white hover:bg-[#333] transition-colors"
                    >
                      View All {year} Items
                    </Link>
                    {yearData.items
                      .filter((i: YearlyTrackerItem) => i.id !== item.id)
                      .slice(0, 3)
                      .map((otherItem: YearlyTrackerItem) => (
                        <Link
                          key={otherItem.id}
                          href={`/tracker/${year}/${otherItem.id}`}
                          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-[#212121] hover:bg-gray-200 transition-colors"
                        >
                          {otherItem.title.substring(0, 30)}...
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
  const paths: any[] = [];

  trackerYearlyData.years.forEach((yearData) => {
    yearData.items.forEach((item) => {
      paths.push({
        params: {
          year: yearData.year.toString(),
          id: item.id,
        },
      });
    });
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const year = parseInt(params?.year as string);
  const itemId = params?.id as string;

  const yearData = trackerYearlyData.years.find((y) => y.year === year);
  const item = yearData?.items.find((i) => i.id === itemId);

  if (!yearData || !item) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      item,
      year,
      yearData,
    },
    revalidate: 60,
  };
};
