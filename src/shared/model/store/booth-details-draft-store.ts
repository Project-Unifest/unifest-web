import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import {
  Booth,
  BoothCategory,
  BoothCategoryKeys,
  Product,
} from "../../lib/types";
import { MenuItemState } from "./booth-edit-store";

export interface Position {
  latitude: number;
  longitude: number;
}

export type BoothDetailsDraftState = Booth;

export type BoothDetailsDraftActions = {
  initialize: (booth: Booth) => void;
  setField: (boothProps: Partial<BoothDetailsDraftState>) => void;
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

export type BoothDetailsDraftStore = BoothDetailsDraftState &
  BoothDetailsDraftActions;

export enum CampusPosition {
  latitude = 37.01107,
  longitude = 127.263816,
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
} satisfies Omit<BoothDetailsDraftState, "id">;

export const createBoothDetailsDraftStore =
  process.env.NODE_ENV === "development"
    ? (initState: BoothDetailsDraftState = defaultInitState) => {
        return createStore<BoothDetailsDraftStore>()(
          devtools((set) => ({
            ...initState,
            initialize: (booth) => set((state) => ({ ...state, ...booth })),
            setField: (boothProps) =>
              set((state) => ({ ...state, ...boothProps })),
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
            editOpenTime: (openTime) =>
              set((state) => ({ ...state, openTime })),
            editCloseTime: (closeTime) =>
              set((state) => ({ ...state, closeTime })),
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
                    menuStatus: MenuItemState.DRAFT,
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
          })),
        );
      }
    : (initState: BoothDetailsDraftState = defaultInitState) => {
        return createStore<BoothDetailsDraftStore>()((set) => ({
          ...initState,
          initialize: (booth) => set((state) => ({ ...state, ...booth })),
          setField: (boothProps) =>
            set((state) => ({ ...state, ...boothProps })),
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
          editOpenTime: (openTime) => set((state) => ({ ...state, openTime })),
          editCloseTime: (closeTime) =>
            set((state) => ({ ...state, closeTime })),
          reset: () => set((state) => ({ ...state, ...defaultInitState })),
          resetBoothTime: () =>
            set((state) => ({
              ...state,
              openTime: null,
              closeTime: null,
            })),
          addMenuItem: () =>
            set((state) => ({
              ...state,
              menus: [
                ...state.menus,
                {
                  id: crypto.getRandomValues(new Uint32Array(1))[0],
                  name: "",
                  price: 0,
                  menuStatus: MenuItemState.DRAFT,
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
        }));
      };
