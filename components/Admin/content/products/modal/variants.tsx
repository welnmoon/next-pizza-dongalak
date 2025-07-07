import { PIZZA_TYPE_LABELS } from "@/prisma/constants";
import { Ingredient, ProductItem } from "@prisma/client";
import { FaPen } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import VariantItems from "./variants-item";
import VariantsItem from "./variants-item";

interface Props {
  variants: ProductItem[];
}
//TODO - Сделать иконки работающими

const ProductModalVariants = ({ variants }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <h2 className="text-2xl text-medium">Варианты:</h2>
        <IoIosAdd size={35} className="text-gray-500 cursor-pointer" />
        <FaPen className="text-gray-500 cursor-pointer" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {variants.map((v) => (
          <VariantsItem variant={v} />
        ))}
      </div>
    </div>
  );
};

export default ProductModalVariants;
