'use client'

import { useAnimationIntensity } from '@/hooks/useMediaQuery'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useEffect, useRef, ReactNode } from 'react'

interface ResponsiveParallaxProps {
  children: ReactNode
  className?: string
  /** Parallax speed multiplier (0-2) */
  speed?: number
  /** Disable parallax on mobile */
  disableOnMobile?: boolean
  /** Start trigger position */
  start?: string
  /** End trigger position */
  end?: string
}

export function ResponsiveParallax({
  children,
  className = '',
  speed = 0.5,
  disableOnMobile = true,
  start = 'top bottom',
  end = 'bottom top',
}: ResponsiveParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { intensity, isMobile, shouldAnimate } = useAnimationIntensity()

  // Disable on mobile if requested
  if (disableOnMobile && isMobile) {
    return <div className={className}>{children}</div>
  }

  // Disable if reduced motion
  if (!shouldAnimate) {
    return <div className={className}>{children}</div>
  }

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    // Calculate effective speed based on device
    const effectiveSpeed = speed * intensity

    const animation = gsap.fromTo(
      element,
      {
        y: 0,
      },
      {
        y: -50 * effectiveSpeed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: true,
          // SEO: Not essential for content
          fastScrollEnd: true,
        },
      },
    )

    return () => {
      animation.kill()
      try {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === element) st.kill()
        })
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  }, [speed, intensity, start, end, shouldAnimate])

  return (
    <div ref={ref} className={`${className} will-change-transform`}>
      {children}
    </div>
  )
}

/**
 * Parallax image component
 */
interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  speed?: number
  disableOnMobile?: boolean
  priority?: boolean
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  speed = 0.3,
  disableOnMobile = true,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const { intensity, isMobile, shouldAnimate } = useAnimationIntensity()

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    // Disable on mobile if requested
    if (disableOnMobile && isMobile) return

    // Disable if reduced motion
    if (!shouldAnimate) return

    const container = containerRef.current
    const image = imageRef.current
    const effectiveSpeed = speed * intensity

    // Scale effect for parallax
    const animation = gsap.fromTo(
      image,
      {
        scale: 1,
        y: 0,
      },
      {
        scale: 1.1,
        y: 50 * effectiveSpeed,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )

    return () => {
      animation.kill()
      try {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === container) st.kill()
        })
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  }, [speed, intensity, isMobile, shouldAnimate, disableOnMobile])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
      />
    </div>
  )
}

/**
 * Background parallax component
 */
interface ParallaxBackgroundProps {
  children: ReactNode
  className?: string
  speed?: number
  backgroundImage?: string
}

export function ParallaxBackground({
  children,
  className = '',
  speed = 0.2,
  backgroundImage,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { intensity, shouldAnimate } = useAnimationIntensity()

  useEffect(() => {
    if (!ref.current || !shouldAnimate) return

    const element = ref.current
    const effectiveSpeed = speed * intensity

    const animation = gsap.to(element, {
      y: -100 * effectiveSpeed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      animation.kill()
      try {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === element) st.kill()
        })
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  }, [speed, intensity, shouldAnimate])

  return (
    <div ref={ref} className={className}>
      {backgroundImage && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      {children}
    </div>
  )
}

// Default export
export default ResponsiveParallax
