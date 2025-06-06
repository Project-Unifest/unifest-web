import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import {
  Booth,
  BoothCategory,
  BoothCategoryKeys,
  BoothSchedule,
  Product,
} from "../../lib/types";
import { MenuStatus } from "@/src/features/menu/lib/types";
import { create } from "zustand";

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
  updateScheduleList: (scheduleList: BoothSchedule[]) => void;
  addSchedule: (schedule: BoothSchedule) => void;
  removeSchedule: (date: string) => void;
  resetSchedules: () => void;
  reset: () => void;
  addMenuItem: () => void;
  editMenuItem: (id: number, menuProp: Partial<Product>) => void;
  removeMenuItem: (id: number) => void;
};

export type BoothDetailsDraftStore = BoothDetailsDraftState &
  BoothDetailsDraftActions;

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
  scheduleList: [],
  menus: [],
} satisfies Omit<BoothDetailsDraftState, "id">;

// TODO auto save draft
const useBoothDetailsDraftStore = create<BoothDetailsDraftStore>()(
  devtools(
    (set) => ({
      ...defaultInitState,
      initialize: (booth) => set((state) => ({ ...state, ...booth })),
      setField: (boothProps) => set((state) => ({ ...state, ...boothProps })),
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
      updateScheduleList: (scheduleList) =>
        set((state) => ({ ...state, scheduleList })),
      addSchedule: (schedule) =>
        set((state) => ({
          ...state,
          scheduleList: [...state.scheduleList, schedule].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          ),
        })),
      removeSchedule: (date) =>
        set((state) => ({
          ...state,
          scheduleList: state.scheduleList.filter(
            (schedule) => schedule.date !== date,
          ),
        })),
      resetSchedules: () =>
        set((state) => ({
          ...state,
          scheduleList: [],
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
      name: "booth-details-draft-store",
    },
  ),
);

export default useBoothDetailsDraftStore;
