import { Ingredient } from "@prisma/client";
import Checkboxes from "./Checkboxes";
import { useIngredientFilterStore } from "@/store/ingredientFilterStore";

interface Props {
  data: Ingredient[];
}

const IngredientCheckboxes = ({ data }: Props) => {
  const has = useIngredientFilterStore((s) => s.has);
  const toggle = useIngredientFilterStore((s) => s.toggle);
  const selected = useIngredientFilterStore((s) => s.selectedIngredients); // подписка

  return (
    <Checkboxes
      data={data}
      title="Ингредиенты"
      has={has}
      toggle={toggle}
      limit={6}
      needToShowAllButton
    />
  );
};

export default IngredientCheckboxes;
