import { devtools, persist } from "zustand/middleware";
import { Booth, BoothCategory, BoothCategoryKeys } from "../../lib/types";
import { create } from "zustand";

export interface Position {
  latitude: number;
  longitude: number;
}

export type BoothDraftState = Booth;

export type BoothDraftActions = {
  editName: (newName: string) => void;
  editCategory: (newCategory: BoothCategoryKeys) => void;
  editDescription: (newDescription: string) => void;
  editPosition: (newPosition: Position) => void;
  reset: () => void;
};

export type BoothDraftStore = BoothDraftState & BoothDraftActions;

export enum CampusPosition {
  latitude = 36.969868,
  longitude = 127.871726,
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
  openTime: null,
  closeTime: null,
} satisfies BoothDraftState;

const useBoothDraftStore = create<BoothDraftStore>()(
  devtools(
    persist(
      (set) => ({
        ...defaultInitState,
        editName: (newName) => set((state) => ({ ...state, name: newName })),
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
        name: "booth-draft-store",
      },
    ),
    { name: "booth-draft-store" },
  ),
);

export default useBoothDraftStore;
