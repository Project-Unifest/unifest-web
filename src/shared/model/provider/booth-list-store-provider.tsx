"use client";

import {
  BoothListStore,
  createBoothListStore,
} from "../store/booth-list-store";
import React, { ReactNode, createContext, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

export const BoothListStoreContext =
  createContext<StoreApi<BoothListStore> | null>(null);

export interface BoothListStoreProviderProps {
  children: ReactNode;
}

export const BoothListStoreProvider = ({
  children,
}: BoothListStoreProviderProps) => {
  const storeRef = useRef<StoreApi<BoothListStore>>();
  if (!storeRef.current) {
    storeRef.current = createBoothListStore();
  }

  return (
    <BoothListStoreContext.Provider value={storeRef.current}>
      {children}
    </BoothListStoreContext.Provider>
  );
};

export const useBoothListStore = <T,>(
  selector: (store: BoothListStore) => T,
): T => {
  const boothStoreContext = useContext(BoothListStoreContext);

  if (!boothStoreContext) {
    throw new Error(
      `useBoothListStore must be used within BoothListStoreProvider`,
    );
  }

  return useStore(boothStoreContext, selector);
};
