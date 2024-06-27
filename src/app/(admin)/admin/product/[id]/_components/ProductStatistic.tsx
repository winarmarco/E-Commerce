import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { api } from "@/trpc/server";
import { aggregateProductSalesData } from "@/lib/utils";
import ProductSalesBarChart from "./ProductSalesBarChart";

const ProductStatistic: React.FC<{
  productId: string
}> = async ({ productId }) => {
  const orderWithProduct = await api.order.getOrderWithProduct({
    productId: productId,
  });

  const totalOrder = orderWithProduct.length;
  const totalSold = orderWithProduct.reduce((total, order) => {
    const item = order.orderItems.find((orderItem) => orderItem.productRef === productId);
    const productQty = item ? item.quantity : 0;
    return total += productQty;
  }, 0);
  const salesPerDate = aggregateProductSalesData(orderWithProduct, productId, "dd MMM yyyy");


  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription className="flex justify-between">
            <span>Total Sold</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-bold">{totalSold}</h1>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription className="flex justify-between">
            <span>Total Order</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-bold">{totalOrder}</h1>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader className="pb-2">
          <CardDescription className="flex justify-between">
            <span>Monthly overview</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductSalesBarChart data={salesPerDate} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductStatistic;
