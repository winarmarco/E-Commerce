import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import { createNewCategory, fetchAllCategory } from "./category.services";

export const categoryRouter = createTRPCRouter({
  createCategory: adminProcedure
    .input(
      z.object({
        categoryName: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { categoryName } = input;
      const newCategory = await createNewCategory({ categoryName });

      return newCategory;
    }),

  getAllCategory: publicProcedure.query(async ({}) => {
    const allCategory = await fetchAllCategory();
    return allCategory;
  }),
});
