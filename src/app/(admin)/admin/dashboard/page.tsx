import { api } from "@/trpc/server";
import { DataTable } from "./_components/product_table";
import { columns } from "./_components/columns";
import ProductTableHeader from "./_components/product_table_header";

const Dashboard = async () => {
  const allCategories = await api.category.getAllCategory();
  const allProduct = await api.product.getAllProduct();

  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-2xl font-bold">Product</h1>
      <div className="flex flex-col gap-y-4">
        <ProductTableHeader categories={allCategories}/>
        <DataTable columns={columns} data={allProduct} />
      </div>
    </div>
  );
};

export default Dashboard;
