import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { Booth, BoothCategory } from "../../lib/types";

export interface Position {
  latitude: number;
  longitude: number;
}

export type BoothEditState = Booth;

export type BoothDraftActions = {
  initialize: (booth: Booth) => void;
  editName: (newName: string) => void;
  editCategory: (newCategory: BoothCategory) => void;
  editDescription: (newDescription: string) => void;
  editPosition: (newPosition: Position) => void;
  editThumbnail: (url: string) => void;
  reset: () => void;
};

export type BoothEditStore = BoothEditState & BoothDraftActions;

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
} satisfies BoothEditState;

export const createBoothEditStore =
  process.env.NODE_ENV === "development"
    ? (initState: BoothEditState = defaultInitState) => {
        return createStore<BoothEditStore>()(
          devtools((set) => ({
            ...initState,
            initialize: (booth) => set((state) => ({ ...state, ...booth })),
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
            editThumbnail: (url) =>
              set((state) => ({ ...state, thumbnail: url })),
            reset: () => set((state) => ({ ...state, ...defaultInitState })),
          })),
        );
      }
    : (initState: BoothEditState = defaultInitState) => {
        return createStore<BoothEditStore>()((set) => ({
          ...initState,
          initialize: (booth) => set((state) => ({ ...state, ...booth })),
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
          editThumbnail: (url) =>
            set((state) => ({ ...state, thumbnail: url })),
          reset: () => set((state) => ({ ...state, ...defaultInitState })),
        }));
      };
