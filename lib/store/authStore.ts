import { create } from 'zustand';
import { User } from '../../types/user';

interface AuthStore {
  user: User | null;
  isAuthentificated: boolean;
  setUser: (user: User) => void;
  clearIsAuthentificated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthentificated: false,
  setUser: (userData) =>
    set({ user: userData, isAuthentificated: true }),
  clearIsAuthentificated: () =>
    set({ user: null, isAuthentificated: false }),
}));
