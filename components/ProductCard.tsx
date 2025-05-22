import { Item } from "@/types/Checkbox";
import Image from "next/image";
import ButtonCard from "./Buttons/ButtonCard";

interface Props {
  title: string;
  price: number;
  ingredients: string;
  image: string;
  categoryId: string;
}

const ProductCard = ({ image, ingredients, price, title, categoryId }: Props) => {
  return (
    <div className="h-[430px] w-full flex flex-col">
      <div className="relative w-full h-[285px] flex-shrink-0">
        <Image alt={title} src={image} fill className="object-contain" />
      </div>
      <div className="flex-1 flex flex-col justify-between p-2">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-gray-500 text-md line-clamp-2">{ingredients}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>{price} ₸</p>
          <ButtonCard text="Добавить +" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;