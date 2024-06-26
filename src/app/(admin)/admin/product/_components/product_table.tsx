"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import { api } from "@/trpc/react";
import { useDebounce } from "use-debounce";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";
import { columns } from "./columns";
import { DataTable } from "@/components/page-components/data-table/DataTable";
import CategoryPopover from "./CategoryPopover";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const ProductTable: React.FC<{
  data: inferRouterOutputs<AppRouter>["product"]["getAllProduct"];
}> = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [query] = useDebounce(searchInput, 1000);
  const {
    mutate: queryProduct,
    isPending,
    isSuccess,
  } = api.product.queryProduct.useMutation({
    onSuccess: (filteredProducts) => {
      setFilteredData(filteredProducts);
    },
  });

  useEffect(() => {
    queryProduct({ query, categoryFilter: selectedCategory});
  }, [query, queryProduct, selectedCategory]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row justify-between gap-x-4">
        <div className="flex h-10 w-full items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
          <Search className="h-4 w-4" />
          <input
            type="text"
            value={searchInput}
            onInput={(e) => {
              setSearchInput(e.currentTarget.value);
            }}
            placeholder="Search Product Name"
            className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <CategoryPopover
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Link href="/admin/product/add">
          <Button className="">
            Add Product <Plus className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {isPending && (
        <div className="mt-4 flex h-[250px] w-full items-center justify-center rounded-sm border">
          <Loader2 className="animate-spin text-slate-400" />
        </div>
      )}
      {isSuccess && <DataTable columns={columns} data={filteredData} />}
    </div>
  );
};
