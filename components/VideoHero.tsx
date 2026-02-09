"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/**
 * VideoHero Component
 * Full-screen hero section with video background for Budget Ndio Story
 *
 * Features:
 * - Full-screen video background spanning entire viewport
 * - Video loops continuously with smooth playback
 * - Animated title text with overlay
 * - CTA button with hover effects
 * - Clean scroll indicator
 * - Responsive design
 * - Video loading states
 */
export default function VideoHero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background - Full viewport, looping */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 grayscale ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="/budgetndiostory.mp4" type="video/mp4" />
      </video>

      {/* Loading placeholder - shows while video loads */}
      {!isVideoLoaded && <div className="absolute inset-0 bg-background" />}



      {/* Content Container - Centered */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isVideoLoaded ? 1 : 0,
            y: isVideoLoaded ? 0 : 30,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.86, 0, 0.07, 0.995],
          }}
          className="text-center heading tracking-[-1.3px] text-white font-semibold font-NeueMontreal uppercase"
        >
          Budget Ndio Story
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isVideoLoaded ? 1 : 0,
            y: isVideoLoaded ? 0 : 20,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.86, 0, 0.07, 0.995],
          }}
          className="mt-4 text-center paragraph font-NeueMontreal text-white/90 max-w-xl"
        >
          Bridging the budget literacy gap for youth
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isVideoLoaded ? 1 : 0,
            y: isVideoLoaded ? 0 : 20,
          }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0.86, 0, 0.07, 0.995],
          }}
          className="mt-8"
        >
          <Link href="/learn" className="flex items-center gap-3 group">
            <div className="rounded-full border border-white/60 group-hover:bg-white py-2.5 px-5 cursor-pointer transition-all duration-300">
              <span className="paragraph font-NeueMontreal text-white uppercase group-hover:text-black transition-all duration-300 text-sm">
                Start Learning
              </span>
            </div>
            <div className="w-10 h-10 flex items-center justify-center border border-white/60 rounded-full group-hover:bg-white transition-all duration-300">
              <ArrowUpRight
                size={20}
                className="text-white group-hover:text-black transition-all duration-300"
              />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator - Animated */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ height: [12, 48, 12] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px bg-white/50 mx-auto"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-center mt-3"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/60 font-NeueMontreal">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
