import { create } from "zustand";

// interface CategoryFilterStore {
//   selectedCategories: Set<number>;
//   toggle: (id: number) => void;
//   has: (id: number) => boolean;
//   clear: () => void;
// }

// export const useCategoryFilterStore = create<CategoryFilterStore>((set, get) => ({
//   selectedCategories: new Set(),

//   toggle: (id) =>
//     set((state) => {
//       const newSet = new Set(state.selectedCategories);
//       newSet.has(id) ? newSet.delete(id) : newSet.add(id);
//       return { selectedCategories: newSet };
//     }),

//   has: (id) => get().selectedCategories.has(id),

//   clear: () => set({ selectedCategories: new Set() }),
// }));

interface State {
  selectedCategory: number;
  toggle: (id: number) => void;
}

export const useCategoryFilterStore = create<State>((set) => ({
  selectedCategory: 1,
  toggle: (id) => set({ selectedCategory: id }),
}));
