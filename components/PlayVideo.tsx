"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function PlayVideo({ videosrc }: { videosrc: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const mq = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div
      className="w-full relative overflow-hidden cursor-pointer"
      ref={container}
      onClick={togglePlay}
    >
      {/* Gray Monochromatic Overlay */}
      <div className="absolute inset-0 bg-gray-500/20 grayscale pointer-events-none z-10" />
      <div className="w-full h-full">
        <video
          className="w-full h-full grayscale object-cover"
          loop
          ref={videoRef}
          src={videosrc}
        />
        {/* Play Button Overlay */}
        {!isPlaying && (
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
              <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-xl">
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
        {/* Pause Button Overlay */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <button className="text-white text-[14px] bg-black/50 px-[16px] py-[8px] leading-none font-normal font-NeueMontreal rounded-[20px] backdrop-blur-sm hover:bg-black/70 transition-colors">
              Pause
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
