import { InvoiceSchema } from "@/schemas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateToString = (paymentDue: string | Date) => {
  return new Date(paymentDue).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const generateUserId = () => {
  const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let userId = "";
  for (let i = 0; i < 6; i++) {
    i < 2
      ? (userId = userId + generateIdCharacter(letter))
      : (userId = userId + generateIdCharacter(numbers));
  }
  return userId;
};

const generateIdCharacter = (character: string) => {
  return character[Math.floor(Math.random() * character.length)];
};

export const updateItemsTotalValue = (data: z.infer<typeof InvoiceSchema>) => {
  let totalSum = 0;
  const updatedItems = data.items.map((item) => {
    totalSum = totalSum + Number(item.price) * item.quantity;
    return {
      ...item,
      total: Number(item.price) * item.quantity,
    };
  });
  return { items: updatedItems, total: totalSum };
};

export const createInvoicePaymentDue = (date: Date, paymentTerms: string) => {
  return new Date(date.getTime() + 1000 * 60 * 60 * 24 * Number(paymentTerms));
};
