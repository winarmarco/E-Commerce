import { OrderTable } from "@/components/page-components/order-table/OrderTable";
import { api } from "@/trpc/server";

const OrderPage = async () => {
  const allOrder = await api.order.getAllOrder();

  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-2xl font-bold">Order</h1>
      <div className="flex flex-col">
        <OrderTable data={allOrder} />
      </div>
    </div>
  );
};

export default OrderPage;
