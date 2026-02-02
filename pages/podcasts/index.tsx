import LandingFooter from "@/components/LandingFooter";
import VideoThumbnail from "@/components/VideoThumbnail";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MediaType = "audio" | "video";

interface Episode {
  id: number;
  title: string;
  description: string;
  duration: string;
  durationSeconds: number;
  excerpt: string;
  type: string;
  category: string;
  color: string;
  mediaType: MediaType;
  videoUrl?: string;
  audioUrl?: string;
  publishDate: string;
  host: string;
  guests?: string[];
  tags: string[];
  playCount: number;
  isFeatured: boolean;
}

const episodes: Episode[] = [
  {
    id: 1,
    title: "Budget Breakdowns: The Health Sector",
    description:
      "A comprehensive analysis of Kenya's healthcare budget allocation. We examine how much is spent on hospitals, medicines, and healthcare workers.",
    duration: "24 min",
    durationSeconds: 1440,
    excerpt: "A deep dive into how much Kenya spends on healthcare and where the gaps are.",
    type: "breakdown",
    category: "Health",
    color: "from-pink-400 to-rose-500",
    mediaType: "audio",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    publishDate: "2024-01-15",
    host: "Amina Hassan",
    guests: ["Dr. Sarah Ochieng"],
    tags: ["healthcare", "budget 2024", "hospitals", "medical"],
    playCount: 1250,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Conversations: Dr. Jane on Tax Policy",
    description:
      "An in-depth conversation with tax policy expert Dr. Jane Njeri about Kenya's tax collection system and fairness in taxation.",
    duration: "32 min",
    durationSeconds: 1920,
    excerpt: "Understanding tax collection, fairness, and what funds the government.",
    type: "conversation",
    category: "Tax",
    color: "from-blue-400 to-indigo-500",
    mediaType: "video",
    videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
    publishDate: "2024-01-20",
    host: "Amina Hassan",
    guests: ["Dr. Jane Njeri"],
    tags: ["tax", "policy", "revenue", "government funding"],
    playCount: 2100,
    isFeatured: true,
  },
  {
    id: 3,
    title: "Youth Voices: What We Want Funded",
    description:
      "Kenyan youth from diverse backgrounds share their views on budget priorities.",
    duration: "18 min",
    durationSeconds: 1080,
    excerpt: "Kenyan youth discuss the budget priorities they want to see.",
    type: "voices",
    category: "Youth",
    color: "from-green-400 to-emerald-500",
    mediaType: "audio",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    publishDate: "2024-01-25",
    host: "Kevo Mboya",
    guests: ["Youth Panel"],
    tags: ["youth", "education", "employment", "climate", "priorities"],
    playCount: 890,
    isFeatured: false,
  },
  {
    id: 4,
    title: "Audio Story: The Road That Never Was",
    description:
      "A narrated investigative piece about a Ksh 150M road project that was allocated funds but never completed.",
    duration: "28 min",
    durationSeconds: 1680,
    excerpt: "Narrated account of Ksh 150M allocated for a road project that stalled.",
    type: "story",
    category: "Infrastructure",
    color: "from-orange-400 to-amber-500",
    mediaType: "video",
    videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
    publishDate: "2024-02-01",
    host: "Amina Hassan",
    tags: ["infrastructure", "corruption", "roads", "investigation"],
    playCount: 3200,
    isFeatured: true,
  },
  {
    id: 5,
    title: "Budget 101: National vs County",
    description:
      "A beginner-friendly explainer on the differences between national and county government budgets.",
    duration: "16 min",
    durationSeconds: 960,
    excerpt: "A short explainer on the differences between national and county budgets.",
    type: "breakdown",
    category: "Education",
    color: "from-purple-400 to-violet-500",
    mediaType: "audio",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    publishDate: "2024-02-05",
    host: "Kevo Mboya",
    tags: ["education", "federalism", "counties", "budget basics"],
    playCount: 1560,
    isFeatured: false,
  },
  {
    id: 6,
    title: "On the Ground: Water Project Delays",
    description:
      "An audio documentary investigating the Makueni water project and why it's delayed.",
    duration: "26 min",
    durationSeconds: 1560,
    excerpt: "Audio documentary on the Makueni water project and why it's delayed.",
    type: "story",
    category: "Infrastructure",
    color: "from-cyan-400 to-sky-500",
    mediaType: "video",
    videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
    publishDate: "2024-02-10",
    host: "Amina Hassan",
    guests: ["Makueni Residents", "Community Leaders"],
    tags: ["water", "infrastructure", "Makueni", "accountability"],
    playCount: 2450,
    isFeatured: false,
  },
  {
    id: 7,
    title: "Education Funding: Where Does It Go?",
    description:
      "Breaking down Kenya's education budget from primary schools to universities.",
    duration: "22 min",
    durationSeconds: 1320,
    excerpt: "Analyzing Kenya's education budget from primary to university.",
    type: "breakdown",
    category: "Education",
    color: "from-teal-400 to-cyan-500",
    mediaType: "audio",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    publishDate: "2024-02-15",
    host: "Kevo Mboya",
    guests: ["Teacher Union Rep"],
    tags: ["education", "schools", "teachers", "free education"],
    playCount: 1890,
    isFeatured: false,
  },
  {
    id: 8,
    title: "Climate Finance: Kenya's Green Budget",
    description:
      "Exploring how Kenya is allocating funds for climate action.",
    duration: "30 min",
    durationSeconds: 1800,
    excerpt: "Examining Kenya's climate finance and green budget allocations.",
    type: "conversation",
    category: "Environment",
    color: "from-emerald-400 to-teal-500",
    mediaType: "video",
    videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
    publishDate: "2024-02-20",
    host: "Amina Hassan",
    guests: ["Climate Expert", "Environment CS"],
    tags: ["climate", "environment", "green", "finance", "sustainability"],
    playCount: 2100,
    isFeatured: true,
  },
];

