import LandingFooter from "@/components/LandingFooter";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Category emoji mapping
const categoryEmojis: Record<string, string> = {
  Infrastructure: "🛣️",
  Health: "🏥",
  Education: "📚",
  Youth: "👥",
  Water: "💧",
  Agriculture: "🌾",
  roads: "🛣️",
  health: "🏥",
  education: "📚",
  youth: "👥",
  water: "💧",
  agriculture: "🌾",
};

// Map category to color gradient
const categoryColors: Record<string, string> = {
  Infrastructure: "from-orange-400 to-red-500",
  Health: "from-green-400 to-emerald-600",
  Education: "from-amber-400 to-orange-500",
  Youth: "from-purple-400 to-violet-600",
  Water: "from-cyan-400 to-blue-500",
  Agriculture: "from-lime-400 to-green-500",
  roads: "from-orange-400 to-red-500",
  health: "from-green-400 to-emerald-600",
  education: "from-amber-400 to-orange-500",
  youth: "from-purple-400 to-violet-600",
  water: "from-cyan-400 to-blue-500",
  agriculture: "from-lime-400 to-green-500",
};

const getCategoryColor = (category: string): string => {
  return categoryColors[category] || "from-gray-400 to-gray-600";
};

const getCategoryEmoji = (category: string): string => {
  return categoryEmojis[category] || "📰";
};

