import { create } from 'zustand';
import { User } from '../../types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (userData) =>
    set({ user: userData, isAuthenticated: true }),
  setIsAuthenticated: () =>
    set({ user: null, isAuthenticated: false }),
}));
