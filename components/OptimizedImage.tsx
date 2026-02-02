"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  priority?: boolean;
  lcp?: boolean;
  blurDataURL?: string;
  sizes?: string;
}

export function OptimizedImage({
  src,
  alt,
  priority = false,
  lcp = false,
  blurDataURL,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="bg-gray-200 flex items-center justify-center"
        style={{
          aspectRatio:
            props.width && props.height
              ? `${props.width}/${props.height}`
              : undefined,
        }}
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio:
          props.width && props.height
            ? `${props.width}/${props.height}`
            : undefined,
      }}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority || lcp}
        fetchPriority={lcp ? "high" : priority ? "auto" : "low"}
        sizes={sizes}
        quality={85}
        placeholder={blurDataURL ? ("blur" as const) : undefined}
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`
          object-cover transition-opacity duration-300
          ${isLoading ? "opacity-0" : "opacity-100"}
        `}
        {...props}
      />
      {isLoading && !blurDataURL && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
}

export function HeroImage({
  src,
  alt,
  ...props
}: Omit<OptimizedImageProps, "lcp" | "priority">) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      lcp={true}
      priority={true}
      sizes="100vw"
      {...props}
    />
  );
}

export function ThumbnailImage({
  src,
  alt,
  ...props
}: Omit<OptimizedImageProps, "lcp">) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  );
}

export default OptimizedImage;
