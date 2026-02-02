'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook to detect if a media query matches
 * @param query - CSS media query string (e.g., '(max-width: 768px)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

/**
 * Breakpoint hooks for common device sizes
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(max-width: 1024px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)')
}

export function useIsSmallMobile(): boolean {
  return useMediaQuery('(max-width: 400px)')
}

export function useIsLargeDesktop(): boolean {
  return useMediaQuery('(min-width: 1440px)')
}

/**
 * Animation intensity based on device and preferences
 */
export function useAnimationIntensity() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  return {
    intensity: prefersReducedMotion ? 0 : isMobile ? 0.5 : isTablet ? 0.8 : 1,
    isMobile,
    isTablet,
    shouldAnimate: !prefersReducedMotion,
  }
}
