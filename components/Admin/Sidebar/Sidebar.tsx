"use client";

import SidebarLink from "./sidebar-link";

export function SidebarNav() {
  return (
    <div className="">
      <nav className="flex flex-col gap-4 mr-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Пользователи</h2>
          <SidebarLink path="users" name="Пользователи" />
          <SidebarLink path="orders" name="Заказы" />
        </div>
        <div className="flex flex-col gap-2 ">
          <h2 className="text-2xl font-bold">Продукты</h2>
          <SidebarLink path="categories" name="Категории" />
          <SidebarLink path="products" name="Продукты" />
        </div>
      </nav>
    </div>
  );
}
