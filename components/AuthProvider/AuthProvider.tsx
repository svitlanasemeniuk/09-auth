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
  const { setUser, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkSession();
        const userData = await getMe();
        setUser(userData as User);
        setIsAuthenticated();
      } catch {
        setIsAuthenticated();
      }
    };
    verifyAuth();
  }, [setUser, setIsAuthenticated]);

  return <>{children}</>;
};
