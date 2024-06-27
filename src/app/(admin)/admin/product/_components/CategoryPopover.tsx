import React, { type Dispatch, type SetStateAction, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn, toastError, toastSuccess } from "@/lib/utils";
import { api } from "@/trpc/react";

const CategoryPopover: React.FC<{
  selectedCategory: string[];
  setSelectedCategory: Dispatch<SetStateAction<string[]>>;
}> = ({ selectedCategory, setSelectedCategory }) => {
  const utils = api.useUtils();
  // Use to fetch category
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
  } = api.category.getAllCategory.useQuery();
  // Use to create category
  const { mutate: createCategoryAPI, isPending } =
    api.category.createCategory.useMutation({
      onSuccess: async (data) => {
        toastSuccess(`Successfully created category '${data.categoryName}'!`);
        await utils.category.getAllCategory.invalidate();
      },
      onError: async () => {
        toastError(`Failed to create category`);
      },
    });
  const [searchInput, setSearchInput] = useState(""); // Use to control search box
  const [open, setOpen] = useState(false); // Use to control popover

  // Disabled button if categories is still fetching
  if (isLoading || isError)
    return (
      <Button
        className="w-[400px] justify-between bg-gray-300 text-gray-600"
        disabled
      >
        Select or Create Category...
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );


  // Filter searched category
  const filteredCategory = categories?.filter(
    (category) =>
      category.categoryName.toLowerCase() == searchInput.toLowerCase(),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {selectedCategory.length > 0
            ? selectedCategory.toString().length > 20
              ? `${selectedCategory.length} selected`
              : selectedCategory.join(", ")
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
          <CommandEmpty>No Category Found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {isSuccess &&
                categories.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.categoryName}
                    onSelect={(currentValue) => {
                      setSelectedCategory((prevValue) => {
                        // If it doesnt include the selected category, add it to
                        // the selectedValue array
                        if (!prevValue.includes(currentValue)) {
                          return [...prevValue, currentValue];
                        } else {
                          const updatedValue = prevValue.filter(
                            (val) => val != currentValue,
                          );
                          return [...updatedValue];
                        }
                      });
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCategory.includes(option.categoryName)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {option.categoryName}
                  </CommandItem>
                ))}

              {searchInput &&
                (!filteredCategory || filteredCategory.length == 0) && (
                  <CommandItem
                    key={searchInput}
                    value={searchInput}
                    disabled={isPending}
                    className="cursor-pointer font-medium"
                    onSelect={() => {
                      createCategoryAPI({
                        categoryName: searchInput,
                      });
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
  );
};

export default CategoryPopover;
