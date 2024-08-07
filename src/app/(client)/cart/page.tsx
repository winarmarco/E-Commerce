"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { toastSuccess } from "@/lib/utils";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const router = useRouter();
  const session = useSession();
  const utils = api.useUtils();
  const { data: cartItems, isPending } = api.cart.getCart.useQuery();
  const { mutate: addToCartAPI, isPending: isAddingToCart } =
    api.cart.addToCart.useMutation({
      onSuccess: async () => {
        toastSuccess(`Added item from cart!`);
        await utils.cart.getCart.invalidate();
      },
    });

  const { mutate: removeFromCartAPI, isPending: isRemovingFromCart } =
    api.cart.removeFromCart.useMutation({
      onSuccess: async () => {
        toastSuccess(`Removed item from cart!`);
        router.refresh();
        await utils.cart.getCart.invalidate();
      },
    });

  const total = cartItems?.reduce((total, cartItem) => {
    return total + cartItem.product.price * cartItem.quantity;
  }, 0);

  if (session.status === "unauthenticated") return redirect("/");

  return (
    <div className="sticky top-[calc(90px+2rem)]">
      <h1 className="py-8 text-3xl font-semibold">My Cart</h1>

      <div className="mb-4 grid w-full max-w-[90rem] grid-cols-[2fr_1fr_1fr] items-start gap-6 px-5">
        <p>Product</p>
        <p className="text-center">Price</p>
        <p className="mr-10 text-end">Quantity</p>
      </div>
      <Separator />
      <div className="my-4 flex flex-1 flex-col gap-y-4">
        {isPending && (
          <p className="flex w-full justify-center gap-x-2 text-center text-slate-400">
            Getting User Cart...
            <Loader2 className="animate-spin" />
          </p>
        )}

        {!isPending && (!cartItems || cartItems.length == 0) && (
          <p className="flex w-full justify-center gap-x-2 py-10 text-center text-slate-400">
            Cart is empty :/
          </p>
        )}
        {!isPending &&
          cartItems?.map((cartItem) => (
            <div
              key={cartItem.id}
              className="mb-4 grid w-full max-w-[90rem] grid-cols-[2fr_1fr_1fr] items-center gap-6 px-5"
            >
              <div className="flex flex-row items-center gap-x-20">
                <div className="relative h-[128px] w-[128px] overflow-hidden rounded-sm">
                  <Image
                    src={cartItem.product.imageURL}
                    alt="image"
                    className="h-full w-full object-cover object-center"
                    width={0}
                    height={0}
                    layout="fill"
                  />
                </div>
                <div>
                  <p>{cartItem.product.name}</p>
                  <p className="text-slate-300">{cartItem.product.category.categoryName}</p>
                </div>
              </div>
              <p className="text-center">$ {cartItem.product.price}</p>

              <div className="flex flex-row items-center justify-end  gap-x-5">
                <Button
                  onClick={() => {
                    removeFromCartAPI({ productId: cartItem.productId });
                  }}
                  variant="outline"
                  disabled={isRemovingFromCart}
                >
                  -
                </Button>
                <p>{cartItem.quantity}</p>
                <Button
                  onClick={() => {
                    addToCartAPI({ productId: cartItem.productId });
                  }}
                  variant="outline"
                  disabled={isAddingToCart}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
      </div>

      <Separator />
      <div className="my-8 grid w-full max-w-[90rem] grid-cols-[3fr_1fr] justify-end gap-6 px-5">
        <p className="mr-5 text-right">SUBTOTAL</p>
        <p className="mr-5 text-right text-xl font-bold">$ {total ?? "-"}</p>
      </div>

      <div className="my-4 mt-10 flex  w-full max-w-[90rem] justify-end gap-6 px-5">
        <Link href="/checkout">
          <Button >
            Proceed to checkout <ArrowRightIcon className="ml-2" />{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
}
