import { create } from "zustand";

interface State {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  resetPriceRange: () => void;
}

export const usePriceFilterStore = create<State>((set) => ({
  priceRange: [0, 10000],
  setPriceRange: (range) => set({ priceRange: range }),
  resetPriceRange: () => set({ priceRange: [0, 10000] }),
}));
