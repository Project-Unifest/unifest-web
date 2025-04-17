import { AuthState, useAuthStore } from "@/src/shared/model/store/auth-store";
import { use, useEffect } from "react";
import { P } from "ts-pattern";

export interface AuthQueryData {
  data: Omit<AuthState, "isLoading" | "isError">;
  isLoading: boolean;
  isError: boolean;
}

function waitForLoadingComplete() {
  return new Promise<void>((resolve, reject) => {
    const isLoading = useAuthStore.getState().isLoading;
    if (!isLoading) resolve();
    else {
      resolve();
      // TODO: resolve only when isLoading is false
      // useAuthStore.subscribe((state) => {
      //   if (!state.isLoading) {
      //     console.log("unsubscribe");
      //     resolve();
      //   }
      // });
    }
  });
}

export default function useAuthQuery(): AuthQueryData {
  const { isLoading, isError, ...state } = useAuthStore();
  if (isLoading) {
    use(waitForLoadingComplete());
  }

  return {
    data: { ...state },
    isLoading,
    isError,
  };
}
