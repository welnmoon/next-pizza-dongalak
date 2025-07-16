import Checkboxes from "./Checkboxes";
import { usePizzaSizeFilterStore } from "@/store/pizzaSizeFilterStore";

interface Props {
  data: { id: number; name: string }[];
}

const SizesCheckboxes = ({ data }: Props) => {
  const has = usePizzaSizeFilterStore((s) => s.has);
  const toggle = usePizzaSizeFilterStore((s) => s.togglePizzaSize);

  return <Checkboxes data={data} title="Размеры" has={has} toggle={toggle} />;
};

export default SizesCheckboxes;
