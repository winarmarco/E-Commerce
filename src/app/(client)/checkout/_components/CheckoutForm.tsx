"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { api } from "@/trpc/react";
import toaster from "react-hot-toast";
import { toastError, toastSuccess } from "@/lib/utils";
import { CreateOrderSchema } from "@/schema/Order";
import { Separator } from "@/components/ui/separator";

const CheckoutForm: React.FC<{
  form: UseFormReturn<z.infer<typeof CreateOrderSchema>>;
}> = ({ form }) => {

  return (
    <div className="flex h-full w-full flex-col space-y-8">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Contact Details</h2>
        <div className="mt-0.5 grid w-full grid-cols-4 gap-x-4 gap-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                    <p className="w-10 text-muted-foreground">+61</p>
                    <Separator orientation="vertical" />
                    <input
                      {...field}
                      type="text"
                      className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="XX-XXXX-XXX"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Shipping Details</h2>
        <div className="mt-0.5 grid w-full grid-cols-4 gap-x-4 gap-y-4">
          <FormField
            control={form.control}
            name="shippingAddress.country"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingAddress.state"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Province/State</FormLabel>
                <FormControl>
                  <Input placeholder="Province/State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingAddress.postCode"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>PostCode</FormLabel>
                <FormControl>
                  <Input
                    placeholder="postCode"
                    {...field}
                    className="col-span-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shippingAddress.street"
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel>Street name</FormLabel>
                <FormControl>
                  <Input placeholder="Street name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">Payment Details</h2>
        <div className="mt-0.5 grid w-full grid-cols-4 gap-x-4 gap-y-4">
          <FormField
            control={form.control}
            name="creditCard.cardHolder"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Card Holder</FormLabel>
                <FormControl>
                  <Input placeholder="Card Holder" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="creditCard.expirationDate"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Expiration Date</FormLabel>
                <FormControl>
                  <div className="flex h-10 w-[150px] items-center rounded-md border border-input bg-white px-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                    <input
                      {...field}
                      type="text"
                      className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="MM"
                    />
                    <Separator orientation="vertical" />
                    <p className="w-10 px-2 text-muted-foreground">/</p>
                    <Separator orientation="vertical" />
                    <input
                      {...field}
                      type="text"
                      className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="YY"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="creditCard.cardNumber"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Card Number"
                    {...field}
                    className="col-span-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="creditCard.cvc"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>CVC</FormLabel>
                <FormControl>
                  <Input placeholder="CVC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
