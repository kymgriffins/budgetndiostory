"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PieChartData {
  name: string;
  value: number;
  color?: string;
  percentage?: number;
}

interface BudgetPieChartProps {
  data: PieChartData[];
  title?: string;
  centerLabel?: string;
  centerValue?: string;
  size?: "small" | "medium" | "large";
  showLegend?: boolean;
  animated?: boolean;
  isDonut?: boolean;
}

const COLORS = [
  "#1e40af", // blue-800
  "#3b82f6", // blue-500
  "#059669", // emerald-600
  "#10b981", // emerald-500
  "#dc2626", // red-600
  "#ca8a04", // yellow-600
  "#7c3aed", // violet-600
  "#ec4899", // pink-500
  "#0891b2", // cyan-600
  "#f97316", // orange-500
];

const sizeMap = {
  small: 220,
  medium: 320,
  large: 420,
};

export default function BudgetPieChart({
  data,
  title,
  centerLabel,
  centerValue,
  size = "medium",
  showLegend = true,
  animated = true,
  isDonut = true,
}: BudgetPieChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const processedData = data.map((item, index) => ({
    ...item,
    percentage: (item.value / total) * 100,
    color: item.color || COLORS[index % COLORS.length],
  }));

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {title && (
        <h3 className="text-lg font-FoundersGrotesk font-medium text-[#111] mb-4 text-center">
          {title}
        </h3>
      )}

      <div className="flex flex-col items-center relative">
        <ResponsiveContainer width="100%" height={sizeMap[size]}>
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              innerRadius={isDonut ? sizeMap[size] * 0.35 : 0}
              outerRadius={
                isDonut ? sizeMap[size] * 0.48 : sizeMap[size] * 0.48
              }
              dataKey="value"
              onMouseEnter={onPieEnter}
              animationDuration={animated ? 1000 : 0}
              animationEasing="ease-out"
              paddingAngle={2}
            >
              {processedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="none"
                  style={{
                    opacity: activeIndex === index ? 1 : 0.75,
                    filter: activeIndex === index ? "brightness(1.1)" : "none",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: unknown) => {
                const numValue = value as number;
                return [`${numValue.toLocaleString()} KES`, ""];
              }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "12px 16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: "#111", fontWeight: 600, marginBottom: 4 }}
              itemStyle={{ color: "#666", fontSize: "14px" }}
            />
            {showLegend && (
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  paddingTop: "24px",
                  fontFamily: "Neue Montreal, sans-serif",
                }}
                iconType="circle"
                iconSize={10}
              />
            )}
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        {(centerLabel || centerValue) && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            {centerValue && (
              <p className="text-2xl font-FoundersGrotesk font-bold text-[#111]">
                {centerValue}
              </p>
            )}
            {centerLabel && (
              <p className="text-xs text-[#666] font-NeueMontreal">
                {centerLabel}
              </p>
            )}
          </div>
        )}

        {/* Active Index Info */}
        {processedData[activeIndex] && (
          <div className="mt-2 text-center">
            <p className="text-sm font-medium text-[#111]">
              {processedData[activeIndex].name}
            </p>
            <p className="text-xs text-[#666]">
              {processedData[activeIndex].percentage?.toFixed(1)}% of total
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
