import { devtools, persist } from "zustand/middleware";

import { Booth } from "../../lib/types";
import { create } from "zustand";

export type BoothState = Required<Pick<Booth, "id" | "description">> &
  Omit<Booth, "id">;

export type BoothListState = {
  booths: BoothState[];
};

export type BoothListActions = {
  initialize: (booths: BoothState[]) => void;
  add: (booth: BoothState) => void;
  edit: (booth: BoothState) => void;
  delete: (id: number) => void;
};

export type BoothListStore = BoothListState & BoothListActions;

export enum CampusPosition {
  latitude = 36.969868,
  longitude = 127.871726,
}

export const defaultInitState = {
  booths: [],
} satisfies BoothListState;

const useBoothListStore = create<BoothListStore>()(
  devtools(
    (set) => ({
      ...defaultInitState,
      initialize: (newBooths) =>
        set((state) => ({ ...state, booths: newBooths })),
      add: (newBooth) =>
        set((state) => ({
          ...state,
          booths: [newBooth, ...state.booths],
        })),
      edit: (editedBooth) =>
        set((state) => {
          const { booths } = state;
          const editedBooths = booths.map((booth) =>
            booth.id === editedBooth.id ? editedBooth : booth,
          );
          return { ...state, booths: editedBooths };
        }),
      delete: (deletedId) =>
        set((state) => {
          const { booths } = state;
          const deletedBooths = booths.filter(
            (booth) => booth.id !== deletedId,
          );
          return { ...state, booths: deletedBooths };
        }),
    }),
    {
      name: "booth-list-store",
    },
  ),
);

export default useBoothListStore;
