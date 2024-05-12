import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { Booth, BoothCategory } from "../../lib/types";
import { MenuItemState } from "./booth-edit-store";
import { MenuItem } from "../../lib/types";

export interface Position {
  latitude: number;
  longitude: number;
}

export type BoothDetailsDraftState = Booth;

export type BoothDetailsDraftActions = {
  initialize: (booth: Booth) => void;
  setField: (boothProps: Partial<BoothDetailsDraftState>) => void;
  editName: (newName: string) => void;
  editCategory: (newCategory: BoothCategory) => void;
  editDescription: (newDescription: string) => void;
  editPosition: (newPosition: Position) => void;
  editThumbnail: (url: string) => void;
  reset: () => void;
  addMenuItem: () => void;
  editMenuItem: (id: number, menuProp: Partial<MenuItem>) => void;
  removeMenuItem: (id: number) => void;
};

export type BoothDetailsDraftStore = BoothDetailsDraftState &
  BoothDetailsDraftActions;

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
} satisfies BoothDetailsDraftState;

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
                    state: MenuItemState.DRAFT,
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
                  state: MenuItemState.DRAFT,
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
