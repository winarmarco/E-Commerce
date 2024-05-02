import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createCategory: protectedProcedure
    .input(
      z.object({
        categoryName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newCategory = await ctx.db.category.create({
        data: {
          categoryName: input.categoryName,
        },
      });

      return newCategory;
    }),

  getAllCategory: protectedProcedure.query(async ({ ctx }) => {
    const allCategory = await ctx.db.category.findMany();

    return allCategory;
  }),
});
