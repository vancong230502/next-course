import { useState, useRef } from 'react';

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const loadingStartTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startLoading = () => {
    if (!isLoading) {
      setIsLoading(true);
      loadingStartTimeRef.current = Date.now();
    }
  };

  const stopLoading = () => {
    const now = Date.now();
    const start = loadingStartTimeRef.current ?? now;
    const elapsed = now - start;
    const minDelay = 2500; // 2 giây tối thiểu
    const remaining = Math.max(minDelay - elapsed, 0);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      loadingStartTimeRef.current = null;
    }, remaining);
  };

  return { isLoading, startLoading, stopLoading };
}
