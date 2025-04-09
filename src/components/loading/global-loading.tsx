'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoading } from '@/hooks/use-loading';
import { ComponentLoading } from './component-loading';

export function GlobalLoading() {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    // Handle route changes
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.href.startsWith('#')) {
        startLoading();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [startLoading]);

  useEffect(() => {
    stopLoading();
  }, [pathname, stopLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <ComponentLoading />
    </div>
  );
} 