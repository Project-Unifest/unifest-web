import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { Booth } from "../../lib/types";

export type BoothState = Booth;

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
  latitude = 37.542352,
  longitude = 127.076824,
}

export const defaultInitState = {
  booths: [],
} satisfies BoothListState;

export const createBoothListStore =
  process.env.NODE_ENV === "development"
    ? (initState: BoothListState = defaultInitState) => {
        return createStore<BoothListStore>()(
          devtools((set) => ({
            ...initState,
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
          })),
        );
      }
    : (initState: BoothListState = defaultInitState) => {
        return createStore<BoothListStore>()((set) => ({
          ...initState,
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
        }));
      };
