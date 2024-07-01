import { api } from "@/trpc/server";
import ProductCard from "../product/_components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Mail, Twitter } from "lucide-react";

export default async function HomePage() {
  const newestProducts = await api.product.getLatestProduct({ limit: 8 });

  return (
    <div>
      <div className="mb-[2rem] flex h-[calc(60vh-90px-4rem)] w-full">
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=1806&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="home"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 h-full w-full bg-black opacity-10"></div>
          <div className="absolute bottom-0 right-[100px] top-0 z-10 flex flex-col items-end justify-center text-white ">
            <h1 className="mb-2 text-right text-3xl font-semibold">ESSENTIA</h1>
            <p className="text-xl">
              Number <span className="font-semibold">#1</span> Trusted Furniture
              E-commerce in Australia
            </p>

            <Link href={"/product"}>
              <Button variant="outline" className="mt-5 bg-transparent">
                Browse Product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div id="about-us" className="mb-[2rem] flex h-[calc(60vh-90px-4rem)] w-full">
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="home"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 h-full w-full bg-black opacity-10"></div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white ">
            <h1 className="text-3xl text-center px-[250px]">
              “At Essentia, we embrace simplicity to elevate your everyday living with thoughtfully designed, timeless products that inspire and bring harmony to your space. Discover refined simplicity with Essentia”
            </h1>
          </div>
        </div>
      </div>

      <div className="mb-[2rem]  h-[calc(60vh-90px-4rem)]">
        <div className="grid h-full w-full grid-cols-2 gap-x-6">
          {newestProducts.slice(0, 2).map((product, index) => (
            <div key={product.id} className="relative h-full w-full bg-black">
              <Image
                src={product.imageURL}
                alt="home"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 h-full w-full bg-black opacity-30"></div>
              <div
                className={cn(
                  "absolute bottom-0 top-0 z-10 flex flex-col justify-center text-white",
                  index === 0
                    ? "left-[100px]"
                    : "right-[100px] items-end text-right",
                )}
              >
                <h1 className="mb-2 text-3xl font-semibold">{product.name}</h1>
                <p className="text-xl"></p>

                <Link href={`/product/${product.id}`}>
                  <Button variant="outline" className="mt-5 bg-transparent">
                    Browse Product
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-[8rem] flex w-full flex-col gap-y-10">
        <h1 className="text-3xl font-semibold">Our Latest Product</h1>
        <div className="grid h-full w-full grid-cols-4 gap-x-6">
          {newestProducts.map((product, index) => (
            <div key={product.id} className="relative ">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className="h-[calc(25vh-90px-4rem)]  bg-gray-800 text-gray-100">
        <div className="grid grid-cols-4 items-center justify-center w-full h-full">
          <div className="flex gap-x-2 items-center justify-center">
            <Instagram /> Essentia.au
          </div>

          <div className="flex gap-x-2 items-center justify-center">
            <Twitter /> Essentia.au
          </div>
          <div className="flex gap-x-2 items-center justify-center">
            <Facebook /> Essentia.au
          </div>

          <div className="flex gap-x-2 items-center justify-center">
            <Mail /> essentia@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}
