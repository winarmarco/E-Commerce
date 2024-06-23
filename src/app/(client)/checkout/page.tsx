import { api } from "@/trpc/server";
import { OrderCheckout } from "./_components/OrderCheckout";

export default async function CheckoutPage() {
  const cartItems = await api.cart.getCart();

  return (
    <div className="sticky top-[calc(90px+2rem)]">
      <h1 className="py-8 text-3xl font-semibold">Checkout</h1>
      <OrderCheckout cartItems={cartItems} />
    </div>
  );
}
