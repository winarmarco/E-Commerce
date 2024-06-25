"use client";
import { Button } from "@/components/ui/button";
import { toastSuccess } from "@/lib/utils";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import { OrderStatus } from "@prisma/client";
import { type inferRouterOutputs } from "@trpc/server";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const OrderActions: React.FC<{
  order: inferRouterOutputs<AppRouter>["order"]["getOrder"];
}> = ({ order }) => {
  const router = useRouter();
  const { mutate: markAsCompleted } = api.order.markAsCompleted.useMutation({
    onSuccess: () => {
      router.refresh();
      toastSuccess(`Order #${order.orderCode} has been completed!`);
    },
  });

  return (
    <div className="w-full">
      {order.status !== OrderStatus.COMPLETED && (
        <Button
          onClick={() => {
            markAsCompleted({ id: order.id });
          }}
        >
          Mark As Complete <Check className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default OrderActions;
