"use client";

import { Button } from "@/components/ui/button";
import { toastSuccess } from "@/lib/utils";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { type CartItem } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CartButton: React.FC<{
  productId: string;
  cart: CartItem[];
}> = ({ cart, productId }) => {
  const product = cart.find((cart) => cart.productId === productId);
  const session = useSession();
  const router = useRouter();
  const { mutate: addToCartAPI, isPending: isAddingToCart } = api.cart.addToCart.useMutation({
    onSuccess: async (data) => {
      toastSuccess(`Added item from cart!`);
      router.refresh();
    },
  });

  const { mutate: removeFromCartAPI, isPending: isRemovingFromCart } =
    api.cart.removeFromCart.useMutation({
      onSuccess: async (data) => {
        toastSuccess(`Removed item from cart!`);
        router.refresh();
      },
    });

  return (
    <>
      {!session && <Button>HELLO</Button>}
      {!product ? (
        <Button
          onClick={() => {
            addToCartAPI({ productId: productId });
          }}
        >
          Add to Cart +
        </Button>
      ) : (
        <div className="flex flex-row items-center gap-x-5">
          <Button
            onClick={() => {
              removeFromCartAPI({ productId });
            }}
            variant="outline"
            disabled={isRemovingFromCart}
          >
            -
          </Button>
          <p>{product?.quantity}</p>
          <Button
            onClick={() => {
              addToCartAPI({ productId });
            }}
            variant="outline"
            disabled={isAddingToCart}
          >
            +
          </Button>
        </div>
      )}
    </>
  );
};

export default CartButton;
