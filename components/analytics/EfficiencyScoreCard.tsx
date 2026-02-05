"use client";

import { motion } from "framer-motion";

interface EfficiencyScoreCardProps {
  score: number;
  label: string;
  description?: string;
  color?: "blue" | "green" | "yellow" | "red";
  size?: "small" | "medium" | "large";
  showDetails?: boolean;
  details?: { label: string; value: string | number }[];
}

interface SizeConfig {
  ring: number;
  stroke: number;
  text: string;
}

const colorMap = {
  blue: {
    bg: "bg-[#1e40af]/10",
    text: "text-[#1e40af]",
    ring: "ring-[#1e40af]/20",
    gradient: "from-[#1e40af] to-[#3b82f6]",
  },
  green: {
    bg: "bg-[#059669]/10",
    text: "text-[#059669]",
    ring: "ring-[#059669]/20",
    gradient: "from-[#059669] to-[#10b981]",
  },
  yellow: {
    bg: "bg-[#ca8a04]/10",
    text: "text-[#ca8a04]",
    ring: "ring-[#ca8a04]/20",
    gradient: "from-[#ca8a04] to-[#eab308]",
  },
  red: {
    bg: "bg-[#dc2626]/10",
    text: "text-[#dc2626]",
    ring: "ring-[#dc2626]/20",
    gradient: "from-[#dc2626] to-[#ef4444]",
  },
};

const sizeMap: Record<string, SizeConfig> = {
  small: { ring: 60, stroke: 6, text: "text-xl" },
  medium: { ring: 100, stroke: 8, text: "text-3xl" },
  large: { ring: 140, stroke: 10, text: "text-4xl" },
};

const getScoreColor = (score: number): "blue" | "green" | "yellow" | "red" => {
  if (score >= 80) return "green";
  if (score >= 60) return "blue";
  if (score >= 40) return "yellow";
  return "red";
};

const CircularProgress = ({
  percentage,
  size,
  strokeWidth,
  color,
  animated = true
}: {
  percentage: number;
  size: number;
  strokeWidth: number;
  color: string;
  animated?: boolean;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: animated ? 1.5 : 0, ease: "easeOut" }}
        style={{ strokeDasharray: circumference }}
      />
    </svg>
  );
};

export default function EfficiencyScoreCard({
  score,
  label,
  description,
  color = "blue",
  size = "medium",
  showDetails = false,
  details = [],
}: EfficiencyScoreCardProps) {
  const colors = colorMap[getScoreColor(score)];
  const sizes = sizeMap[size];
  const colorCode = color === "blue" ? "#1e40af" : color === "green" ? "#059669" : color === "yellow" ? "#ca8a04" : "#dc2626";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-white rounded-2xl p-6 shadow-lg border border-[#e5e7eb] ${colors.bg}`}
    >
      {/* Circular Progress */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative">
          <CircularProgress
            percentage={score}
            size={sizes.ring}
            strokeWidth={sizes.stroke}
            color={colorCode}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${sizes.text} font-FoundersGrotesk font-bold ${colors.text}`}>
              {score}
            </span>
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <h4 className="text-lg font-FoundersGrotesk font-medium text-[#111]">
          {label}
        </h4>
        {description && (
          <p className="text-sm text-[#666] font-NeueMontreal mt-1">
            {description}
          </p>
        )}
      </div>

      {/* Details */}
      {showDetails && details.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
          <div className="grid grid-cols-2 gap-3">
            {details.map((detail, index) => (
              <div key={index} className="text-center">
                <p className="text-lg font-FoundersGrotesk font-bold text-[#111]">
                  {detail.value}
                </p>
                <p className="text-xs text-[#666] font-NeueMontreal">
                  {detail.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Score Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-[#666] mb-1">
          <span>0</span>
          <span>100</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${colors.gradient}`}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className={`text-xs font-medium ${colors.text}`}>
            {score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Fair" : "Needs Improvement"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
