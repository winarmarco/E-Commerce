import { api } from "@/trpc/server";
import React from "react";
import OrderDetailsGroup from "./_component/order-details";
import OrderSummary from "./_component/order-summary";
import { format } from "date-fns";
import OrderActions from "./_component/order-actions";
import OrderStatusBadge from "@/components/page-components/order-status-badge";

const OrderDetails: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const { id } = params;
  const order = await api.order.getOrder({ id });

  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-2xl font-bold">Order #{order.orderCode}</h1>
      <OrderDetailsGroup
        title="Contact Details"
        data={{
          "First Name": order.firstName,
          "Last Name": order.lastName,
          Email: order.email,
          "Phone Number": order.phoneNumber,
          Username: order.author.username,
        }}
      />
      <OrderDetailsGroup
        title="Shipping Address"
        data={{
          Country: order.shippingAddress.country,
          State: order.shippingAddress.state,
          "Post Code": order.shippingAddress.postCode,
          Street: order.shippingAddress.street,
        }}
      />
      <div className="flex flex-col gap-y-4">
        <OrderDetailsGroup
          title="Order Details"
          data={{
            "Ordered Date Time": format(
              order.orderDateTime,
              "dd MMM yyyy HH:MM",
            ),
            "Estimated Arrival Time": format(
              order.estimatedArrivalTime,
              "dd MMM yyyy HH:MM",
            ),
          }}
        />

        <div  className="flex flex-col mb-4">
          <h3 className="text-sm text-slate-400">Order Status</h3>
          <OrderStatusBadge status={order.status} />
        </div>

        <OrderSummary orderItems={order.orderItems} />
      </div>

      <OrderActions order={order} />
    </div>
  );
};

export default OrderDetails;
