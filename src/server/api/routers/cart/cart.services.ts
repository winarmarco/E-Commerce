import { fetchUser } from "../user/user.services";
import {
  createCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity,
} from "./cart.repository";

/**
 * Retrieves cart items for a given user.
 * @param {string} userId - The ID of the user whose cart items are to be retrieved.
 * @returns {Promise<CartItem[]>} A promise that resolves to an array of cart items.
 */
export const fetchCartItems = async ({ userId }: { userId: string }) => {
  const user = await fetchUser({ id: userId });

  const cartItems = await getCartItems({ cartId: user.cartId });
  return cartItems;
};

/**
 * Adds an item to a user's cart or increments its quantity if it already exists.
 * @param {string} userId - The ID of the user.
 * @param {string} productId - The ID of the product to add to the cart.
 * @returns {Promise<CartItem>} A promise that resolves to the updated cart item.
 */
export const addItemsToCart = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  const user = await fetchUser({ id: userId });
  const cartItems = await fetchCartItems({ userId });

  // Search for cartItem with that have productId
  const targetCartItem = cartItems.find(
    (cartItem) => cartItem.productId === productId,
  );

  let updatedCartItem;

  // Check if the product is already in the cart and update quantity
  if (targetCartItem) {
    const { id, quantity } = targetCartItem;
    updatedCartItem = await updateCartItemQuantity({
      id,
      quantity: quantity + 1,
    });
  } else {
    // If not in the cart, create a new cart item
    updatedCartItem = await createCartItem({ cartId: user.cartId, productId });
  }

  return updatedCartItem;
};

/**
 * Removes an item from a user's cart or decrements its quantity if more than one.
 * @param {string} userId - The ID of the user.
 * @param {string} productId - The ID of the product to remove.
 * @returns {Promise<CartItem | void>} A promise that resolves to the updated or deleted cart item.
 */
export const removeItemFromCart = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  const cartItems = await fetchCartItems({ userId });
  // Search for cartItem with that have productId
  const targetCartItem = cartItems.find(
    (cartItem) => cartItem.productId === productId,
  );

  if (!targetCartItem) throw Error("Item does not exist in the cart");

  let updatedCartItem;
  const { id, quantity } = targetCartItem;
  // Decrement quantity or remove the item from the cart if quantity would drop to zero
  if (quantity - 1 > 0) {
    updatedCartItem = await updateCartItemQuantity({
      id,
      quantity: quantity - 1,
    });
  } else {
    updatedCartItem = await deleteCartItem({ id });
  }

  return updatedCartItem;
};
