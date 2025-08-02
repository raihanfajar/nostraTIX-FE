// useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  id: string;
  name: string;
  role: string;
  accessToken: string;
  balancePoint?: number;
  slug?: string;
  setAuth: (payload: Omit<AuthStore, 'setAuth' | 'clearAuth'>) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      id: '',
      name: '',
      role: '',
      accessToken: '',
      balancePoint: 0,
      slug: '',
      setAuth: (payload) => set(payload),
      clearAuth: () => set({ id: '', name: '', role: '', accessToken: '', balancePoint: 0, slug: '' }),
    }),
    {
      name: 'auth-store', // <- unique key, NOT "state"
      storage: createJSONStorage(() => localStorage),
    }
  )
);