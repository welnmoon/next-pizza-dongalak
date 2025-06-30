import { Prisma } from "@prisma/client";

export type OrderWithUser = Prisma.OrderGetPayload<{
  include: {
    user: {
      select: {
        fullName: true;
        email: true;
      };
    };
  };
}>;
