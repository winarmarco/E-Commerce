import { CreateOrderSchema } from "@/schema/Order";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "../../trpc";

import { z } from "zod";
import {
  createOrderFromUser,
  getAllOrder,
  fetchOrderByProductId,
  fetchOrderById,
  markAsCompleted,
  queryOrder,
} from "./order.services";

export const orderRouter = createTRPCRouter({
  createOrder: protectedProcedure
    .input(CreateOrderSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const newOrder = await createOrderFromUser({ userId, ...input });
      return newOrder;
    }),

  getOrder: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { id: orderId } = input;
      const order = await fetchOrderById({ orderId, userId });

      return order;
    }),

  getOrderWithProduct: adminProcedure
    .input(
      z.object({
        productId: z.string().cuid(),
      }),
    )
    .query(async ({ input }) => {
      const { productId } = input;
      const orderWithProduct = fetchOrderByProductId({ productId });
      return orderWithProduct;
    }),

  getAllOrder: adminProcedure.query(async () => {
    const orders = await getAllOrder();
    return orders;
  }),

  queryOrder: adminProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ input }) => {
      const { query } = input;
      const orders = await queryOrder({ query });
      return orders;
    }),

  markAsCompleted: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ input }) => {
      const { id: orderId } = input;
      const updatedOrder = await markAsCompleted({ orderId });

      return updatedOrder;
    }),
});
