"use client";

import React, { Suspense, useEffect, useState } from "react";

type LazyLoadProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
};

/**
 * Lazy load wrapper using Intersection Observer
 * - Improves initial page load by deferring off-screen content
 * - Reduces TBT by spreading component hydration
 */
export function LazyLoad({
  children,
  fallback = null,
  threshold = 0.1,
  rootMargin = "100px",
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const elementRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Skip on server
    if (typeof window === "undefined") return;

    setHasMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin },
    );

    const element = elementRef.current;
    if (element && !isVisible) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [isVisible, threshold, rootMargin]);

  // Don't render anything on server to avoid hydration mismatch
  if (!hasMounted) {
    return <div ref={elementRef} className="min-h-[1px]" />;
  }

  return <div ref={elementRef}>{isVisible ? children : fallback}</div>;
}

/**
 * Higher-order component for lazy loading React components
 */
export function lazy<P extends object>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  fallback?: React.ReactNode,
) {
  return function LazyComponent(props: P) {
    return (
      <LazyLoad fallback={fallback}>
        <Suspense fallback={fallback}>
          <WrappedComponent {...props} />
        </Suspense>
      </LazyLoad>
    );
  };

  async function WrappedComponent(props: P) {
    const { default: Component } = await importFn();
    return <Component {...props} />;
  }
}

/**
 * Preload hook for critical components
 * - Starts loading components before they're needed
 * - Reduces perceived latency
 */
export function usePreload(importFn: () => Promise<any>) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      importFn().catch(() => {
        // Silently fail - preloading is best-effort
      });
    }
  }, [importFn]);
}

/**
 * OptimizedImage wrapper with lazy loading
 * - Combines next/image with intersection observer
 */
export function OptimizedImageLazy({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (priority || typeof window === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    const img = imgRef.current;
    if (img) {
      observer.observe(img);
    }

    return () => observer.disconnect();
  }, [priority]);

  if (!isVisible) {
    return (
      <div
        ref={imgRef as any}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height }}
      />
    );
  }

  return (
    <img
      ref={imgRef as any}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      onLoad={() => setIsLoaded(true)}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
    />
  );
}