export default function Podcasts() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState<"all" | MediaType>("all");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (episodeId: number) => {
    const episode = episodes.find((ep) => ep.id === episodeId);
    if (!episode) return;

    if (currentEpisode === episodeId) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current && episode.audioUrl) {
        audioRef.current.src = episode.audioUrl;
        audioRef.current.play();
        setCurrentEpisode(episodeId);
        setIsPlaying(true);
      }
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

  const filteredEpisodes =
    filter === "all"
      ? episodes
      : episodes.filter((ep) => ep.mediaType === filter);

  const featuredEpisode = episodes[0];

  const getMediaBadge = (type: MediaType) => {
    if (type === "video") {
      return (
        <span className="inline-flex items-center gap-[4px] px-[10px] py-[4px] rounded-full bg-red-500/10 border border-red-500/20 text-[11px] font-NeueMontreal font-medium text-red-600">
          <svg
            className="w-[12px] h-[12px]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          Video
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-[4px] px-[10px] py-[4px] rounded-full bg-[#212121]/5 border border-[#212121]/10 text-[11px] font-NeueMontreal font-medium text-[#212121]/60">
        <svg
          className="w-[12px] h-[12px]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
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
        <title>Podcasts & Audio Stories - Budget Ndio Story</title>
        <meta
          name="description"
          content="Listen to budget breakdowns, expert conversations, and stories from Kenyan communities."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentEpisode(null);
        }}
      />

      <div
        ref={scrollerRef}
        data-scroll-container
        className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#fafafa] text-[#212121]"
        style={{ position: "relative" }}
      >
        <div ref={contentRef} data-scroll-content>
          <div className="h-[8vh]" />

          <a
            href="#podcasts-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[100] focus:bg-[#212121] focus:text-[#f1f1f1] focus:px-[14px] focus:py-[10px] focus:rounded-full"
          >
            Skip to content
          </a>

          <main id="podcasts-content" className="w-full">
            {/* HERO */}
            <section className="padding-x pt-[36px] smOnly:pt-[28px] xm:pt-[22px]">
              <div className="max-w-[1200px] mx-auto w-full">
                <div
                  data-hero="sub"
                  className="inline-flex items-center gap-[8px] px-[14px] py-[8px] rounded-full bg-[#212121]/5 border border-[#212121]/10 mb-[20px]"
                >
                  <span className="text-[16px]">🎙️</span>
                  <span className="text-[13px] font-NeueMontreal font-medium text-[#212121]/70">
                    Free Access • No Subscription
                  </span>
                </div>

                <h1
                  data-hero="title"
                  className="heading font-FoundersGrotesk text-[#111] uppercase leading-[1.2] max-w-[800px]"
                >
                  Podcasts & Audio Stories
                </h1>

                <p
                  data-hero="sub"
                  className="mt-[24px] sub-heading font-NeueMontreal text-[#212121]/70 max-w-[600px]"
                >
                  Budget stories, conversations, and breakdowns. Free to listen,
                  share, and learn.
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
                    href="#episodes"
                    className="px-[18px] py-[12px] rounded-full bg-[#212121] text-white paragraph font-NeueMontreal hover:opacity-90 transition"
                  >
                    Browse Episodes
                  </Link>
                </div>
              </div>
            </section>

            {/* FEATURED EPISODE */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="mb-[12px] flex items-center gap-[12px]"
                >
                  <span className="text-[12px] font-NeueMontreal font-medium text-[#212121]/50 uppercase tracking-[0.15em]">
                    Featured Episode
                  </span>
                  {getMediaBadge(featuredEpisode.mediaType)}
                </div>

                <div
                  data-animate="fade-up"
                  className="rounded-[24px] overflow-hidden bg-white border border-[#212121]/8 hover:border-[#212121]/15 transition-all duration-300 hover:shadow-[0_25px_80px_rgba(0,0,0,0.1)]"
                >
                  <div className="grid grid-cols-12 gap-0">
                    <div className="col-span-7 p-[36px] flex flex-col justify-center mdOnly:col-span-12 smOnly:col-span-12 xm:col-span-12">
                      <div className="flex items-center gap-[12px] mb-[16px] flex-wrap">
                        <span className="px-[12px] py-[6px] rounded-full bg-[#212121]/5 border border-[#212121]/10 text-[12px] font-NeueMontreal font-medium text-[#212121]/60">
                          Episode {featuredEpisode.id}
                        </span>
                        <span className="px-[12px] py-[6px] rounded-full bg-[#212121]/5 border border-[#212121]/10 text-[12px] font-NeueMontreal font-medium text-[#212121]/60">
                          {featuredEpisode.category}
                        </span>
                      </div>
                      <h3 className="text-[28px] font-FoundersGrotesk font-medium text-[#111] leading-[1.2] mdOnly:text-[24px] smOnly:text-[20px] xm:text-[20px]">
                        {featuredEpisode.title}
                      </h3>
                      <p className="mt-[16px] text-[15px] font-NeueMontreal text-[#212121]/60 leading-[1.65] max-w-[480px]">
                        {featuredEpisode.excerpt}
                      </p>
                      <div className="mt-[20px] flex items-center gap-[16px] flex-wrap">
                        <span className="text-[14px] font-NeueMontreal text-[#212121]/50">
                          {featuredEpisode.duration}
                        </span>
                        <span className="w-[4px] h-[4px] rounded-full bg-[#212121]/20"></span>
                        <span className="text-[14px] font-NeueMontreal text-[#212121]/50">
                          {featuredEpisode.type}
                        </span>
                      </div>
                      <div className="mt-[24px] flex items-center gap-[12px]">
                        <Link
                          href={`/podcasts/${featuredEpisode.id}`}
                          className="px-[20px] py-[14px] rounded-full bg-[#212121] text-white text-[14px] font-NeueMontreal font-medium hover:opacity-90 transition flex items-center gap-[8px]"
                        >
                          <span>
                            {featuredEpisode.mediaType === "video" ? "▶" : "🎵"}
                          </span>
                          {featuredEpisode.mediaType === "video"
                            ? "Watch Now"
                            : "Listen Now"}
                        </Link>
                        <button className="w-[44px] h-[44px] rounded-full border border-[#212121]/25 text-[#212121] flex items-center justify-center hover:bg-[#212121]/5 transition">
                          📥
                        </button>
                        <button className="w-[44px] h-[44px] rounded-full border border-[#212121]/25 text-[#212121] flex items-center justify-center hover:bg-[#212121]/5 transition">
                          ↗
                        </button>
                      </div>
                    </div>
                    <div className="col-span-5 relative overflow-hidden mdOnly:col-span-12 mdOnly:h-[200px] smOnly:col-span-12 smOnly:h-[180px] xm:col-span-12 xm:h-[160px]">
                      {featuredEpisode.mediaType === "video" &&
                      featuredEpisode.videoUrl ? (
                        <VideoThumbnail
                          videoId={featuredEpisode.videoUrl}
                          title={featuredEpisode.title}
                          duration={featuredEpisode.duration}
                          type={featuredEpisode.type}
                          episodeId={featuredEpisode.id}
                          gradientColor={featuredEpisode.color}
                        />
                      ) : (
                        <>
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${featuredEpisode.color}`}
                          ></div>
                          <div className="absolute inset-0 bg-black/10"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[80px] opacity-50 mdOnly:text-[60px] smOnly:text-[48px] xm:text-[40px]">
                              🎙️
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-[16px] bg-gradient-to-t from-black/30 to-transparent">
                            <span className="text-[12px] font-NeueMontreal text-white/80">
                              Listen • {featuredEpisode.duration}
                            </span>
                          </div>
                        </>
                      )}
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
                    onClick={() => setFilter("audio")}
                    className={`px-[16px] py-[10px] rounded-full whitespace-nowrap transition-all duration-200 text-[14px] font-NeueMontreal font-medium flex items-center gap-[6px] ${filter === "audio" ? "bg-[#212121] text-white shadow-lg shadow-[#212121]/10" : "bg-[#f5f5f5] text-[#212121]/60 hover:bg-[#212121]/5 hover:text-[#212121]"}`}
                  >
                    <svg
                      className="w-[14px] h-[14px]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                    </svg>
                    Audio
                  </button>
                  <button
                    onClick={() => setFilter("video")}
                    className={`px-[16px] py-[10px] rounded-full whitespace-nowrap transition-all duration-200 text-[14px] font-NeueMontreal font-medium flex items-center gap-[6px] ${filter === "video" ? "bg-red-500 text-white shadow-lg shadow-red-500/10" : "bg-[#f5f5f5] text-[#212121]/60 hover:bg-[#212121]/5 hover:text-[#212121]"}`}
                  >
                    <svg
                      className="w-[14px] h-[14px]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Videos
                  </button>
                </div>
              </div>
            </section>

            {/* EPISODE GRID */}
            <section id="episodes" className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
                  {filteredEpisodes
                    .filter((ep) => !ep.isFeatured)
                    .map((ep) =>
                      ep.mediaType === "video" && ep.videoUrl ? (
                        <div
                          key={ep.id}
                          className="rounded-[16px] overflow-hidden bg-white border border-[#212121]/8 group hover:border-[#212121]/15 transition-all duration-300"
                        >
                          <VideoThumbnail
                            videoId={ep.videoUrl}
                            title={ep.title}
                            duration={ep.duration}
                            type={ep.type}
                            episodeId={ep.id}
                            gradientColor={ep.color}
                          />
                        </div>
                      ) : (
                        <Link
                          key={ep.id}
                          href={`/podcasts/${ep.id}`}
                          className="group rounded-[16px] overflow-hidden bg-white border border-[#212121]/8 hover:border-[#212121]/15 transition-all duration-300"
                        >
                          <div className="relative h-[180px]">
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${ep.color} transition-transform duration-500 group-hover:scale-105`}
                            />
                            <div className="absolute inset-0 bg-black/10" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[64px] opacity-40">
                                🎙️
                              </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-[16px] bg-gradient-to-t from-black/30 to-transparent">
                              <span className="text-[12px] font-NeueMontreal text-white/80">
                                Listen • {ep.duration}
                              </span>
                            </div>
                          </div>
                          <div className="p-[22px]">
                            <h3 className="text-[18px] font-FoundersGrotesk font-medium text-[#111] leading-[1.25] group-hover:text-[#212121]/70 transition-colors line-clamp-2">
                              {ep.title}
                            </h3>
                            <p className="mt-[10px] text-[13px] font-NeueMontreal text-[#212121]/55 leading-[1.6] line-clamp-2">
                              {ep.excerpt}
                            </p>
                            <div className="mt-[14px] flex items-center justify-between">
                              <span className="text-[12px] font-NeueMontreal text-[#212121]/50">
                                {ep.type}
                              </span>
                              <span className="w-[32px] h-[32px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#212121]/40 group-hover:bg-[#212121] group-hover:text-white transition-all duration-300">
                                →
                              </span>
                            </div>
                          </div>
                        </Link>
                      ),
                    )}
                </div>

                {filteredEpisodes.length === 0 && (
                  <div className="text-center py-[60px]">
                    <span className="text-[48px] block mb-[16px]">🔍</span>
                    <p className="text-[18px] font-NeueMontreal text-[#212121]/50">
                      No episodes found for this filter.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* SUBSCRIBE CTA */}
            <section className="padding-x padding-y">
              <div className="max-w-[1200px] mx-auto">
                <div
                  data-animate="fade-up"
                  className="rounded-[24px] bg-[#111] p-[36px] md:p-[28px] smOnly:p-[24px] xm:p-[20px] flex items-center justify-between gap-[24px] flex-wrap"
                >
                  <div className="flex-1 min-w-[280px]">
                    <h3 className="text-[24px] font-FoundersGrotesk font-medium text-white leading-[1.2] mdOnly:text-[22px] smOnly:text-[20px] xm:text-[20px]">
                      Never Miss an Episode
                    </h3>
                    <p className="mt-[10px] text-[14px] font-NeueMontreal text-white/60 max-w-[380px] leading-[1.6]">
                      Subscribe for free notifications when new episodes drop.
                    </p>
                  </div>
                  <div className="flex items-center gap-[12px] flex-wrap">
                    <button className="px-[20px] py-[14px] rounded-full bg-white text-[#111] text-[14px] font-NeueMontreal font-medium hover:opacity-90 transition">
                      Subscribe Free
                    </button>
                    <button className="px-[20px] py-[14px] rounded-full border border-white/40 text-white text-[14px] font-NeueMontreal hover:bg-white/10 transition">
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* MINI AUDIO PLAYER - Only for audio episodes */}
            {currentEpisode && (() => {
              const episode = episodes.find((ep) => ep.id === currentEpisode);
              if (!episode || episode.mediaType === "video") return null;
              return (
                <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-white/10 p-4 z-50">
                  <div className="max-w-[1200px] mx-auto flex items-center gap-4">
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium truncate">
                        {episode.title}
                      </h4>
                      <p className="text-white/50 text-xs">
                        {isPlaying ? "Playing" : "Paused"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePlay(currentEpisode)}
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
                      >
                        {isPlaying ? (
                          <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                      <Link
                        href={`/podcasts/${currentEpisode}`}
                        className="px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition"
                      >
                        Open Player
                      </Link>
                      <button
                        onClick={() => {
                          setCurrentEpisode(null);
                          setIsPlaying(false);
                          audioRef.current?.pause();
                        }}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </main>
          <LandingFooter />
        </div>
      </div>
    </>
  );
}
