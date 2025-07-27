import { arraysEqual } from "@/lib/arraysEqual";
import { Api } from "@/services/api-client";
import { CartWithItems } from "@/types/cart";
import { Ingredient, ProductItem } from "@prisma/client";
import { create } from "zustand";

export interface FlatCartItem {
  id: number;
  productId: number;
  price: number;
  size: number | null;
  pizzaType: number | null;
  quantity: number;
  name: string;
  imageUrl: string;
  disabled?: boolean;
  ingredients: Ingredient[];
}

interface CartState {
  items: FlatCartItem[];
  error: boolean;

  loadingCart: boolean;
  updating: boolean;
  removing: boolean;
  adding: boolean;

  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (item: ProductItem, ingredients?: Ingredient[]) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loadingCart: true,
  updating: false,
  removing: false,
  adding: false,

  fetchCartItems: async () => {
    try {
      set({ loadingCart: true });
      const cart = await Api.cart.getCart();
      const parsedItems =
        (cart?.items ?? []).map((item) => ({
          id: item.id,
          price: item.productItem.price,
          size: item.productItem.size ?? null,
          pizzaType: item.productItem.pizzaType ?? null,
          productId: item.productItem.productId ?? 0,
          imageUrl: item.productItem.product.imageUrl,
          name: item.productItem.product.name,
          quantity: item.quantity,
          ingredients: item.ingredients,
        }));
      set({ items: parsedItems, loadingCart: false });
    } catch (error) {
      console.error("Ошибка при загрузке корзины", error);
      set({ loadingCart: false, error: true });
    }
  },

  updateItemQuantity: async (id, quantity) => {
    try {
      set({ updating: true });
      await Api.cart.updateItemQuantity(id, quantity);
      const updatedItems = get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      set({ items: updatedItems });
    } catch (err) {
      console.error("Ошибка при обновлении количества", err);
    } finally {
      set({ updating: false });
    }
  },

  addCartItem: async (item, ingredients = []) => {
    const currentItems = get().items;
    const ingredientsIds = ingredients.map((i) => i.id);

    const existingItem = currentItems.find(
      (i) =>
        i.productId === item.productId &&
        i.size === item.size &&
        i.pizzaType === item.pizzaType &&
        arraysEqual(
          i.ingredients.map((ing) => ing.id).sort(),
          ingredientsIds.sort()
        )
    );

    try {
      set({ adding: true });

      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        await Api.cart.updateItemQuantity(existingItem.id, newQuantity);
      } else {
        await Api.cart.addItemToCart(item.id, 1, ingredientsIds);
      }

      await get().fetchCartItems();
    } catch (err) {
      console.error("Ошибка при добавлении товара", err);
    } finally {
      set({ adding: false });
    }
  },

  removeCartItem: async (id) => {
    try {
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, disabled: true } : item
        ),
      }));

      await Api.cart.deleteCartItem(id);

      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
    } finally {
      set((state) => ({
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },

  total: () => {
    const items = get().items;
    return items.reduce((sum, item) => {
      const ingredientsSum = item.ingredients.reduce(
        (acc, ing) => acc + ing.price * item.quantity,
        0
      );
      return sum + item.price * item.quantity + ingredientsSum;
    }, 0);
  },
}));

function getCartDetails(data: CartWithItems | null): Partial<CartState> {
  const parsedItems =
    (data?.items ?? []).map((item) => ({
      id: item.id,
      price: item.productItem.price,
      size: item.productItem.size ?? null,
      pizzaType: item.productItem.pizzaType ?? null,
      productId: item.productItem.productId ?? 0,
      imageUrl: item.productItem.product.imageUrl,
      name: item.productItem.product.name,
      quantity: item.quantity,
      ingredients: item.ingredients,
    }));

  return {
    items: parsedItems,
    loadingCart: false,
  };
}
