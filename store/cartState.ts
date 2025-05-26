import { Api } from "@/services/api-client";
import { CartItemWithDetails, CartWithItems } from "@/types/cart";
import { CartItem, Ingredient, ProductItem } from "@prisma/client";
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
  ingredients: Ingredient[];
}

interface CartState {
  items: FlatCartItem[];
  loading: boolean;
  error: boolean;

  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (item: ProductItem) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const cart = await Api.cart.getCart();
      set({
        items:
          cart?.items.map((item) => ({
            id: item.id,
            price: item.productItem.price,
            size: item.productItem?.size ?? null,
            pizzaType: item.productItem?.pizzaType ?? null,
            productId: item.productItem?.productId ?? 0,
            imageUrl: item.productItem.product.imageUrl,
            name: item.productItem.product.name,
            quantity: item.quantity,
            ingredients: item.ingredients,
          })) || [],
        loading: false,
        error: false,
      });
    } catch (error) {
      console.error("Ошибка при загрузке корзины", error);
      set({ loading: false, error: true });
    }
  },

  updateItemQuantity: (id, quantity) => {
    return Promise.resolve();
  },
  addCartItem: () => {
    return Promise.resolve();
  },
  removeCartItem: () => {
    return Promise.resolve();
  },
}));
