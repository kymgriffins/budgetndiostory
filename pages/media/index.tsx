
import VideoThumbnail from "@/components/VideoThumbnail";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { podcasts, shorts } from "@/mockdata";
import { MainFooter, Navbar } from "@/components";
import LandingFooter from "@/components/LandingFooter";

type MediaType = "all" | "podcasts" | "shorts";

interface PodcastEpisode {
  id: number;
  title: string;
  description: string;
  duration: string;
  durationSeconds: number;
  excerpt: string;
  type: string;
  category: string;
  color: string;
  mediaType: "audio" | "video";
  videoUrl?: string;
  audioUrl?: string;
  publishDate: string;
  host: string;
  guests?: string[];
  tags: string[];
  playCount: number;
  isFeatured: boolean;
}

interface ShortVideo {
  id: number;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: number;
  type: string;
  color: string;
}

export default function Media() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<MediaType>("all");
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);

  const handlePlay = (id: number) => {
    if (currentPlaying === id) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(id);
    }
  };

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

  const filteredPodcasts = filter === "all" || filter === "podcasts" ? podcasts : [];
  const filteredShorts = filter === "all" || filter === "shorts" ? shorts : [];

  const featuredPodcast = podcasts.find((p) => p.isFeatured) || podcasts[0];
  const featuredShort = shorts[0];

  const getMediaBadge = (type: string) => {
    if (type === "video" || type === "skit" || type === "short") {
      return (
        <span className="inline-flex items-center gap-[4px] px-[10px] py-[4px] rounded-full bg-red-500/10 border border-red-500/20 text-[11px] font-NeueMontreal font-medium text-red-600">
          <svg className="w-[12px] h-[12px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Video
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-[4px] px-[10px] py-[4px] rounded-full bg-[#f1f1f1]/5 border border-[#f1f1f1]/10 text-[11px] font-NeueMontreal font-medium text-[#f1f1f1]/60">
        <svg className="w-[12px] h-[12px]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
        Audio
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Media Hub - Budget Ndio Story</title>
        <meta
          name="description"
          content="Watch videos, listen to podcasts, and explore budget stories from Kenyan communities."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        ref={scrollerRef}
        data-scroll-container
        className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#0a0a0a] text-[#f1f1f1]"
        style={{ position: "relative" }}
      >
        <div ref={contentRef} data-scroll-content>
          <Navbar />
          <div className="h-[8vh]" />

          <a
            href="#media-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full"
          >
            Skip to content
          </a>

          <main id="media-content" className="w-full">
            {/* HERO */}
            <section className="padding-x pt-[36px] smOnly:pt-[28px] xm:pt-[22px]">
              <div className="max-w-[1200px] mx-auto w-full">
                <div
                  data-hero="sub"
                  className="inline-flex items-center gap-[8px] px-[14px] py-[8px] rounded-full bg-[#f1f1f1]/5 border border-[#f1f1f1]/10 mb-[20px]"
                >
                  <span className="text-[16px]">📺</span>
                  <span className="text-[13px] font-NeueMontreal font-medium text-[#f1f1f1]/70">
                    Free Access • No Subscription
                  </span>
                </div>

                <h1
                  data-hero="title"
                  className="heading font-FoundersGrotesk text-[#f1f1f1] uppercase leading-[1.2] max-w-[800px]"
                >
                  Media Hub
                </h1>

                <p
                  data-hero="sub"
                  className="mt-[24px] sub-heading font-NeueMontreal text-[#f1f1f1]/70 max-w-[600px]"
                >
                  Podcasts, videos, and shorts. All budget stories in one place.
                </p>

                {/* Filter Tabs */}
                <div
                  data-hero="cta"
                  className="mt-[32px] flex items-center gap-[12px] flex-wrap"
                >
                  {(["all", "podcasts", "shorts"] as MediaType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilter(type)}
                      className={`px-[18px] py-[12px] rounded-full paragraph font-NeueMontreal transition-all ${
                        filter === type
                          ? "bg-[#212121] text-white"
                          : "border border-[#f1f1f1]/25 text-[#f1f1f1] hover:bg-[#f1f1f1]/5"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* FEATURED CONTENT */}
            {(filter === "all" || filter === "podcasts") && featuredPodcast && (
              <section className="padding-x padding-y">
                <div className="max-w-[1200px] mx-auto">
                  <div
                    data-animate="fade-up"
                    className="mb-[12px] flex items-center gap-[12px]"
                  >
                    <span className="text-[12px] font-NeueMontreal font-medium text-[#f1f1f1]/50 uppercase tracking-[0.15em]">
                      Featured Podcast
                    </span>
                    {getMediaBadge(featuredPodcast.mediaType)}
                  </div>

                  <div
                    data-animate="fade-up"
                    className="rounded-[24px] overflow-hidden bg-[#1a1a1a] border border-[#f1f1f1]/8 hover:border-[#f1f1f1]/15 transition-all duration-300 hover:shadow-[0_25px_80px_rgba(0,0,0,0.15)]"
                  >
                    <div className="grid grid-cols-12 gap-0">
                      <div className="col-span-7 p-[36px] flex flex-col justify-center mdOnly:col-span-12 smOnly:col-span-12 xm:col-span-12">
                        <div className="flex items-center gap-[12px] mb-[16px] flex-wrap">
                          <span className="px-[12px] py-[6px] rounded-full bg-[#f1f1f1]/5 border border-[#f1f1f1]/10 text-[12px] font-NeueMontreal font-medium text-[#f1f1f1]/60">
                            Episode {featuredPodcast.id}
                          </span>
                          <span className="px-[12px] py-[6px] rounded-full bg-[#f1f1f1]/5 border border-[#f1f1f1]/10 text-[12px] font-NeueMontreal font-medium text-[#f1f1f1]/60">
                            {featuredPodcast.category}
                          </span>
                        </div>

                        <h2 className="text-[32px] font-FoundersGrotesk font-medium leading-[1.1] text-[#f1f1f1]">
                          {featuredPodcast.title}
                        </h2>

                        <p className="mt-[16px] text-[#f1f1f1]/70 sub-heading font-NeueMontreal">
                          {featuredPodcast.excerpt}
                        </p>

                        <div className="mt-[24px] flex items-center gap-[16px]">
                          <button
                            onClick={() => handlePlay(featuredPodcast.id)}
                            className="flex items-center gap-[8px] px-[20px] py-[12px] rounded-full bg-[#00aa55] text-white paragraph font-NeueMontreal hover:bg-[#008844] transition"
                          >
                            <svg
                              className="w-[18px] h-[18px]"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                            {currentPlaying === featuredPodcast.id
                              ? "Pause"
                              : "Play Now"}
                          </button>

                          <div className="flex items-center gap-[8px] text-[#f1f1f1]/50 paragraph font-NeueMontreal">
                            <svg
                              className="w-[16px] h-[16px]"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span>{featuredPodcast.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-5 bg-[#f5f5f5] mdOnly:col-span-12 smOnly:col-span-12 xm:col-span-12">
                        <div
                          className={`h-full min-h-[300px] bg-gradient-to-br ${featuredPodcast.color} flex items-center justify-center`}
                        >
                          <div className="text-center text-white p-[24px]">
                            <div className="text-[48px] mb-[16px]">🎙️</div>
                            <p className="font-NeueMontreal text-[14px] opacity-90">
                              {featuredPodcast.host}
                            </p>
                            {featuredPodcast.guests && (
                              <p className="font-NeueMontreal text-[12px] opacity-70 mt-[8px]">
                                with {featuredPodcast.guests.join(", ")}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* FEATURED SHORT VIDEO */}
            {(filter === "all" || filter === "shorts") && (
              <section className="padding-x padding-y">
                <div className="max-w-[1200px] mx-auto">
                  <div
                    data-animate="fade-up"
                    className="mb-[12px] flex items-center gap-[12px]"
                  >
                    <span className="text-[12px] font-NeueMontreal font-medium text-[#f1f1f1]/50 uppercase tracking-[0.15em]">
                      Featured Short
                    </span>
                    {getMediaBadge("video")}
                  </div>

                  <div
                    data-animate="fade-up"
                    className="rounded-[24px] overflow-hidden bg-[#1a1a1a] border border-[#f1f1f1]/8 hover:border-[#f1f1f1]/15 transition-all duration-300 hover:shadow-[0_25px_80px_rgba(0,0,0,0.15)]"
                  >
                    <div className="grid grid-cols-12 gap-0">
                      <div className="col-span-5 bg-[#f5f5f5] mdOnly:col-span-12 smOnly:col-span-12 xm:col-span-12">
                        <div
                          className="h-full min-h-[300px] bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center relative overflow-hidden"
                          style={{
                            backgroundImage: `url(${featuredShort.thumbnail})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div className="absolute inset-0 bg-black/30" />
                          <div className="relative z-10 text-center text-white p-[24px]">
                            <div className="w-[64px] h-[64px] rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-[16px]">
                              <svg
                                className="w-[32px] h-[32px] ml-[4px]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                            <p className="font-NeueMontreal text-[14px]">
                              {featuredShort.duration}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-7 p-[36px] flex flex-col justify-center mdOnly:col-span-12 smOnly:col-span-12 xm:col-span-12">
                        <div className="flex items-center gap-[12px] mb-[16px] flex-wrap">
                          <span className="px-[12px] py-[6px] rounded-full bg-[#f1f1f1]/5 border border-[#f1f1f1]/10 text-[12px] font-NeueMontreal font-medium text-[#f1f1f1]/60">
                            {featuredShort.type}
                          </span>
                          <span className="px-[12px] py-[6px] rounded-full bg-[#f1f1f1]/5 border border-[#f1f1f1]/10 text-[12px] font-NeueMontreal font-medium text-[#f1f1f1]/60">
                            {featuredShort.views?.toLocaleString() ?? 0} views
                          </span>
                        </div>

                        <h2 className="text-[32px] font-FoundersGrotesk font-medium leading-[1.1] text-[#f1f1f1]">
                          {featuredShort.title}
                        </h2>

                        <div className="mt-[24px] flex items-center gap-[12px]">
                          <a
                            href={featuredShort.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-[8px] px-[20px] py-[12px] rounded-full bg-red-500 text-white paragraph font-NeueMontreal hover:bg-red-600 transition"
                          >
                            <svg
                              className="w-[18px] h-[18px]"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                            Watch Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ALL PODCASTS */}
            {(filter === "all" || filter === "podcasts") && filteredPodcasts.length > 1 && (
              <section className="padding-x padding-y">
                <div className="max-w-[1200px] mx-auto">
                  <h3
                    data-animate="fade-up"
                    className="text-[24px] font-FoundersGrotesk font-medium text-[#f1f1f1] mb-[24px]"
                  >
                    All Episodes
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                    {filteredPodcasts.slice(1).map((episode) => (
                      <div
                        key={episode.id}
                        data-animate="fade-up"
                        className="rounded-[16px] overflow-hidden bg-[#1a1a1a] border border-[#f1f1f1]/8 hover:border-[#f1f1f1]/15 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
                      >
                        <div
                          className={`h-[140px] bg-gradient-to-br ${episode.color} flex items-center justify-center`}
                        >
                          <div className="text-center text-white p-[16px]">
                            <span className="text-[32px]">🎙️</span>
                          </div>
                        </div>

                        <div className="p-[20px]">
                          <div className="flex items-center gap-[8px] mb-[12px] flex-wrap">
                            {getMediaBadge(episode.mediaType)}
                            <span className="text-[11px] font-NeueMontreal font-medium text-[#f1f1f1]/50 uppercase tracking-[0.1em]">
                              {episode.category}
                            </span>
                          </div>

                          <h4 className="text-[18px] font-FoundersGrotesk font-medium text-[#f1f1f1] leading-[1.2] line-clamp-2">
                            {episode.title}
                          </h4>

                          <p className="mt-[8px] text-[#f1f1f1]/60 text-[13px] font-NeueMontreal line-clamp-2">
                            {episode.excerpt}
                          </p>

                          <div className="mt-[16px] flex items-center justify-between">
                            <span className="text-[12px] font-NeueMontreal text-[#f1f1f1]/50">
                              {episode.duration}
                            </span>

                            <button
                              onClick={() => handlePlay(episode.id)}
                              className="w-[36px] h-[36px] rounded-full bg-[#f1f1f1]/10 text-white flex items-center justify-center hover:bg-[#f1f1f1]/20 transition"
                            >
                              {currentPlaying === episode.id ? (
                                <svg
                                  className="w-[16px] h-[16px]"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                              ) : (
                                <svg
                                  className="w-[16px] h-[16px] ml-[2px]"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ALL SHORTS */}
            {(filter === "all" || filter === "shorts") && filteredShorts.length > 0 && (
              <section className="padding-x padding-y">
                <div className="max-w-[1200px] mx-auto">
                  <h3
                    data-animate="fade-up"
                    className="text-[24px] font-FoundersGrotesk font-medium text-[#f1f1f1] mb-[24px]"
                  >
                    Short Videos
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px]">
                    {filteredShorts.slice(1).map((short) => (
                      <a
                        key={short.id}
                        href={short.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-animate="fade-up"
                        className="group block rounded-[16px] overflow-hidden bg-[#1a1a1a] border border-[#f1f1f1]/8 hover:border-[#f1f1f1]/15 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
                      >
                        <div className="relative aspect-[9/16] overflow-hidden">
                          <img
                            src={short.thumbnail}
                            alt={short.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="absolute bottom-[8px] right-[8px] px-[6px] py-[2px] rounded bg-black/70 text-white text-[11px] font-NeueMontreal">
                            {short.duration}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-[48px] h-[48px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                              <svg
                                className="w-[24px] h-[24px] ml-[4px] text-[#212121]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="p-[12px]">
                          <h4 className="text-[14px] font-FoundersGrotesk font-medium text-[#f1f1f1] leading-[1.2] line-clamp-2">
                            {short.title}
                          </h4>
                          <p className="mt-[4px] text-[12px] font-NeueMontreal text-[#f1f1f1]/50">
                            {short.views?.toLocaleString() ?? 0} views • {short.type}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* CTA SECTION */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="rounded-[24px] bg-[#212121] text-white p-[48px] text-center"
                >
                  <h3 className="text-[32px] font-FoundersGrotesk font-medium">
                    Stay Updated
                  </h3>
                  <p className="mt-[16px] text-[#f1f1f1]/70 sub-heading font-NeueMontreal max-w-[500px] mx-auto">
                    Get notified when new episodes and videos are released.
                  </p>
                  <div className="mt-[32px] flex items-center justify-center gap-[12px] flex-wrap">
                    <Link
                      href="/#newsletter"
                      className="px-[24px] py-[14px] rounded-full bg-[#00aa55] text-white paragraph font-NeueMontreal hover:bg-[#008844] transition"
                    >
                      Subscribe to Newsletter
                    </Link>
                    <Link
                      href="/contact"
                      className="px-[24px] py-[14px] rounded-full border border-white/30 text-white paragraph font-NeueMontreal hover:bg-white/10 transition"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* <LandingFooter /> */}
          <MainFooter/>
        </div>
      </div>
    </>
  );
}
