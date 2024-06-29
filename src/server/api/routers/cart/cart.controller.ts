import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  addItemsToCart,
  fetchCartItems,
  removeItemFromCart,
} from "./cart.services";
import { z } from "zod";

export const cartRouter = createTRPCRouter({
  getCart: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;
    const cartItems = await fetchCartItems({ userId });

    return cartItems;
  }),
  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { productId } = input;
      const updatedCart = await addItemsToCart({ userId, productId });
      return updatedCart;
    }),

  removeFromCart: protectedProcedure
    .input(
      z.object({
        productId: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { productId } = input;
      const updatedCart = await removeItemFromCart({ userId, productId });
      return updatedCart;
    }),
});
