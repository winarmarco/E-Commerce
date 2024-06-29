"use client";
import { api } from "@/trpc/react";
import { OrderCheckout } from "./_components/OrderCheckout";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { data: cartItems, isLoading } = api.cart.getCart.useQuery();

  return (
    <div className="sticky top-[calc(90px+2rem)]">
      <h1 className="py-8 text-3xl font-semibold">Checkout</h1>
      {isLoading && <Loader2 className="animate-spin text-slate-400" />}
      {cartItems && <OrderCheckout cartItems={cartItems} />}
    </div>
  );
}
