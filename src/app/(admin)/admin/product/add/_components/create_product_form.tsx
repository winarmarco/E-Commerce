"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Category, type Product } from "@prisma/client";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import toaster from "react-hot-toast";
import { toastError, toastSuccess } from "@/lib/utils";

type IAddProduct = Omit<Product, "id">;

const CreateProductSchema: z.ZodType<IAddProduct> = z.object({
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

const CreateProductForm: React.FC<{
  categoryList: Category[];
}> = ({ categoryList }) => {
  const { mutate: createProductAPI, isPending } =
    api.product.createProduct.useMutation({
      onSuccess: (data) => {
        toastSuccess("Successfully created product!");
      },
      onError: (error) => {
        toastError(error.message)
      }
    });

  const form = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      imageURL: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreateProductSchema>) {
    createProductAPI(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Product Name..."
                  {...field}
                  className="w-[256px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Price</FormLabel>
              <FormControl>
                <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                  <DollarSign className="h-4 w-4" />
                  <input
                    {...field}
                    type="number"
                    className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Category</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select Product Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryList.map((category) => {
                    return (
                      <SelectItem key={category.id} value={category.id}>
                        {category.categoryName}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className="w-[256px]" />
                {/* <Input {...field} type="file" className="w-[250px]" /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateProductForm;
