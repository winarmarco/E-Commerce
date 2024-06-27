import { api } from "@/trpc/server";
import React from "react";
import Image from "next/image";
import { Edit, ZoomIn } from "lucide-react";
import ProductStatistic from "./_components/ProductStatistic";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProductDetails: React.FC<{
  params: { id: string };
}> = async ({ params }) => {
  const { id: productId } = params;
  const product = await api.product.getProduct({ productId });

  if (!product) return <div>Product not found :/</div>;

  return (
    <div className="flex flex-col gap-y-10">
      <h3 className="text-2xl font-bold">Product #{product.productCode}</h3>
      <div className="mb-2 flex flex-col gap-y-4">
        <div className="flex flex-col">
          <h3 className="text-sm text-slate-400">Name</h3>
          <p className="text-lg font-medium">{product.name}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm text-slate-400">Price</h3>
          <p className="text-lg font-medium">$ {product.price}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm text-slate-400">Description</h3>
          <p className="text-lg font-medium">{product.description}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm text-slate-400">Category</h3>
          <p className="text-lg font-medium">{product.category.categoryName}</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm text-slate-400">Image</h3>
          <div className="group relative h-[128px] w-[128px] overflow-clip rounded-md bg-muted">
            <Image
              src={product.imageURL}
              alt={product.imageURL}
              fill
              className="z-0 rounded-md object-cover transition-transform"
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center opacity-0 transition-opacity group-hover:opacity-100">
              <ZoomIn className="text-white" />
              <div className="absolute inset-0 -z-10 bg-black opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-2 flex flex-col gap-y-4">
        <h3 className="col-span-2 mb-2 text-2xl font-semibold">Statistics</h3>
        <ProductStatistic productId={productId} />
      </div>

      <div className="mb-2 flex flex-col">
        <Link href={`/admin/product/${productId}/edit`}>
          <Button>Edit Product<Edit className="h-4 w-4 ml-2"/></Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
