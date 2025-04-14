import { AuthState, useAuthStore } from "@/src/shared/model/store/auth-store";

export interface AuthQueryData {
  data: Omit<AuthState, "isLoading" | "isError">;
  isLoading: boolean;
  isError: boolean;
}

export default function useAuthQuery(): AuthQueryData {
  const { isLoading, isError, ...state } = useAuthStore();

  if (typeof window !== "undefined" && isLoading) {
    throw new Promise<void>((resolve) => {
      const unsubscribe = useAuthStore.subscribe((state) => {
        if (!state.isLoading) {
          unsubscribe();
          resolve();
        }
      });
    });
  }

  return {
    data: { ...state },
    isLoading,
    isError,
  };
}
