import { YearlyTrackerItem } from "@/mockdata/types";
import Link from "next/link";

interface TrackerCardProps {
  item: YearlyTrackerItem;
  year: number;
}

// Define valid status and sector keys
type StatusKey = "Completed" | "In Progress" | "Allocated" | "Stalled";
type SectorKey = "National" | "County";

const statusColors: Record<StatusKey, string> = {
  Completed: "bg-green-500",
  "In Progress": "bg-blue-500",
  Allocated: "bg-yellow-500",
  Stalled: "bg-red-500",
};

const sectorColors: Record<SectorKey, string> = {
  National: "border-l-blue-600 bg-blue-50/50",
  County: "border-l-emerald-600 bg-emerald-50/50",
};

// Helper functions to safely get color values
export function getStatusColor(status: string): string {
  return statusColors[status as StatusKey] || "bg-gray-500";
}

export function getSectorColor(sector: string): string {
  return sectorColors[sector as SectorKey] || "border-l-gray-500 bg-gray-50/50";
}

export default function TrackerCard({ item, year }: TrackerCardProps) {
  const progressPercentage = Math.min(item.progress, 100);

  return (
    <Link
      href={`/tracker/${year}/${item.slug}`}
      className={`block relative p-6 rounded-xl border-l-4 ${getSectorColor(item.sector)} hover:shadow-xl transition-all duration-300 group`}
      data-hover="card"
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(item.status)}`}
        >
          {item.status.replace(" ", " ")}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-lg bg-white shadow-md flex items-center justify-center text-2xl"
          data-hover="icon"
        >
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {item.category}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700">
              {item.sector}
            </span>
          </div>
          <h3 className="font-FoundersGrotesk text-lg font-semibold text-[#111] group-hover:text-blue-700 transition-colors">
            {item.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {item.description}
      </p>

      {/* Budget & Allocation */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs text-gray-500 block">Budget</span>
          <span className="font-medium text-[#111]">{item.budget}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 block">Allocated</span>
          <span className="font-medium text-[#111]">{item.allocated}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium">{progressPercentage}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              item.status === "Completed"
                ? "bg-green-500"
                : item.status === "In Progress"
                  ? "bg-blue-500"
                  : item.status === "Allocated"
                    ? "bg-yellow-500"
                    : "bg-red-500"
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        {item.beneficiaries && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{item.beneficiaries}</span>
          </div>
        )}
        {item.completionDate && (
          <div className="text-xs text-gray-500">
            Completed: {item.completionDate}
          </div>
        )}
        <div className="flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
          <span>Details</span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            data-hover="arrow"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
