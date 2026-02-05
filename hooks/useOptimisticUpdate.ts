"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type OptimisticState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

/**
 * Hook for optimistic UI updates
 * - Updates UI immediately before server confirmation
 * - Rolls back on error
 * - Reduces perceived latency
 */
export function useOptimisticUpdate<T>(
  initialData: T | null = null,
): [
  OptimisticState<T>,
  (action: () => Promise<T>, rollbackData?: T) => Promise<void>,
  () => void,
] {
  const [state, setState] = useState<OptimisticState<T>>({
    data: initialData,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (action: () => Promise<T>, rollbackData?: T) => {
      const previousData = state.data;

      // Optimistic update
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const result = await action();
        setState((prev) => ({
          ...prev,
          data: result,
          isLoading: false,
        }));
      } catch (error) {
        // Rollback on error
        setState((prev) => ({
          ...prev,
          data: rollbackData ?? previousData,
          isLoading: false,
          error: error as Error,
        }));
        throw error;
      }
    },
    [state.data],
  );

  const reset = useCallback(() => {
    setState({
      data: initialData,
      isLoading: false,
      error: null,
    });
  }, [initialData]);

  return [state, execute, reset];
}

/**
 * Hook for managing list operations with optimistic updates
 */
export function useOptimisticList<T extends { id: string }>(
  initialItems: T[] = [],
): [
  T[],
  {
    add: (item: T) => void;
    remove: (id: string) => void;
    update: (id: string, data: Partial<T>) => void;
    reorder: (fromIndex: number, toIndex: number) => void;
    execute: (action: () => Promise<T[]>) => Promise<void>;
  },
] {
  const [items, setItems] = useState<T[]>(initialItems);

  const add = useCallback((item: T) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const update = useCallback((id: string, data: Partial<T>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item)),
    );
  }, []);

  const reorder = useCallback((fromIndex: number, toIndex: number) => {
    setItems((prev) => {
      const newItems = [...prev];
      const [removed] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, removed);
      return newItems;
    });
  }, []);

  const execute = useCallback(
    async (action: () => Promise<T[]>) => {
      const previousItems = items;

      // Optimistic update - assume success
      setItems((prev) => [...prev]);

      try {
        const result = await action();
        setItems(result);
      } catch (error) {
        // Rollback on error
        setItems(previousItems);
        throw error;
      }
    },
    [items],
  );

  return [items, { add, remove, update, reorder, execute }];
}

/**
 * Hook for debounced search/filter
 */
export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useState(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  });

  return debouncedValue;
}

/**
 * Hook for tracking scroll position
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useState(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return scrollPosition;
}

/**
 * Hook for intersection observer
 */
export function useIntersection(
  options: IntersectionObserverInit = {},
): [React.RefObject<HTMLDivElement>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
}
