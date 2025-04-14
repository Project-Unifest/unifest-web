import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { ResetOptions } from "@/src/shared/api/errors";
import { useAuthStore } from "@/src/shared/model/store/auth-store";
import { usePathname, useRouter } from "next/navigation";

export const useRecoverFromError = () => {
  const queryClient = useQueryClient();
  const reset = useAuthStore((state) => state.reset);
  const recoverFromError = useCallback(
    async (resetOptions: ResetOptions) => {
      const { shouldClearCache, shouldClearAuth, shouldClearNavigation } =
        resetOptions;
      if (shouldClearCache) queryClient.clear();
      console.log("recoverFromError");
      console.log(shouldClearAuth);
      if (shouldClearAuth) reset();
    },
    [queryClient, reset],
  );

  return { recoverFromError };
};
