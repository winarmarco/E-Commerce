import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { cartRouter } from "./routers/cart/cart.controller";
import { categoryRouter } from "./routers/category/category.controller";
import { orderRouter } from "./routers/order/order.controller";
import { productRouter } from "./routers/product/product.controller";
import { userRouter } from "./routers/user/user.controller";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  user: userRouter,
  category: categoryRouter,
  cart: cartRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 */
export const createCaller = createCallerFactory(appRouter);
