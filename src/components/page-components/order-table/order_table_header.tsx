"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const OrderTableHeader = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");


  return (
    <div className="flex flex-row justify-between gap-x-4">
      <div className="flex h-10 w-full items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
        <Search className="h-4 w-4" />
        <input
          type="text"
          value={searchInput}
          onInput={(e) => {setSearchInput(e.currentTarget.value)}}
          placeholder="Search Order"
          className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
};

export default OrderTableHeader;
