import { useDoughTypeFilterStore } from "@/store/doughTypeFilterStore";
import Checkboxes from "./Checkboxes";

interface Props {
  data: { id: number; name: string }[];
}

const DoughTypeCheckboxes = ({ data }: Props) => {

  const has = useDoughTypeFilterStore((s) => s.has);
  const toggle = useDoughTypeFilterStore((s) => s.toggleDoughType);

  return <Checkboxes data={data} title="Размеры" has={has} toggle={toggle} />;
};

export default DoughTypeCheckboxes;
