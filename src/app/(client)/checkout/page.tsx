import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import CheckoutForm from "./_components/CheckoutForm";

export default async function CheckoutPage() {
  const cartItems = await api.cart.getCart();

  const total = cartItems?.reduce(
    (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
    0,
  );

  return (
    <div className="sticky top-[calc(90px+2rem)]">
      <h1 className="py-8 text-3xl font-semibold">Checkout</h1>

      <div className="grid grid-cols-[2fr_1fr] gap-x-8">
        <div className="flex flex-col">
            <CheckoutForm />
        </div>

        <div className="border px-4 py-8">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-4">
            <div className="flex flex-col gap-y-2">
              {cartItems.map((cartItem) => (
                <div
                  key={cartItem.productId}
                  className="grid grid-cols-[3fr_1fr_1fr] gap-x-2"
                >
                  <h2>{cartItem.product.name}</h2>
                  <h2 className="text-end">{cartItem.quantity} x </h2>
                  <h2 className="mr-5 text-end">$ {cartItem.product.price}</h2>
                </div>
              ))}
            </div>
            <Separator className="my-2" />

            <div className="grid grid-cols-[4fr_1fr] gap-x-2">
              <h2>TOTAL</h2>
              <h2 className="mr-5 text-end">$ {total}</h2>
            </div>
            <Button className="mt-5 w-full">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
