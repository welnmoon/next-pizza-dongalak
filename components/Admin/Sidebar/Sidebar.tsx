"use client";
import { usePathname } from "next/navigation";
import clsx from "clsx"; // или classnames

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div>
      <nav className="flex flex-col mr-4">
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
        <a
          href="/admin/payments"
          className={clsx(
            "py-2",
            pathname.includes("/payments") && "font-bold text-blue-600"
          )}
        >
          Оплаты
        </a>
      </nav>
    </div>
  );
}
