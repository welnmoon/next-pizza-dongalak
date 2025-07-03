import Users from "@/components/Admin/content/users/users";
import { prisma } from "@/prisma/prisma-client";

const UsersPage = async () => {
  const users = await prisma.user.findMany();
  const orders = await prisma.order.findMany();

  // Подсчёт количества заказов по каждому пользователю
  const ordersByUser = orders.reduce(
    (acc, order) => {
      acc[order.userId!] = (acc[order.userId!] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const orderSumsByUser = orders.reduce(
    (acc, order) => {
      acc[order.userId!] = (acc[order.userId!] || 0) + order.totalAmount;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      <Users
        users={users}
        ordersByUser={ordersByUser}
        orderSumsByUser={orderSumsByUser}
      />
    </>
  );
};

export default UsersPage;
