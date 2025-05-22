import { Product } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const search = async (query: string): Promise<Product[]> => {
  return (
    await axiosInstance.get<Product[]>(ApiRoutes.PRODUCT_SEARCH, {
      params: { query },
    })
  ).data;
};
