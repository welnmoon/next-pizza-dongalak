import { Ingredient } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPen } from "react-icons/fa";

interface Props {
  ingredients: Ingredient[];
  allIngredients: Ingredient[];
  selectedProductId: number;
}
//TODO - Сделать иконки работающими
const ProductModalIngredients = ({
  ingredients,
  allIngredients,
  selectedProductId,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const selectedIds = ingredients.map((ing) => ing.id);
  const availableIngredients = allIngredients.filter(
    (ing) => !selectedIds.includes(ing.id)
  );

  const handleToggleIngredient = async (ingredientId: number) => {
    try {
      const res = await fetch(
        `/api/products/${selectedProductId}/toggleIngredient`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredientId }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Ошибка");

      toast.success(
        result.status === "added" ? "Ингредиент добавлен" : "Ингредиент удалён"
      );

      // 🚨 Обнови состояние через fetch или передай callback из родителя
    } catch (err) {
      toast.error("Ошибка при изменении ингредиента");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <h2 className="text-2xl text-medium">Ингредиенты:</h2>
        <FaPen
          onClick={() => setEditing(true)}
          color="gray"
          className=" cursor-pointer"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="w-max bg-orange-100 px-4 py-2 rounded-lg flex items-start gap-4"
          >
            <div className="bg-white rounded-xl">
              <img alt="" src={ingredient.imageUrl} className="w-20 h-20 m-2" />
            </div>
            <div>
              <h2>{ingredient.name}</h2>
              <p>{ingredient.price} ₸</p>
              {editing && (
                <button
                  className="mt-1 text-sm text-red-500 hover:underline"
                  onClick={() => handleToggleIngredient(ingredient.id)}
                >
                  Удалить
                </button>
              )}
            </div>
          </div>
        ))}

        {availableIngredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="w-max bg-gray-100 px-4 py-2 rounded-lg flex items-start gap-4"
          >
            <div className="bg-white rounded-xl">
              <img
                alt=""
                src={ingredient.imageUrl}
                className="w-20 h-20 m-2 grayscale"
              />
            </div>
            <div>
              <h2 className="text-gray-500">{ingredient.name}</h2>
              <p className="text-gray-500">{ingredient.price} ₸</p>
              {editing && (
                <button
                  className="mt-1 text-sm text-blue-500 hover:underline"
                  onClick={() => handleToggleIngredient(ingredient.id)}
                >
                  Добавить
                </button>
              )}
            </div>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default ProductModalIngredients;
