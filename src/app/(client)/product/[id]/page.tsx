import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import Image from "next/image";
import React from "react";
import CartButton from "./_components/CartButton";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";

const page: React.FC<{
  params: { id: string };
}> = async ({ params }) => {
  const product = await api.product.getProduct({ productId: params.id });

  if (!product) return <h1>Product not found :/</h1>;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <>
      <div className="flex flex-row gap-x-8 bg-white">
        <div className="sticky top-[150px] h-[80vh] flex-1 flex-col">
          <div className="h-full">
            <Image
              src={product.imageURL}
              alt="image"
              layout="fill"
              objectFit="cover"
              objectPosition="right"
            />
          </div>
        </div>
        <div className="top-[150px] flex-1 flex-col">
          <div className="sticky top-0 bg-white pb-5 pt-[150px]">
            <h2 className="z-10 text-3xl">{product.name}</h2>
            <Separator className="w-full " />
          </div>
          <div className="">{product.description}</div>
          <p className="pt-5">
            Price: <span className="font-semibold">{formattedPrice}</span>
          </p>
          <div className="pt-8">
            <CartButton productId={product.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
