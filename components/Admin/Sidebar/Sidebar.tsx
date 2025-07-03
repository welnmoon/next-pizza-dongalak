"use client";
import { usePathname } from "next/navigation";
import clsx from "clsx"; // или classnames

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="">
      <nav className="flex flex-col gap-4 mr-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Пользователи</h2>
          <a
            href="/admin/users"
            className={clsx(
              "py-2",
              pathname.includes("/users") && "font-bold text-blue-600"
            )}
          >
            Пользователи
          </a>
          <a
            href="/admin/orders"
            className={clsx(
              "py-2",
              pathname.includes("/orders") && "font-bold text-blue-600"
            )}
          >
            Заказы
          </a>
        </div>
        <div className="flex flex-col gap-2 ">
          <h2 className="text-2xl font-bold">Продукты</h2>
          <a
            href="/admin/categories"
            className={clsx(
              "py-2",
              pathname.includes("/payments") && "font-bold text-blue-600"
            )}
          >
            Категории
          </a>
        </div>
      </nav>
    </div>
  );
}
