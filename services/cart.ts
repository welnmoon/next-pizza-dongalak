// services/cart.ts
import { axiosInstance } from "./instance";
import { CartWithItems } from "@/types/cart";

const getCart = async (): Promise<CartWithItems | null> => {
  const res = await axiosInstance.get("/api/cart");
  return res.data ?? null;
};
export default {
  getCart,
};
