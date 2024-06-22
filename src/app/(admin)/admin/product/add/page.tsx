import React from "react";
import CreateProductForm from "./_components/CreateProductForm";
import { api } from "@/trpc/server";

const AddProductPage = async () => {
  const categories = await api.category.getAllCategory();

  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-2xl font-bold">Create Product</h1>
      <CreateProductForm categoryList={categories} />
    </div>
  );
};

export default AddProductPage;
