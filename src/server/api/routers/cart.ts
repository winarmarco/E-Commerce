import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const cartRouter = createTRPCRouter({
  getCart: protectedProcedure.query(async ({ ctx }) => {
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
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    return cartItems;
  }),

  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;
      const userId = ctx.session.user.id;

      const user = await ctx.db.user.findFirstOrThrow({
        where: {
          id: userId,
        },
        include: {
          cart: true,
        },
      });

      if (!user) throw new Error("User not found!");

      const cartItems = await ctx.db.cartItem.findMany({
        where: {
          cartId: user.cartId,
        },
      });

      if (!cartItems) throw new Error("Cart not found");

      const targetCartItem = cartItems.find(
        (cartItem) => cartItem.productId == productId,
      );

      let updatedCart;

      if (targetCartItem) {
        updatedCart = await ctx.db.cartItem.update({
          where: {
            id: targetCartItem.id,
            productId: productId,
            cartId: user.cartId,
          },
          data: {
            quantity: targetCartItem.quantity + 1,
          },
        });
      } else {
        updatedCart = await ctx.db.cartItem.create({
          data: {
            cartId: user.cartId,
            productId: productId,
            quantity: 1,
          },
        });
      }

      if (!updatedCart) throw new Error("Cart cannot be updated");

      return updatedCart;
    }),

  removeFromCart: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;
      const userId = ctx.session.user.id;

      // First find the user to retrieve the cartId
      const user = await ctx.db.user.findFirstOrThrow({
        where: {
          id: userId,
        },
        include: {
          cart: true,
        },
      });

      if (!user) throw new Error("User not found!");

      // Second find the cartItems that belongs to cart `cartId`
      const cartItems = await ctx.db.cartItem.findMany({
        where: {
          cartId: user.cartId,
        },
      });

      if (!cartItems) throw new Error("Cart not found");

      // Verify whether product exist in cartItems or not
      const targetCartItem = cartItems.find(
        (cartItem) => cartItem.productId == productId,
      );

      let updatedCart;

      // If it exist, then decrement if after decrementing > 0, but
      // remove if after decrementing = 0
      if (!targetCartItem)
        throw new Error(`Product ${productId} not found in cart`);

      if (targetCartItem.quantity - 1 > 0) {
        // After decrementing quantity > 0, therefore decrement the `quantity`
        updatedCart = await ctx.db.cartItem.update({
          where: {
            id: targetCartItem.id,
            cartId: user.cartId,
            productId: productId,
          },
          data: {
            quantity: targetCartItem.quantity - 1,
          },
        });
      } else {
        updatedCart = await ctx.db.cartItem.delete({
          where: {
            id: targetCartItem.id,
            cartId: user.cartId,
            productId: productId,
          },
        });
      }

      if (!updatedCart) throw new Error("Cart cannot be updated");

      return updatedCart;
    }),
});
