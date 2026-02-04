import { blogPosts, getFeaturedPosts } from "@/lib/blog-data";
import { CATEGORY_CONFIG } from "@/lib/blog-types";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Get unique categories
const categories = Array.from(
  new Set(blogPosts.map((post) => post.category)),
).map((category) => ({
  id: category.toLowerCase(),
  label: category,
  ...CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG],
}));

export default function BlogIndex() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedPosts, setDisplayedPosts] = useState(blogPosts);
  const featuredPosts = getFeaturedPosts();

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

  // Filter posts based on category and search
  useEffect(() => {
    let filtered = blogPosts.filter((post) => post.status === "published");

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (post) =>
          post.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    setDisplayedPosts(filtered);
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Head>
        <title>Blog - Budget Ndio Story</title>
        <meta
          name="description"
          content="In-depth analysis, investigations, and opinions on Kenya's public budgets and spending."
        />
        <meta property="og:title" content="Blog - Budget Ndio Story" />
        <meta
          property="og:description"
          content="In-depth analysis, investigations, and opinions on Kenya's public budgets."
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
          {/* Spacer for fixed navbar */}
          <div className="h-[8vh]" />

          <a
            href="#blog-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full"
          >
            Skip to content
          </a>

          <main id="blog-content" className="w-full">
            {/* HERO SECTION */}
            <section className="padding-x pt-[36px] smOnly:pt-[28px] xm:pt-[22px]">
              <div className="max-w-[1200px] mx-auto w-full">
                <div
                  data-hero="sub"
                  className="inline-flex items-center gap-[8px] px-[16px] py-[8px] rounded-full bg-[#212121]/5 border border-[#212121]/10 mb-[24px]"
                >
                  <span className="w-[8px] h-[8px] rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[13px] font-NeueMontreal font-medium text-[#212121]/70">
                    Latest Insights & Analysis
                  </span>
                </div>

                <h1
                  data-hero="title"
                  className="heading font-FoundersGrotesk text-[#111] uppercase leading-[1.1] max-w-[700px]"
                >
                  The Budget Blog
                </h1>

                <p className="mt-[20px] text-[18px] font-NeueMontreal text-[#212121]/60 max-w-[550px] leading-[1.6]">
                  Deep dives, investigations, and expert analysis on Kenya's
                  public finances and how they impact citizens.
                </p>

                {/* Search Bar */}
                <div className="mt-[28px] max-w-[500px]">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-[18px] py-[14px] pr-[50px] rounded-full border border-[#212121]/15 bg-white text-[#212121] font-NeueMontreal placeholder-[#212121]/40 focus:outline-none focus:border-[#212121]/30 focus:ring-2 focus:ring-[#212121]/10 transition-all"
                    />
                    <span className="absolute right-[20px] top-1/2 -translate-y-1/2 text-[#212121]/40">
                      🔍
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED POSTS */}
            {featuredPosts.length > 0 &&
              selectedCategory === "all" &&
              !searchQuery && (
                <section className="padding-x py-[20px]">
                  <div className="max-w-[1200px] mx-auto">
                    <div className="mb-[12px] px-[4px]">
                      <span className="text-[12px] font-NeueMontreal font-medium text-[#212121]/50 uppercase tracking-[0.15em]">
                        Featured
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-[24px] lg:grid-cols-1">
                      {featuredPosts.slice(0, 2).map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          className="group block rounded-[24px] overflow-hidden bg-white border border-[#212121]/8 hover:border-[#212121]/15 transition-all duration-300 hover:shadow-[0_25px_80px_rgba(0,0,0,0.1)]"
                        >
                          <div className="grid grid-cols-12 gap-0">
                            <div className="col-span-8 p-[36px] flex flex-col justify-center mdOnly:col-span-12 smOnly:col-span-12 xm:col-span-12">
                              <div className="flex items-center gap-[12px] mb-[16px] flex-wrap">
                                <span
                                  className={`px-[12px] py-[6px] rounded-full text-[12px] font-NeueMontreal font-medium bg-gradient-to-r ${CATEGORY_CONFIG[post.category as keyof typeof CATEGORY_CONFIG]?.color} text-white`}
                                >
                                  {post.category}
                                </span>
                                <span className="text-[13px] font-NeueMontreal text-[#212121]/40">
                                  {new Date(
                                    post.publishedAt || post.createdAt,
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <h2 className="text-[28px] font-FoundersGrotesk font-medium text-[#111] leading-[1.15] group-hover:text-[#212121]/80 transition-colors mdOnly:text-[24px] smOnly:text-[20px] xm:text-[18px]">
                                {post.title}
                              </h2>
                              <p className="mt-[16px] text-[16px] font-NeueMontreal text-[#212121]/60 leading-[1.65] max-w-[520px]">
                                {post.excerpt}
                              </p>
                              <div className="mt-[24px] flex items-center gap-[16px] flex-wrap">
                                <div className="flex items-center gap-[10px]">
                                  {post.author.avatar ? (
                                    <img
                                      src={post.author.avatar}
                                      alt={post.author.name}
                                      className="w-[32px] h-[32px] rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-[32px] h-[32px] rounded-full bg-[#212121]/10 flex items-center justify-center text-[14px] font-medium">
                                      {post.author.name.charAt(0)}
                                    </div>
                                  )}
                                  <span className="text-[14px] font-NeueMontreal text-[#212121]/70">
                                    {post.author.name}
                                  </span>
                                </div>
                                <span className="w-[4px] h-[4px] rounded-full bg-[#212121]/20"></span>
                                <span className="text-[14px] font-NeueMontreal text-[#212121]/50">
                                  {post.readTime}
                                </span>
                              </div>
                            </div>
                            <div className="col-span-4 relative overflow-hidden mdOnly:col-span-12 mdOnly:h-[200px] smOnly:col-span-12 smOnly:h-[180px] xm:col-span-12 xm:h-[160px]">
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_CONFIG[post.category as keyof typeof CATEGORY_CONFIG]?.color || "from-gray-400 to-gray-600"}`}
                              ></div>
                              <div className="absolute inset-0 bg-black/10"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[80px] opacity-50 mdOnly:text-[60px] smOnly:text-[48px] xm:text-[40px]">
                                  {CATEGORY_CONFIG[
                                    post.category as keyof typeof CATEGORY_CONFIG
                                  ]?.emoji || "📰"}
                                </span>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-black/30 to-transparent">
                                <span className="text-[14px] font-NeueMontreal text-white/80">
                                  Read Full Article →
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              )}

            {/* CATEGORY TABS */}
            <section className="relative z-40">
              <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#212121]/8">
                <div className="max-w-[1200px] mx-auto">
                  <div
                    className="flex gap-[8px] overflow-x-auto px-4 py-3 scrollbar-hide snap-x snap-mandatory"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      WebkitOverflowScrolling: "touch",
                    }}
                  >
                    <button
                      onClick={() => {
                        setSelectedCategory("all");
                        if (window.innerWidth < 768) {
                          document.getElementById("blog-grid")?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      }}
                      className={`relative px-[20px] py-[10px] rounded-full whitespace-nowrap text-[14px] font-NeueMontreal font-medium transition-all duration-300 snap-center flex-shrink-0 ${
                        selectedCategory === "all"
                          ? "text-white"
                          : "bg-[#f5f5f5] text-[#212121]/70 hover:bg-[#f0f0f0] hover:text-[#212121]"
                      }`}
                    >
                      {selectedCategory === "all" && (
                        <span
                          className="absolute inset-0 rounded-full bg-[#212121] shadow-lg shadow-[#212121]/20 transition-all duration-300"
                          style={{ animation: "fadeIn 0.2s ease-out" }}
                        />
                      )}
                      <span className="relative inline-flex items-center gap-[6px]">
                        📚 All Posts
                      </span>
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          if (window.innerWidth < 768) {
                            document
                              .getElementById("blog-grid")
                              ?.scrollIntoView({
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
                        {selectedCategory === cat.id && (
                          <span
                            className="absolute inset-0 rounded-full bg-[#212121] shadow-lg shadow-[#212121]/20 transition-all duration-300"
                            style={{ animation: "fadeIn 0.2s ease-out" }}
                          />
                        )}
                        <span className="relative inline-flex items-center gap-[6px]">
                          {cat.emoji} {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-[2px] bg-[#212121]/5">
                <div
                  className="h-full bg-[#212121]/20 transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      ((categories.findIndex((c) => c.id === selectedCategory) +
                        1) *
                        100) /
                        (categories.length + 1),
                    )}%`,
                  }}
                />
              </div>
            </section>

            {/* BLOG POSTS GRID */}
            <section id="blog-grid" className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                {displayedPosts.length > 0 ? (
                  <div className="grid grid-cols-3 gap-[24px] lg:grid-cols-2 mdOnly:grid-cols-2 smOnly:grid-cols-1 xm:grid-cols-1">
                    {displayedPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        data-animate="fade-up"
                        className="group block rounded-[20px] overflow-hidden bg-white border border-[#212121]/8 hover:border-[#212121]/15 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                      >
                        <div className="relative h-[160px] overflow-hidden">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${CATEGORY_CONFIG[post.category as keyof typeof CATEGORY_CONFIG]?.color || "from-gray-400 to-gray-600"}`}
                          ></div>
                          <div className="absolute inset-0 bg-black/10"></div>
                          <div className="absolute top-[16px] left-[16px]">
                            <span
                              className={`px-[10px] py-[6px] rounded-full text-[11px] font-NeueMontreal font-medium bg-white/90 backdrop-blur-sm text-[#212121]/70`}
                            >
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-[24px]">
                          <div className="flex items-center gap-[10px] mb-[12px] flex-wrap">
                            <span className="text-[12px] font-NeueMontreal text-[#212121]/40">
                              {new Date(
                                post.publishedAt || post.createdAt,
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                            <span className="w-[3px] h-[3px] rounded-full bg-[#212121]/20"></span>
                            <span className="text-[12px] font-NeueMontreal text-[#212121]/40">
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="text-[20px] font-FoundersGrotesk font-medium text-[#111] leading-[1.2] group-hover:text-[#212121]/70 transition-colors">
                            {post.title}
                          </h3>
                          <p className="mt-[12px] text-[14px] font-NeueMontreal text-[#212121]/60 leading-[1.6] line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="mt-[16px] flex items-center gap-[8px] flex-wrap">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] font-NeueMontreal px-[8px] py-[4px] rounded-full bg-[#f5f5f5] text-[#212121]/50"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-[80px]">
                    <span className="text-[60px] mb-[20px] block">📭</span>
                    <h3 className="text-[24px] font-FoundersGrotesk text-[#212121]/70 mb-[12px]">
                      No articles found
                    </h3>
                    <p className="text-[16px] font-NeueMontreal text-[#212121]/50">
                      {searchQuery
                        ? `No results for "${searchQuery}". Try a different search term.`
                        : "No articles in this category yet."}
                    </p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="mt-[20px] px-[20px] py-[10px] rounded-full bg-[#212121] text-white text-[14px] font-NeueMontreal hover:opacity-90 transition"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
