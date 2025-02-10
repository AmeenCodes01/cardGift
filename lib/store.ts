import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  draggedUrl:string | null;
  arrangement: (null |string)[];
};

export type Actions = {
  dragImg: (url: string | null) => void;
  addImg: (url: string, arr_index: number) => void;
  initArr: (arr:string[])=> void
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      draggedUrl: null,
      arrangement: new Array(20).fill(null),
      dragImg: (url:string | null) => set({ draggedUrl: url }),
      addImg: (url:string, arr_index: number) =>
        set((state) => ({
          arrangement: state.arrangement.map((_, i) =>
            i === arr_index ? url : _
          ),
        })),
      initArr: (arr:string[]) =>
        set((state) => ({
          arrangement: state.arrangement.map((_, i) => arr[i]),
        })),
    }),
    { name: "order-store", skipHydration: true }
  )
);
