import { api } from "@/trpc/server";
import { ProductTable } from "./_components/product_table";

const Dashboard = async () => {
  const allProduct = await api.product.getAllProduct();

  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-2xl font-bold">Product</h1>
      <ProductTable data={allProduct} />
    </div>
  );
};

export default Dashboard;
