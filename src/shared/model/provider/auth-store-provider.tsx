// src/shared/model/store/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  isHydrated: boolean;
}

interface AuthActions {
  setCredentials: (credentials: {
    accessToken: string;
    refreshToken: string;
  }) => void;
  setAccessToken: (accessToken: string) => void;
  signOut: () => void;
  setHydrated: () => void;
}

const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
  isHydrated: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,

      setCredentials: (credentials) =>
        set({
          accessToken: credentials.accessToken,
          refreshToken: credentials.refreshToken,
        }),

      setAccessToken: (accessToken) => set({ accessToken }),

      signOut: () => set(initialState),

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
