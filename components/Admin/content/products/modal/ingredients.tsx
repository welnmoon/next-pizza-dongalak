import { Ingredient } from "@prisma/client";
import { FaPen } from "react-icons/fa";

interface Props {
  ingredients: Ingredient[];
}
//TODO - Сделать иконки работающими
const ProductModalIngredients = ({ ingredients }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <h2 className="text-2xl text-medium">Ингредиенты:</h2>
        <FaPen color="gray" className=" cursor-pointer" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="w-max bg-gray-100 px-3 py-1 rounded-lg flex items-start gap-4"
          >
            <div>
              <h2>{ingredient.name}</h2>
              <p>{ingredient.price} ₸</p>
            </div>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default ProductModalIngredients;
