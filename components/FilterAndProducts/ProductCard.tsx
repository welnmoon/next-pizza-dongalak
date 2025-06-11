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
    <div className="w-full max-w-[240px] flex flex-col bg-white">
      {/* Изображение */}
      <div className="relative w-full aspect-square p-4">
        <Image alt={title} src={image} fill className="object-contain" />
      </div>

      {/* Контент */}
      <div className="flex flex-col justify-between px-3 pb-3 flex-1">
        <div className="mb-2">
          <h2 className="text-base font-semibold">{title}</h2>
          <p className="text-gray-500 text-sm line-clamp-2">{ingredients}</p>
        </div>

        {/* Цена и кнопка */}
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 mt-auto">
          <p className="text-sm">
            от <span className="font-bold">{price} ₸</span>
          </p>
          <ButtonCard onClick={modelOpen} text="Добавить" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
