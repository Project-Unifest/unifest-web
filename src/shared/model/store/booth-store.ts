import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type BoothState = {
  name: string;
  category: string;
  description: string;
};

export type BoothActions = {
  editName: (newName: string) => void;
  editCategory: (newCategory: string) => void;
  editDescription: (newDescription: string) => void;
};

export type BoothStore = BoothState & BoothActions;

export const defaultInitState: BoothState = {
  name: "",
  category: "",
  description: "",
};

export const createBoothStore = (initState: BoothState = defaultInitState) => {
  return createStore<BoothStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          editName: (newName) => set((state) => ({ ...state, name: newName })),
          editCategory: (newCategory) =>
            set((state) => ({ ...state, category: newCategory })),
          editDescription: (newDescription) =>
            set((state) => ({ ...state, description: newDescription })),
        }),
        {
          name: "booth-storage",
        },
      ),
    ),
  );
};
