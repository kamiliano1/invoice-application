import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { InvoiceSchema } from "@/schemas";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useRecoilState } from "recoil";
import { settingsAppState } from "@/atoms/settingsAppAtom";
export default function InvoiceForm() {
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
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
      paymentTerms: "30",
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
          <div className="grid gap-5">
            <FormField
              control={form.control}
              name="senderAddress.street"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-3">
                  <div className="flex justify-between">
                    <FormLabel>Street Address</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Street Address"
                      className={cn({
                        "border-09":
                          form.formState.errors.senderAddress?.street,
                      })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senderAddress.city"
              render={({ field }) => (
                <FormItem className="col-start-1 sm:col-start-1">
                  <div className="flex justify-between">
                    <FormLabel>City</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="City"
                      className={cn({
                        "border-09": form.formState.errors.senderAddress?.city,
                      })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senderAddress.country"
              render={({ field }) => (
                <FormItem className="col-start-2 row-start-2">
                  <div className="flex justify-between">
                    <FormLabel>Country</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Country"
                      className={cn({
                        "border-09":
                          form.formState.errors.senderAddress?.country,
                      })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senderAddress.postCode"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1 sm:col-start-3 sm:row-start-2">
                  <div className="flex justify-between">
                    <FormLabel>Post Code</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Post Code"
                      className={cn({
                        "border-09":
                          form.formState.errors.senderAddress?.postCode,
                      })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className="text-01 text-headingSVariant mt-2">Bill To</p>
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1 sm:col-start-3 sm:row-start-2">
                <div className="flex justify-between">
                  <FormLabel>Client`s Name</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    placeholder="Client`s Name"
                    className={cn({
                      "border-09": form.formState.errors.clientName,
                    })}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientEmail"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1 sm:col-start-3 sm:row-start-2">
                <div className="flex justify-between">
                  <FormLabel>Client`s Email</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    placeholder="Client`s Email"
                    className={cn({
                      "border-09": form.formState.errors.clientEmail,
                    })}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid gap-5">
            <FormField
              control={form.control}
              name="clientAddress.street"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-3">
                  <div className="flex justify-between">
                    <FormLabel>Street Address</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Street Address"
                      className={cn({
                        "border-09":
                          form.formState.errors.clientAddress?.street,
                      })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientAddress.city"
              render={({ field }) => (
                <FormItem className="col-start-1 sm:col-start-1">
                  <div className="flex justify-between">
                    <FormLabel>City</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="City"
                      className={cn({
                        "border-09": form.formState.errors.clientAddress?.city,
                      })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientAddress.country"
              render={({ field }) => (
                <FormItem className="col-start-2 row-start-2">
                  <div className="flex justify-between">
                    <FormLabel>Country</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Country"
                      className={cn({
                        "border-09":
                          form.formState.errors.clientAddress?.country,
                      })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientAddress.postCode"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1 sm:col-start-3 sm:row-start-2">
                  <div className="flex justify-between">
                    <FormLabel>Post Code</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Post Code"
                      className={cn({
                        "border-09":
                          form.formState.errors.clientAddress?.postCode,
                      })}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentTerms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Terms</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        aria-label="Payment Terms"
                        className="sm:col-start-2 sm:row-start-2 px-3 border-[1px] rounded focus:border-01 focus:border-[1px] outline-none text-body font-bold w-full hover:border-01 inline-flex items-center h-[48px] justify-between mb-4 z-[25] border-05 bg-white text-black dark:border-03 dark:bg-04 dark:text-white"
                      >
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      className={cn({ dark: settingsState.isDarkMode })}
                    >
                      <SelectItem value="1">Net 1 Day</SelectItem>
                      <SelectItem value="7">Net 7 Days</SelectItem>
                      <SelectItem value="14">Net 14 Days</SelectItem>
                      <SelectItem value="30">Net 30 Days</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
