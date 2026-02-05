"use client";

import LandingFooter from "@/components/LandingFooter";
import YouTubePlayer, { extractYouTubeId } from "@/components/YouTubePlayer";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Sample podcast data with comprehensive fields
interface PodcastEpisode {
  id: number;
  title: string;
  description: string;
  duration: string;
  durationSeconds: number;
  excerpt: string;
  type: string;
  category: string;
  mediaType: "audio" | "video";
  audioUrl?: string;
  videoUrl?: string;
  coverColor: string;
  publishDate: string;
  host: string;
  guests?: string[];
  tags: string[];
  playCount: number;
  isFeatured: boolean;
}

const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 1,
    title: "Budget Breakdowns: The Health Sector",
    description:
      "A comprehensive analysis of Kenya's healthcare budget allocation.",
    duration: "24 min",
    durationSeconds: 1440,
    excerpt:
      "A deep dive into how much Kenya spends on healthcare and where the gaps are.",
    type: "breakdown",
    category: "Health",
    mediaType: "audio",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverColor: "from-pink-500 to-rose-500",
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
      "An in-depth conversation with tax policy expert Dr. Jane Njeri.",
    duration: "32 min",
    durationSeconds: 1920,
    excerpt:
      "Understanding tax collection, fairness, and what funds the government.",
    type: "conversation",
    category: "Tax",
    mediaType: "video",
    videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
    coverColor: "from-blue-500 to-indigo-500",
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
    mediaType: "audio",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverColor: "from-green-500 to-emerald-500",
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
    excerpt:
      "Narrated account of Ksh 150M allocated for a road project that stalled.",
    type: "story",
    category: "Infrastructure",
    mediaType: "video",
    videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
    coverColor: "from-orange-500 to-amber-500",
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
    excerpt:
      "A short explainer on the differences between national and county budgets.",
    type: "breakdown",
    category: "Education",
    mediaType: "audio",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    coverColor: "from-purple-500 to-violet-500",
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
      "An audio documentary investigating the Makueni water project - why it was delayed, where the funds went.",
    duration: "26 min",
    durationSeconds: 1560,
    excerpt:
      "Audio documentary on the Makueni water project and why it's delayed.",
    type: "story",
    category: "Infrastructure",
    mediaType: "video",
    videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
    coverColor: "from-cyan-500 to-sky-500",
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
    mediaType: "audio",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverColor: "from-teal-500 to-cyan-500",
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
    description: "Exploring how Kenya is allocating funds for climate action.",
    duration: "30 min",
    durationSeconds: 1800,
    excerpt: "Examining Kenya's climate finance and green budget allocations.",
    type: "conversation",
    category: "Environment",
    mediaType: "video",
    videoUrl: "https://youtu.be/I_6ZcOo6pnk?si=2Rsq527BK0gGecAn",
    coverColor: "from-emerald-500 to-teal-500",
    publishDate: "2024-02-20",
    host: "Amina Hassan",
    guests: ["Climate Expert", "Environment CS"],
    tags: ["climate", "environment", "green", "finance", "sustainability"],
    playCount: 2100,
    isFeatured: true,
  },
];

