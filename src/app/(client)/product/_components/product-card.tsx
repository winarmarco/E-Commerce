import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";

type ProductCardProps =
  inferRouterOutputs<AppRouter>["product"]["getAllProduct"][0];

const ProductCard: React.FC<{ product: ProductCardProps }> = ({ product }) => {
  return (
    <div className="flex w-full flex-col overflow-clip shadow-md">
      <AspectRatio
        ratio={3 / 4}
        className="group relative overflow-clip rounded-md bg-muted"
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center opacity-0 transition-opacity group-hover:opacity-100">
          <h1 className="font-semibold text-white text-4xl group-hover:opacity-100 opacity-0 duration-1000">{product.name}</h1>
          <Link href={`/product/${product.id}`} className="group-hover:opacity-100 opacity-0 duration-1000">
            <Button variant="link" className="text-slate-50 underline">View More</Button>
          </Link>
          <div className="absolute inset-0 -z-10 bg-black opacity-30"></div>
        </div>
        <Image
          src={product.imageURL}
          alt="Photo by Drew Beamer"
          fill
          className="z-0 rounded-md object-cover duration-700 transition-transform group-hover:scale-150"
        />
      </AspectRatio>
    </div>
  );
};

export default ProductCard;
