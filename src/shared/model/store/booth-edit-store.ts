import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import {
  Booth,
  BoothCategory,
  BoothCategoryKeys,
  Product,
} from "../../lib/types";
import { MenuStatus } from "@/src/features/menu/lib/types";
import { create } from "zustand";

export interface Position {
  latitude: number;
  longitude: number;
}

export enum MenuItemState {
  DRAFT = "DRAFT",
  UNCHANGED = "UNCHANGED",
  DELETED = "DELETED",
  EDITED = "EDITED",
}

export type BoothEditState = Booth;

export type BoothDraftActions = {
  initialize: (booth: BoothEditState) => void;
  editName: (newName: string) => void;
  editCategory: (newCategory: BoothCategoryKeys) => void;
  editDescription: (newDescription: string) => void;
  editPosition: (newPosition: Position) => void;
  editThumbnail: (url: string) => void;
  editOpenTime: (openTime: string) => void;
  editCloseTime: (closeTime: string) => void;
  resetBoothTime: () => void;
  reset: () => void;
  addMenuItem: () => void;
  editMenuItem: (id: number, menuProp: Partial<Product>) => void;
  removeMenuItem: (id: number) => void;
};

export type BoothEditStore = BoothEditState & BoothDraftActions;

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
  openTime: null,
  closeTime: null,
  menus: [],
} satisfies Omit<BoothEditState, "id">;

const useBoothEditStore = create<BoothEditStore>()(
  devtools(
    (set) => ({
      ...defaultInitState,
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
      editThumbnail: (url) => set((state) => ({ ...state, thumbnail: url })),
      editOpenTime: (openTime) => set((state) => ({ ...state, openTime })),
      editCloseTime: (closeTime) => set((state) => ({ ...state, closeTime })),
      resetBoothTime: () =>
        set((state) => ({
          ...state,
          openTime: null,
          closeTime: null,
        })),
      reset: () => set((state) => ({ ...state, ...defaultInitState })),
      addMenuItem: () =>
        set((state) => ({
          ...state,
          menus: [
            ...state.menus,
            {
              id: crypto.getRandomValues(new Uint32Array(1))[0],
              name: "",
              price: 0,
              menuStatus: MenuStatus.Enough,
            },
          ],
        })),
      editMenuItem: (id, menuProp) =>
        set((state) => ({
          ...state,
          menus: state.menus.map((menuItem) =>
            menuItem.id === id ? { ...menuItem, ...menuProp } : menuItem,
          ),
        })),
      removeMenuItem: (id) =>
        set((state) => ({
          ...state,
          menus: state.menus.filter((menuItem) => menuItem.id !== id),
        })),
    }),
    {
      name: "booth-edit-store",
    },
  ),
);

export default useBoothEditStore;
