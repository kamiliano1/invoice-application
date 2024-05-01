import { z } from "zod";

const EMPTY_MESSAGE = "Can't be empty!";

export const PreviewInvoiceSchema = z.object({
  // Was InvoiceSchema
  id: z.string().length(6),
  paymentDue: z.string(),
  clientName: z.string(),
  status: z.enum(["draft", "paid", "pending"]),
  total: z.number(),
});

export const CheckboxSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export const InvoiceSchema = z.object({
  // Was UserSingleInvoiceSchema
  id: z.string().length(6).optional(),
  paymentDue: z.string().optional(),
  clientName: z.string().min(3, EMPTY_MESSAGE),
  status: z.enum(["draft", "paid", "pending"]).optional(),
  total: z.number().optional(),
  createdAt: z.date().or(z.string()),
  description: z.string().min(2, EMPTY_MESSAGE),
  paymentTerms: z.string(),
  clientEmail: z.string().email(),
  // clientEmail: z.string().email().nullish(),
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
