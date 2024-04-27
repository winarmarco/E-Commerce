import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductCard = () => {
  return (
    <div className="flex w-full flex-col overflow-clip shadow-md">
      <AspectRatio
        ratio={3 / 4}
        className="group relative overflow-clip rounded-md bg-muted"
      >
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <Link href={"/product"}>
            <Button variant="secondary">Product Name</Button>
          </Link>
          <div className="absolute inset-0 -z-10 bg-black opacity-30"></div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          fill
          className="z-0s rounded-md object-cover transition-transform group-hover:scale-150"
        />
      </AspectRatio>
      {/* <div className="">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Card title
        </h3>
        <p className="text-sm text-muted-foreground">Hello</p>
      </div> */}
    </div>
  );
};

export default ProductCard;
