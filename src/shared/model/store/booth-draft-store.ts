import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { Booth, BoothCategory } from "../../lib/types";

export interface Position {
  latitude: number;
  longitude: number;
}

export type BoothDraftState = Booth;

export type BoothDraftActions = {
  editName: (newName: string) => void;
  editCategory: (newCategory: BoothCategory) => void;
  editDescription: (newDescription: string) => void;
  editPosition: (newPosition: Position) => void;
  reset: () => void;
};

export type BoothDraftStore = BoothDraftState & BoothDraftActions;

export enum CampusPosition {
  latitude = 37.542352,
  longitude = 127.076824,
}

export const defaultInitState = {
  name: "",
  category: BoothCategory.BAR,
  description: "",
  detail: "",
  thumbnail: "",
  warning: "",
  location: "",
  latitude: CampusPosition.latitude,
  longitude: CampusPosition.longitude,
  menus: [],
} satisfies BoothDraftState;

export const createBoothDraftStore =
  process.env.NODE_ENV === "development"
    ? (initState: BoothDraftState = defaultInitState) => {
        return createStore<BoothDraftStore>()(
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
                  set((state) => ({
                    ...state,
                    latitude: newPosition.latitude,
                    longitude: newPosition.longitude,
                  })),
                reset: () =>
                  set((state) => ({ ...state, ...defaultInitState })),
              }),
              {
                name: "booth-draft-storage",
              },
            ),
          ),
        );
      }
    : (initState: BoothDraftState = defaultInitState) => {
        return createStore<BoothDraftStore>()(
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
                set((state) => ({
                  ...state,
                  latitude: newPosition.latitude,
                  longitude: newPosition.longitude,
                })),
              reset: () => set((state) => ({ ...state, ...defaultInitState })),
            }),
            {
              name: "booth-draft-storage",
            },
          ),
        );
      };
