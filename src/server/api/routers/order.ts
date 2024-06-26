import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { CreateOrderSchema } from "@/schema/Order";
import { OrderStatus } from "@prisma/client";
import {
  generateOrderCode,
  getTodayAtMidnight,
  getTomorrowDate,
} from "@/lib/utils";

export const orderRouter = createTRPCRouter({
  createOrder: protectedProcedure
    .input(CreateOrderSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const user = await ctx.db.user.findFirstOrThrow({
        where: {
          id: userId,
        },
        include: {
          cart: true,
        },
      });

      if (!user) throw Error("User not found!");

      const cartItems = await ctx.db.cartItem.findMany({
        where: {
          cartId: user.cartId,
        },
        include: {
          product: true,
        },
      });

      if (!cartItems || cartItems.length == 0) throw Error("Cart is empty!");

      const { firstName, lastName, email, phoneNumber, shippingAddress } =
        input;

      // Use Prisma's transaction API to perform all writes in a single transaction
      const newOrder = await ctx.db.$transaction(async (prisma) => {
        const currDate = new Date();
        const todayMidnight = getTodayAtMidnight();

        const newShippingAddress = await prisma.shippingAddress.create({
          data: shippingAddress,
        });

        const todayExistingOrder = await prisma.order.findMany({
          where: {
            orderDateTime: {
              gte: todayMidnight,
              lte: getTomorrowDate(todayMidnight),
            },
          },
        });

        const order = await prisma.order.create({
          data: {
            authorId: userId,
            status: OrderStatus.PENDING,
            orderCode: generateOrderCode(
              todayExistingOrder.length + 1,
              currDate,
            ),
            orderDateTime: currDate,
            estimatedArrivalTime: new Date(
              currDate.getTime() + 3600 * 24 * 1000 * 3,
            ),
            firstName,
            lastName,
            email,
            phoneNumber,
            shippingAddressId: newShippingAddress.id,
          },
        });

        const orderItems = cartItems.map((cartItem) => ({
          productName: cartItem.product.name,
          productPrice: cartItem.product.price,
          quantity: cartItem.quantity,
          productRef: cartItem.product.id,
          orderId: order.id,
        }));

        await prisma.orderItem.createMany({
          data: orderItems,
        });

        // Lastly delete cart and cartItems, and update user cart
        await prisma.cartItem.deleteMany({
          where: { cartId: user.cartId },
        });

        return order;
      });
      return newOrder;
    }),

  getOrder: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { id: orderId } = input;
      const order = await ctx.db.order.findFirst({
        where: {
          id: orderId,
        },
        include: {
          shippingAddress: true,
          author: true,
          orderItems: true,
        },
      });

      if (!order) throw Error(`Order ${orderId} not found!`);

      if (order.authorId != ctx.session.user.id) throw new Error("Unauthozied");

      return order;
    }),

  getAllOrder: protectedProcedure.query(async ({ ctx }) => {
    const order = await ctx.db.order.findMany({
      include: {
        orderItems: true,
      },
    });
    return order;
  }),

  queryOrder: protectedProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { query } = input;
      const orders = ctx.db.order.findMany({
        include: {
          orderItems: true,
        },
        where: {
          OR: [
            {
              id: {
                contains: query,
              },
            },
            {
              firstName: {
                contains: query,
              },
            },
            {
              lastName: {
                contains: query,
              },
            },
            {
              orderCode: {
                contains: query,
              },
            },
            {
              status: OrderStatus[query as keyof typeof OrderStatus],
            },
          ],
        },
      });

      return orders;
    }),

  markAsCompleted: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id: orderId } = input;
      const order = await ctx.db.order.findFirst({
        where: {
          id: orderId,
        },
      });

      if (!order) throw Error(`Order ${orderId} not found!`);

      if (order.authorId != ctx.session.user.id) throw new Error("Unauthozied");

      const updatedOrder = await ctx.db.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: OrderStatus.COMPLETED,
        },
      });

      return updatedOrder;
    }),
});
