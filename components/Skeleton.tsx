"use client";

import { useIsMobile } from "@/hooks/useMediaQuery";

type SkeletonProps = {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
};

/**
 * Skeleton loader component for progressive loading states
 * - Reduces perceived latency during data fetching
 * - Adapts to mobile viewport
 */
export function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
}: SkeletonProps) {
  const isMobile = useIsMobile();

  // Adapt dimensions for mobile
  const mobileWidth =
    isMobile && typeof width === "number" ? width * 0.8 : width;
  const mobileHeight =
    isMobile && typeof height === "number" ? height * 0.8 : height;

  const baseStyles = {
    width: (mobileWidth ?? "100%") as string,
    height: (mobileHeight ?? "100%") as string,
  };

  const variantStyles = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-md",
  };

  const animationStyles = {
    pulse: "animate-pulse",
    wave: "animate-shimmer",
    none: "",
  };

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}
      style={baseStyles}
    />
  );
}

/**
 * Skeleton card for list items
 */
export function SkeletonCard({ showImage = true }: { showImage?: boolean }) {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex gap-4">
        {showImage && (
          <Skeleton
            variant="rectangular"
            width={80}
            height={80}
            className="flex-shrink-0"
          />
        )}
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton blog post card
 */
export function SkeletonBlogPost() {
  return (
    <article className="space-y-3">
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="text" width="30%" />
      <Skeleton variant="text" width="70%" height={24} />
      <Skeleton variant="text" width="90%" />
      <div className="flex gap-2 mt-2">
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="text" width="20%" />
      </div>
    </article>
  );
}

/**
 * Skeleton course card
 */
export function SkeletonCourseCard() {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <Skeleton variant="rectangular" width="100%" height={140} />
      <div className="p-4 space-y-2">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="70%" height={20} />
        <Skeleton variant="text" width="90%" />
        <div className="flex justify-between mt-3">
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="20%" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton podcast episode
 */
export function SkeletonPodcastEpisode() {
  return (
    <div className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <Skeleton variant="rectangular" width={80} height={80} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="50%" height={20} />
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="text" width="60%" />
        <div className="flex gap-2 mt-2">
          <Skeleton variant="text" width="20%" />
          <Skeleton variant="text" width="15%" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton tracker row
 */
export function SkeletonTrackerRow() {
  return (
    <div className="flex items-center gap-4 p-3 border-b border-gray-100 dark:border-gray-800">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1 space-y-1">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="60%" />
      </div>
      <Skeleton variant="text" width="20%" />
    </div>
  );
}

/**
 * Skeleton table row
 */
export function SkeletonTableRow({ columns = 4 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-3">
          <Skeleton variant="text" width={i === columns - 1 ? "20%" : "60%"} />
        </td>
      ))}
    </tr>
  );
}

/**
 * Skeleton analytics widget
 */
export function SkeletonAnalyticsWidget() {
  return (
    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="30%" />
        </div>
        <Skeleton variant="circular" width={48} height={48} />
      </div>
      <div className="mt-4">
        <Skeleton variant="rectangular" width="100%" height={80} />
      </div>
    </div>
  );
}
