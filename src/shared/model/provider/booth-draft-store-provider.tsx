"use client";

import {
  BoothDraftStore,
  createBoothDraftStore,
} from "../store/booth-draft-store";
import React, { ReactNode, createContext, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

export const BoothDraftStoreContext =
  createContext<StoreApi<BoothDraftStore> | null>(null);

export interface BoothDraftStoreProviderProps {
  children: ReactNode;
}

export const BoothDraftStoreProvider = ({
  children,
}: BoothDraftStoreProviderProps) => {
  const storeRef = useRef<StoreApi<BoothDraftStore>>();
  if (!storeRef.current) {
    storeRef.current = createBoothDraftStore();
  }

  return (
    <BoothDraftStoreContext.Provider value={storeRef.current}>
      {children}
    </BoothDraftStoreContext.Provider>
  );
};

export const useBoothDraftStore = <T,>(
  selector: (store: BoothDraftStore) => T,
): T => {
  const boothStoreContext = useContext(BoothDraftStoreContext);

  if (!boothStoreContext) {
    throw new Error(
      `useBoothDraftStore must be used within BoothStoreProvider`,
    );
  }

  return useStore(boothStoreContext, selector);
};
