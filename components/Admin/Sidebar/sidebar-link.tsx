import clsx from "clsx";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  name: string;
}

const SidebarLink = ({ path, name }: Props) => {
  const pathname = usePathname();
  return (
    <a
      href={`/admin/${path}`}
      className={clsx(
        "py-2",
        pathname.includes(`/${path}`) && "font-bold text-blue-600"
      )}
    >
      {name}
    </a>
  );
};

export default SidebarLink;
