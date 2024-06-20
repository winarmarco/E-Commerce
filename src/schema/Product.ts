import { Product } from "@prisma/client";
import { z } from "zod";

type IAddProduct = Omit<Product, "id">;

export const CreateProductSchema: z.ZodType<IAddProduct> = z.object({
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
