import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createNewCategory, fetchAllCategory } from "./category.services";

export const categoryRouter = createTRPCRouter({
  createCategory: adminProcedure
    .input(
      z.object({
        categoryName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { categoryName } = input;
      const newCategory = await createNewCategory({ categoryName });

      return newCategory;
    }),

  getAllCategory: protectedProcedure.query(async ({ ctx }) => {
    const allCategory = await fetchAllCategory();
    return allCategory;
  }),
});
