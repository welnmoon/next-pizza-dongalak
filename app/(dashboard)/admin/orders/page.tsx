import Orders from "@/components/Admin/content/orders/Orders";
import { prisma } from "@/prisma/prisma-client";
import { OrderWithUser } from "@/types/admin/Order";

const OrdersPage = async () => {
  const orders: OrderWithUser[] = await prisma.order.findMany({
    include: {
      user: {
        select: {
          fullName: true,
          email: true,
        },
      },
    },
  });

  return (
    <>
      <Orders orders={orders} />
    </>
  );
};

export default OrdersPage;
