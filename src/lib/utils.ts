import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import toaster from "react-hot-toast";
import { parseISO, format, formatDate } from "date-fns";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server/api/root";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toastSuccess(message: string) {
  toaster.success(message, {
    position: "bottom-right",
  });
}

export function toastError(message: string) {
  toaster.success(message, {
    position: "bottom-right",
  });
}

export function generateProductCode(length = 8): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateOrderCode(sequenceNumber: number, date: Date): string {
  // Format the date as YYMMDD
  const year = date.getFullYear().toString().slice(0, -2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const dateString = `${year}${month}${day}`;

  // Format the sequence number as a zero-padded string
  const sequenceString = sequenceNumber.toString().padStart(6, "0");

  return dateString + sequenceString;
}

export function getTodayAtMidnight(): Date {
  const today = new Date(); // Gets the current date and time
  today.setHours(0, 0, 0, 0); // Sets the time to 00:00:00.000
  return today;
}

export function getTomorrowDate(date: Date) {
  const tomorrow = new Date(date.getTime() + 3600 * 24 * 1000);
  tomorrow.setHours(0, 0, 0, 0); // Resets the time to midnight
  return tomorrow;
}

export function aggregateSalesData(
  dailyData: inferRouterOutputs<AppRouter>["order"]["getAllOrder"],
  formatStr = "MMM yyyy",
) {
  const group: Record<string, number> = {};

  dailyData.forEach(({ orderDateTime, orderItems }) => {
    const revenue = orderItems.reduce(
      (total, currValue) =>
        (total += currValue.quantity * currValue.productPrice),
      0,
    );
    const formattedDateTime = formatDate(orderDateTime, formatStr);
    if (!group[formattedDateTime]) {
      group[formattedDateTime] = 0;
    }
    group[formattedDateTime] += revenue;
  });

  return Object.entries(group).map(([date, total]) => ({
    date,
    sales: total,
  }));
}

export function aggregateProductSalesData(
  dailyData: inferRouterOutputs<AppRouter>["order"]["getOrderWithProduct"],
  productId: string,
  formatStr = "MMM yyyy",
) {
  const group: Record<string, number> = {};

  dailyData.forEach(({ orderDateTime, orderItems }) => {
    const product = orderItems.find(
      (orderItem) => orderItem.productRef === productId,
    );
    const productQty = product ? product.quantity : 0;
    const formattedDateTime = formatDate(orderDateTime, formatStr);
    if (!group[formattedDateTime]) {
      group[formattedDateTime] = 0;
    }
    group[formattedDateTime] += productQty;
  });

  return Object.entries(group).map(([date, total]) => ({
    date,
    sales: total,
  }));
}
