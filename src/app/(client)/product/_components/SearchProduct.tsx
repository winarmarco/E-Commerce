"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const SearchProduct = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [query] = useDebounce(searchInput, 1000);
  const searchParams = useSearchParams();

  const createQueryString = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    return params.toString();
  }, [searchParams]);

  useEffect(() => {
    if (query) {
      router.push("/product?" + createQueryString("q", query));
    } else {
      router.push("/product");
    }
  }, [query]);

  return (
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
  );
};
