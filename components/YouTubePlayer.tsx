"use client";

import { eyes } from "@/public";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface YouTubePlayerProps {
  videoId: string;
  autoplay?: boolean;
  onStateChange?: (state: number) => void;
  onProgress?: (
    progress: number,
    currentTime: number,
    duration: number,
  ) => void;
}

export default function YouTubePlayer({
  videoId,
  autoplay = false,
  onStateChange,
  onProgress,
}: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Extract video ID from YouTube URL or direct ID
  const getVideoId = useCallback((input: string): string => {
    // Direct video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return input;
    }
    // YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) return match[1];
    }

    return input; // Return as-is if it looks like a direct ID
  }, []);

  const actualVideoId = getVideoId(videoId);

  // Initialize YouTube player
  useEffect(() => {
    // Load YouTube IFrame API
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player(
        `youtube-player-${actualVideoId}`,
        {
          videoId: actualVideoId,
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            fs: 0,
            playsinline: 1,
            iv_load_policy: 3,
          },
          events: {
            onReady: (event: any) => {
              setIsLoading(false);
              setDuration(event.target.getDuration());
            },
            onStateChange: (event: any) => {
              const state = event.data;
              setIsPlaying(state === 1);
              if (onStateChange) onStateChange(state);

              if (state === 1) {
                setDuration(event.target.getDuration());
              }
            },
          },
        },
      );
    };

    if ((window as any).YT && (window as any).YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [actualVideoId, autoplay, onStateChange]);

  // Update progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        if (playerRef.current) {
          const current = playerRef.current.getCurrentTime();
          const total = playerRef.current.getDuration();
          setCurrentTime(current);
          setProgress(total > 0 ? (current / total) * 100 : 0);
          if (onProgress) onProgress((current / total) * 100, current, total);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onProgress]);

  // Mouse movement handler for controls visibility
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      let deltaX = mouseX - window.innerWidth / 2;
      let deltaY = mouseY - window.innerHeight / 2;

      var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotate(angle - 180);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (playerRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const seekTime = percent * duration;
      playerRef.current.seekTo(seekTime, true);
      setProgress(percent * 100);
    }
  };

  const handleSkip = (seconds: number) => {
    if (playerRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      playerRef.current.seekTo(newTime, true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    setPlaybackRate(newRate);
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(newRate);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden cursor-pointer bg-black rounded-[16px]"
      onClick={togglePlay}
    >
      {/* YouTube IFrame */}
      <div className="w-full aspect-video relative">
        <iframe
          ref={iframeRef}
          id={`youtube-player-${actualVideoId}`}
          className="w-full h-full absolute inset-0"
          src={`https://www.youtube.com/embed/${actualVideoId}?enablejsapi=1&autoplay=${autoplay ? 1 : 0}&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&fs=0&playsinline=1&iv_load_policy=3`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
          title="YouTube video player"
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-white/60 font-NeueMontreal text-sm">
                Loading video...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Custom Play Button Overlay */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div
                  className="w-[120px] h-[120px] smOnly:w-[100px] smOnly:h-[100px] xm:w-[80px] xm:h-[80px] bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                  onClick={togglePlay}
                >
                  <div className="relative w-full h-full">
                    <Image
                      style={{
                        transform: `rotate(${rotate}deg)`,
                      }}
                      src={eyes}
                      alt="Play"
                      className="w-full h-full object-cover"
                    />
                    <svg
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 smOnly:w-8 smOnly:h-8 xm:w-6 xm:h-6 text-white pl-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
              <p className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white font-NeueMontreal text-sm whitespace-nowrap">
                Click to play
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress Bar */}
            <div
              className="w-full h-1 bg-white/20 rounded-full cursor-pointer mb-4 group"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-white rounded-full relative transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* Left Controls */}
              <div className="flex items-center gap-4">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  {isPlaying ? (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-white pl-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Skip Buttons */}
                <button
                  onClick={() => handleSkip(-10)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                    />
                  </svg>
                  <span className="text-xs absolute ml-6 mt-2">10</span>
                </button>

                <button
                  onClick={() => handleSkip(10)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                    />
                  </svg>
                  <span className="text-xs absolute ml-6 mt-2">10</span>
                </button>

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                  >
                    {isMuted || volume === 0 ? (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    onClick={(e) => e.stopPropagation()}
                    className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                </div>

                {/* Time Display */}
                <span className="text-white text-sm font-NeueMontreal">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2">
                {/* Playback Speed */}
                <button
                  onClick={changePlaybackRate}
                  className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition text-sm text-white font-NeueMontreal"
                >
                  {playbackRate}x
                </button>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper function to extract YouTube video ID from various URL formats
export function extractYouTubeId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  // If no match, return the original (might be a direct ID)
  return url;
}
