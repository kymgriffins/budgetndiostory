"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";

interface LineChartData {
  year: string | number;
  value: number;
  [key: string]: string | number;
}

interface BudgetLineChartProps {
  data: LineChartData[];
  title?: string;
  dataKey?: string;
  secondDataKey?: string;
  showArea?: boolean;
  showGrid?: boolean;
  animated?: boolean;
  strokeColor?: string;
  secondStrokeColor?: string;
}

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

const formatValue = (value: number) => {
  if (value >= 1e12) return `Ksh ${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `Ksh ${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `Ksh ${(value / 1e6).toFixed(0)}M`;
  if (value >= 1e3) return `Ksh ${(value / 1e3).toFixed(0)}K`;
  return `Ksh ${value}`;
};

// Calculate growth outside component
const calculateGrowth = (data: LineChartData[], dataKey: string): string => {
  if (data.length < 2) return "N/A";
  const first = Number(data[0]?.[dataKey]) || 0;
  const last = Number(data[data.length - 1]?.[dataKey]) || 0;
  if (first === 0) return "N/A";
  const growth = ((last - first) / first) * 100;
  return `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%`;
};

export default function BudgetLineChart({
  data,
  title,
  dataKey = "value",
  secondDataKey,
  showArea = false,
  showGrid = true,
  strokeColor = "#1e40af",
  secondStrokeColor = "#059669",
}: BudgetLineChartProps) {
  const growthText = calculateGrowth(data, dataKey);
  const firstValue = data[0] ? formatValue(Number(data[0]?.[dataKey]) || 0) : "N/A";
  const lastValue = data[data.length - 1] ? formatValue(Number(data[data.length - 1]?.[dataKey]) || 0) : "N/A";
  const firstYear = String(data[0]?.year || "N/A");
  const lastYear = String(data[data.length - 1]?.year || "N/A");

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

      <ResponsiveContainer width="100%" height={400}>
        {showArea ? (
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis
              dataKey="year"
              tick={{ fill: "#666", fontSize: 12, fontFamily: "Neue Montreal, sans-serif" }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tickFormatter={formatValue}
              tick={{ fill: "#666", fontSize: 12, fontFamily: "Neue Montreal, sans-serif" }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px", fontFamily: "Neue Montreal, sans-serif" }} />
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              name="Budget"
              stroke={strokeColor}
              fill="url(#colorValue)"
              strokeWidth={3}
              dot={{ fill: strokeColor, strokeWidth: 2, r: 4, strokeOpacity: 0.5 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            {secondDataKey && (
              <Area
                type="monotone"
                dataKey={secondDataKey}
                name="Comparison"
                stroke={secondStrokeColor}
                fill="transparent"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            )}
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
            <XAxis
              dataKey="year"
              tick={{ fill: "#666", fontSize: 12, fontFamily: "Neue Montreal, sans-serif" }}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tickFormatter={formatValue}
              tick={{ fill: "#666", fontSize: 12, fontFamily: "Neue Montreal, sans-serif" }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px", fontFamily: "Neue Montreal, sans-serif" }} />
            <Line
              type="monotone"
              dataKey={dataKey}
              name="Budget"
              stroke={strokeColor}
              strokeWidth={3}
              dot={{ fill: strokeColor, strokeWidth: 2, r: 4, strokeOpacity: 0.5 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            {secondDataKey && (
              <Line
                type="monotone"
                dataKey={secondDataKey}
                name="Comparison"
                stroke={secondStrokeColor}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            )}
          </LineChart>
        )}
      </ResponsiveContainer>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-[#666] font-NeueMontreal mb-1">First Year</p>
          <p className="text-lg font-FoundersGrotesk font-bold text-[#111]">{firstValue}</p>
          <p className="text-xs text-[#666]">{firstYear}</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-[#666] font-NeueMontreal mb-1">Latest Year</p>
          <p className="text-lg font-FoundersGrotesk font-bold text-[#111]">{lastValue}</p>
          <p className="text-xs text-[#666]">{lastYear}</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-[#666] font-NeueMontreal mb-1">Growth</p>
          <p className="text-lg font-FoundersGrotesk font-bold text-[#059669]">{growthText}</p>
          <p className="text-xs text-[#666]">Total Growth</p>
        </div>
      </div>
    </motion.div>
  );
}
