"use client";

import React, { useCallback, useRef, useState } from "react";

type VirtualListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  className?: string;
};

/**
 * Virtualized list component for efficient rendering of long lists
 * - Only renders visible items + overscan
 * - Reduces DOM nodes and memory usage
 */
export function VirtualList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  overscan = 3,
  className = "",
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.floor((scrollTop + containerHeight) / itemHeight) + overscan,
  );

  const visibleItems = items
    .slice(startIndex, endIndex + 1)
    .map((item, index) => ({
      item,
      index: startIndex + index,
    }));

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map(({ item, index }) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              height: itemHeight,
              transform: `translateY(${index * itemHeight}px)`,
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Virtualized grid component
 */
type VirtualGridProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columnWidth: number;
  rowHeight: number;
  containerWidth: number;
  columns?: number;
  overscan?: number;
  className?: string;
};

export function VirtualGrid<T>({
  items,
  renderItem,
  columnWidth,
  rowHeight,
  containerWidth,
  columns = Math.floor(containerWidth / columnWidth),
  overscan = 2,
  className = "",
}: VirtualGridProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalRows = Math.ceil(items.length / columns);
  const totalHeight = totalRows * rowHeight;
  const visibleRowCount = Math.ceil(containerWidth / rowHeight); // Actually viewport height in grid context
  const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endRow = Math.min(
    totalRows - 1,
    Math.floor((scrollTop + visibleRowCount * rowHeight) / rowHeight) +
      overscan,
  );

  const visibleItems: { item: T; index: number; row: number; col: number }[] =
    [];

  for (let row = startRow; row <= endRow; row++) {
    for (let col = 0; col < columns; col++) {
      const index = row * columns + col;
      if (index < items.length) {
        visibleItems.push({ item: items[index], index, row, col });
      }
    }
  }

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: visibleRowCount * rowHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative", width: "100%" }}>
        {visibleItems.map(({ item, index, row, col }) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: columnWidth,
              height: rowHeight,
              transform: `translate(${col * columnWidth}px, ${row * rowHeight}px)`,
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Infinite scroll hook
 */
export function useInfiniteScroll(
  fetchMore: () => Promise<void>,
  hasMore: boolean,
  isLoading: boolean,
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (!node || !hasMore || isLoading) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchMore();
          }
        },
        { rootMargin: "200px" },
      );

      observerRef.current.observe(node);
    },
    [fetchMore, hasMore, isLoading],
  );

  return loadMoreRef;
}
