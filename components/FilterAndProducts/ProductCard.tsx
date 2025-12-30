"use client";
import Image from "next/image";
import ButtonCard from "../Buttons/ButtonCard";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  price: number;
  ingredients: string;
  image: string;
  categoryId: number;
  id: number;
}

const ProductCard = ({ image, ingredients, price, title, id }: Props) => {
  const router = useRouter();

  const modelOpen = () => {
    router.push(`/product/${id}`);
  };
  return (
    <div className="w-full flex flex-col bg-[#FFFCF7] border border-stone-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      {/* Изображение */}
      <div className="relative w-full aspect-square p-3 sm:p-4 bg-stone-50 rounded-2xl">
        <Image alt={title} src={image} fill className="object-contain" />
      </div>

      {/* Контент */}
      <div className="flex flex-col justify-between px-3 pb-3 flex-1">
        <div className="mb-2">
          <h2 className="text-sm sm:text-base font-semibold text-stone-900">
            {title}
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm line-clamp-2">
            {ingredients}
          </p>
        </div>

        {/* Цена и кнопка */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 mt-auto">
          <p className="text-xs sm:text-sm">
            от <span className="font-bold">{price} ₸</span>
          </p>
          <ButtonCard onClick={modelOpen} text="Добавить" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
