"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface PlayVideoProps {
  videosrc: string;
  poster?: string;
}

export default function PlayVideo({ videosrc, poster }: PlayVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = async () => {
    if (!videoRef.current || hasError) return;

    try {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        await videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Playback error:", error);
      setHasError(true);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  // Fallback for failed videos - show a static image or placeholder
  if (hasError) {
    return (
      <div className="w-full relative overflow-hidden bg-[#1a1a1a] rounded-lg">
        <div className="aspect-video w-full flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-white/60 font-NeueMontreal text-sm">
            Video preview unavailable
          </p>
          <p className="text-white/40 font-NeueMontreal text-xs mt-1">
            {videosrc.split("/").pop()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full relative overflow-hidden cursor-pointer bg-[#1a1a1a] rounded-lg"
      onClick={togglePlay}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-white/60 font-NeueMontreal text-xs">
              Loading video...
            </p>
          </div>
        </div>
      )}

      <div className="w-full h-full">
        <video
          className="w-full h-full grayscale object-cover"
          loop
          ref={videoRef}
          src={videosrc}
          poster={poster}
          playsInline
          onClick={(e) => e.stopPropagation()}
        />

        {/* Play Button Overlay */}
        {!isPlaying && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30 z-20"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-xl">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-black pl-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Pause Button Overlay */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <button className="text-white text-[12px] sm:text-[14px] bg-black/50 px-[14px] sm:px-[16px] py-[6px] sm:py-[8px] leading-none font-normal font-NeueMontreal rounded-[20px] backdrop-blur-sm hover:bg-black/70 transition-colors">
              Pause
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
