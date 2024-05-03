import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type AuthState = {
  accessToken: string;
  refreshToken: string;
};

export type AuthActions = {
  setCredentials: (credentials: AuthState) => void;
  refresh: (newAccessToken: string) => void;
  reset: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState = {
  accessToken: "",
  refreshToken: "",
} satisfies AuthState;

export const createAuthStore = (initState: AuthState = defaultInitState) => {
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
          reset: () => set((state) => ({ ...state, ...defaultInitState })),
        }),
        {
          name: "auth-storage",
        },
      ),
    ),
  );
};
