import { OrderStatus } from "@prisma/client";
import React from "react";


const OrderStatusBadge: React.FC<{status: OrderStatus}> = ({status}) => {
  const bgColor: string =
        status === OrderStatus.PENDING ? "bg-orange-400" : "bg-green-400";
  return (
    <div className={`w-min rounded-sm px-2 text-white ${bgColor}`}>{status}</div>
  );
};

export default OrderStatusBadge;
