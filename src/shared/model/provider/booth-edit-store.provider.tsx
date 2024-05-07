"use client";

import {
  BoothEditStore,
  createBoothEditStore,
} from "../store/booth-edit-store";
import React, { ReactNode, createContext, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

export const BoothEditStoreContext =
  createContext<StoreApi<BoothEditStore> | null>(null);

export interface BoothEditStoreProviderProps {
  children: ReactNode;
}

export const BoothEditStoreProvider = ({
  children,
}: BoothEditStoreProviderProps) => {
  const storeRef = useRef<StoreApi<BoothEditStore>>();
  if (!storeRef.current) {
    storeRef.current = createBoothEditStore();
  }

  return (
    <BoothEditStoreContext.Provider value={storeRef.current}>
      {children}
    </BoothEditStoreContext.Provider>
  );
};

export const useBoothEditStore = <T,>(
  selector: (store: BoothEditStore) => T,
): T => {
  const boothStoreContext = useContext(BoothEditStoreContext);

  if (!boothStoreContext) {
    throw new Error(`useBoothEditStore must be used within BoothStoreProvider`);
  }

  return useStore(boothStoreContext, selector);
};
