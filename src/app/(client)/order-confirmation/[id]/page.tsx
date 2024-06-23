import { api } from "@/trpc/server";
import Link from "next/link";
import React from "react";

const OrderConfirmation: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const { id: orderId } = params;
  const order = await api.order.getOrder({ id: orderId });
  
  return (
    <div className="flex h-[calc(100vh-90px-4rem)] flex-col justify-center text-center">
      {!order && <p>Order not found :/</p>}
      {order && (
        <>
          <h1 className="text-3xl">Thank you for your order!</h1>
          <p className="mt-4">
            Your order ID is: <strong>#{order.orderCode}</strong>
          </p>
          <p>
            We are currently processing your order and will notify you when it
            has been shipped.
          </p>
          <p>
            You can expect to receive your order by{" "}
            {order.estimatedArrivalTime.toISOString().slice(0, 10)}.
          </p>

          <div className="mt-4">
            <Link href={"/"} className="underline">
              Return to Home
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderConfirmation;
