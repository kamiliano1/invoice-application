import { z } from "zod";

const EMPTY_MESSAGE = "can't be empty!";

export type StatusInvoiceType = "draft" | "pending" | "paid";

export const PreviewInvoiceSchema = z.object({
  invoiceId: z.string().length(6),
  paymentDue: z.date(),
  clientName: z.string(),
  status: z.enum(["draft", "paid", "pending"]),
  total: z.number(),
});

export const InvoiceSchema = z.object({
  invoiceId: z.string().optional(),
  paymentDue: z.date().optional(),
  clientName: z.string().min(3, EMPTY_MESSAGE),
  status: z.enum(["draft", "paid", "pending"]),
  total: z.number().optional(),
  createdAt: z.date(),
  description: z.string().min(2, EMPTY_MESSAGE),
  paymentTerms: z.coerce.string(),
  clientEmail: z.string().email(),
  senderAddress: z.object({
    street: z.string().min(2, EMPTY_MESSAGE),
    city: z.string().min(2, EMPTY_MESSAGE),
    postCode: z.string().min(2, EMPTY_MESSAGE),
    country: z.string().min(2, EMPTY_MESSAGE),
  }),
  clientAddress: z.object({
    street: z.string().min(2, EMPTY_MESSAGE),
    city: z.string().min(2, EMPTY_MESSAGE),
    postCode: z.string().min(2, EMPTY_MESSAGE),
    country: z.string().min(2, EMPTY_MESSAGE),
  }),
  items: z
    .array(
      z.object({
        name: z.string().min(2, EMPTY_MESSAGE),
        quantity: z.coerce.number(),
        price: z.coerce.number(),
        total: z.coerce.number(),
      })
    )
    .min(1, { message: "At least one item" }),
});
export const InvoicesSchema = z.array(InvoiceSchema);

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(1, { message: "Can't be empty" }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
