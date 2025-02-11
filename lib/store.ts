import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type State = {
  draggedUrl:string | null;
  arrangement: (null |string)[];
};

export type Actions = {
  dragImg: (url: string | null) => void;
  addImg: (url: string| null, arr_index: number) => void;
  initArr: (arr:string[])=> void
};
const shouldPersist = () => {
  if (typeof window === "undefined") return false; // Avoid errors during SSR
  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams,"searchParams")
  return !searchParams.has("id"); // Persist only if no "id" in URL
};

export const useStore = create<State & Actions>()(
  shouldPersist() ?
  persist(
    (set) => ({
      draggedUrl: null,
      arrangement: new Array(25).fill(null),
      dragImg: (url:string | null) => set({ draggedUrl: url }),
      addImg: (url:string| null, arr_index: number) =>
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
  ) : (set) => ({
    draggedUrl: null,
    arrangement: new Array(25).fill(null),
    dragImg: (url:string | null) => set({ draggedUrl: url }),
    addImg: (url:string| null, arr_index: number) =>
      set((state) => ({
        arrangement: state.arrangement.map((_, i) =>
          i === arr_index ? url : _
        ),
      })),
    initArr: (arr:string[]) =>
      set((state) => ({
        arrangement: state.arrangement.map((_, i) => arr[i]),
      })),
  })
  
);