export default function PodcastPlayer() {
  const router = useRouter();
  const { id } = router.query;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [waveformBars, setWaveformBars] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"audio" | "video">("audio");
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Set client flag on mount
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Get episode from router params
  const episodeId = isClient && id ? Number(id) : 1;
  const episode =
    podcastEpisodes.find((ep) => ep.id === episodeId) || podcastEpisodes[0];
  const hasVideo = episode.videoUrl && episode.videoUrl.length > 0;

  // Generate waveform bars
  useEffect(() => {
    if (isClient) {
      const bars = Array.from({ length: 80 }, () => Math.random() * 70 + 30);
      setWaveformBars(bars);
    }
  }, [isClient, id]);

  // Update playback speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  const handleSkip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(duration, audioRef.current.currentTime + seconds),
      );
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 1;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const togglePlaybackSpeed = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  // Format publish date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get next/previous episodes
  const currentIndex = podcastEpisodes.findIndex((ep) => ep.id === episodeId);
  const prevEpisode = currentIndex > 0 ? podcastEpisodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex < podcastEpisodes.length - 1
      ? podcastEpisodes[currentIndex + 1]
      : null;

  // Navigate to episode
  const navigateToEpisode = (epId: number) => {
    router.push(`/podcasts/${epId}`);
  };

  // Loading state
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/60 font-NeueMontreal">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{episode.title} - Budget Ndio Story Podcasts</title>
        <meta name="description" content={episode.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        {/* Fixed Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-6 left-6 z-50"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-105"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-NeueMontreal text-sm">Back</span>
          </button>
        </motion.div>

        {/* Main Content - Flex grow to push footer down */}
        <main className="flex-grow">
          {/* Hero Section with Media Player */}
          <section className="relative">
            {/* Animated Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${episode.coverColor} opacity-20`}
            />

            <div className="relative max-w-7xl mx-auto px-6 py-12 pt-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Episode Art / Video */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="order-2 lg:order-1"
                >
                  {/* Episode Type Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-NeueMontreal text-white/80 capitalize">
                      {episode.type}
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-NeueMontreal text-white/80 capitalize">
                      {episode.category}
                    </span>
                    {hasVideo && (
                      <span className="px-4 py-1.5 rounded-full bg-red-500/20 text-red-400 text-sm font-NeueMontreal capitalize flex items-center gap-2">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Video
                      </span>
                    )}
                  </div>

                  {/* Episode Title */}
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-FoundersGrotesk font-bold leading-tight mb-4">
                    {episode.title}
                  </h1>

                  {/* Episode Excerpt */}
                  <p className="text-lg text-white/60 font-NeueMontreal mb-6 max-w-xl">
                    {episode.excerpt}
                  </p>

                  {/* Host & Date Info */}
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-white/50 font-NeueMontreal">
                          Host
                        </p>
                        <p className="font-medium">{episode.host}</p>
                      </div>
                    </div>
                    {episode.guests && episode.guests.length > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-white/50 font-NeueMontreal">
                            Guest
                          </p>
                          <p className="font-medium">{episode.guests[0]}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-white/50 font-NeueMontreal">
                          Published
                        </p>
                        <p className="font-medium">
                          {formatDate(episode.publishDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Play Count */}
                  <div className="flex items-center gap-2 text-white/50">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="font-NeueMontreal text-sm">
                      {episode.playCount.toLocaleString()} plays
                    </span>
                  </div>
                </motion.div>

                {/* Right: Media Player */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="order-1 lg:order-2"
                >
                  {/* View Mode Toggle */}
                  {hasVideo && (
                    <div className="flex gap-2 mb-4 justify-center lg:justify-start">
                      <button
                        onClick={() => setViewMode("audio")}
                        className={`px-5 py-2 rounded-full transition-all text-sm font-medium ${
                          viewMode === "audio"
                            ? "bg-white text-black"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M9 18V5l12-2v13" />
                            <circle cx="6" cy="18" r="3" />
                            <circle cx="18" cy="16" r="3" />
                          </svg>
                          Audio
                        </span>
                      </button>
                      <button
                        onClick={() => setViewMode("video")}
                        className={`px-5 py-2 rounded-full transition-all text-sm font-medium ${
                          viewMode === "video"
                            ? "bg-white text-black"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                            <line x1="7" y1="2" x2="7" y2="22" />
                            <line x1="17" y1="2" x2="17" y2="22" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <line x1="2" y1="7" x2="7" y2="7" />
                            <line x1="2" y1="17" x2="7" y2="17" />
                            <line x1="17" y1="17" x2="22" y2="17" />
                            <line x1="17" y1="7" x2="22" y2="7" />
                          </svg>
                          Video
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Media Container */}
                  <div
                    className={`relative rounded-2xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 ${
                      viewMode === "video"
                        ? "aspect-video"
                        : "aspect-square max-w-md mx-auto lg:max-w-none"
                    }`}
                  >
                    {/* Video Mode */}
                    {viewMode === "video" && episode.videoUrl && (
                      <div className="w-full h-full">
                        <YouTubePlayer
                          videoId={extractYouTubeId(episode.videoUrl)}
                          autoplay={true}
                        />
                      </div>
                    )}

                    {/* Audio Mode */}
                    {viewMode === "audio" && (
                      <div className="flex flex-col items-center justify-center p-8 h-full">
                        {/* Animated Vinyl Record */}
                        <motion.div
                          animate={{
                            rotate: isPlaying ? 360 : 0,
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="relative mb-8"
                        >
                          <div
                            className={`w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-white/30 to-white/5 backdrop-blur-xl border-4 border-white/20 flex items-center justify-center ${
                              isPlaying ? "shadow-2xl shadow-white/10" : ""
                            }`}
                          >
                            {/* Vinyl Grooves */}
                            <div className="absolute inset-4 rounded-full border border-white/10" />
                            <div className="absolute inset-8 rounded-full border border-white/10" />
                            <div className="absolute inset-12 rounded-full border border-white/10" />

                            {/* Center Label */}
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/40 to-white/10 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-black" />
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Waveform Visualization */}
                        <div
                          ref={waveformRef}
                          className="flex items-center justify-center gap-1 w-full h-16 mb-6"
                        >
                          {waveformBars.map((height, index) => {
                            const progress =
                              duration > 0 ? (currentTime / duration) * 100 : 0;
                            const isPlayed =
                              (index / waveformBars.length) * 100 <= progress;
                            return (
                              <motion.div
                                key={index}
                                animate={{
                                  height: isPlayed
                                    ? `${Math.max(height * 0.3, height)}%`
                                    : `${height}%`,
                                }}
                                className={`w-1.5 md:w-2 rounded-full transition-all duration-150 ${
                                  isPlayed
                                    ? "bg-white shadow-lg shadow-white/30"
                                    : "bg-white/25 hover:bg-white/40"
                                }`}
                              />
                            );
                          })}
                        </div>

                        {/* Progress Bar */}
                        <div
                          ref={progressRef}
                          className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden mb-4 group"
                          onClick={handleProgressClick}
                        >
                          <motion.div
                            className="h-full bg-white rounded-full relative"
                            style={{
                              width: `${(currentTime / duration) * 100}%`,
                            }}
                          >
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg scale-0 group-hover:scale-100" />
                          </motion.div>
                        </div>

                        {/* Time Display */}
                        <div className="flex justify-between w-full text-sm font-mono text-white/50 mb-6">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>

                        {/* Main Controls */}
                        <div className="flex items-center justify-center gap-6">
                          {/* Rewind */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSkip(-15)}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                              <text
                                x="12"
                                y="15"
                                fontSize="6"
                                fill="currentColor"
                                textAnchor="middle"
                                className="font-NeueMontreal"
                              >
                                15
                              </text>
                            </svg>
                          </motion.button>

                          {/* Play/Pause */}
                          <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePlayPause}
                            className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:shadow-2xl hover:shadow-white/20 transition-all"
                          >
                            {isPlaying ? (
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                              </svg>
                            ) : (
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </motion.button>

                          {/* Forward */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSkip(30)}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
                              <text
                                x="12"
                                y="15"
                                fontSize="6"
                                fill="currentColor"
                                textAnchor="middle"
                                className="font-NeueMontreal"
                              >
                                30
                              </text>
                            </svg>
                          </motion.button>
                        </div>

                        {/* Secondary Controls */}
                        <div className="flex items-center justify-between w-full mt-6 pt-6 border-t border-white/10">
                          {/* Volume */}
                          <div
                            className="relative"
                            onMouseEnter={() => setShowVolumeSlider(true)}
                            onMouseLeave={() => setShowVolumeSlider(false)}
                          >
                            <button
                              onClick={toggleMute}
                              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                            >
                              {isMuted ? (
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                  <line x1="23" y1="9" x2="17" y2="15" />
                                  <line x1="17" y1="9" x2="23" y2="15" />
                                </svg>
                              ) : (
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                </svg>
                              )}
                            </button>

                            {/* Volume Slider */}
                            <AnimatePresence>
                              {showVolumeSlider && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-black/80 backdrop-blur-xl rounded-xl"
                                >
                                  <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Playback Speed */}
                          <button
                            onClick={togglePlaybackSpeed}
                            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-sm font-medium font-NeueMontreal"
                          >
                            {playbackSpeed}x
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Episode Details Section */}
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left: Description */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-FoundersGrotesk font-bold mb-4">
                    About This Episode
                  </h2>
                  <p className="text-white/70 font-NeueMontreal leading-relaxed mb-6">
                    {episode.description}
                  </p>

                  {/* Expandable Description Toggle */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-white/50 hover:text-white transition-colors text-sm font-NeueMontreal flex items-center gap-2"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="mt-8"
                >
                  <h3 className="text-sm font-NeueMontreal text-white/50 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {episode.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-NeueMontreal text-white/70 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right: Episode Navigation */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-lg font-FoundersGrotesk font-bold mb-4">
                    Episode Navigation
                  </h3>

                  {/* Previous Episode */}
                  {prevEpisode && (
                    <button
                      onClick={() => navigateToEpisode(prevEpisode.id)}
                      className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all mb-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-white/50 font-NeueMontreal">
                            Previous Episode
                          </p>
                          <p className="font-medium truncate max-w-[200px]">
                            {prevEpisode.title}
                          </p>
                        </div>
                      </div>
                    </button>
                  )}

                  {/* Next Episode */}
                  {nextEpisode && (
                    <button
                      onClick={() => navigateToEpisode(nextEpisode.id)}
                      className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-white/50 font-NeueMontreal">
                            Next Episode
                          </p>
                          <p className="font-medium truncate max-w-[200px]">
                            {nextEpisode.title}
                          </p>
                        </div>
                      </div>
                    </button>
                  )}

                  {/* All Episodes Link */}
                  <button
                    onClick={() => router.push("/podcasts")}
                    className="w-full mt-4 py-3 rounded-xl border border-white/20 text-center text-sm font-NeueMontreal hover:bg-white/10 transition-all"
                  >
                    View All Episodes
                  </button>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer - Properly positioned at bottom */}
        
      </div>

      {/* Hidden Audio Element */}
      {viewMode === "audio" && (
        <audio
          ref={audioRef}
          src={episode.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </>
  );
}
