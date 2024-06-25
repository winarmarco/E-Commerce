"use client";
import {
  BarChart,
  Check,
  Copy,
  Edit,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toastSuccess } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import OrderStatusBadge from "../order-status-badge";

type GetAllProductOutput =
  inferRouterOutputs<AppRouter>["order"]["getAllOrder"][0];

export const columns: ColumnDef<GetAllProductOutput>[] = [
  {
    accessorKey: "orderCode",
    header: "Order ID",
  },
  {
    accessorKey: "orderDateTime",
    header: "Ordered Date",
    accessorFn: (data) => {
      return data.orderDateTime.toISOString().slice(0, 10);
    },
  },
  {
    id: "Name",
    header: "Customer Name",
    accessorFn: (data) => {
      return `${data.firstName} ${data.lastName}`;
    },
  },

  {
    id: "Total",
    header: "Total",
    accessorFn: (data) => {
      const total = data.orderItems.reduce(
        (total, currItem) =>
          (total += currItem.productPrice * currItem.quantity),
        0,
      );
      return `$ ${total}`;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    accessorFn: (data) => {
      return data.status;
    },
    cell: ({ row }) => {
      const status: OrderStatus = row.getValue("status");
      return <OrderStatusBadge status={status} />;
    },
  },

  {
    id: "actions",
    cell: function ActionCompoennt({ row }) {
      const router = useRouter();
      const { mutate: markAsDone } = api.order.markAsCompleted.useMutation({
        onSuccess: (data) => {
          toastSuccess(`Order #${row.original.orderCode} has been completed!`);
          router.refresh();
        },
      });

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
              onClick={() => {
                router.push(`/admin/order/${row.original.id}`);
              }}
            >
              <BarChart className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {row.original.status !== OrderStatus.COMPLETED && (
              <DropdownMenuItem
                onClick={() => {
                  markAsDone({ id: row.original.id });
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Mark as Completed
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy Order ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
