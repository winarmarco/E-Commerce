import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import OrderTableHeader from "./_components/order_table_header";
import { DataTable } from "./_components/order_table";
import { columns } from "./_components/columns";
import { api } from "@/trpc/server";
import BarChart from "./_components/BarChart";
import { aggregateSalesData } from "@/lib/utils";

const Overview = async () => {
  const allOrder = await api.order.getAllOrder();
  const statisticData = aggregateSalesData(allOrder, "dd MMM yyyy");
  console.log(statisticData);
  // const data = [
  //   { "date": "2023-01-01", "value": 200 },
  //   { "date": "2023-01-02", "value": 180 },
  //   { "date": "2023-01-03", "value": 210 },
  //   // Continue with similar entries for each day of January
  //   { "date": "2023-02-01", "value": 220 },
  //   { "date": "2023-02-02", "value": 230 },
  //   // Continue for February and the rest of the months
  //   { "date": "2023-12-30", "value": 150 },
  //   { "date": "2023-12-01", "value": 190 }
  // ]

  

  // const dates = data.map((d) => (d.date))
  // const values = data.map((d) => (d.value))

  
  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl font-bold">$ 10.000</h1>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <h1 className="text-3xl font-bold">$ 10.000</h1>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardDescription>Monthly sales overview</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={statisticData}/>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardDescription>Recent Order</CardDescription>
          </CardHeader>

          <div className="flex flex-col p-4">
            <OrderTableHeader />
            <DataTable columns={columns} data={allOrder} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
