"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface VideoThumbnailProps {
  videoId: string;
  title: string;
  duration: string;
  type: string;
  episodeId: number;
  gradientColor: string;
  showPlayOnHover?: boolean;
}

export default function VideoThumbnail({
  videoId,
  title,
  duration,
  type,
  episodeId,
  gradientColor,
  showPlayOnHover = true,
}: VideoThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract clean video ID from various YouTube URL formats
  const getCleanVideoId = (input: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) return match[1];
    }

    // If it's already a clean ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return input;
    }

    return input;
  };

  const cleanVideoId = getCleanVideoId(videoId);

  // Get YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`;
  const fallbackThumbnailUrl = `https://img.youtube.com/vi/${cleanVideoId}/hqdefault.jpg`;

  // Load video on hover
  useEffect(() => {
    if (isHovered && showPlayOnHover && iframeRef.current) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isHovered, showPlayOnHover]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPlaying(false);
  };

  return (
    <Link
      href={`/podcasts/${episodeId}`}
      className="block w-full h-[180px] relative overflow-hidden rounded-t-[16px] group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientColor} transition-transform duration-500 group-hover:scale-105`}
      />

      {/* YouTube Video IFrame - Loads only on hover */}
      <AnimatePresence>
        {isHovered && isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <iframe
              ref={iframeRef}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${cleanVideoId}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&fs=0&playsinline=1&iv_load_policy=3`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={false}
              title={title}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback Thumbnail Image - Shows when not hovered */}
      {!isPlaying && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
          }}
          onError={(e) => {
            // Fallback to hqdefault if maxresdefault fails
            (e.target as HTMLDivElement).style.backgroundImage =
              `url(${fallbackThumbnailUrl})`;
          }}
        >
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
        </div>
      )}

      {/* Play Icon Overlay - Shows on hover when video is loading */}
      <AnimatePresence>
        {isHovered && !isPlaying && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
              <svg
                className="w-8 h-8 text-black ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {/* Duration Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-NeueMontreal text-white">
            {duration}
          </span>
          <span className="px-2 py-1 rounded-full bg-red-500/80 backdrop-blur-sm text-xs font-NeueMontreal text-white flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Video
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-FoundersGrotesk font-medium text-white leading-tight group-hover:text-white transition-colors">
          {title}
        </h3>

        {/* Type */}
        <p className="text-sm font-NeueMontreal text-white/70 mt-1 capitalize">
          {type}
        </p>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-white/0 rounded-[16px] group-hover:border-white/30 transition-colors duration-300" />
    </Link>
  );
}

// Helper function to extract video ID
export function extractYouTubeId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return url;
}
