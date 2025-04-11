import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

export function useAuth(requireAuth: boolean = true) {
  const router = useRouter();
  const { user, role, checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      if (!user && !isLoading) {
        try {
          await checkAuth();
        } catch (error) {
          if (requireAuth) {
            router.push('/login');
          }
        }
      }
    };

    initAuth();
  }, [user, isLoading, requireAuth, checkAuth, router]);

  return { user, role, isLoading };
} 