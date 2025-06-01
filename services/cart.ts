// services/cart.ts
import { ApiRoutes } from "./constants";
import { axiosInstance } from "./instance";
import { CartWithItems } from "@/types/cart";

const getCart = async (): Promise<CartWithItems | null> => {
  const res = await axiosInstance.get(ApiRoutes.CART_ITEM);
  return res.data ?? null;
};

export const addItemToCart = async (
  productItemId: number,
  quantity: number = 1,
  ingredientsIds: number[] = []
) => {
  await axiosInstance.post(ApiRoutes.CART_ITEM, {
    productItemId,
    quantity,
    ingredientsIds,
  });
};

export const updateItemQuantity = async (id: number, quantity: number) => {
  await axiosInstance.patch(ApiRoutes.CART_ITEM, {
    cartItemId: id,
    quantity,
  });
};

export const deleteCartItem = async (id: number) => {
  await axiosInstance.delete(ApiRoutes.CART_ITEM, { data: { id } });
};

export default {
  getCart,
  addItemToCart,
  updateItemQuantity,
  deleteCartItem,
};
