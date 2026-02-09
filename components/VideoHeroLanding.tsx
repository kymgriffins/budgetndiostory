"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/**
 * VideoHeroLanding Component
 * Full-screen hero section with video background - Uione minimalist design
 *
 * Features:
 * - Full-screen video background spanning entire viewport
 * - Video loops continuously with smooth playback
 * - Minimalist content design
 * - Clean CTA with hover effects
 * - Animated scroll indicator
 * - Responsive design
 * - Video loading states
 */
export default function VideoHeroLanding() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background - Full viewport, looping */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="/budgetndiostory.mp4" type="video/mp4" />
      </video>

      {/* Loading placeholder - shows while video loads */}
      {!isVideoLoaded && <div className="absolute inset-0 bg-[#0a0a0a]" />}



      {/* Content Container - Centered */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: isVideoLoaded ? 1 : 0,
            y: isVideoLoaded ? 0 : 40,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="text-center font-NeueMontreal text-white font-semibold tracking-[-0.03em] text-[clamp(40px,8vw,100px)] leading-[0.9]"
        >
          Budget Ndio
          <br />
          Story
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
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-6 text-center font-NeueMontreal text-white/80 text-[clamp(14px,1.5vw,18px)] leading-[1.5] max-w-lg"
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
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-10"
        >
          <Link href="/learn" className="inline-flex items-center gap-3 group">
            <span className="font-NeueMontreal text-white text-sm uppercase tracking-wider">
              Get Involved
            </span>
            <ArrowUpRight
              size={18}
              className="text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator - Minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-px h-12 bg-white/30" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-NeueMontreal">
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  );
}
