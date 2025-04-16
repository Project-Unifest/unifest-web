import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { create } from "zustand";

export type AuthState = {
  accessToken: string;
  refreshToken: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  isError: boolean;
};

export type AuthActions = {
  setCredentials: (
    credentials: Pick<AuthState, "accessToken" | "refreshToken">,
  ) => void;
  refresh: (newAccessToken: string) => void;
  reset: () => void;
  load: () => void;
  setError: (error: boolean) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState = {
  accessToken: "",
  refreshToken: "",
  isLoading: true,
  isAuthenticated: false,
  isError: false,
} satisfies AuthState;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...defaultInitState,

        setCredentials: (credentials) =>
          set((state) => ({
            ...state,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
            isAuthenticated: true,
          })),

        refresh: (newAccessToken) =>
          set((state) => ({ ...state, accessToken: newAccessToken })),

        reset: () =>
          set((state) => ({
            ...state,
            ...defaultInitState,
            isLoading: false,
          })),

        setError: (error: boolean) =>
          set((state) => ({ ...state, isError: error })),

        load: () => {
          const { accessToken, refreshToken } = get();

          const hasTokens = !!accessToken && !!refreshToken;

          set((state) => ({
            ...state,
            isLoading: false,
            isAuthenticated: hasTokens,
          }));
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
        onRehydrateStorage: () => (state, error) => {
          if (error) {
            state?.setError(true);
          }
          state?.load();
        },
      },
    ),
  ),
);
