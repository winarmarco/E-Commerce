"use client";

import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import { api } from "@/trpc/react";
import { useDebounce } from "use-debounce";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";
import { columns } from "./columns";
import { DataTable } from "@/components/page-components/data-table/DataTable";

export const OrderTable: React.FC<{
  data: inferRouterOutputs<AppRouter>["order"]["queryOrder"];
}> = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchInput, setSearchInput] = useState("");
  const [query] = useDebounce(searchInput, 1000);

  const {
    mutate: queryOrder,
    isPending,
    isError,
    isSuccess,
  } = api.order.queryOrder.useMutation({
    onSuccess: (filteredOrder) => {
      setFilteredData(filteredOrder);
    },
  });
  // Trigger queryOrder when `query` changes
  useEffect(() => {
    queryOrder({ query });
  }, [query, queryOrder]);

  // Update filteredData when `data` changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex h-10 w-full items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
        <Search className="h-4 w-4" />
        <input
          type="text"
          value={searchInput}
          onInput={(e) => {
            setSearchInput(e.currentTarget.value);
          }}
          placeholder="Search Order"
          className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      {isPending && <div className="flex w-full h-[250px] justify-center items-center border rounded-sm mt-4">
        <Loader2 className="animate-spin text-slate-400" />
      </div>}
      {isSuccess && <DataTable columns={columns} data={filteredData} />}
    </div>
  );
};
