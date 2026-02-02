"use client";

import LandingFooter from "@/components/LandingFooter";
import YouTubePlayer, { extractYouTubeId } from "@/components/YouTubePlayer";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

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

  // Ensure we're on the client side before accessing router
  useEffect(() => {
    setIsClient(true);
    // Give time for router to be ready
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Only get episode after client is ready and id is available
  const episodeId = isClient && id ? Number(id) : 1;
  const episode =
    podcastEpisodes.find((ep) => ep.id === episodeId) || podcastEpisodes[0];

  // Check if episode has video
  const hasVideo = episode.videoUrl && episode.videoUrl.length > 0;

  // Generate waveform bars only after client is ready
  useEffect(() => {
    if (isClient) {
      const bars = Array.from({ length: 100 }, () => Math.random() * 80 + 20);
      setWaveformBars(bars);
    }
  }, [isClient, id]);

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

  return (
    <>
      <Head>
        <title>{episode.title} - Budget Ndio Story Podcasts</title>
        <meta name="description" content={episode.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Loading State */}
      {!isClient || isLoading ? (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-white/60">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
          {/* Back Button */}
          <div className="fixed top-6 left-6 z-50">
            <Link
              href="/podcasts"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition"
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
              Back
            </Link>
          </div>

          {/* Main Player Container */}
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Cover Art / Video Section */}
            <div
              className={`w-full ${
                viewMode === "video"
                  ? "lg:w-full lg:aspect-video lg:max-h-[70vh] bg-black"
                  : `lg:w-1/2 lg:min-h-screen bg-gradient-to-br ${episode.coverColor}`
              } flex flex-col items-center justify-center p-0`}
            >
              {viewMode === "video" && episode.videoUrl ? (
                <div className="w-full h-full">
                  <YouTubePlayer
                    videoId={extractYouTubeId(episode.videoUrl)}
                    autoplay={true}
                  />
                </div>
              ) : (
                <div className="relative">
                  {/* Animated vinyl/record effect */}
                  <div
                    className={`w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center ${isPlaying ? "animate-spin-slow" : ""}`}
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center">
                        <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-white" />
                      </div>
                    </div>
                  </div>

                  {/* Play button overlay */}
                  <button
                    onClick={handlePlayPause}
                    className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition shadow-lg"
                  >
                    {isPlaying ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Player Controls Section */}
            <div
              className={`w-full lg:w-1/2 flex flex-col justify-center p-6 md:p-12 lg:p-16 ${
                viewMode === "video"
                  ? "lg:w-full lg:max-h-[40vh] lg:overflow-y-auto"
                  : ""
              }`}
            >
              {/* Episode Info */}
              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm text-white/70 mb-4">
                  Episode {episode.id}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-FoundersGrotesk leading-tight mb-4">
                  {episode.title}
                </h1>
                <p className="text-lg text-white/60 font-NeueMontreal">
                  {episode.excerpt}
                </p>
              </div>

              {/* Waveform Visualization */}
              <div className="mb-8">
                <div
                  ref={waveformRef}
                  className="flex items-center justify-center gap-1 h-20 md:h-32"
                >
                  {waveformBars.map((height, index) => {
                    const progress =
                      duration > 0 ? (currentTime / duration) * 100 : 0;
                    const isPlayed =
                      (index / waveformBars.length) * 100 <= progress;
                    return (
                      <div
                        key={index}
                        className={`w-1 md:w-2 rounded-full transition-all duration-150 ${
                          isPlayed
                            ? "bg-white"
                            : "bg-white/20 hover:bg-white/40"
                        }`}
                        style={{
                          height: `${height}%`,
                          maxHeight: "100%",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div
                  ref={progressRef}
                  className="w-full h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-white rounded-full transition-all duration-100"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-white/50 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Main Controls */}
              <div className="flex items-center justify-center gap-6 mb-8">
                {/* Rewind 15s */}
                <button
                  onClick={() => handleSkip(-15)}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
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
                      fontSize="7"
                      fill="currentColor"
                      textAnchor="middle"
                    >
                      15
                    </text>
                  </svg>
                </button>

                {/* Play/Pause */}
                <button
                  onClick={handlePlayPause}
                  className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition shadow-lg"
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
                </button>

                {/* Forward 30s */}
                <button
                  onClick={() => handleSkip(30)}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
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
                      fontSize="7"
                      fill="currentColor"
                      textAnchor="middle"
                    >
                      30
                    </text>
                  </svg>
                </button>
              </div>

              {/* Secondary Controls */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* View Mode Toggle (if video available) */}
                {hasVideo && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode("audio")}
                      className={`px-4 py-2 rounded-full transition text-sm font-medium ${
                        viewMode === "audio"
                          ? "bg-white text-black"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      Audio
                    </button>
                    <button
                      onClick={() => setViewMode("video")}
                      className={`px-4 py-2 rounded-full transition text-sm font-medium ${
                        viewMode === "video"
                          ? "bg-white text-black"
                          : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      Video
                    </button>
                  </div>
                )}

                {/* Playback Speed */}
                <button
                  onClick={togglePlaybackSpeed}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-sm font-medium"
                >
                  {playbackSpeed}x
                </button>

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
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
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                </div>
              </div>

              {/* Episode Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-sm text-white/70">
                  {episode.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-sm text-white/70">
                  {episode.duration}
                </span>
              </div>
            </div>
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

          {/* Full-width Footer Section */}
          {/* <div className="w-full bg-[#0a0a0a] -mx-6 lg:-mx-0"> */}
          <LandingFooter />
          {/* </div> */}
        </div>
      )}
    </>
  );
}
