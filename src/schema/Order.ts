import { OrderStatus, type ShippingAddress, type Order } from "@prisma/client";
import { z } from "zod";

type IShippingAddress = Omit<ShippingAddress, "id">;
export const ShippingAddressSchema: z.ZodType<IShippingAddress> = z.object({
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  postCode: z.string().min(1, { message: "Postcode is required" }),
  street: z.string().min(1, { message: "Street is required" }),
});

export const CreditCardSchema = z.object({
  cardHolder: z.string().min(1, { message: "Card Holder is required" }),
  expirationDate: z.string().min(1, { message: "Expiration Date is required" }),
  cardNumber: z.string().min(1, { message: "Card Number is required" }),
  cvc: z.string().min(1, { message: "CVC is required" }),
});

type ICreateOrder = Omit<
  Order,
  "id" | "shippingAddressId" | "authorId" | "status"
> & {
  shippingAddress: IShippingAddress;
  creditCard: z.infer<typeof CreditCardSchema>;
};

export const CreateOrderSchema: z.ZodType<ICreateOrder> = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  shippingAddress: ShippingAddressSchema,
  creditCard: CreditCardSchema,
});
