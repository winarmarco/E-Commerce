"use client";

import { BarChart, Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { toastSuccess } from "@/lib/utils";

type GetAllProductOutput =
  inferRouterOutputs<AppRouter>["product"]["getAllProduct"][0];

export const columns: ColumnDef<GetAllProductOutput>[] = [
  {
    accessorKey: "productCode",
    header: "Product Code",
    cell: (row) => {

      return <div className="font-medium">{`#${row.getValue() as string}`}</div>;
    },
  },
  {
    accessorKey: "imageURL",
    header: "Image",
    cell: (row) => {
      const url = row.getValue() as string;

      return (
        <div className="relative h-[128px] w-[128px] overflow-clip rounded-md bg-muted">
          <Image
            src={url}
            alt={url}
            fill
            className="z-0s rounded-md object-cover transition-transform"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (row) => {
      const price = row.getValue() as number;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "category.categoryName",
    header: "Product Category",
  },
  {
    id: "actions",
    cell: function ActionCell({ row }) {
      const router = useRouter();
      const { mutate: deleteProductAPI, isPending } =
        api.product.deleteProduct.useMutation({
          onSuccess: () => {
            toastSuccess("Successfully deleted Product")
          }
        });
      const { id: productId } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/admin/product/${productId}`)}
            >
              <BarChart className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/admin/product/${productId}/edit`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              disabled={isPending}
              onClick={() => {
                deleteProductAPI({ id: productId });
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
