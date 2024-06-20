import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import Image from "next/image";
import React from "react";
import CartButton from "./_components/CartButton";

const page: React.FC<{
  params: { id: string };
}> = async ({ params }) => {
  const product = await api.product.getProduct({ productId: params.id });
  const userCart = await api.cart.getCart();
  if (!product) return <h1>Product not found :/</h1>;

  return (
    <>
      <div className="flex flex-row gap-x-8 bg-white">
        <div className="sticky top-[150px] h-[80vh] flex-1 flex-col">
          <div className="h-full">
            <Image
              src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              layout="fill"
              objectFit="cover"
              objectPosition="right"
            />
          </div>
        </div>
        <div className="top-[150px] flex-1 flex-col">
          <div className="sticky top-0 bg-white pb-5 pt-[150px]">
            <h2 className="z-10 text-3xl">Item</h2>
            <Separator className="w-full " />
          </div>
          <div className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            excepturi quo corrupti vitae ipsa, error magni sunt nisi perferendis
            minima ipsum ea dolores velit voluptate debitis non quam,
            perspiciatis sint! Repellat ab dolorem culpa quis quidem iusto ullam
            dignissimos mollitia ipsa, molestiae doloremque natus hic doloribus
            eligendi adipisci harum, aliquam illum iure magnam minima.
            Perferendis cupiditate necessitatibus reiciendis facere dolorem.
            Fugit commodi ex amet cumque, error eos repellat velit qui cum sunt
          </div>
          <p className="pt-5">Price: <span className="font-semibold">$20.00</span></p>
          <div className="pt-8">
            <CartButton cart={userCart} productId={product.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
