import { createCategory, getCategories } from "./category.repository";

export const createNewCategory = async ({
  categoryName,
}: {
  categoryName: string;
}) => {
  const newCategory = await createCategory({ categoryName });
  return newCategory;
};

export const fetchAllCategory = async () => {
  const categories = await getCategories();
  return categories;
};
