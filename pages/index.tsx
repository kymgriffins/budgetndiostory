import LandingFooter from "@/components/LandingFooter";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

        // Ensure correct offset calculations for scrollerProxy
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
          scrollCallback: () => {
            ScrollTrigger.update();
            // Update scroll progress
            const scrollHeight = el.scrollHeight - window.innerHeight;
            const progress = (el.scrollTop / scrollHeight) * 100;
            setScrollProgress(progress);
          },
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
          // Hero reveal with enhanced animations
          gsap.fromTo(
            "[data-hero='sub']",
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
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
            }
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
            }
          );

          // Enhanced fade-up elements
          (
            gsap.utils.toArray("[data-animate='fade-up']") as HTMLElement[]
          ).forEach((node) => {
            gsap.fromTo(
              node,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: node, start: "top 85%" },
              }
            );
          });

          // Stagger feature cards with enhanced effects
          (
            gsap.utils.toArray("[data-animate='cards']") as HTMLElement[]
          ).forEach((wrap) => {
            const cards = wrap.querySelectorAll<HTMLElement>(
              "[data-animate='card']"
            );
            if (!cards.length) return;
            gsap.fromTo(
              cards,
              { y: 40, opacity: 0, scale: 0.95 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: { trigger: wrap, start: "top 80%" },
              }
            );
          });

          // Parallax effect for hero elements
          gsap.to("[data-parallax='hero']", {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-parallax='hero']",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          // Animated counter for stats
          (
            gsap.utils.toArray("[data-counter]") as HTMLElement[]
          ).forEach((node) => {
            const target = parseInt(node.getAttribute("data-counter") || "0");
            gsap.fromTo(
              node,
              { innerText: 0 },
              {
                innerText: target,
                duration: 2,
                ease: "power2.out",
                snap: { innerText: 1 },
                scrollTrigger: { trigger: node, start: "top 85%" },
              }
            );
          });

          // Scale on scroll for cards
          (
            gsap.utils.toArray("[data-scale='card']") as HTMLElement[]
          ).forEach((node) => {
            gsap.fromTo(
              node,
              { scale: 0.9, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: node,
                  start: "top 75%",
                  end: "bottom top",
                  scrub: 1,
                },
              }
            );
          });
        }, el);

        ScrollTrigger.refresh();
        loco?.resize?.();
      } catch {
        // no-op: page still renders without smooth scroll
      }
    })();

    return () => {
      cancelled = true;
      try {
        ctx?.revert?.();
        loco?.destroy?.();
      } catch {
        // no-op
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Budget Ndio Story — The Kenyan Budget, Told Clearly</title>
        <meta
          name="description"
          content="Budget Ndio Story translates national and county budgets into short, verifiable stories that help citizens understand where public money goes and how to act."
        />
        <meta
          property="og:title"
          content="Budget Ndio Story — Civic Budget Stories"
        />
        <meta
          property="og:description"
          content="Track. Verify. Act. Stories, reports and multimedia that make public budgets clear and accountable."
        />
        <meta name="theme-color" content="#f1f1f1" />
      </Head>

      {/* Sticky Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#f1f1f1] z-[1000]">
        <div
          className="h-full bg-[#212121] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

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
            href="#landing-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full"
          >
            Skip to content
          </a>

          <main id="landing-content">
            {/* TRUST BADGES */}
            <section className="padding-x pt-[16px]">
              {/* <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="flex items-center justify-center gap-[32px] flex-wrap"
                >
                  <span className="text-[11px] uppercase tracking-[0.15em] font-NeueMontreal text-[#212121]/50">
                    Trusted by citizens across Kenya
                  </span>
                  <div className="flex items-center gap-[24px] flex-wrap justify-center">
                    <div className="h-[28px] w-[80px] bg-[#212121]/10 rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-NeueMontreal text-[#212121]/60">Media</span>
                    </div>
                    <div className="h-[28px] w-[80px] bg-[#212121]/10 rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-NeueMontreal text-[#212121]/60">Partners</span>
                    </div>
                    <div className="h-[28px] w-[80px] bg-[#212121]/10 rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-NeueMontreal text-[#212121]/60">Awards</span>
                    </div>
                  </div>
                </div>
              </div> */}
            </section>

            {/* HERO */}
            <section className="padding-x pt-[40px] smOnly:pt-[28px] xm:pt-[24px]">
              <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-2 gap-[40px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1 items-start">
                  <div data-parallax="hero">
                    <div
                      data-animate="fade-up"
                      className="inline-block px-[14px] py-[8px] rounded-full bg-[#00ff85]/20 border border-[#00ff85]/30 mb-[20px]"
                    >
                      <span className="text-[11px] uppercase tracking-[0.12em] font-NeueMontreal text-[#00aa55]">
                        Civic Transparency
                      </span>
                    </div>
                    <p
                      data-hero="sub"
                      className="text-[13px] tracking-[0.2em] uppercase font-NeueMontreal text-[#212121]/70"
                    >
                      The Kenyan Budget, Told as a Story
                    </p>
                    <h1
                      data-hero="title"
                      className="font-FoundersGrotesk uppercase text-[#111] tracking-[-0.03em] mt-[16px] leading-[0.86] text-[clamp(56px,11vw,180px)]"
                    >
                      The Kenyan Budget.
                      <br />
                      <span className="text-[#00aa55]">Explained.</span>
                    </h1>
                    <p
                      data-animate="fade-up"
                      className="mt-[22px] font-NeueMontreal text-[#212121]/80 text-[clamp(17px,2.3vw,24px)] leading-[1.5] max-w-[58ch]"
                    >
                      Budget Ndio Story turns complex budgets into clear, local
                      narratives—videos, field reports, and photo essays that show
                      where your tax money actually goes.
                    </p>

                    <div
                      data-hero="cta"
                      className="mt-[28px] flex items-center gap-[14px] flex-wrap"
                    >
                      <Link
                        href="/edustories"
                        className="group px-[22px] py-[14px] rounded-full bg-[#212121] text-[#f1f1f1] paragraph font-NeueMontreal hover:bg-[#00aa55] hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <span className="flex items-center gap-[8px]">
                          Explore Stories
                          <svg className="w-[16px] h-[16px] group-hover:translate-x-[4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </Link>
                      <Link
                        href="/contact"
                        className="px-[22px] py-[14px] rounded-full border border-[#212121]/30 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 hover:border-[#212121] transition-all duration-300"
                      >
                        Report a Finding
                      </Link>
                      <Link
                        href="/participate"
                        className="px-[22px] py-[14px] rounded-full border border-[#212121]/30 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121]/5 hover:border-[#212121] transition-all duration-300"
                      >
                        Get Involved
                      </Link>
                    </div>

                    <div
                      data-animate="fade-up"
                      className="mt-[24px] flex gap-[10px] flex-wrap"
                    >
                      <span className="px-[14px] py-[10px] rounded-full bg-white/80 border border-black/5 small-text font-NeueMontreal text-[#212121]/70 shadow-sm">
                        National Budgets
                      </span>
                      <span className="px-[14px] py-[10px] rounded-full bg-white/80 border border-black/5 small-text font-NeueMontreal text-[#212121]/70 shadow-sm">
                        County Stories
                      </span>
                      <span className="px-[14px] py-[10px] rounded-full bg-white/80 border border-black/5 small-text font-NeueMontreal text-[#212121]/70 shadow-sm">
                        Civic Action
                      </span>
                    </div>
                  </div>

                  <div className="w-full">
                    <div
                      data-animate="fade-up"
                      className="rounded-[32px] overflow-hidden bg-[#111] border border-black/10 shadow-[0_30px_100px_rgba(0,0,0,0.15)]"
                    >
                      <div className="p-[26px] smOnly:p-[20px] xm:p-[18px]">
                        <p className="font-NeueMontreal text-[#f1f1f1]/95 text-[18px] leading-[1.6]">
                          "Hii budget ni yako. If you don't understand it,
                          someone else will decide your future."
                        </p>
                        <div className="mt-[20px] grid grid-cols-3 gap-[12px] smOnly:grid-cols-2 xm:grid-cols-2">
                          <div className="rounded-[18px] bg-[#00ff85]/10 border border-[#00ff85]/20 p-[14px]">
                            <p className="small-text font-NeueMontreal text-[#00ff85]/70">
                              Budgeted
                            </p>
                            <p className="paragraph font-NeueMontreal text-[#f1f1f1]">
                              What was promised
                            </p>
                          </div>
                          <div className="rounded-[18px] bg-white/10 border border-white/10 p-[14px]">
                            <p className="small-text font-NeueMontreal text-[#f1f1f1]/60">
                              Reality
                            </p>
                            <p className="paragraph font-NeueMontreal text-[#f1f1f1]">
                              What exists
                            </p>
                          </div>
                          <div className="rounded-[18px] bg-[#ff2f55]/10 border border-[#ff2f55]/20 p-[14px]">
                            <p className="small-text font-NeueMontreal text-[#ff2f55]/70">
                              Action
                            </p>
                            <p className="paragraph font-NeueMontreal text-[#f1f1f1]">
                              What you can do
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="h-[280px] smOnly:h-[220px] xm:h-[200px] bg-gradient-to-br from-[#00ff85]/15 via-[#f1f1f1]/5 to-[#ff2f55]/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,133,0.1),transparent)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,47,85,0.1),transparent)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* IMPACT STATS */}
            <section className="padding-x pt-[60px]">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="cards"
                  className="grid grid-cols-4 gap-[16px] mdOnly:grid-cols-2 smOnly:grid-cols-2 xm:grid-cols-2"
                >
                  <div
                    data-animate="card"
                    data-scale="card"
                    className="rounded-[26px] bg-white/90 border border-black/5 p-[22px] hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    <p className="small-text font-NeueMontreal text-[#212121]/60">
                      Budget Lines Tracked
                    </p>
                    <p className="text-[42px] leading-[1.1] font-FoundersGrotesk text-[#111] mt-[8px]">
                      <span data-counter={500}>0</span>+
                    </p>
                    <p className="small-text font-NeueMontreal text-[#00aa55] mt-[4px]">
                      Verified stories
                    </p>
                  </div>
                  <div
                    data-animate="card"
                    data-scale="card"
                    className="rounded-[26px] bg-white/90 border border-black/5 p-[22px] hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    <p className="small-text font-NeueMontreal text-[#212121]/60">
                      Counties Covered
                    </p>
                    <p className="text-[42px] leading-[1.1] font-FoundersGrotesk text-[#111] mt-[8px]">
                      <span data-counter={47}>0</span>
                    </p>
                    <p className="small-text font-NeueMontreal text-[#00aa55] mt-[4px]">
                      Across Kenya
                    </p>
                  </div>
                  <div
                    data-animate="card"
                    data-scale="card"
                    className="rounded-[26px] bg-white/90 border border-black/5 p-[22px] hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    <p className="small-text font-NeueMontreal text-[#212121]/60">
                      Citizens Engaged
                    </p>
                    <p className="text-[42px] leading-[1.1] font-FoundersGrotesk text-[#111] mt-[8px]">
                      <span data-counter={15000}>0</span>
                    </p>
                    <p className="small-text font-NeueMontreal text-[#00aa55] mt-[4px]">
                      Active community
                    </p>
                  </div>
                  <div
                    data-animate="card"
                    data-scale="card"
                    className="rounded-[26px] bg-[#212121] text-[#f1f1f1] border border-black/10 p-[22px] hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <p className="small-text font-NeueMontreal text-[#f1f1f1]/60">
                      Actions Taken
                    </p>
                    <p className="text-[42px] leading-[1.1] font-FoundersGrotesk mt-[8px]">
                      <span data-counter={3200}>0</span>+
                    </p>
                    <p className="small-text font-NeueMontreal text-[#00ff85] mt-[4px]">
                      Reports & petitions
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK SNAPSHOT */}
            <section className="padding-x pt-[50px]">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="flex items-center justify-between gap-[16px] flex-wrap mb-[26px]"
                >
                  <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                    Quick Snapshot
                  </h2>
                  <p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[50ch]">
                    Your gateway to civic transparency and accountability
                  </p>
                </div>
                <div
                  data-animate="cards"
                  className="grid grid-cols-4 gap-[14px] mdOnly:grid-cols-2 smOnly:grid-cols-2 xm:grid-cols-2"
                >
                  <div
                    data-animate="card"
                    className="rounded-[24px] bg-white/90 border border-black/5 p-[18px] hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-[40px] h-[40px] rounded-full bg-[#00ff85]/20 flex items-center justify-center mb-[12px]">
                      <svg className="w-[20px] h-[20px] text-[#00aa55]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-[20px] font-NeueMontreal text-[#111]">
                      Story of the Week
                    </p>
                  </div>
                  <div
                    data-animate="card"
                    className="rounded-[24px] bg-white/90 border border-black/5 p-[18px] hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-[40px] h-[40px] rounded-full bg-[#212121]/10 flex items-center justify-center mb-[12px]">
                      <svg className="w-[20px] h-[20px] text-[#212121]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <p className="text-[20px] font-NeueMontreal text-[#111]">
                      Budget Highlights
                    </p>
                  </div>
                  <div
                    data-animate="card"
                    className="rounded-[24px] bg-white/90 border border-black/5 p-[18px] hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-[40px] h-[40px] rounded-full bg-[#ff2f55]/10 flex items-center justify-center mb-[12px]">
                      <svg className="w-[20px] h-[20px] text-[#ff2f55]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-[20px] font-NeueMontreal text-[#111]">
                      Field Reports
                    </p>
                  </div>
                  <div
                    data-animate="card"
                    className="rounded-[24px] bg-[#212121] text-[#f1f1f1] border border-black/10 p-[18px] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-[40px] h-[40px] rounded-full bg-[#00ff85]/20 flex items-center justify-center mb-[12px]">
                      <svg className="w-[20px] h-[20px] text-[#00ff85]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <p className="text-[20px] font-NeueMontreal">
                      Community Action
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* STORIES FROM THE GROUND */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="flex items-end justify-between gap-[16px] flex-wrap mb-[30px]"
                >
                  <div>
                    <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                      Stories from the Ground
                    </h2>
                    <p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[8px] max-w-[60ch]">
                      Real reports and investigations that answer: What was
                      budgeted? What exists? Who benefits?
                    </p>
                  </div>
                  <Link
                    href="/stories"
                    className="group px-[18px] py-[12px] rounded-full border border-[#212121]/25 text-[#212121] paragraph font-NeueMontreal hover:bg-[#212121] hover:text-[#f1f1f1] transition-all duration-300"
                  >
                    <span className="flex items-center gap-[8px]">
                      View All Stories
                      <svg className="w-[14px] h-[14px] group-hover:translate-x-[4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </div>

                <div
                  data-animate="cards"
                  className="grid grid-cols-3 gap-[18px] mdOnly:grid-cols-2 smOnly:grid-cols-1 xm:grid-cols-1"
                >
                  <div
                    data-animate="card"
                    className="group rounded-[28px] bg-white/90 border border-black/5 p-[24px] hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-[12px]">
                      <span className="px-[10px] py-[6px] rounded-full bg-[#ff2f55]/10 text-[#ff2f55] small-text font-NeueMontreal">
                        Report
                      </span>
                      <span className="text-[12px] font-NeueMontreal text-[#212121]/50">
                        County • Road
                      </span>
                    </div>
                    <p className="text-[24px] font-NeueMontreal text-[#111] leading-[1.3]">
                      This road was budgeted for Ksh 5M
                    </p>
                    <p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[12px]">
                      Field verification shows partial completion and missing signboards.
                    </p>
                    <div className="mt-[16px] flex items-center gap-[8px] text-[#00aa55] small-text font-NeueMontreal group-hover:underline cursor-pointer">
                      Read full report →
                    </div>
                  </div>
                  <div
                    data-animate="card"
                    className="group rounded-[28px] bg-white/90 border border-black/5 p-[24px] hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-[12px]">
                      <span className="px-[10px] py-[6px] rounded-full bg-[#00ff85]/20 text-[#00aa55] small-text font-NeueMontreal">
                        Investigation
                      </span>
                      <span className="text-[12px] font-NeueMontreal text-[#212121]/50">
                        County • Health
                      </span>
                    </div>
                    <p className="text-[24px] font-NeueMontreal text-[#111] leading-[1.3]">
                      Clinic supplies: where did they go?
                    </p>
                    <p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[12px]">
                      An investigation into procurement and delivery timelines.
                    </p>
                    <div className="mt-[16px] flex items-center gap-[8px] text-[#00aa55] small-text font-NeueMontreal group-hover:underline cursor-pointer">
                      Read full report →
                    </div>
                  </div>
                  <div
                    data-animate="card"
                    className="group rounded-[28px] bg-white/90 border border-black/5 p-[24px] hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-[12px]">
                      <span className="px-[10px] py-[6px] rounded-full bg-[#212121]/10 text-[#212121] small-text font-NeueMontreal">
                        Spotlight
                      </span>
                      <span className="text-[12px] font-NeueMontreal text-[#212121]/50">
                        County • Analysis
                      </span>
                    </div>
                    <p className="text-[24px] font-NeueMontreal text-[#111] leading-[1.3]">
                      Who benefits from the budget?
                    </p>
                    <p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[12px]">
                      Spotlights on contractors, beneficiaries, and discrepancies.
                    </p>
                    <div className="mt-[16px] flex items-center gap-[8px] text-[#00aa55] small-text font-NeueMontreal group-hover:underline cursor-pointer">
                      Read full report →
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="padding-x pb-[50px]">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="rounded-[34px] bg-white/80 border border-black/5 p-[28px] smOnly:p-[22px] xm:p-[18px]"
                >
                  <div
                    className="flex items-end justify-between gap-[16px] flex-wrap mb-[24px]"
                  >
                    <h3 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                      How It Works
                    </h3>
                    <p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[58ch]">
                      A simple process that turns complex public budgets into civic action.
                    </p>
                  </div>

                  <div
                    data-animate="cards"
                    className="mt-[22px] grid grid-cols-3 gap-[18px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1"
                  >
                    <div
                      data-animate="card"
                      className="rounded-[24px] bg-white border border-black/5 p-[22px] hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-[12px] mb-[12px]">
                        <div className="w-[48px] h-[48px] rounded-full bg-[#00ff85]/20 flex items-center justify-center text-[#00aa55] font-FoundersGrotesk text-[24px] font-bold">
                          1
                        </div>
                      </div>
                      <p className="paragraph font-NeueMontreal text-[#111] font-medium">
                        Identify the Line
                      </p>
                      <p className="small-text font-NeueMontreal text-[#212121]/65 mt-[8px]">
                        Find the budget line, allocation amount, and expected outputs from official documents.
                      </p>
                    </div>
                    <div
                      data-animate="card"
                      className="rounded-[24px] bg-white border border-black/5 p-[22px] hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-[12px] mb-[12px]">
                        <div className="w-[48px] h-[48px] rounded-full bg-[#212121]/10 flex items-center justify-center text-[#212121] font-FoundersGrotesk text-[24px] font-bold">
                          2
                        </div>
                      </div>
                      <p className="paragraph font-NeueMontreal text-[#111] font-medium">
                        Verify on the Ground
                      </p>
                      <p className="small-text font-NeueMontreal text-[#212121]/65 mt-[8px]">
                        Field reports, photos, and community input confirm whether work was actually done.
                      </p>
                    </div>
                    <div
                      data-animate="card"
                      className="rounded-[24px] bg-[#212121] text-[#f1f1f1] border border-black/10 p-[22px] hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-[12px] mb-[12px]">
                        <div className="w-[48px] h-[48px] rounded-full bg-[#00ff85]/20 flex items-center justify-center text-[#00aa55] font-FoundersGrotesk text-[24px] font-bold">
                          3
                        </div>
                      </div>
                      <p className="paragraph font-NeueMontreal font-medium">
                        Act & Amplify
                      </p>
                      <p className="small-text font-NeueMontreal text-[#f1f1f1]/70 mt-[8px]">
                        Share findings, contact officials, or start a community campaign for accountability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ SECTION */}
            <section className="padding-x pb-[50px]">
              <div className="max-w-[800px] mx-auto">
                <div data-animate="fade-up" className="text-center mb-[32px]">
                  <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                    Frequently Asked Questions
                  </h2>
                  <p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[8px]">
                    Everything you need to know about Budget Ndio Story
                  </p>
                </div>

                <div data-animate="cards" className="space-y-[12px]">
                  {[
                    {
                      q: "How do you verify budget stories?",
                      a: "We combine official budget documents with field verification—photos, interviews, and on-ground reports from community members.",
                    },
                    {
                      q: "Is this only for national budgets?",
                      a: "No! We cover both national and county budgets, focusing on where you live and the projects that affect your community directly.",
                    },
                    {
                      q: "How can I contribute a story?",
                      a: "Use the 'Report a Finding' button to submit evidence. Our team verifies submissions before publishing them on the platform.",
                    },
                    {
                      q: "Is this content free to access?",
                      a: "Yes! All our budget stories, reports, and educational content are completely free and open to everyone.",
                    },
                  ].map((faq, i) => (
                    <div
                      key={i}
                      data-animate="card"
                      className="rounded-[20px] bg-white border border-black/5 p-[20px] hover:shadow-sm transition-all duration-300"
                    >
                      <p className="paragraph font-NeueMontreal text-[#111] font-medium">
                        {faq.q}
                      </p>
                      <p className="small-text font-NeueMontreal text-[#212121]/70 mt-[8px]">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PREVIEW STRIP */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="flex items-end justify-between gap-[16px] flex-wrap mb-[30px]"
                >
                  <h2 className="sub-heading font-FoundersGrotesk uppercase text-[#111]">
                    Explore the Platform
                  </h2>
                  <p className="paragraph font-NeueMontreal text-[#212121]/70 max-w-[60ch]">
                    See how we turn budget documents into stories, trackers, and actionable insights.
                  </p>
                </div>

                <div
                  data-animate="cards"
                  className="grid grid-cols-3 gap-[18px] mdOnly:grid-cols-1 smOnly:grid-cols-1 xm:grid-cols-1"
                >
                  <div
                    data-animate="card"
                    className="group rounded-[28px] overflow-hidden bg-white border border-black/5 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-[22px]">
                      <div className="w-[44px] h-[44px] rounded-full bg-[#212121]/10 flex items-center justify-center mb-[12px]">
                        <svg className="w-[22px] h-[22px] text-[#212121]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <p className="text-[22px] font-NeueMontreal text-[#111]">
                        Budget Tracker
                      </p>
                      <p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[6px]">
                        See allocations by sector and track spending over time
                      </p>
                    </div>
                    <div className="h-[200px] bg-gradient-to-br from-[#00ff85]/10 via-black/0 to-black/5" />
                  </div>
                  <div
                    data-animate="card"
                    className="group rounded-[28px] overflow-hidden bg-white border border-black/5 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-[22px]">
                      <div className="w-[44px] h-[44px] rounded-full bg-[#ff2f55]/10 flex items-center justify-center mb-[12px]">
                        <svg className="w-[22px] h-[22px] text-[#ff2f55]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-[22px] font-NeueMontreal text-[#111]">
                        Story Archives
                      </p>
                      <p className="paragraph font-NeueMontreal text-[#212121]/70 mt-[6px]">
                        Video, audio & field reports from across Kenya
                      </p>
                    </div>
                    <div className="h-[200px] bg-gradient-to-br from-[#ff2f55]/10 via-black/0 to-black/5" />
                  </div>
                  <div
                    data-animate="card"
                    className="group rounded-[28px] overflow-hidden bg-[#111] border border-black/10 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-[22px]">
                      <div className="w-[44px] h-[44px] rounded-full bg-[#00ff85]/20 flex items-center justify-center mb-[12px]">
                        <svg className="w-[22px] h-[22px] text-[#00aa55]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <p className="text-[22px] font-NeueMontreal text-[#f1f1f1]">
                        Participation Hub
                      </p>
                      <p className="paragraph font-NeueMontreal text-[#f1f1f1]/70 mt-[6px]">
                        Report findings, vote on investigations, and take action
                      </p>
                    </div>
                    <div className="h-[200px] bg-gradient-to-br from-[#00ff85]/15 via-[#f1f1f1]/5 to-[#ff2f55]/10" />
                  </div>
                </div>
              </div>
            </section>

            {/* BIG CTA */}
            <section className="padding-x pb-[100px] smOnly:pb-[70px] xm:pb-[70px]">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="rounded-[36px] bg-gradient-to-br from-[#212121] via-[#2a2a2a] to-[#111] border border-black/10 p-[32px] smOnly:p-[24px] xm:p-[20px] text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,133,0.1),transparent)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,47,85,0.08),transparent)]" />

                  <div className="relative z-10">
                    <h3 className="sub-heading font-FoundersGrotesk uppercase text-[#f1f1f1]">
                      Start Following Your County
                    </h3>
                    <p className="paragraph font-NeueMontreal text-[#f1f1f1]/70 mt-[12px] max-w-[600px] mx-auto">
                      Explore budget stories, track public spending in your area, and join the
                      conversation on where tax money goes and who benefits.
                    </p>

                    <div className="mt-[28px] flex items-center justify-center gap-[14px] flex-wrap">
                      <Link
                        href="/stories"
                        className="group px-[24px] py-[16px] rounded-full bg-[#00aa55] text-[#f1f1f1] paragraph font-NeueMontreal hover:bg-[#00cc66] hover:scale-[1.02] transition-all duration-300 shadow-lg"
                      >
                        <span className="flex items-center gap-[8px]">
                          Explore Stories
                          <svg className="w-[16px] h-[16px] group-hover:translate-x-[4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </Link>
                      <Link
                        href="/budget-simplified"
                        className="px-[24px] py-[16px] rounded-full border border-[#f1f1f1]/30 text-[#f1f1f1] paragraph font-NeueMontreal hover:bg-[#f1f1f1]/10 hover:border-[#f1f1f1] transition-all duration-300"
                      >
                        How Budgets Work
                      </Link>
                    </div>

                    <p className="mt-[20px] small-text font-NeueMontreal text-[#f1f1f1]/40">
                      Free to use • No account required • Open data
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <LandingFooter />
          </main>
        </div>
      </div>
    </>
  );
}
