import { CategoryWithProducts } from "@/types/admin/Category";
import { Product } from "@prisma/client";
import { ReactNode } from "react";

interface Props {
  selectedCategory: CategoryWithProducts;
}

export function PrintCategoryProducts({ selectedCategory }: Props): ReactNode {
  if (
    Array.isArray(selectedCategory.products) &&
    selectedCategory.products.length > 0
  ) {
    return (
      <>
        {selectedCategory.products.map((item: Product, i: number) => {
          const product = item;
          return (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex gap-5 items-center">
                <img
                  src={product?.imageUrl}
                  alt={product?.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {product?.name}
                  </h3>

                  {/* <div className="grid grid-cols-2 gap-y-1 text-sm text-gray-600">
                    <div className="font-medium">Размер:</div>
                    <div>{item.productItem?.size} см</div>

                    <div className="font-medium">Количество:</div>
                    <div>{item.quantity}</div>

                    <div className="font-medium">Цена за штуку:</div>
                    <div>{item.productItem?.price} ₸</div>

                    <div className="font-medium text-gray-800">
                      Общая сумма:
                    </div>
                    <div className="text-orange-600 font-semibold">
                      {item.quantity * item.productItem?.price} ₸
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  } else {
    return <p>Нет данных о заказанных товарах</p>;
  }
}
