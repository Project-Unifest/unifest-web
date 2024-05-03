"use client";

import { AuthStore, createAuthStore } from "../store/auth-store";
import React, { ReactNode, createContext, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

export const AuthStoreContext = createContext<StoreApi<AuthStore> | null>(null);

export interface AuthStoreProviderProps {
  children: ReactNode;
}

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AuthStore>>();
  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(`useBoothStore must be used within BoothStoreProvider`);
  }

  return useStore(authStoreContext, selector);
};
