import { db } from "@/server/db";

export const getCartItems = async ({ cartId }: { cartId: string }) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId,
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
};

export const updateCartItemQuantity = async ({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}) => {
  const updatedCartItem = await db.cartItem.update({
    where: { id },
    data: {
      quantity,
    },
  });

  return updatedCartItem;
};

export const createCartItem = async ({
  cartId,
  productId,
}: {
  cartId: string;
  productId: string;
}) => {
  const newCartItem = await db.cartItem.create({
    data: {
      cartId,
      productId,
      quantity: 1,
    },
  });

  return newCartItem;
};

export const deleteCartItem = async ({ id }: { id: string }) => {
  const deletedCartItem = await db.cartItem.delete({
    where: { id },
  });

  return deletedCartItem;
};
