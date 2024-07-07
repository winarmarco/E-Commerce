import { Separator } from "@/components/ui/separator";
import { type AppRouter } from "@/server/api/root";
import { type inferRouterOutputs } from "@trpc/server";
import React from "react";

const OrderSummary: React.FC<{
  orderItems: inferRouterOutputs<AppRouter>["order"]["getOrder"]["orderItems"];
}> = ({ orderItems }) => {
  const total = orderItems.reduce(
    (total, item) => (total += item.productPrice * item.quantity),
    0,
  );
  return (
    <div className="h-max max-w-[700px] border px-4 py-8">
      <h2 className="text-xl font-semibold">Order Summary</h2>
      <div className="mt-4">
        <div className="flex flex-col gap-y-2">
          {orderItems.map((orderItem) => (
            <div
              key={orderItem.id}
              className="grid grid-cols-[2fr_1fr_1fr] gap-x-2"
            >
              <h2>{orderItem.productName}</h2>
              <h2 className="text-end">{orderItem.quantity} x </h2>
              <h2 className="mr-5 text-end">
                $ {orderItem.productPrice}
              </h2>
            </div>
          ))}
        </div>
        <Separator className="my-2" />

        <div className="grid grid-cols-[3fr_1fr] gap-x-2">
          <h2>TOTAL</h2>
          <h2 className="mr-5 text-end">$ {total}</h2>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
