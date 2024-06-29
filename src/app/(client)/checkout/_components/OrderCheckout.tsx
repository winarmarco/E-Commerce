"use client";
import { CreateOrderSchema } from "@/schema/Order";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { type z } from "zod";
import CheckoutForm from "./CheckoutForm";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "@/server/api/root";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { toastError, toastSuccess } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const OrderCheckout: React.FC<{
  cartItems: inferRouterOutputs<AppRouter>["cart"]["getCart"];
}> = ({ cartItems }) => {
  const router = useRouter();
  const { mutate: createOrder, isPending: isCreatingOrder } = api.order.createOrder.useMutation({
    onSuccess: (data) => {
      toastSuccess("Successfully created Order");
      router.push(`/order-confirmation/${data.id}`);
    },
    onError: (err) => {
      toastError(err.message);
    }
  });
  const form = useForm<z.infer<typeof CreateOrderSchema>>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      shippingAddress: {
        country: "",
        state: "",
        postCode: "",
        street: "",
      },
      creditCard: {
        cardHolder: "",
        cardNumber: "",
        expirationDate: "",
        cvc: "",
      },
    },
  });

  const submitHandler = (values: z.infer<typeof CreateOrderSchema>) => {
    createOrder({
      ...values,
    });
  };

  const total = cartItems?.reduce(
    (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
    0,
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <div className="grid grid-cols-[2fr_1fr] gap-x-8">
          <div className="flex flex-col">
            <CheckoutForm form={form} />
          </div>

          <div className="h-max border px-4 py-8">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-4">
              <div className="flex flex-col gap-y-2">
                {cartItems.map((cartItem) => (
                  <div
                    key={cartItem.productId}
                    className="grid grid-cols-[2fr_1fr_1fr] gap-x-2"
                  >
                    <h2>{cartItem.product.name}</h2>
                    <h2 className="text-end">{cartItem.quantity} x </h2>
                    <h2 className="mr-5 text-end">
                      $ {cartItem.product.price}
                    </h2>
                  </div>
                ))}
              </div>
              <Separator className="my-2" />

              <div className="grid grid-cols-[2fr_3fr] gap-x-2">
                <h2>TOTAL</h2>
                <h2 className="mr-5 text-end">$ {total}</h2>
              </div>
              <Button className="mt-5 flex w-full" type="submit" disabled={isCreatingOrder}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
