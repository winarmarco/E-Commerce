import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { generateProductCode } from "@/lib/utils";

export const productRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createProduct: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, { message: "Product name is required" }),
        description: z
          .string()
          .min(1, { message: "Product Description is required" }),
        price: z.coerce
          .number()
          .min(0.01, { message: "Price should be positive number" }),
        categoryId: z.string().min(1, { message: "Category is required" }),
        imageURL: z.string().min(1, { message: "Image is required" }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newProduct = await ctx.db.product.create({
        data: {
          ...input,
          productCode: generateProductCode(),
        },
      });

      return newProduct;
    }),

  getAllProduct: publicProcedure.query(async ({ ctx }) => {
    const allProduct = await ctx.db.product.findMany({
      include: {
        category: true,
      },
    });

    return allProduct;
  }),

  queryProduct: publicProcedure
    .input(
      z.object({
        query: z.string(),
        categoryFilter: z.optional(z.array(z.string())),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { query, categoryFilter } = input;
      let filteredProducts;
      if (categoryFilter && categoryFilter.length > 0) {
        if (query.length > 0) {
          filteredProducts = await ctx.db.product.findMany({
            where: {
              AND: [
                {
                  OR: [
                    {
                      name: {
                        contains: query,
                      },
                    },
                    {
                      description: {
                        contains: query,
                      },
                    },
                  ],
                },
                {
                  category: {
                    categoryName: {
                      in: categoryFilter,
                    },
                  },
                },
              ],
            },
            include: {
              category: true,
            },
          });
        } else {
          filteredProducts = await ctx.db.product.findMany({
            where: {
              category: {
                categoryName: {
                  in: categoryFilter,
                },
              },
            },
            include: {
              category: true,
            },
          });
        }
      } else {
        filteredProducts = await ctx.db.product.findMany({
          include: {
            category: true,
          },
        });
      }

      return filteredProducts;
    }),

  getProduct: publicProcedure
    .input(
      z.object({
        productId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { productId } = input;

      const product = await ctx.db.product.findFirst({
        where: {
          id: productId,
        },
        include: {
          category: true,
        },
      });

      return product;
    }),
});
