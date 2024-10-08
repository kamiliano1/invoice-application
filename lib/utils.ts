import { InvoiceSchema } from "@/schemas";
import { SortFilters } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  const twMerge = extendTailwindMerge({
    extend: {
      classGroups: {
        "font-size": [
          {
            text: [
              "headingL",
              "headingM",
              "headingS",
              "headingSVariant",
              "body",
              "bodyVariant",
            ],
          },
        ],
      },
    },
  });
  return twMerge(clsx(inputs));
}

export const dateToString = (paymentDue: Date) => {
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
      ? (userId += generateIdCharacter(letter))
      : (userId += generateIdCharacter(numbers));
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

export const uppercaseFirstLetter = (word: string | undefined) => {
  if (!word) return undefined;
  return `${word[0].toUpperCase()}${word.slice(1)}`;
};

export const sortByStatus = ({
  activatedFilter,
  firstElement,
  secondElement,
}: {
  activatedFilter: SortFilters;
  firstElement: z.infer<typeof InvoiceSchema>;
  secondElement: z.infer<typeof InvoiceSchema>;
}) => {
  if (activatedFilter === "total") {
    return firstElement[activatedFilter]! - secondElement[activatedFilter]!;
  }
  if (activatedFilter === "paymentDue") {
    return new Date(firstElement[activatedFilter]!) >
      new Date(secondElement[activatedFilter]!)
      ? 1
      : -1;
  }
  return firstElement[activatedFilter]!.localeCompare(
    secondElement[activatedFilter]!
  );
};

export const filterOptions = {
  invoiceId: "Invoice Id",
  paymentDue: "Payment Due",
  clientName: "Name",
  total: "Price",
  status: "Status",
};
