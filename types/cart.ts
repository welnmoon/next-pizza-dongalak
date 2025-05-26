// types/cart.ts
import {
  Cart,
  CartItem,
  Ingredient,
  Product,
  ProductItem,
} from "@prisma/client";

export type CartItemWithDetails = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export type CartWithItems = Cart & {
  items: CartItemWithDetails[];
};
