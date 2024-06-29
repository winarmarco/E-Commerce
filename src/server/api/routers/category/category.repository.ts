import { db } from "@/server/db";

export const createCategory = async ({
  categoryName,
}: {
  categoryName: string;
}) => {
  const newCategory = await db.category.create({
    data: { categoryName },
  });

  return newCategory;
};

export const getCategories = async () => {
  const categories = await db.category.findMany();

  return categories;
};