export default function Stories() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const stories = [
    {
      id: 1,
      title: "This Road Never Got Built: A Budget Story",
      category: "roads",
      excerpt:
        "Ksh 150M budgeted. Zero kilometers built. Where did it go? An investigation into one of Nairobi's most ambitious infrastructure promises.",
      readTime: "8 min read",
      date: "Jan 15, 2025",
      author: "Sarah M.",
      color: "from-orange-400 to-red-500",
    },
    {
      id: 2,
      title: "Health Centers Without Medicine",
      category: "health",
      excerpt:
        "We visited 5 health centers across Nairobi County and found zero pharmaceutical budget. What's being spent on healthcare?",
      readTime: "12 min read",
      date: "Jan 12, 2025",
      author: "James K.",
      color: "from-green-400 to-emerald-600",
    },
    {
      id: 3,
      title: "Youth Programs: Who's Getting the Money?",
      category: "youth",
      excerpt:
        "Tracking Ksh 2B in youth development funds across 3 counties. We followed the money to see who actually benefits.",
      readTime: "10 min read",
      date: "Jan 8, 2025",
      author: "Achieng O.",
      color: "from-purple-400 to-violet-600",
    },
    {
      id: 4,
      title: "School Feeding Program: Budget vs Reality",
      category: "education",
      excerpt:
        "What the national budget promised vs. what students actually get to eat. A county-by-county comparison.",
      readTime: "9 min read",
      date: "Jan 5, 2025",
      author: "Moses W.",
      color: "from-amber-400 to-orange-500",
    },
    {
      id: 5,
      title: "Water Project Delay: The Makueni Investigation",
      category: "water",
      excerpt:
        "3-year delay on a Ksh 800M water pipeline. How did the budget fail the communities waiting for clean water?",
      readTime: "11 min read",
      date: "Dec 28, 2024",
      author: "Grace N.",
      color: "from-cyan-400 to-blue-500",
    },
    {
      id: 6,
      title: "Agricultural Input Subsidy: Does It Reach Farmers?",
      category: "agriculture",
      excerpt:
        "We traced Ksh 8B from the national budget to 50 farmers across 6 counties. What we found will surprise you.",
      readTime: "13 min read",
      date: "Dec 20, 2024",
      author: "Samuel T.",
      color: "from-lime-400 to-green-500",
    },
    {
      id: 7,
      title: "Market Construction: Same Project, 3 Budgets",
      category: "roads",
      excerpt:
        "How a single market construction project appeared in three consecutive county budgets without being built.",
      readTime: "7 min read",
      date: "Dec 15, 2024",
      author: "Peninah L.",
      color: "from-pink-400 to-rose-500",
    },
    {
      id: 8,
      title: "Hospital Equipment: New Machines, No Staff",
      category: "health",
      excerpt:
        "Ksh 50M in new medical equipment sitting unused in a county hospital. The budget bought machines but not operators.",
      readTime: "8 min read",
      date: "Dec 10, 2024",
      author: "Dr. Robert K.",
      color: "from-teal-400 to-cyan-500",
    },
  ];

  const categories = [
    { id: "all", label: "All Stories" },
    { id: "Infrastructure", label: "Infrastructure" },
    { id: "Health", label: "Health" },
    { id: "Education", label: "Education" },
    { id: "Youth", label: "Youth" },
    { id: "Water", label: "Water" },
    { id: "Agriculture", label: "Agriculture" },
  ];

  // Get unique categories for the tab bar
  const uniqueCategories = categories.filter(
    (cat, index, self) => index === self.findIndex((c) => c.id === cat.id),
  );

  const filteredStories =
    selectedCategory === "all"
      ? stories
      : stories.filter(
          (s) => s.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  const featuredStory = stories[0];

  return (
    <>
      <Head>
        <title>Stories from the Ground - Budget Ndio Story</title>
        <meta
          name="description"
          content="Real stories, documentaries, and field reports showing how Kenya's budget impacts communities."
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
          {/* Spacer for fixed navbar height */}
          <div className="h-[8vh]" />

          <a
            href="#stories-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full"
          >
            Skip to content
          </a>

          <main id="stories-content" className="w-full">
            {/* HERO */}
            <section className="padding-x pt-[36px] smOnly:pt-[28px] xm:pt-[22px]">
              <div className="max-w-[1200px] mx-auto w-full">
                <div
                  data-hero="sub"
                  className="inline-flex items-center gap-[8px] px-[16px] py-[8px] rounded-full bg-[#212121]/5 border border-[#212121]/10 mb-[24px]"
                >
                  <span className="w-[8px] h-[8px] rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[13px] font-NeueMontreal font-medium text-[#212121]/70">
                    Real Stories, Real Impact
                  </span>
                </div>

                <h1
                  data-hero="title"
                  className="heading font-FoundersGrotesk text-[#111] uppercase leading-[1.1] max-w-[700px]"
                >
                  Stories from the Ground
                </h1>

                <p className="mt-[20px] text-[18px] font-NeueMontreal text-[#212121]/60 max-w-[550px] leading-[1.6]">
                  In-depth investigations, field reports, and documentaries that
                  trace Kenya's budget from paper to reality.
                </p>
              </div>
            </section>

            {/* FEATURED STORY */}
            <section className="padding-x pb-[20px]">
              <div className="max-w-[1200px] mx-auto">
                <div className="mb-[12px] px-[4px]">
                  <span className="text-[12px] font-NeueMontreal font-medium text-[#212121]/50 uppercase tracking-[0.15em]">
                    Featured Story
                  </span>
                </div>
                <Link
                  href={`/stories/${featuredStory.id}`}
                  className="group block rounded-[24px] overflow-hidden bg-white border border-[#212121]/8 hover:border-[#212121]/15 transition-all duration-300 hover:shadow-[0_25px_80px_rgba(0,0,0,0.1)]"
                >
                  <div className="grid grid-cols-12 gap-0">
                    <div className="col-span-8 p-[36px] flex flex-col justify-center mdOnly:col-span-12 smOnly:col-span-12 xm:col-span-12">
                      <div className="flex items-center gap-[12px] mb-[16px] flex-wrap">
                        <span className="px-[12px] py-[6px] rounded-full bg-[#212121]/5 border border-[#212121]/10 text-[12px] font-NeueMontreal font-medium text-[#212121]/60">
                          {
                            categories.find(
                              (c) => c.id === featuredStory.category,
                            )?.label
                          }
                        </span>
                        <span className="text-[13px] font-NeueMontreal text-[#212121]/40">
                          {featuredStory.date}
                        </span>
                      </div>
                      <h2 className="text-[32px] font-FoundersGrotesk font-medium text-[#111] leading-[1.15] group-hover:text-[#212121]/80 transition-colors mdOnly:text-[26px] smOnly:text-[22px] xm:text-[20px]">
                        {featuredStory.title}
                      </h2>
                      <p className="mt-[16px] text-[16px] font-NeueMontreal text-[#212121]/60 leading-[1.65] max-w-[520px] mdOnly:max-w-[100%]">
                        {featuredStory.excerpt}
                      </p>
                      <div className="mt-[24px] flex items-center gap-[16px] flex-wrap">
                        <span className="text-[14px] font-NeueMontreal text-[#212121]/50">
                          By {featuredStory.author}
                        </span>
                        <span className="w-[4px] h-[4px] rounded-full bg-[#212121]/20"></span>
                        <span className="text-[14px] font-NeueMontreal text-[#212121]/50">
                          {featuredStory.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-4 relative overflow-hidden mdOnly:col-span-12 mdOnly:h-[200px] smOnly:col-span-12 smOnly:h-[180px] xm:col-span-12 xm:h-[160px]">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(featuredStory.category)}`}
                      ></div>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[80px] opacity-50 mdOnly:text-[60px] smOnly:text-[48px] xm:text-[40px]">
                          {getCategoryEmoji(featuredStory.category)}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-black/30 to-transparent">
                        <span className="text-[14px] font-NeueMontreal text-white/80">
                          Read Full Story →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            {/* CATEGORY TABS */}
            <section className="relative z-40">
              {/* Sticky container with blur backdrop */}
              <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#212121]/8">
                <div className="max-w-[1200px] mx-auto">
                  {/* Horizontal scroll container with snap */}
                  <div
                    className="flex gap-[8px] overflow-x-auto px-4 py-3 scrollbar-hide snap-x snap-mandatory"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      WebkitOverflowScrolling: "touch",
                    }}
                  >
                    {uniqueCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          // Smooth scroll to stories grid on mobile
                          const storiesSection =
                            document.getElementById("stories-grid");
                          if (storiesSection && window.innerWidth < 768) {
                            storiesSection.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }}
                        className={`relative px-[20px] py-[10px] rounded-full whitespace-nowrap text-[14px] font-NeueMontreal font-medium transition-all duration-300 snap-center flex-shrink-0 ${
                          selectedCategory === cat.id
                            ? "text-white"
                            : "bg-[#f5f5f5] text-[#212121]/70 hover:bg-[#f0f0f0] hover:text-[#212121]"
                        }`}
                      >
                        {/* Active background */}
                        {selectedCategory === cat.id && (
                          <span
                            className="absolute inset-0 rounded-full bg-[#212121] shadow-lg shadow-[#212121]/20 transition-all duration-300"
                            style={{ animation: "fadeIn 0.2s ease-out" }}
                          />
                        )}
                        {/* Icon for visual appeal */}
                        <span className="relative inline-flex items-center gap-[6px]">
                          {getCategoryEmoji(cat.id)}
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Progress indicator bar */}
              <div className="h-[2px] bg-[#212121]/5">
                <div
                  className="h-full bg-[#212121]/20 transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (uniqueCategories.findIndex((c) => c.id === selectedCategory) + 1) * (100 / uniqueCategories.length))}%`,
                  }}
                />
              </div>
            </section>

            {/* STORIES GRID */}
            <section id="stories-grid" className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-3 gap-[24px] lg:grid-cols-2 mdOnly:grid-cols-2 smOnly:grid-cols-1 xm:grid-cols-1">
                  {filteredStories.slice(1).map((story) => (
                    <Link
                      key={story.id}
                      href={`/stories/${story.id}`}
                      className="group block rounded-[20px] overflow-hidden bg-white border border-[#212121]/8 hover:border-[#212121]/15 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                    >
                      <div className="relative h-[160px] overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(story.category)}`}
                        ></div>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute top-[16px] left-[16px]">
                          <span className="px-[10px] py-[6px] rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-NeueMontreal font-medium text-[#212121]/70">
                            {
                              categories.find((c) => c.id === story.category)
                                ?.label
                            }
                          </span>
                        </div>
                      </div>
                      <div className="p-[24px]">
                        <div className="flex items-center gap-[10px] mb-[12px] flex-wrap">
                          <span className="text-[12px] font-NeueMontreal text-[#212121]/40">
                            {story.date}
                          </span>
                          <span className="w-[3px] h-[3px] rounded-full bg-[#212121]/20"></span>
                          <span className="text-[12px] font-NeueMontreal text-[#212121]/40">
                            {story.readTime}
                          </span>
                        </div>
                        <h3 className="text-[20px] font-FoundersGrotesk font-medium text-[#111] leading-[1.25] group-hover:text-[#212121]/70 transition-colors line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="mt-[12px] text-[14px] font-NeueMontreal text-[#212121]/55 leading-[1.6] line-clamp-2">
                          {story.excerpt}
                        </p>
                        <div className="mt-[16px] flex items-center justify-between">
                          <span className="text-[13px] font-NeueMontreal text-[#212121]/50">
                            By {story.author}
                          </span>
                          <span className="w-[36px] h-[36px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#212121]/40 group-hover:bg-[#212121] group-hover:text-white transition-all duration-300">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {filteredStories.length === 0 && (
                  <div className="text-center py-[80px]">
                    <span className="text-[48px] block mb-[16px]">📭</span>
                    <p className="text-[18px] font-NeueMontreal text-[#212121]/50">
                      No stories in this category yet.
                    </p>
                    <p className="mt-[8px] text-[14px] font-NeueMontreal text-[#212121]/40">
                      Check back soon for new investigations.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* CTA SECTION */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div className="rounded-[24px] bg-[#111] p-[40px] md:p-[30px] smOnly:p-[24px] xm:p-[20px] flex items-center justify-between gap-[24px] flex-wrap">
                  <div className="flex-1 min-w-[280px]">
                    <h3 className="text-[28px] font-FoundersGrotesk font-medium text-white leading-[1.2] mdOnly:text-[24px] smOnly:text-[22px] xm:text-[20px]">
                      Got a Story to Tell?
                    </h3>
                    <p className="mt-[12px] text-[15px] font-NeueMontreal text-white/60 max-w-[400px] leading-[1.6]">
                      Know about a budget promise that fell through? We want to
                      hear from you.
                    </p>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <Link
                      href="/contact"
                      className="px-[20px] py-[14px] rounded-full bg-white text-[#111] text-[14px] font-NeueMontreal font-medium hover:bg-white/90 transition"
                    >
                      Share a Story
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
