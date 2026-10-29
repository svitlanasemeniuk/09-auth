'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';
import type { User } from '@/types/user';

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setUser, setIsAuthenticated, clearAuth } =
    useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkSession();
        const userData = await getMe();
        setUser(userData as unknown as User);
        setIsAuthenticated(true);
      } catch {
        clearAuth();
      }
    };
    verifyAuth();
  }, [setUser, setIsAuthenticated, clearAuth]);

  return <>{children}</>;
};
