import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type AuthState = {
  accessToken: string;
  refreshToken: string;
  isHydrated: boolean;
};

export type AuthActions = {
  setCredentials: (credentials: AuthState) => void;
  refresh: (newAccessToken: string) => void;
  reset: () => void;
  setHydrated: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState = {
  accessToken: "",
  refreshToken: "",
  isHydrated: false,
} satisfies AuthState;

export const createAuthStore =
  process.env.NODE_ENV === "development"
    ? (initState: AuthState = defaultInitState) => {
        return createStore<AuthStore>()(
          devtools(
            persist(
              (set) => ({
                ...initState,
                setCredentials: (credentials) =>
                  set((state) => ({
                    ...state,
                    accessToken: credentials.accessToken,
                    refreshToken: credentials.refreshToken,
                  })),
                refresh: (newAccessToken) =>
                  set((state) => ({ ...state, accessToken: newAccessToken })),
                reset: () =>
                  set((state) => ({ ...state, ...defaultInitState })),
                setHydrated: () =>
                  set((state) => ({ ...state, isHydrated: true })),
              }),
              {
                name: "auth-storage",
              },
            ),
          ),
        );
      }
    : (initState: AuthState = defaultInitState) => {
        return createStore<AuthStore>()(
          persist(
            (set) => ({
              ...initState,
              setCredentials: (credentials) =>
                set((state) => ({
                  ...state,
                  accessToken: credentials.accessToken,
                  refreshToken: credentials.refreshToken,
                })),
              refresh: (newAccessToken) =>
                set((state) => ({ ...state, accessToken: newAccessToken })),
              reset: () => set((state) => ({ ...state, ...defaultInitState })),
              setHydrated: () =>
                set((state) => ({ ...state, isHydrated: true })),
            }),
            {
              name: "auth-storage",
              onRehydrateStorage: () => (state, error) => {
                state?.setHydrated();
              },
            },
          ),
        );
      };
