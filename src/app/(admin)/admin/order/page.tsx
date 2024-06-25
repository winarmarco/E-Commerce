import { api } from "@/trpc/server";
import OrderTableHeader from "@/components/page-components/order-table/order_table_header";
import { DataTable } from "@/components/page-components/order-table/order_table";
import { columns } from "@/components/page-components/order-table/columns";

const OrderPage = async () => {
  const allOrder = await api.order.getAllOrder();

  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-2xl font-bold">Order</h1>
      <div className="flex flex-col">
        <OrderTableHeader />

        <div className="border rounded-sm mt-4">
          <DataTable columns={columns} data={allOrder} />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
