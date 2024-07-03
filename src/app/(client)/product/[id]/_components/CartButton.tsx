"use client";

import { Button } from "@/components/ui/button";
import { toastSuccess } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CartButton: React.FC<{
  productId: string;
}> = ({ productId }) => {
  const {data: cart} = api.cart.getCart.useQuery();
  const productInCart = cart?.find((cart) => cart.productId === productId);
  const session = useSession();
  const router = useRouter();  
  const utils = api.useUtils();

  const { mutate: addToCartAPI, isPending: isAddingToCart } = api.cart.addToCart.useMutation({
    onSuccess: async () => {
      toastSuccess(`Added item from cart!`);
      await utils.cart.getCart.invalidate();
    },
  });

  const { mutate: removeFromCartAPI, isPending: isRemovingFromCart } =
    api.cart.removeFromCart.useMutation({
      onSuccess: async () => {
        toastSuccess(`Removed item from cart!`);
        await utils.cart.getCart.invalidate();
      },
    });

  return (
    <>
      {!productInCart ? (
        <Button
          onClick={() => {
            if (session.status === "authenticated") return addToCartAPI({ productId: productId });
            return router.push("/sign-in");
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
          <p>{productInCart?.quantity}</p>
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
