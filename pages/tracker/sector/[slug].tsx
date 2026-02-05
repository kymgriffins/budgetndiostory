import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import unifiedTrackerData from "@/mockdata/tracker-unified.json";
import { TrackerSectorItem, UnifiedTrackerData } from "@/mockdata/types";

// Cast the imported JSON to the proper type
const trackerData = unifiedTrackerData as unknown as UnifiedTrackerData;

// Define valid status keys
type StatusKey = "Allocated" | "In Progress" | "Completed" | "Stalled";

const statusColors: Record<StatusKey, string> = {
  Allocated: "bg-blue-500",
  "In Progress": "bg-yellow-500",
  Completed: "bg-green-500",
  Stalled: "bg-red-500",
};

// Helper function to safely get status color
function getStatusColor(status: string): string {
  return statusColors[status as StatusKey] || "bg-gray-500";
}

export default function TrackerSectorDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Find the sector from unified data
  const sector = trackerData.sectors.find((s) => s.slug === slug);

  // Animation on mount
  useEffect(() => {
    if (!sector) return;

    let gsapModule: any;
    let gsap: any;
    let cancelled = false;

    (async () => {
      try {
        gsapModule = await import("gsap");
        gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;

        if (cancelled || !gsap) return;

        const animationCtx = gsap.context(() => {
          // Header animation
          gsap.fromTo(
            "[data-header]",
            {
              opacity: 0,
              y: -30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            },
          );

          // Bento grid cards with stagger
          const bentoCards = gsap.utils.toArray("[data-bento-card]");
          gsap.fromTo(
            bentoCards as unknown as HTMLElement[],
            {
              opacity: 0,
              y: 40,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              delay: 0.3,
            },
          );

          // Progress bar animation
          const progressBar = document.querySelector(
            "[data-progress]",
          ) as HTMLElement;
          if (progressBar) {
            const targetWidth = progressBar.style.width;
            gsap.fromTo(
              progressBar,
              {
                width: "0%",
              },
              {
                width: targetWidth,
                duration: 1,
                ease: "power2.out",
                delay: 0.8,
              },
            );
          }
        });

        return () => {
          cancelled = true;
          animationCtx.revert();
        };
      } catch (err) {
        console.error("Animation error:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sector]);

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

  if (!sector) {
    return (
      <>
        <Head>
          <title>Sector Not Found | Budget Ndio Story</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-[#f1f1f1]">
          <div className="text-center">
            <h1 className="text-2xl font-FoundersGrotesk text-[#111] mb-4">
              Sector Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The budget sector you're looking for could not be found.
            </p>
            <Link
              href="/tracker"
              className="px-6 py-3 rounded-full bg-[#212121] text-white font-NeueMontreal"
            >
              Back to Tracker
            </Link>
          </div>
        </div>
      </>
    );
  }

  const isNational = sector.type === "national";

  return (
    <>
      <Head>
        <title>
          {sector.name} - {sector.budget} Budget | Budget Ndio Story
        </title>
        <meta name="description" content={sector.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        ref={scrollerRef}
        data-scroll-container
        className="relative min-h-screen overflow-y-auto overflow-x-hidden bg-[#f8f9fa]"
        style={{ position: "relative" }}
      >
        <div ref={contentRef} data-scroll-content>
          {/* Spacer for fixed navbar */}
          <div className="h-[8vh]" />

          {/* Back Navigation */}
          <div className="padding-x pt-6">
            <div className="max-w-[1200px] mx-auto">
              <Link
                href="/tracker"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/10 text-[#212121] hover:bg-[#f5f5f5] transition-colors font-NeueMontreal text-[14px]"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Tracker
              </Link>
            </div>
          </div>

          {/* Header Section */}
          <section className="padding-x padding-y">
            <div className="max-w-[1200px] mx-auto">
              <div
                data-header
                className="bg-white rounded-[32px] p-8 md:p-12 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div
                    className={`w-[100px] h-[100px] rounded-[24px] flex items-center justify-center text-[48px] ${
                      isNational ? "bg-[#1e40af]/10" : "bg-[#059669]/10"
                    }`}
                  >
                    {sector.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[12px] font-NeueMontreal uppercase tracking-wide ${
                          isNational
                            ? "bg-[#1e40af]/10 text-[#1e40af]"
                            : "bg-[#059669]/10 text-[#059669]"
                        }`}
                      >
                        {sector.county} Government
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[12px] font-NeueMontreal capitalize ${
                          sector.status === "Allocated"
                            ? "bg-[#dbeafe] text-[#1e40af]"
                            : sector.status === "In Progress"
                              ? "bg-[#fef3c7] text-[#d97706]"
                              : "bg-[#dcfce7] text-[#16a34a]"
                        }`}
                      >
                        {sector.status}
                      </span>
                    </div>
                    <h1 className="text-[36px] md:text-[48px] font-FoundersGrotesk font-medium text-[#111] leading-tight">
                      {sector.name}
                    </h1>
                    <p className="mt-4 text-[20px] font-NeueMontreal text-[#212121]/70">
                      {sector.budget} • {sector.category}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-black/10">
                  <p className="text-[18px] font-NeueMontreal text-[#212121]/80 leading-relaxed max-w-[800px]">
                    {sector.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Grid Layout */}
          <section className="padding-x pb-12">
            <div className="max-w-[1200px] mx-auto">
              {/* Row 1: Data Chain and Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Data Chain - Spans 2 columns */}
                <div
                  data-bento-card
                  className="bg-white rounded-[24px] p-6 shadow-md md:col-span-2"
                >
                  <p className="text-[12px] font-NeueMontreal text-[#1e40af] uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1e40af]" />
                    Key Details
                  </p>
                  <div className="space-y-4">
                    {sector.impact && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
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
                          <div className="text-sm text-gray-500">Impact</div>
                          <div className="font-medium">{sector.impact}</div>
                        </div>
                      </div>
                    )}
                    {sector.timeline && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
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
                          <div className="text-sm text-gray-500">Timeline</div>
                          <div className="font-medium">{sector.timeline}</div>
                        </div>
                      </div>
                    )}
                    {sector.breakdown && sector.breakdown.length > 0 && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-purple-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Breakdown</div>
                          <div className="font-medium">
                            {Array.isArray(sector.breakdown)
                              ? sector.breakdown.join(", ")
                              : sector.breakdown}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Card */}
                <div
                  data-bento-card
                  className="bg-white rounded-[24px] p-6 shadow-md"
                >
                  <p className="text-[12px] font-NeueMontreal text-[#1e40af] uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1e40af]" />
                    Status
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-4 h-4 rounded-full ${getStatusColor(sector.status)}`}
                    />
                    <span className="font-medium">{sector.status}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getStatusColor(sector.status)}`}
                      style={{
                        width:
                          sector.status === "Allocated"
                            ? "100%"
                            : sector.status === "In Progress"
                              ? "50%"
                              : "0%",
                      }}
                    />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {sector.status === "Allocated"
                      ? "Fully Allocated"
                      : sector.status}
                  </div>
                </div>
              </div>

              {/* Row 2: Budget and Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Budget */}
                <div
                  data-bento-card
                  className="bg-white rounded-[24px] p-6 shadow-md"
                >
                  <p className="text-[12px] font-NeueMontreal text-[#1e40af] uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1e40af]" />
                    Budget
                  </p>
                  <div className="text-3xl font-FoundersGrotesk font-bold text-[#111]">
                    {sector.budget}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Total Allocation</p>
                </div>

                {/* Category */}
                <div
                  data-bento-card
                  className="bg-white rounded-[24px] p-6 shadow-md"
                >
                  <p className="text-[12px] font-NeueMontreal text-[#1e40af] uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1e40af]" />
                    Category
                  </p>
                  <div className="text-xl font-FoundersGrotesk font-bold text-[#111]">
                    {sector.category}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {sector.county} Sector
                  </p>
                </div>

                {/* Type */}
                <div
                  data-bento-card
                  className="bg-white rounded-[24px] p-6 shadow-md"
                >
                  <p className="text-[12px] font-NeueMontreal text-[#1e40af] uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1e40af]" />
                    Government Type
                  </p>
                  <div className="text-xl font-FoundersGrotesk font-bold text-[#111]">
                    {isNational ? "National" : "County"}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {isNational
                      ? "Central government spending"
                      : "Devolved county spending"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="padding-x pb-12">
            <div className="max-w-[1200px] mx-auto">
              <Link
                href="/tracker"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#212121] text-white font-NeueMontreal hover:bg-[#333] transition-colors"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Tracker
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
