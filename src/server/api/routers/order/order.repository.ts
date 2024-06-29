import {
  generateOrderCode,
  getTodayAtMidnight,
  getTomorrowDate,
} from "@/lib/utils";
import { db } from "@/server/db";
import {
  CartItem,
  OrderItem,
  OrderStatus,
  Product,
  ShippingAddress,
} from "@prisma/client";

/**
 * Retrieves all orders with their related order items.
 * @returns {Promise<Array>} A promise that resolves to an array of orders.
 */
export const getOrders = async () => {
  const orders = await db.order.findMany({
    include: {
      orderItems: true,
    },
  });

  return orders;
};

/**
 * Retrieves a specific order by ID including shipping address, author, and order items details.
 * @param {string} id - The ID of the order to fetch.
 * @returns {Promise<Object>} A promise that resolves to the order object if found, otherwise throws an error.
 */
export const getOrderById = async ({ id }: { id: string }) => {
  const order = await db.order.findFirst({
    where: { id },
    include: {
      shippingAddress: true,
      author: true,
      orderItems: true,
    },
  });

  if (!order) throw new Error(`Order with id ${id} not found!`);

  return order;
};

/**
 * Retrieves orders that contain a specific product, including details of shipping address, author, and order items.
 * @param {string} productId - The product ID to search for in orders.
 * @returns {Promise<Array>} A promise that resolves to an array of orders containing the specified product.
 */
export const getOrderByProductId = async ({
  productId,
}: {
  productId: string;
}) => {
  const ordersWithProduct = await db.order.findMany({
    where: {
      orderItems: {
        some: {
          productRef: productId,
        },
      },
    },
    include: {
      shippingAddress: true,
      author: true,
      orderItems: true,
    },
  });

  return ordersWithProduct;
};

/**
 * Executes a query to find orders based on various criteria such as ID, first name, last name, order code, or status.
 * @param {string} query - The query string to use for filtering orders.
 * @returns {Promise<Array>} A promise that resolves to an array of orders that match the query criteria.
 */
export const getOrderWithQuery = async ({ query }: { query: string }) => {
  const orders = db.order.findMany({
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
};

/**
 * Updates the status of an existing order.
 * @param {string} id - The ID of the order to update.
 * @param {OrderStatus} status - The new status to set for the order.
 * @returns {Promise<Object>} A promise that resolves to the updated order.
 */
export const updateOrderStatus = async ({
  id,
  status,
}: {
  id: string;
  status: OrderStatus;
}) => {
  const updatedOrder = await db.order.update({
    where: { id },
    data: {
      status,
    },
  });

  return updatedOrder;
};

/**
 * Creates a new order with associated items, shipping address, and deletes the cart items after order completion.
 * @param {Object} params - The parameters required to create a new order, including user and cart details.
 * @returns {Promise<Object>} A promise that resolves to the newly created order.
 */
export const createOrder = ({
  userId,
  cartId,
  cartItems,
  firstName,
  lastName,
  email,
  phoneNumber,
  shippingAddress,
}: {
  userId: string;
  cartId: string;
  cartItems: (CartItem & { product: Product })[];
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  shippingAddress: Omit<ShippingAddress, "id">;
}) => {
  const newOrder = db.$transaction(async (prisma) => {
    const todayMidnight = getTodayAtMidnight();
    const currDate = new Date();

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
        orderCode: generateOrderCode(todayExistingOrder.length + 1, currDate),
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

    const orderItems: Omit<OrderItem, "id">[] = cartItems.map((cartItem) => ({
      orderId: order.id,
      productName: cartItem.product.name,
      productPrice: cartItem.product.price,
      quantity: cartItem.quantity,
      productRef: cartItem.product.id,
    }));

    await prisma.orderItem.createMany({
      data: orderItems,
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: cartId },
    });

    return order;
  });

  return newOrder;
};
