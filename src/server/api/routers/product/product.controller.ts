import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import {
  createNewProduct,
  deleteProduct,
  fetchAllProduct,
  fetchNewestProduct,
  fetchProductById,
  queryProduct,
  updateProduct,
} from "./product.services";

/**
 * Defines the schema for creating a new product, including validations for each field.
 */
const CreateProductSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z
    .string()
    .min(1, { message: "Product Description is required" }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price should be positive number" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  imageURL: z.string().min(1, { message: "Image is required" }),
});

/**
 * Creates the product routes for the API, defining each endpoint's functionality and access control.
 */
export const productRouter = createTRPCRouter({
  createProduct: adminProcedure
    .input(CreateProductSchema)
    .mutation(async ({ input }) => {
      const newProduct = await createNewProduct({ ...input });
      return newProduct;
    }),

  editProduct: adminProcedure
    .input(
      CreateProductSchema.extend({
        productId: z.string().cuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const { productId, ...data } = input;
      const updatedProduct = await updateProduct({ id: productId, ...data });
      return updatedProduct;
    }),

  deleteProduct: adminProcedure
    .input(z.object({ productId: z.string().cuid() }))
    .mutation(async ({ input }) => {
      const { productId } = input;
      const deletedProduct = await deleteProduct({ productId });
      return deletedProduct;
    }),

  getAllProduct: publicProcedure.query(async ({}) => {
    const allProduct = await fetchAllProduct();
    return allProduct;
  }),

  getLatestProduct: publicProcedure
    .input(z.object({ limit: z.number() }))
    .query(async ({ input }) => {
      const { limit } = input;
      const newestProducts = fetchNewestProduct({ limit });
      return newestProducts;
    }),

  queryProduct: publicProcedure
    .input(
      z.object({
        query: z.string(),
        categoryFilter: z.optional(z.array(z.string())),
      }),
    )
    .mutation(async ({ input }) => {
      const { query, categoryFilter } = input;
      const filteredProducts = await queryProduct({ query, categoryFilter });
      return filteredProducts;
    }),

  getProduct: publicProcedure
    .input(
      z.object({
        productId: z.string().cuid(),
      }),
    )
    .query(async ({ input }) => {
      const { productId } = input;
      const product = await fetchProductById({ productId });
      return product;
    }),
});
