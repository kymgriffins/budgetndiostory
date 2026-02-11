"use client";

import { AnimatePresence, motion } from "framer-motion";
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

// Extract video ID from YouTube URL or direct ID
export function extractYouTubeId(input: string): string {
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
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isClient, setIsClient] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playerIdRef = useRef<string>(`youtube-player-${Date.now()}`);

  // Set client flag on mount
  useEffect(() => {
    setIsClient(true);
    playerIdRef.current = `youtube-player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const actualVideoId = extractYouTubeId(videoId);

  // Initialize YouTube player
  useEffect(() => {
    if (!isClient || !actualVideoId) return;

    let mounted = true;
    let ytPlayerReady = false;

    // Cleanup previous player if exists
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (e) {
        // Player may already be destroyed
      }
      playerRef.current = null;
    }

    const initPlayer = () => {
      if (!mounted || !actualVideoId) return;

      // Clean up any existing API ready handler
      if ((window as any).onYouTubeIframeAPIReady) {
        delete (window as any).onYouTubeIframeAPIReady;
      }

      const onYouTubeIframeAPIReady = () => {
        if (!mounted || !actualVideoId) return;

        try {
          playerRef.current = new (window as any).YT.Player(
            playerIdRef.current,
            {
              videoId: actualVideoId,
              playerVars: {
                autoplay: autoplay ? 1 : 0,
                controls: 0,
                disablekb: 1,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                fs: 1,
                playsinline: 1,
                iv_load_policy: 3,
                origin: isClient ? window.location.origin : "",
              },
              events: {
                onReady: (event: any) => {
                  if (!mounted) return;
                  ytPlayerReady = true;
                  setIsLoading(false);
                  try {
                    setDuration(event.target.getDuration());
                  } catch (e) {
                    // Duration may not be available
                  }
                },
                onStateChange: (event: any) => {
                  if (!mounted) return;
                  const state = event.data;
                  setIsPlaying(state === 1);
                  if (onStateChange) onStateChange(state);

                  if (state === 1) {
                    setIsLoading(false);
                    try {
                      setDuration(event.target.getDuration());
                    } catch (e) {
                      // Duration may not be available
                    }
                  } else if (state === 2) {
                    // Paused
                    setIsPlaying(false);
                  } else if (state === 0) {
                    // Ended
                    setIsPlaying(false);
                  }
                },
                onError: (event: any) => {
                  if (!mounted) return;
                  setIsLoading(false);
                },
              },
            },
          );
        } catch (e) {
          setIsLoading(false);
        }
      };

      if ((window as any).YT && (window as any).YT.Player) {
        setTimeout(onYouTubeIframeAPIReady, 100);
      } else {
        (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

        // Load YouTube IFrame API
        if (!(window as any).YT) {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          const firstScriptTag = document.getElementsByTagName("script")[0];
          if (firstScriptTag?.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          }
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(initPlayer, 100);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      ytPlayerReady = false;

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Player may already be destroyed
        }
        playerRef.current = null;
      }

      if ((window as any).onYouTubeIframeAPIReady) {
        delete (window as any).onYouTubeIframeAPIReady;
      }
    };
  }, [actualVideoId, autoplay, onStateChange, isClient]);

  // Update progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        if (playerRef.current) {
          try {
            const current = playerRef.current.getCurrentTime();
            const total = playerRef.current.getDuration();
            setCurrentTime(current);
            setProgress(total > 0 ? (current / total) * 100 : 0);
            if (onProgress) onProgress((current / total) * 100, current, total);
          } catch (e) {
            // Player may not be ready
          }
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

  const togglePlay = useCallback(() => {
    if (playerRef.current) {
      try {
        if (isPlaying) {
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.playVideo();
        }
      } catch (e) {
        // Play/pause failed
      }
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (playerRef.current) {
      try {
        if (isMuted) {
          playerRef.current.unMute();
          playerRef.current.setVolume(volume);
          setIsMuted(false);
        } else {
          playerRef.current.mute();
          setIsMuted(true);
        }
      } catch (e) {
        // Mute/unmute failed
      }
    }
  }, [isMuted, volume]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseInt(e.target.value);
      setVolume(newVolume);
      if (playerRef.current) {
        try {
          playerRef.current.setVolume(newVolume);
          setIsMuted(newVolume === 0);
        } catch (e) {
          // Volume change failed
        }
      }
    },
    [],
  );

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (playerRef.current && duration > 0) {
        try {
          const rect = e.currentTarget.getBoundingClientRect();
          const percent = (e.clientX - rect.left) / rect.width;
          const seekTime = percent * duration;
          playerRef.current.seekTo(seekTime, true);
          setProgress(percent * 100);
        } catch (e) {
          // Seek failed
        }
      }
    },
    [duration],
  );

  const handleSkip = useCallback(
    (seconds: number) => {
      if (playerRef.current) {
        try {
          const newTime = Math.max(
            0,
            Math.min(duration, currentTime + seconds),
          );
          playerRef.current.seekTo(newTime, true);
        } catch (e) {
          // Skip failed
        }
      }
    },
    [duration, currentTime],
  );

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Generate iframe src URL
  const iframeSrc = isClient
    ? `https://www.youtube.com/embed/${actualVideoId}?enablejsapi=1&autoplay=${autoplay ? 1 : 0}&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playsinline=1&iv_load_policy=3`
    : "";

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden cursor-pointer bg-black rounded-[12px]"
      onClick={togglePlay}
    >
      {/* YouTube IFrame */}
      <div className="w-full aspect-video relative grayscale">
        {isClient && (
          <iframe
            ref={iframeRef}
            id={playerIdRef.current}
            className="w-full h-full absolute inset-0"
            src={iframeSrc}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen={true}
            title="YouTube video player"
          />
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-white/60 font-NeueMontreal text-sm">
                Loading video...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Gray Monochromatic Overlay */}
      <div className="absolute inset-0 bg-gray-500/20 grayscale pointer-events-none z-10" />

      {/* Custom Play Button Overlay */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div
                className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-xl"
                onClick={togglePlay}
              >
                <svg
                  className="w-8 h-8 text-black pl-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.div>
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
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 z-30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress Bar */}
            <div
              className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer mb-4 group"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-white rounded-full relative transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* Left Controls */}
              <div className="flex items-center gap-3">
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

                {/* Skip Back 10s */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSkip(-10);
                  }}
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
                  <span className="text-[10px] absolute ml-5 mt-3 font-medium">
                    10
                  </span>
                </button>

                {/* Skip Forward 10s */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSkip(10);
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition relative"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                    />
                  </svg>
                  <span className="text-[10px] absolute ml-5 mt-3 font-medium">
                    10
                  </span>
                </button>

                {/* Time Display */}
                <div className="text-sm text-white/80 font-mono ml-2">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-3">
                {/* Mute/Unmute */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  {isMuted ? (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line
                        x1="23"
                        y1="9"
                        x2="17"
                        y2="15"
                        strokeWidth="2"
                        stroke="currentColor"
                      />
                      <line
                        x1="17"
                        y1="9"
                        x2="23"
                        y2="15"
                        strokeWidth="2"
                        stroke="currentColor"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>

                {/* Volume Slider */}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
