import { create } from "zustand";

interface State {
  selectedPizzaDoughTypes: Set<number>;
  toggleDoughType: (size: number) => void;
  reset: () => void;
  has: (size: number) => boolean;
}

export const useDoughTypeFilterStore = create<State>((set, get) => ({
  selectedPizzaDoughTypes: new Set(),

  toggleDoughType: (size) => {
    const current = get().selectedPizzaDoughTypes;
    const newSet = new Set(current);

    if (newSet.has(size)) {
      newSet.delete(size);
    } else {
      newSet.add(size);
    }

    set({ selectedPizzaDoughTypes: newSet });
  },

  reset: () => set({ selectedPizzaDoughTypes: new Set() }),

  has: (size) => get().selectedPizzaDoughTypes.has(size),
}));
