import { AuthState, useAuthStore } from "@/src/shared/model/store/auth-store";
import { use } from "react";

export interface AuthQueryData {
  data: Omit<AuthState, "isLoading" | "isError">;
  isLoading: boolean;
  isError: boolean;
}

function waitForLoadingComplete() {
  return new Promise<void>((resolve) => {
    // 현재 상태가 이미 로딩 완료면 바로 resolve
    if (!useAuthStore.getState().isLoading) {
      console.log("waitForLoadingComplete 1");
      resolve();
      return;
    }
    console.log("waitForLoadingComplete 2");
    // 아니라면 상태 변화 구독
    const unsubscribe = useAuthStore.subscribe((state) => {
      if (!state.isLoading) {
        console.log("unsubscribe");
        unsubscribe();
        resolve();
      }
    });
  });
}

export default function useAuthQuery(): AuthQueryData {
  const { isLoading, isError, ...state } = useAuthStore();

  console.log("useAuthQuery");
  console.log("isLoading", isLoading);

  if (isLoading) {
    use(waitForLoadingComplete());
  }

  // console.log("useAuthQuery", state);
  // console.log("isLoading", isLoading);
  // console.log("isError", isError);

  // if (typeof window !== "undefined" && isLoading) {
  //   throw new Promise<void>((resolve) => {
  //     const unsubscribe = useAuthStore.subscribe((state) => {
  //       if (!state.isLoading) {
  //         console.log("unsubscribe");
  //         unsubscribe();
  //         resolve();
  //       }
  //     });
  //   });
  // }

  // useEffect(() => {
  //   console.log("useEffect", isLoading);
  //   if (isLoading) {
  //     throw new Promise<void>((resolve) => {
  //       const unsubscribe = useAuthStore.subscribe((state) => {
  //         if (!state.isLoading) {
  //           console.log("unsubscribe");
  //           unsubscribe();
  //           resolve();
  //         }
  //       });
  //     });
  //   }
  // }, [isLoading]);

  return {
    data: { ...state },
    isLoading,
    isError,
  };
}
