import { devtools, persist } from "zustand/middleware";
import {
  Booth,
  BoothCategory,
  BoothCategoryKeys,
  BoothSchedule,
} from "../../lib/types";
import { create } from "zustand";

export interface Position {
  latitude: number;
  longitude: number;
}

export type BoothDraftState = Booth;

export type BoothDraftActions = {
  updateScheduleList: (scheduleList: BoothSchedule[]) => void;
  addSchedule: (schedule: BoothSchedule) => void;
  removeSchedule: (date: string) => void;
  resetSchedules: () => void;
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
  scheduleList: [],
} satisfies BoothDraftState;

// TODO auto save draft
const useBoothDraftStore = create<BoothDraftStore>()(
  devtools(
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
    }),
    { name: "booth-draft-store" },
  ),
);

export default useBoothDraftStore;
