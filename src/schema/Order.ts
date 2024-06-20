import { OrderStatus, type ShippingAddress, type Order } from "@prisma/client";
import { z } from "zod";

type IShippingAddress = Omit<ShippingAddress, "id">;
export const ShippingAddressSchema: z.ZodType<IShippingAddress> = z.object({
  country: z.string(),
  state: z.string(),
  postCode: z.string(),
  street: z.string(),
});

export const CreditCardSchema = z.object({
  cardHolder: z.string(),
  expirationDate: z.string(),
  cardNumber: z.string(),
  cvc: z.string(),
});

type ICreateOrder = Omit<Order, "id" | "shippingAddressId" | "authorId"> & {
  shippingAddress: IShippingAddress;
  creditCard: z.infer<typeof CreditCardSchema>;
};

export const CreateOrderSchema: z.ZodType<ICreateOrder> = z.object({
  status: z.enum([OrderStatus.COMPLETED, OrderStatus.PENDING]),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  shippingAddress: ShippingAddressSchema,
  creditCard: CreditCardSchema,
  orderItems: z.array(z.string()),
});
