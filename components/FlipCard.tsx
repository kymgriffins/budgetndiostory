import Link from "next/link";
import { useState } from "react";

interface Project {
  id: number;
  name: string;
  budget: string;
  status: string;
  county: string;
  icon: string;
  description: string;
  timeline: string;
  impact: string;
}

interface FlipCardProps {
  project: Project;
}

export default function FlipCard({ project }: FlipCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      allocated: "Allocated",
      "in-progress": "In Progress",
      completed: "Completed",
      stalled: "Stalled",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      allocated: "bg-blue-500",
      "in-progress": "bg-yellow-500",
      completed: "bg-green-500",
      stalled: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const getProgressWidth = (status: string) => {
    const widths: Record<string, string> = {
      completed: "100%",
      "in-progress": "65%",
      allocated: "20%",
      stalled: "45%",
    };
    return widths[status] || "0%";
  };

  const getProgressLabel = (status: string) => {
    const labels: Record<string, string> = {
      completed: "100% complete",
      "in-progress": "65% complete",
      allocated: "Not started",
      stalled: "Paused",
    };
    return labels[status] || "";
  };

  return (
    <div
      className="group relative overflow-hidden rounded-[26px] bg-white border border-black/10 transition-all duration-500 hover:border-black/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Subtle pattern overlay */}
      <div
        className={`absolute inset-0 opacity-5 transition-opacity duration-700 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Front content - Modern card design */}
      <div
        className={`relative z-10 h-full p-[26px] flex flex-col transition-all duration-300 ${
          isHovered ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        {/* Top section with decorative element */}
        <div className="flex items-start justify-between mb-[16px]">
          <div className="relative">
            <div
              className={`w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-[28px] transition-all duration-500 ${
                isHovered ? "bg-white/10 scale-110" : "bg-[#f5f5f5]"
              }`}
            >
              {project.icon}
            </div>
            {/* Status indicator */}
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(project.status)}`}
            />
          </div>
          <div className={`text-right ${isHovered ? "opacity-70" : ""}`}>
            <p className="text-[24px] font-FoundersGrotesk font-medium">
              {project.budget}
            </p>
            <p className="text-[11px] font-NeueMontreal uppercase tracking-wider mt-[4px] opacity-60">
              Total Budget
            </p>
          </div>
        </div>

        {/* Middle section - Project name with decorative line */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-[22px] font-FoundersGrotesk leading-tight">
            {project.name}
          </h3>
          <div
            className={`mt-[12px] w-[40px] h-[3px] rounded-full transition-all duration-500 ${
              isHovered ? "bg-white/30" : "bg-[#111]/10"
            }`}
          />
          <p
            className={`mt-[12px] text-[13px] font-NeueMontreal leading-relaxed ${
              isHovered ? "text-white/40" : "text-[#212121]/50"
            }`}
          >
            {project.county} County •{" "}
            {project.county === "National" ? "Nationwide" : "Regional"}
          </p>
        </div>

        {/* Bottom section */}
        <div
          className={`mt-auto pt-[16px] border-t transition-all duration-500 flex items-center justify-between ${
            isHovered ? "border-white/10" : "border-black/5"
          }`}
        >
          <div className="flex items-center gap-[6px]">
            <span
              className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}
            />
            <span className="text-[12px] font-NeueMontreal opacity-60">
              {getStatusLabel(project.status)}
            </span>
          </div>
          <span
            className={`text-[12px] font-NeueMontreal transition-all duration-300 flex items-center gap-[6px] ${
              isHovered ? "opacity-0 -translate-x-2" : "opacity-50"
            }`}
          >
            <span>Explore</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Hover details overlay */}
      <div
        className={`absolute inset-0 z-20 p-[26px] flex flex-col transition-all duration-700 ${
          isHovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        {/* Header with icon and status */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="w-[48px] h-[48px] rounded-xl bg-white/10 flex items-center justify-center text-[24px]">
              {project.icon}
            </div>
            <div>
              <p className="text-[14px] font-NeueMontreal text-white/60 uppercase tracking-wide">
                {getStatusLabel(project.status)}
              </p>
              <p className="text-[18px] font-FoundersGrotesk text-white mt-[2px]">
                {project.budget}
              </p>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-[11px] font-NeueMontreal font-medium ${getStatusColor(
              project.status,
            )} text-white`}
          >
            {getProgressLabel(project.status)}
          </div>
        </div>

        {/* Project name */}
        <h3 className="mt-[20px] text-[24px] font-FoundersGrotesk leading-tight text-white">
          {project.name}
        </h3>

        {/* Key metrics grid */}
        <div className="mt-[16px] grid grid-cols-2 gap-[12px]">
          <div className="bg-white/5 rounded-[12px] p-[12px]">
            <div className="flex items-center gap-[8px] text-white/40">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-[11px] font-NeueMontreal uppercase">
                Timeline
              </span>
            </div>
            <p className="mt-[6px] text-[14px] font-NeueMontreal text-white">
              {project.timeline}
            </p>
          </div>
          <div className="bg-white/5 rounded-[12px] p-[12px]">
            <div className="flex items-center gap-[8px] text-white/40">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="text-[11px] font-NeueMontreal uppercase">
                Impact
              </span>
            </div>
            <p className="mt-[6px] text-[14px] font-NeueMontreal text-white">
              {project.impact}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="mt-[16px] text-[13px] font-NeueMontreal text-white/50 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Progress bar */}
        <div className="mt-auto pt-[16px]">
          <div className="w-full bg-white/10 rounded-full h-[6px] overflow-hidden">
            <div
              className={`h-full ${getStatusColor(project.status)} transition-all duration-700`}
              style={{ width: getProgressWidth(project.status) }}
            />
          </div>
          <div className="flex justify-between items-center mt-[8px]">
            <span className="text-[12px] font-NeueMontreal text-white/50 capitalize">
              {project.county}
            </span>
            <span className="text-[12px] font-NeueMontreal text-white/40">
              {parseInt(getProgressWidth(project.status))}% Progress
            </span>
          </div>
        </div>

        {/* Links - only visible on hover */}
        <div className="mt-[18px] flex gap-[10px]">
          <Link
            href={`/projects/${project.id}`}
            className="flex-1 py-[12px] px-[16px] rounded-full bg-white text-[#111] text-center text-[13px] font-NeueMontreal font-medium hover:bg-white/90 transition shadow-lg"
          >
            View Details
          </Link>
          <Link
            href={`/stories/${project.id}`}
            className="flex-1 py-[12px] px-[16px] rounded-full border border-white/30 text-white text-center text-[13px] font-NeueMontreal hover:bg-white/10 transition"
          >
            Read Story
          </Link>
        </div>
      </div>
    </div>
  );
}
