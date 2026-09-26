'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

// Check for reduced motion preference (runs once on module load in browser)
const getPrefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  // Initialize with true if user prefers reduced motion
  const [isVisible, setIsVisible] = useState(() => getPrefersReducedMotion());

  useEffect(() => {
    // Skip observer setup if already visible (reduced motion preference)
    if (isVisible) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

// Hook for animating multiple children with stagger effect
export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
  return useIntersectionObserver<T>({
    ...options,
    threshold: options.threshold ?? 0.05,
  });
}
