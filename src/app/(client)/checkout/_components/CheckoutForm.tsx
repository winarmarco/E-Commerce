"use client";

import React from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { type CreateOrderSchema } from "@/schema/Order";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";

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
                      onInput={(e) => {
                        let inputValue = e.currentTarget.value;
                        inputValue = inputValue.replace(/[^0-9/]/g, "");
  
                        if (inputValue.length > 15) {
                          inputValue = inputValue.slice(0, 15);
                        }
  
                        e.currentTarget.value = inputValue;
                      }}
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
                      placeholder="MM / YY"
                      onInput={(e) => {
                        const currentValue =
                          form.getValues().creditCard.expirationDate;
                        let inputValue = e.currentTarget.value;

                        inputValue = inputValue.replace(/[^0-9/]/g, "");

                        // Allow only one slash to be entered
                        if (inputValue.split("/").length > 2) {
                          inputValue = inputValue.substring(0, inputValue.length - 1);
                        }

                        // Automatically delete slash if user is deleting content
                        if (inputValue.length === 3 && currentValue.length > inputValue.length ) {
                          inputValue = inputValue.slice(0, -1);
                        }

                        // Automatically insert slash if necessary, when inputting
                        if (inputValue.length === 2 && currentValue.length < inputValue.length
                        ) {
                          inputValue += "/";
                        }

                        // Limit to 5 characters (MM/YY)
                        if (inputValue.length > 5) {
                          inputValue = inputValue.substring(0, 5);
                        }

                        e.currentTarget.value = inputValue;
                      }}
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
                    onInput={(e) => {
                      const currentValue =
                        form.getValues().creditCard.cardNumber;
                      let inputValue = e.currentTarget.value;

                      inputValue = inputValue.replace(/[^0-9\s/]/g, "");

                      // Automatically insert space if necessary, when inputting
                      if ((inputValue.length + 1) % 5 == 0 && currentValue.length < inputValue.length ) {
                        inputValue += " ";
                      }

                      // Automatically delete space if user is deleting content
                      if (currentValue.length > inputValue.length) {
                        inputValue = inputValue.trimEnd();
                      }

                      if (inputValue.length > 19) {
                        inputValue = inputValue.slice(0, 19);
                      }

                      e.currentTarget.value = inputValue;
                    }}
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
                  <Input
                    placeholder="CVC"
                    {...field}
                    onInput={(e) => {
                      let inputValue = e.currentTarget.value;

                      inputValue = inputValue.replace(/[^0-9/]/g, "");

                      if (inputValue.length > 3) {
                        inputValue = inputValue.slice(0, 3);
                      }

                      e.currentTarget.value = inputValue;
                    }}
                  />
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
