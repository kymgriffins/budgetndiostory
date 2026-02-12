import LandingFooter from "@/components/LandingFooter";
import { shorts } from "@/mockdata";
import { ShortVideo } from "@/mockdata/types";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ShortType =
  | "skit"
  | "short"
  | "explainer"
  | "comedy"
  | "Skit"
  | "Short"
  | "Explainer"
  | "Comedy"
  | "Interview";

export default function Shorts() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<"all" | ShortType>("all");

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

  const filteredShorts = shorts;

  const featuredShort =
    shorts.find((s: ShortVideo) => s.isFeatured) || shorts[0];

  const getTypeBadge = (type: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      skit: {
        label: "Skit",
        color: "bg-pink-500/10 text-pink-600 border-pink-500/20",
      },
      short: {
        label: "Short",
        color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      },
      explainer: {
        label: "Explainer",
        color: "bg-green-500/10 text-green-600 border-green-500/20",
      },
      comedy: {
        label: "Comedy",
        color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      },
      Skit: {
        label: "Skit",
        color: "bg-pink-500/10 text-pink-600 border-pink-500/20",
      },
      Explainer: {
        label: "Explainer",
        color: "bg-green-500/10 text-green-600 border-green-500/20",
      },
      Comedy: {
        label: "Comedy",
        color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      },
      Interview: {
        label: "Interview",
        color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      },
    };
    const badge = badges[type] || {
      label: type,
      color: "bg-gray-500/10 text-gray-600 border-gray-500/20",
    };
    return (
      <span
        className={`px-[10px] py-[4px] rounded-full border ${badge.color} text-[11px] font-NeueMontreal font-medium`}
      >
        {badge.label}
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Skits & Shorts - Budget Ndio Story</title>
        <meta
          name="description"
          content="Funny, sharp, and shareable skits and short videos about Kenya's budget."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        ref={scrollerRef}
        data-scroll-container
        className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#fafafa] text-[#212121]"
        style={{ position: "relative" }}
      >
        <div ref={contentRef} data-scroll-content>
          <div className="h-[8vh]" />

          <a
            href="#shorts-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full"
          >
            Skip to content
          </a>

          <main id="shorts-content" className="w-full">
            {/* HERO */}
            <section className="padding-x pt-[36px] smOnly:pt-[28px] xm:pt-[22px]">
              <div className="max-w-[1200px] mx-auto w-full">
                <div
                  data-hero="sub"
                  className="inline-flex items-center gap-[8px] px-[14px] py-[8px] rounded-full bg-[#212121]/5 border border-[#212121]/10 mb-[20px]"
                >
                  <span className="text-[16px]">🎬</span>
                  <span className="text-[13px] font-NeueMontreal font-medium text-[#212121]/70">
                    Funny. Sharp. Shareable.
                  </span>
                </div>

                <h1
                  data-hero="title"
                  className="heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]"
                >
                  Skits & Shorts
                </h1>

                <p
                  data-hero="sub"
                  className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]"
                >
                  Because sometimes the best way to understand the budget is to
                  laugh at it. Then think about it.
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
                  <Link
                    href="#videos"
                    className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition"
                  >
                    Watch Now
                  </Link>
                </div>
              </div>
            </section>

            {/* FEATURED SHORT */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div data-animate="fade-up" className="mb-[12px]">
                  <span className="text-[12px] font-NeueMontreal font-medium text-[#212121]/50 uppercase tracking-[0.15em]">
                    Trending Now
                  </span>
                </div>

                <div
                  data-animate="fade-up"
                  className="rounded-[24px] overflow-hidden bg-white border border-[#212121]/8 hover:border-[#212121]/15 transition-all duration-300 hover:shadow-[0_25px_80px_rgba(0,0,0,0.1)]"
                >
                  <div className="grid grid-cols-12 gap-0">
                    <div className="col-span-7 p-[36px] flex flex-col justify-center mdOnly:col-span-12 smOnly:col-span-12 xm:col-span-12">
                      <div className="flex items-center gap-[12px] mb-[16px] flex-wrap">
                        <span className="px-[12px] py-[6px] rounded-full bg-[#212121]/5 border border-[#212121]/10 text-[12px] font-NeueMontreal font-medium text-[#212121]/60">
                          {featuredShort.category}
                        </span>
                        <span className="px-[12px] py-[6px] rounded-full bg-green-500/10 border border-green-500/20 text-[12px] font-NeueMontreal font-medium text-green-600">
                          ⭐ Featured
                        </span>
                      </div>
                      <h3 className="text-[28px] font-FoundersGrotesk font-medium text-[#111] leading-[1.2] mdOnly:text-[24px] smOnly:text-[20px] xm:text-[20px]">
                        {featuredShort.title}
                      </h3>
                      <p className="mt-[16px] text-[15px] font-NeueMontreal text-[#212121]/60 leading-[1.65] max-w-[480px]">
                        {featuredShort.description}
                      </p>
                      <div className="mt-[20px] flex items-center gap-[16px] flex-wrap">
                        <span className="text-[14px] font-NeueMontreal text-[#212121]/50">
                          {featuredShort.duration}
                        </span>
                        <span className="w-[4px] h-[4px] rounded-full bg-[#212121]/20"></span>
                        <span className="text-[14px] font-NeueMontreal text-[#212121]/50">
                          ❤️ {featuredShort.likes}
                        </span>
                      </div>
                      <div className="mt-[24px] flex items-center gap-[12px]">
                        <button className="px-[20px] py-[14px] rounded-full bg-[#212121] text-white text-[14px] font-NeueMontreal font-medium hover:opacity-90 transition flex items-center gap-[8px]">
                          <span>▶</span> Watch Now
                        </button>
                        <button className="w-[44px] h-[44px] rounded-full border border-[#212121]/25 text-[#212121] flex items-center justify-center hover:bg-[#212121]/5 transition">
                          📤
                        </button>
                      </div>
                    </div>
                    <div className="col-span-5 relative overflow-hidden mdOnly:col-span-12 mdOnly:h-[200px] smOnly:col-span-12 smOnly:h-[180px] xm:col-span-12 xm:h-[160px]">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400"></div>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-[80px] h-[80px] rounded-full bg-white/90 flex items-center justify-center text-[36px] hover:scale-110 transition shadow-xl">
                          ▶
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-[16px] bg-gradient-to-t from-black/30 to-transparent">
                        <span className="text-[12px] font-NeueMontreal text-white/80">
                          Watch • 1 min
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FILTER */}
            <section className="padding-x">
              <div className="max-w-[1200px] mx-auto">
                <div className="flex items-center gap-[12px] flex-wrap">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-[16px] py-[10px] rounded-full whitespace-nowrap transition-all duration-200 text-[14px] font-NeueMontreal font-medium ${filter === "all" ? "bg-[#212121] text-white shadow-lg shadow-[#212121]/10" : "bg-[#f5f5f5] text-[#212121]/60 hover:bg-[#212121]/5 hover:text-[#212121]"}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("skit")}
                    className={`px-[16px] py-[10px] rounded-full whitespace-nowrap transition-all duration-200 text-[14px] font-NeueMontreal font-medium ${filter === "skit" ? "bg-pink-500 text-white shadow-lg shadow-pink-500/10" : "bg-[#f5f5f5] text-[#212121]/60 hover:bg-[#212121]/5 hover:text-[#212121]"}`}
                  >
                    Skits
                  </button>
                  <button
                    onClick={() => setFilter("short")}
                    className={`px-[16px] py-[10px] rounded-full whitespace-nowrap transition-all duration-200 text-[14px] font-NeueMontreal font-medium ${filter === "short" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/10" : "bg-[#f5f5f5] text-[#212121]/60 hover:bg-[#212121]/5 hover:text-[#212121]"}`}
                  >
                    Shorts
                  </button>
                  <button
                    onClick={() => setFilter("explainer")}
                    className={`px-[16px] py-[10px] rounded-full whitespace-nowrap transition-all duration-200 text-[14px] font-NeueMontreal font-medium ${filter === "explainer" ? "bg-green-500 text-white shadow-lg shadow-green-500/10" : "bg-[#f5f5f5] text-[#212121]/60 hover:bg-[#212121]/5 hover:text-[#212121]"}`}
                  >
                    Explainers
                  </button>
                  <button
                    onClick={() => setFilter("comedy")}
                    className={`px-[16px] py-[10px] rounded-full whitespace-nowrap transition-all duration-200 text-[14px] font-NeueMontreal font-medium ${filter === "comedy" ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/10" : "bg-[#f5f5f5] text-[#212121]/60 hover:bg-[#212121]/5 hover:text-[#212121]"}`}
                  >
                    Comedy
                  </button>
                </div>
              </div>
            </section>

            {/* ALL SHORTS GRID */}
            <section id="videos" className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div data-animate="fade-up" className="mb-[22px]">
                  <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                    All Shorts
                  </h2>
                </div>

                <div className="grid grid-cols-4 gap-[16px] lg:grid-cols-3 mdOnly:grid-cols-2 smOnly:grid-cols-1 xm:grid-cols-1">
                  {filteredShorts.map((short) => (
                    <div
                      key={short.id}
                      className="rounded-[20px] overflow-hidden bg-white border border-[#212121]/8 group cursor-pointer hover:border-[#212121]/15 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300"
                    >
                      <div className="relative h-[200px] overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${short.color}`}
                        ></div>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="w-[56px] h-[56px] rounded-full bg-white/90 flex items-center justify-center text-[24px] group-hover:bg-white group-hover:scale-110 transition shadow-lg">
                            ▶
                          </button>
                        </div>
                        <div className="absolute top-[12px] right-[12px]">
                          <span className="px-[10px] py-[4px] rounded-full bg-black/40 backdrop-blur-sm text-[11px] font-NeueMontreal text-white">
                            {short.duration}
                          </span>
                        </div>
                      </div>
                      <div className="p-[16px]">
                        <div className="flex items-center gap-[8px] mb-[10px]">
                          <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-br from-[#212121]/10 to-[#212121]/5 flex items-center justify-center text-[20px]">
                            {short.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-FoundersGrotesk font-medium text-[#111] line-clamp-1">
                              {short.title}
                            </h3>
                            <div className="flex items-center gap-[8px] mt-[4px]">
                              {getTypeBadge(short.type)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-[8px]">
                          <span className="text-[12px] font-NeueMontreal text-[#212121]/50">
                            ❤️ {short.likes}
                          </span>
                          <div className="flex gap-[6px]">
                            <button className="w-[32px] h-[32px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#212121]/50 hover:bg-[#212121] hover:text-white transition text-[14px]">
                              📤
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredShorts.length === 0 && (
                  <div className="text-center py-[60px]">
                    <span className="text-[48px] block mb-[16px]">🎬</span>
                    <p className="text-[18px] font-NeueMontreal text-[#212121]/50">
                      No shorts found for this filter.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* SUBMISSION CTA */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="rounded-[24px] bg-[#111] p-[36px] md:p-[28px] smOnly:p-[24px] xm:p-[20px] flex items-center justify-between gap-[24px] flex-wrap"
                >
                  <div className="flex-1 min-w-[280px]">
                    <h3 className="text-[24px] font-FoundersGrotesk font-medium text-white leading-[1.2] mdOnly:text-[22px] smOnly:text-[20px] xm:text-[20px]">
                      Made a Budget Skit?
                    </h3>
                    <p className="mt-[10px] text-[14px] font-NeueMontreal text-white/60 max-w-[380px] leading-[1.6]">
                      We want to feature creators who make content about the
                      budget. Submit your skit or short video.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="px-[20px] py-[14px] rounded-full bg-white text-[#111] text-[14px] font-NeueMontreal font-medium hover:opacity-90 transition flex-shrink-0"
                  >
                    Submit Video
                  </Link>
                </div>
              </div>
            </section>

            {/* EXPLORE MORE */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="rounded-[24px] bg-white border border-[#212121]/8 p-[26px] flex items-center justify-between gap-[24px] flex-wrap hover:border-[#212121]/15 transition-all duration-300"
                >
                  <div>
                    <h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                      Looking for Deeper Stories?
                    </h3>
                    <p className="mt-[10px] paragraph font-NeueMontreal text-[#212121]/60 max-w-[400px] leading-[1.6]">
                      Read full investigations, listen to podcasts, or watch
                      documentaries.
                    </p>
                  </div>
                  <div className="flex items-center gap-[12px] flex-wrap">
                    <Link
                      href="/blog"
                      className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition"
                    >
                      Stories
                    </Link>
                    <Link
                      href="/podcasts"
                      className="px-[18px] py-[12px] rounded-full bg-[#212121]/5 border border-[#212121]/10 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/10 transition"
                    >
                      Podcasts
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
