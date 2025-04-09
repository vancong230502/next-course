import { useState, useEffect } from 'react';

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const startLoading = () => {
    setStartTime(Date.now());
    setIsLoading(true);
  };

  const stopLoading = () => {
    if (startTime) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 100 - elapsedTime); // Minimum 100ms

      setTimeout(() => {
        setIsLoading(false);
        setStartTime(null);
      }, remainingTime);
    } else {
      setIsLoading(false);
    }
  };

  return { isLoading, startLoading, stopLoading };
} 