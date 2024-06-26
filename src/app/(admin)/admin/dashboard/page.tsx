import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { OrderTable } from "@/components/page-components/order-table/OrderTable";
import { api } from "@/trpc/server";
import BarChart from "./_components/BarChart";
import { aggregateSalesData } from "@/lib/utils";
import { CreditCard, DollarSign } from "lucide-react";

const Overview = async () => {
  const allOrder = await api.order.getAllOrder();
  const statisticData = aggregateSalesData(allOrder, "dd MMM yyyy");
  const totalRevenue = allOrder.reduce((total, order) => {
    total += order.orderItems.reduce(
      (sum, orderItem) => (sum += orderItem.productPrice * orderItem.quantity),
      0,
    );
    return total;
  }, 0);

  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex justify-between">
              <span>Revenue</span>
              <DollarSign className="h-4 w-4" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl font-bold">$ {totalRevenue}</h1>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex justify-between">
              <span>Total Sales</span>
              <CreditCard className="h-4 w-4" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl font-bold">{allOrder.length}</h1>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardDescription>Monthly sales overview</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={statisticData} />
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardDescription>Recent Order</CardDescription>
          </CardHeader>

          <div className="flex flex-col p-4">
            
            <OrderTable data={allOrder} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
