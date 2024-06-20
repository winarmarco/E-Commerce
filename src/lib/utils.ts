import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import toaster from "react-hot-toast";

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
