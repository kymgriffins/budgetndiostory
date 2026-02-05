"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

interface BarChartData {
  name: string;
  value: number;
  comparison?: number;
  color?: string;
}

interface BudgetBarChartProps {
  data: BarChartData[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  layout?: "horizontal" | "vertical";
  showComparison?: boolean;
  showGrid?: boolean;
  animated?: boolean;
  barSize?: number;
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
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <p className="font-medium text-[#111] mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-NeueMontreal">
            {entry.dataKey}: {entry.value?.toLocaleString()} KES
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function BudgetBarChart({
  data,
  title,
  xAxisLabel,
  yAxisLabel,
  layout = "horizontal",
  showComparison = false,
  showGrid = true,
  animated = true,
  barSize = 40,
}: BudgetBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const processedData = data.map((item, index) => ({
    ...item,
    color: item.color || COLORS[index % COLORS.length],
  }));

  const formatValue = (value: number) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {title && (
        <h3 className="text-lg font-FoundersGrotesk font-medium text-[#111] mb-4 text-center">
          {title}
        </h3>
      )}

      <ResponsiveContainer width="100%" height={layout === "vertical" ? 500 : 400}>
        <BarChart
          data={processedData}
          layout={layout === "vertical" ? "vertical" : "horizontal"}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}

          {layout === "horizontal" ? (
            <>
              <XAxis
                dataKey="name"
                tick={{ fill: "#666", fontSize: 12, fontFamily: "Neue Montreal, sans-serif" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis
                tickFormatter={formatValue}
                tick={{ fill: "#666", fontSize: 12, fontFamily: "Neue Montreal, sans-serif" }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                tickFormatter={formatValue}
                tick={{ fill: "#666", fontSize: 12, fontFamily: "Neue Montreal, sans-serif" }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#666", fontSize: 12, fontFamily: "Neue Montreal, sans-serif" }}
                axisLine={false}
                tickLine={false}
                width={120}
              />
            </>
          )}

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              fontFamily: "Neue Montreal, sans-serif",
            }}
          />

          <Bar
            dataKey="value"
            name="Budget"
            radius={[4, 4, 0, 0]}
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            {processedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                style={{
                  opacity: hoveredIndex === -1 || hoveredIndex === index ? 1 : 0.4,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Bar>

          {showComparison && (
            <Bar
              dataKey="comparison"
              name="Previous Year"
              radius={[4, 4, 0, 0]}
              fill="#94a3b8"
              style={{
                opacity: hoveredIndex === -1 ? 0.6 : 0.3,
                transition: "all 0.3s ease",
              }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#1e40af]" />
          <span className="text-sm text-[#666] font-NeueMontreal">Current Year</span>
        </div>
        {showComparison && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#94a3b8]" />
            <span className="text-sm text-[#666] font-NeueMontreal">Previous Year</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

