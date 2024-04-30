import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { InvoiceSchema } from "@/schemas";
export default function InvoiceForm() {
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      id: "",
      paymentDue: "",
      clientName: "",
      status: "pending",
      total: 0,
      createdAt: "",
      description: "",
      paymentTerms: "",
      clientEmail: "",
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [{ name: "", quantity: 0, price: 0, total: 0 }],
    },
  });
  function onSubmit(values: z.infer<typeof InvoiceSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[616px] sm:w-[616px] lg:ml-[103px] sm:min-h-[calc(100vh_-_80px)] lg:h-fit flex flex-col rounded-tr-[20px] dark:bg-12 bg-white"
      >
        <div className="px-4 sm:p-14 flex flex-col gap-6">
          <h2 className="text-headingM text-08 dark:text-white">New Invoice</h2>
          <p className="text-01 text-headingSVariant mb-3">Bill from</p>
        </div>
        <div className="grid gap-5">
          <FormField
            control={form.control}
            name="senderAddress.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="Street Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
