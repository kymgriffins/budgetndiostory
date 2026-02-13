"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface YearSelectorProps {
  years: number[];
  currentYear?: number;
  basePath?: string;
  latestYear?: number;
  showQuickSelect?: boolean;
}

const YEAR_LABELS: Record<number, string> = {
  2000: "FY 2000",
  2001: "FY 2001",
  2002: "FY 2002",
  2003: "FY 2003",
  2004: "FY 2004",
  2005: "FY 2005",
  2006: "FY 2006",
  2007: "FY 2007",
  2008: "FY 2008",
  2009: "FY 2009",
  2010: "FY 2010",
  2011: "FY 2011",
  2012: "FY 2012",
  2013: "FY 2013",
  2014: "FY 2014",
  2015: "FY 2015",
  2016: "FY 2016",
  2017: "FY 2017",
  2018: "FY 2018",
  2019: "FY 2019",
  2020: "FY 2020",
  2021: "FY 2021",
  2022: "FY 2022",
  2023: "FY 2023",
  2024: "FY 2024",
  2025: "FY 2025/26",
  
};

export default function YearSelector({
  years,
  currentYear,
  basePath = "/tracker",
  latestYear,
  showQuickSelect = true,
}: YearSelectorProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    currentYear || latestYear || years[years.length - 1],
  );
  const [viewMode, setViewMode] = useState<
    "carousel" | "dropdown" | "timeline"
  >("carousel");

  // Update selected year when currentYear prop changes
  useEffect(() => {
    if (currentYear) {
      setSelectedYear(currentYear);
    }
  }, [currentYear]);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsOpen(false);
    router.push(`${basePath}/${year}`);
  };

  const quickSelectOptions = [
    {
      year: latestYear || years[years.length - 1],
      label: "Latest Budget",
      icon: "🆕",
    },
    { year: years[0], label: "Start (2000)", icon: "📅" },
    { year: 2010, label: "Decade Start", icon: "🔟" },
  ].filter((option) => years.includes(option.year));

  const visibleYears = years.slice(-10); // Show last 10 years
  const olderYears = years.slice(0, -10);

  return (
    <div className="relative">
      {/* Main Selector Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-3 bg-white border border-[#e5e7eb] rounded-full hover:border-[#1e40af] hover:shadow-md transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-2xl">📊</span>
        <div className="text-left">
          <p className="text-xs text-[#666] font-NeueMontreal uppercase tracking-wide">
            Budget Year
          </p>
          <p className="text-lg font-FoundersGrotesk font-bold text-[#111]">
            {YEAR_LABELS[selectedYear] || `FY ${selectedYear}`}
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-[#666] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-[400px] bg-white rounded-2xl shadow-xl border border-[#e5e7eb] z-50 overflow-hidden"
            >
              {/* Quick Select */}
              {showQuickSelect && (
                <div className="p-4 border-b border-[#e5e7eb]">
                  <p className="text-xs text-[#666] font-NeueMontreal uppercase tracking-wide mb-3">
                    Quick Select
                  </p>
                  <div className="flex gap-2">
                    {quickSelectOptions.map((option) => (
                      <motion.button
                        key={option.year}
                        onClick={() => handleYearSelect(option.year)}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedYear === option.year
                            ? "bg-[#1e40af] text-white"
                            : "bg-gray-50 text-[#111] hover:bg-gray-100"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="block text-lg mb-1">
                          {option.icon}
                        </span>
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* View Mode Toggle */}
              <div className="flex border-b border-[#e5e7eb]">
                {(["carousel", "dropdown", "timeline"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`flex-1 py-2 text-sm font-medium transition-all duration-200 ${
                      viewMode === mode
                        ? "bg-[#1e40af]/5 text-[#1e40af] border-b-2 border-[#1e40af]"
                        : "text-[#666] hover:text-[#111]"
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>

              {/* Years List */}
              <div className="p-4 max-h-[300px] overflow-y-auto">
                {viewMode === "carousel" && (
                  <div className="grid grid-cols-4 gap-2">
                    {visibleYears.map((year) => (
                      <motion.button
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedYear === year
                            ? "bg-[#1e40af] text-white shadow-md"
                            : "bg-gray-50 text-[#111] hover:bg-gray-100 hover:shadow-sm"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {year}
                      </motion.button>
                    ))}
                  </div>
                )}

                {viewMode === "dropdown" && (
                  <div className="space-y-1">
                    {[...visibleYears].reverse().map((year) => (
                      <motion.button
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedYear === year
                            ? "bg-[#1e40af]/10 text-[#1e40af]"
                            : "text-[#111] hover:bg-gray-50"
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <span>{YEAR_LABELS[year] || `FY ${year}`}</span>
                        {selectedYear === year && (
                          <span className="w-2 h-2 rounded-full bg-[#1e40af]" />
                        )}
                      </motion.button>
                    ))}
                    {olderYears.length > 0 && (
                      <details className="group">
                        <summary className="px-4 py-2 text-sm text-[#666] cursor-pointer hover:text-[#111] list-none">
                          Show earlier years ({olderYears.length})
                        </summary>
                        <div className="pl-4 space-y-1 mt-1">
                          {olderYears.map((year) => (
                            <motion.button
                              key={year}
                              onClick={() => handleYearSelect(year)}
                              className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium text-[#666] hover:text-[#111] hover:bg-gray-50 transition-all duration-200"
                              whileHover={{ x: 4 }}
                            >
                              <span>{YEAR_LABELS[year] || `FY ${year}`}</span>
                            </motion.button>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                )}

                {viewMode === "timeline" && (
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e5e7eb]" />
                    <div className="space-y-3">
                      {visibleYears.map((year) => (
                        <motion.button
                          key={year}
                          onClick={() => handleYearSelect(year)}
                          className={`relative flex items-center gap-4 pl-8 w-full text-left ${
                            selectedYear === year ? "opacity-100" : "opacity-60"
                          }`}
                          whileHover={{ opacity: 1 }}
                        >
                          <div
                            className={`absolute left-2.5 w-3 h-3 rounded-full border-2 transition-all duration-200 ${
                              selectedYear === year
                                ? "bg-[#1e40af] border-[#1e40af]"
                                : "bg-white border-[#e5e7eb] hover:border-[#1e40af]"
                            }`}
                          />
                          <div className="flex-1 flex items-center justify-between py-1">
                            <span className="font-FoundersGrotesk font-medium text-[#111]">
                              {YEAR_LABELS[year] || `FY ${year}`}
                            </span>
                            {selectedYear === year && (
                              <span className="text-xs bg-[#1e40af] text-white px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-[#e5e7eb]">
                <p className="text-xs text-[#666] text-center">
                  Showing {years.length} years of budget data
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
