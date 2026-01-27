"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface EduVideoCardProps {
  title: string;
  description: string;
  videoSrc: string;
}

export default function EduVideoCard({ title, description, videoSrc }: EduVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;

    if (!card || !video) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
      video.play();
      setIsPlaying(true);
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer group"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        className="w-full h-full object-cover"
        preload="metadata"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
        <div className="mt-4 flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-xs uppercase tracking-wide">
            {isPlaying ? "Playing" : "Hover to Play"}
          </span>
        </div>
      </div>
    </div>
  );
}
