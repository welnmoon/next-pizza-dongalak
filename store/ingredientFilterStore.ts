import { create } from "zustand";

interface IngredientFilterStore {
  selectedIngredients: Set<number>;
  add: (id: number) => void;
  remove: (id: number) => void;
  toggle: (id: number) => void;
  clear: () => void;
  has: (id: number) => boolean;
}

export const useIngredientFilterStore = create<IngredientFilterStore>(
  (set, get) => ({
    selectedIngredients: new Set(),

    add: (id) =>
      set((state) => {
        const newSet = new Set(state.selectedIngredients);
        newSet.add(id);
        return { selectedIngredients: newSet };
      }),

    remove: (id) =>
      set((state) => {
        const newSet = new Set(state.selectedIngredients);
        newSet.delete(id);
        return { selectedIngredients: newSet };
      }),

    toggle: (id) =>
      set((state) => {
        const newSet = new Set(state.selectedIngredients);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        return { selectedIngredients: newSet };
      }),

    clear: () => set({ selectedIngredients: new Set() }),

    has: (id) => get().selectedIngredients.has(id),
  })
);
