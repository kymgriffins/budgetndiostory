"use client";

import { motion } from "framer-motion";

interface HeatmapCell {
  x: string;
  y: string;
  value: number;
  label?: string;
}

interface BudgetHeatmapProps {
  data: HeatmapCell[];
  title?: string;
  xLabels: string[];
  yLabels: string[];
  minValue?: number;
  maxValue?: number;
  unit?: string;
  formatValue?: (value: number) => string;
}

const defaultFormatValue = (value: number) => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(0)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(0)}K`;
  return value.toString();
};

const getColor = (value: number, min: number, max: number): string => {
  const ratio = (value - min) / (max - min);

  // Color gradient from light blue to dark blue
  if (ratio < 0.25) return "#dbeafe"; // blue-100
  if (ratio < 0.5) return "#93c5fd"; // blue-300
  if (ratio < 0.75) return "#3b82f6"; // blue-500
  return "#1e40af"; // blue-800
};

export default function BudgetHeatmap({
  data,
  title,
  xLabels,
  yLabels,
  minValue,
  maxValue,
  unit = "KES",
  formatValue = defaultFormatValue,
}: BudgetHeatmapProps) {
  const values = data.map((d) => d.value);
  const min = minValue ?? Math.min(...values);
  const max = maxValue ?? Math.max(...values);

  const getCellValue = (x: string, y: string): number => {
    const cell = data.find((d) => d.x === x && d.y === y);
    return cell?.value ?? 0;
  };

  const getCellLabel = (x: string, y: string): string => {
    const cell = data.find((d) => d.x === x && d.y === y);
    return cell?.label ?? `${formatValue(cell?.value ?? 0)} ${unit}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-x-auto"
    >
      {title && (
        <h3 className="text-lg font-FoundersGrotesk font-medium text-[#111] mb-4 text-center">
          {title}
        </h3>
      )}

      <div className="min-w-[600px]">
        {/* Y-axis labels */}
        <div className="flex">
          <div className="w-32 flex-shrink-0" />
          <div
            className="flex-1 grid"
            style={{ gridTemplateColumns: `repeat(${xLabels.length}, 1fr)` }}
          >
            {xLabels.map((label, index) => (
              <div
                key={index}
                className="text-center text-xs text-[#666] font-NeueMontreal py-2"
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="space-y-2">
          {yLabels.map((yLabel, yIndex) => (
            <div key={yIndex} className="flex items-center">
              {/* Y-axis label */}
              <div className="w-32 flex-shrink-0 text-sm font-medium text-[#111] font-NeueMontreal pr-4">
                {yLabel}
              </div>

              {/* Cells */}
              <div
                className="flex-1 grid"
                style={{
                  gridTemplateColumns: `repeat(${xLabels.length}, 1fr)`,
                  gap: "4px",
                }}
              >
                {xLabels.map((xLabel, xIndex) => {
                  const value = getCellValue(xLabel, yLabel);
                  const color = getColor(value, min, max);
                  const cellData = data.find(
                    (d) => d.x === xLabel && d.y === yLabel,
                  );

                  return (
                    <motion.div
                      key={`${xIndex}-${yIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: (yIndex * xLabels.length + xIndex) * 0.02,
                      }}
                      className="relative group"
                    >
                      <div
                        className="h-12 rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md"
                        style={{
                          backgroundColor: color,
                          color: value > (max - min) / 2 ? "white" : "#111",
                        }}
                        title={`${yLabel} - ${xLabel}: ${formatValue(value)} ${unit}`}
                      >
                        {formatValue(value)}
                      </div>

                      {/* Tooltip */}
                      <div className="absolute z-10 hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#111] text-white text-xs rounded-lg whitespace-nowrap">
                        <p className="font-medium">{yLabel}</p>
                        <p className="text-[#94a3b8]">{xLabel}</p>
                        <p className="text-white">
                          {formatValue(value)} {unit}
                        </p>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[#111]" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#666] font-NeueMontreal">Low</span>
            <div className="flex">
              <div
                className="w-6 h-6 rounded-l-lg"
                style={{ backgroundColor: "#dbeafe" }}
              />
              <div className="w-6 h-6" style={{ backgroundColor: "#93c5fd" }} />
              <div className="w-6 h-6" style={{ backgroundColor: "#3b82f6" }} />
              <div
                className="w-6 h-6 rounded-r-lg"
                style={{ backgroundColor: "#1e40af" }}
              />
            </div>
            <span className="text-xs text-[#666] font-NeueMontreal">High</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
