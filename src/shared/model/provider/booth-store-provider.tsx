"use client";

import { BoothStore, createBoothStore } from "../store/booth-store";
import React, { ReactNode, createContext, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

export const BoothStoreContext = createContext<StoreApi<BoothStore> | null>(
  null,
);

export interface BoothStoreProviderProps {
  children: ReactNode;
}

export const BoothStoreProvider = ({ children }: BoothStoreProviderProps) => {
  const storeRef = useRef<StoreApi<BoothStore>>();
  if (!storeRef.current) {
    storeRef.current = createBoothStore();
  }

  return (
    <BoothStoreContext.Provider value={storeRef.current}>
      {children}
    </BoothStoreContext.Provider>
  );
};

export const useBoothStore = <T,>(selector: (store: BoothStore) => T): T => {
  const boothStoreContext = useContext(BoothStoreContext);

  if (!boothStoreContext) {
    throw new Error(`useBoothStore must be used within BoothStoreProvider`);
  }

  return useStore(boothStoreContext, selector);
};
