"use client";

import Link from "next/link";
import { useState } from "react";
import { DataTable } from "./_components/product_table";
import { columns } from "./_components/columns";
import { type Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/trpc/react";

const frameworks: {
  value: string;
  label: string;
}[] = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const data: Product[] = [
  {
    imageURL:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Hello world",
    description: "lorem ipsum",
    price: 3000.0,
    categoryId: "asdasda",
    id: "asdasda",
  },
  {
    imageURL:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Hello world",
    description: "lorem ipsum",
    price: 3000.0,
    categoryId: "asdasda",
    id: "asdasda",
  },
  {
    imageURL:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Hello world",
    description: "lorem ipsum",
    price: 3000.0,
    categoryId: "asdasda",
    id: "asdasda",
  },
];

const Dashboard = () => {
  const { mutate: createCategoryAPI, isPending } =
    api.category.createCategory.useMutation();
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);

  const filteredCategory = frameworks.filter(
    (framework) => framework.value.toLowerCase() == searchInput.toLowerCase(),
  );

  const createCategory = async () => {
    createCategoryAPI({
      categoryName: searchInput,
    });
  };

  return (
    <div className="flex flex-col gap-y-10">
      <h1 className="text-2xl font-bold">Product</h1>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row justify-between gap-x-4">
          <div className="flex h-10 w-full items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
            <Search className="h-4 w-4" />
            <input
              type="number"
              placeholder="Search Product"
              className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[400px] justify-between"
              >
                {value.length > 0
                  ? value.toString().length > 20
                    ? `${value.toString().slice(0, 20)}...`
                    : value.toString()
                  : "Select or Create Category..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[300px] p-0">
              <Command>
                <CommandInput
                  className=""
                  placeholder="Search or Create Category..."
                  onInput={(e) => setSearchInput(e.currentTarget.value)}
                />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {frameworks.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          setValue((prevValue) => {
                            if (!prevValue.includes(currentValue)) {
                              return [...prevValue, currentValue];
                            } else {
                              const updatedValue = prevValue.filter(
                                (val) => val != currentValue,
                              );
                              return [...updatedValue];
                            }
                          });
                          // setOpen(false);
                          // onSelect(currentValue);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value.includes(option.value)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}

                    {searchInput && filteredCategory.length == 0 && (
                      <CommandItem
                        key={searchInput}
                        value={searchInput}
                        className="font-medium"
                        onSelect={async () => {
                          await createCategory();

                        }}
                      >
                        {`+ Create '${searchInput}' category`}
                      </CommandItem>
                    )}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Link href="/admin/product/add">
            <Button className="">
              Add Product <Plus className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
