'use client';
import { useEffect } from 'react';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setUser, clearIsAuthentificated } =
    useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkSession();
        const userData = await getMe();
        setUser(userData);
      } catch {
        clearIsAuthentificated();
      }
    };
    verifyAuth();
  }, [setUser, clearIsAuthentificated]);

  return <>{children}</>;
};
