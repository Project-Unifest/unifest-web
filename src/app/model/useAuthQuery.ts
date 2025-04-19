import { AuthState, useAuthStore } from "@/src/shared/model/store/auth-store";
import { use, useEffect, useRef, useState } from "react";

export interface AuthQueryData {
  data: Omit<AuthState, "isLoading" | "isError">;
  isError: boolean;
  isLoading: boolean;
}

export default function useAuthQuery(): AuthQueryData {
  const { isLoading, isError, accessToken, refreshToken, isAuthenticated } =
    useAuthStore();

  return {
    data: { accessToken, refreshToken, isAuthenticated },
    isError,
    isLoading,
  };
}
