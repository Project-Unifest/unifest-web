import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export interface Position {
  latitude: number;
  longitude: number;
}

export type BoothState = {
  name: string;
  category: string;
  description: string;
  position: Position;
};

export type BoothActions = {
  editName: (newName: string) => void;
  editCategory: (newCategory: string) => void;
  editDescription: (newDescription: string) => void;
  editPosition: (newPosition: Position) => void;
  reset: () => void;
};

export type BoothStore = BoothState & BoothActions;

export enum CampusPosition {
  latitude = 37.542352,
  longitude = 127.076824,
}

export const defaultInitState = {
  name: "",
  category: "",
  description: "",
  position: {
    latitude: CampusPosition.latitude,
    longitude: CampusPosition.longitude,
  },
} satisfies BoothState;

export const createBoothStore =
  process.env.NODE_ENV === "development"
    ? (initState: BoothState = defaultInitState) => {
        return createStore<BoothStore>()(
          devtools(
            persist(
              (set) => ({
                ...initState,
                editName: (newName) =>
                  set((state) => ({ ...state, name: newName })),
                editCategory: (newCategory) =>
                  set((state) => ({ ...state, category: newCategory })),
                editDescription: (newDescription) =>
                  set((state) => ({ ...state, description: newDescription })),
                editPosition: (newPosition) =>
                  set((state) => ({ ...state, position: { ...newPosition } })),
                reset: () =>
                  set((state) => ({ ...state, ...defaultInitState })),
              }),
              {
                name: "booth-storage",
              },
            ),
          ),
        );
      }
    : (initState: BoothState = defaultInitState) => {
        return createStore<BoothStore>()(
          persist(
            (set) => ({
              ...initState,
              editName: (newName) =>
                set((state) => ({ ...state, name: newName })),
              editCategory: (newCategory) =>
                set((state) => ({ ...state, category: newCategory })),
              editDescription: (newDescription) =>
                set((state) => ({ ...state, description: newDescription })),
              editPosition: (newPosition) =>
                set((state) => ({ ...state, position: { ...newPosition } })),
              reset: () => set((state) => ({ ...state, ...defaultInitState })),
            }),
            {
              name: "booth-storage",
            },
          ),
        );
      };
