"use client";

import {
  BoothDetailsDraftStore,
  createBoothDetailsDraftStore,
} from "../store/booth-details-draft-store";
import React, { ReactNode, createContext, useContext, useRef } from "react";
import { StoreApi, useStore } from "zustand";

export const BoothDetailsDraftStoreContext =
  createContext<StoreApi<BoothDetailsDraftStore> | null>(null);

export interface BoothDetailsDraftStoreProviderProps {
  children: ReactNode;
}

export const BoothDetailsDraftStoreProvider = ({
  children,
}: BoothDetailsDraftStoreProviderProps) => {
  const storeRef = useRef<StoreApi<BoothDetailsDraftStore>>();
  if (!storeRef.current) {
    storeRef.current = createBoothDetailsDraftStore();
  }

  return (
    <BoothDetailsDraftStoreContext.Provider value={storeRef.current}>
      {children}
    </BoothDetailsDraftStoreContext.Provider>
  );
};

export const useBoothDetailsDraftStore = <T,>(
  selector: (store: BoothDetailsDraftStore) => T,
): T => {
  const boothDetailsDraftStoreContext = useContext(
    BoothDetailsDraftStoreContext,
  );

  if (!boothDetailsDraftStoreContext) {
    throw new Error(
      `useBoothDetailsDraftStore must be used within BoothDetailsDraftStoreProvider`,
    );
  }

  return useStore(boothDetailsDraftStoreContext, selector);
};
