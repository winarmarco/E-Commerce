import { OrderStatus, type ShippingAddress } from "@prisma/client";
import {
  createOrder,
  getOrderById,
  getOrderByProductId,
  getOrderWithQuery,
  getOrders,
  updateOrderStatus,
} from "./order.repository";
import { fetchUser } from "../user/user.services";
import { fetchCartItems } from "../cart/cart.services";

/**
 * Creates an order from a user's cart.
 * @param {Object} params - Parameters for creating an order, including user and shipping details.
 * @param {string} params.userId - The ID of the user placing the order.
 * @param {string} params.firstName - The first name of the user.
 * @param {string} params.lastName - The last name of the user.
 * @param {string} params.email - The email address of the user.
 * @param {string} params.phoneNumber - The phone number of the user.
 * @param {Omit<ShippingAddress, "id">} params.shippingAddress - The shipping address, excluding the address ID.
 * @returns {Promise<Object>} A promise that resolves to the newly created order.
 */
export const createOrderFromUser = async ({
  userId,
  firstName,
  lastName,
  email,
  phoneNumber,
  shippingAddress,
}: {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  shippingAddress: Omit<ShippingAddress, "id">;
}) => {
  const user = await fetchUser({ id: userId });
  const userCartItems = await fetchCartItems({ userId });

  if (!userCartItems || userCartItems.length === 0)
    throw new Error("Cart is empty!");

  const newOrder = await createOrder({
    userId,
    cartId: user.cartId,
    firstName,
    lastName,
    email,
    phoneNumber,
    shippingAddress,
    cartItems: userCartItems,
  });

  return newOrder;
};

/**
 * Fetches all existing orders.
 * @returns {Promise<Array>} A promise that resolves to an array of all orders.
 */
export const getAllOrder = async () => {
  const orders = await getOrders();
  return orders;
};

/**
 * Fetch a specific order by its ID, ensuring it belongs to the specified user.
 * @param {string} userId - The user ID to validate against the order.
 * @param {string} orderId - The ID of the order to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the order if the user is authorized to access it.
 */
export const fetchOrderById = async ({
  userId,
  orderId,
}: {
  userId: string;
  orderId: string;
}) => {
  const order = await getOrderById({ id: orderId });

  if (order.authorId !== userId) throw new Error("Unauthorized");

  return order;
};

/**
 * Retrieves orders containing a specific product.
 * @param {string} productId - The ID of the product to find in orders.
 * @returns {Promise<Array>} A promise that resolves to an array of orders containing the specified product.
 */
export const fetchOrderByProductId = async ({
  productId,
}: {
  productId: string;
}) => {
  const ordersWithProduct = await getOrderByProductId({ productId });
  return ordersWithProduct;
};

/**
 * Executes a query to filter orders based on a provided string.
 * @param {string} query - The query string used to filter orders.
 * @returns {Promise<Array>} A promise that resolves to an array of orders matching the query.
 */
export const queryOrder = async ({ query }: { query: string }) => {
  const orders = await getOrderWithQuery({ query });
  return orders;
};

/**
 * Marks an order as completed.
 * @param {string} orderId - The ID of the order to update.
 * @returns {Promise<Object>} A promise that resolves to the updated order marked as completed.
 */
export const markAsCompleted = async ({ orderId }: { orderId: string }) => {
  await getOrderById({ id: orderId }); // Validate order exists

  const updatedOrder = await updateOrderStatus({
    id: orderId,
    status: OrderStatus.COMPLETED,
  });

  return updatedOrder;
};
