import { api } from "@/trpc/server";
import React from "react";
import EditProductForm from "./_components/EditProductForm";

const EditProduct: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const { id: productId } = params;
  const product = await api.product.getProduct({ productId });
  const categories = await api.category.getAllCategory();
  if (!product) return <h1>Product not found</h1>;
  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-2xl font-bold">Edit Product #{product.productCode}</h1>
      <EditProductForm product={product} categoryList={categories} />
    </div>
  );
};

export default EditProduct;
