import { create } from "zustand";

interface State {
  selectedPizzaSizes: Set<number>;
  togglePizzaSize: (size: number) => void;
  reset: () => void;
  has: (size: number) => boolean;
}

export const usePizzaSizeFilterStore = create<State>((set, get) => ({
  selectedPizzaSizes: new Set(),

  togglePizzaSize: (size) => {
    const current = get().selectedPizzaSizes;
    const newSet = new Set(current);

    if (newSet.has(size)) {
      newSet.delete(size);
    } else {
      newSet.add(size);
    }

    set({ selectedPizzaSizes: newSet });
  },

  reset: () => set({ selectedPizzaSizes: new Set() }),

  has: (size) => get().selectedPizzaSizes.has(size),
}));
