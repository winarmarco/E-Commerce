"use client";
import { api } from "@/trpc/react";
import { type Category } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus, Search } from "lucide-react";
import { cn, toastError, toastSuccess } from "@/lib/utils";
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
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductTableHeader: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const router = useRouter();
  const { mutate: createCategoryAPI, isPending } =
    api.category.createCategory.useMutation({
      onSuccess: async (data) => {
        toastSuccess(`Successfully created category '${data.categoryName}'!`);
        router.refresh();
      }
    });
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);

  const filteredCategory = categories.filter(
    (category) =>
      category.categoryName.toLowerCase() == searchInput.toLowerCase(),
  );

  const createCategory = async () => {
    createCategoryAPI({
      categoryName: searchInput,
    });
  };

  useEffect(() => {
    if (!open) setSearchInput("");
  }, [open]);

  return (
    <div className="flex flex-row justify-between gap-x-4">
      <div className="flex h-10 w-full items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
        <Search className="h-4 w-4" />
        <input
          type="text"
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
                ? `${value.length} selected`
                : value.join(", ")
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
                {categories.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.categoryName}
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
                        value.includes(option.categoryName)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {option.categoryName}
                  </CommandItem>
                ))}

                {searchInput && filteredCategory.length == 0 && (
                  <CommandItem
                    key={searchInput}
                    value={searchInput}
                    disabled={isPending}
                    className="font-medium cursor-pointer"
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
  );
};

export default ProductTableHeader;
