"use client";
import {
  Form,
  FormControl,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { Calendar } from "@/components/ui/calendar";
import { CiCalendar } from "react-icons/ci";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { InvoiceSchema } from "@/schemas";
import {
  cn,
  createInvoicePaymentDue,
  generateUserId,
  updateItemsTotalValue,
} from "@/lib/utils";
import { useRecoilValue } from "recoil";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import BackButton from "@/components/ui/BackButton";
import createInvoice from "@/actions/createInvoice";
import { darkModeState } from "@/atoms/darkModeAtom";
export default function InvoiceForm({
  invoiceData,
  invoiceId,
  userId,
}: {
  invoiceData?: z.infer<typeof InvoiceSchema>;
  invoiceId?: string;
  userId: string | undefined;
}) {
  const [isPending, startTransition] = useTransition();
  const isDarkMode = useRecoilValue(darkModeState);
  const [activeInvoiceStatus, setActiveInvoiceStatus] = useState<
    "paid" | "draft" | "pending"
  >("pending");
  const searchParams = useSearchParams();
  const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  const router = useRouter();
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: invoiceData
      ? invoiceData
      : {
          id: "",
          invoiceId: generateUserId(),
          paymentDue: createInvoicePaymentDue(new Date(), "30"),
          clientName: "",
          status: "pending",
          total: 0,
          createdAt: new Date(),
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
          items: [{ name: "", quantity: 1, price: 1, total: 1 }],
        },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });
  const closeFormInput = () => {
    form.reset();
    router.back();
  };
  const saveInvoiceAsDraft = () => {
    startTransition(() => {
      try {
        createInvoice(
          {
            ...form.getValues(),
            paymentDue: createInvoicePaymentDue(
              form.getValues("createdAt"),
              form.getValues("paymentTerms"),
            ),
            status: "draft",
          },
          userId || "",
          invoiceId,
        ).then((res) => {
          if (res.success) {
            form.reset();
            router.back();
          }
        });
      } catch (error) {
        console.log({ error: "Something went wrong" });
      }
    });
  };
  function onSubmit(values: z.infer<typeof InvoiceSchema>) {
    const updatedData: z.infer<typeof InvoiceSchema> = {
      ...values,
      status: activeInvoiceStatus,
      invoiceId: invoiceData ? invoiceData.invoiceId : generateUserId(),
      paymentDue: createInvoicePaymentDue(
        values.createdAt,
        values.paymentTerms,
      ),
      ...updateItemsTotalValue(values),
    };
    const validatedFields = InvoiceSchema.safeParse(updatedData);
    if (validatedFields.success) {
      startTransition(() => {
        try {
          createInvoice(validatedFields.data, userId || "", invoiceId).then(
            (res) => {
              if (res.success) {
                form.reset();
                router.back();
              }
            },
          );
        } catch (error) {
          console.log({ error: "Something went wrong" });
        }
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-h-screen max-w-[616px] flex-col overflow-y-scroll rounded-tr-[20px] bg-white sm:min-h-[calc(100vh_-_80px)] sm:w-[616px] lg:ml-[103px] lg:h-fit dark:bg-12"
      >
        <div className="flex flex-col gap-5 px-6 sm:p-14 lg:p-10">
          <BackButton
            className="py-6 sm:hidden"
            backLink={
              isInvoiceEdit && invoiceData ? `/${invoiceId}/preview` : "../"
            }
          />
          <h2 className="text-headingM text-08 dark:text-white">
            {invoiceData ? (
              <>
                Edit <span className="text-06">#</span>
                {invoiceData.invoiceId}
              </>
            ) : (
              "New Invoice"
            )}
          </h2>

          <p className="mb-3 text-headingSVariant text-01">Bill from</p>

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
                      error={form.formState.errors.senderAddress?.street}
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
                      error={form.formState.errors.senderAddress?.city}
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
                      error={form.formState.errors.senderAddress?.country}
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
                      error={form.formState.errors.senderAddress?.postCode}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className="mt-2 text-headingSVariant text-01">Bill To</p>
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
                    error={form.formState.errors.clientName}
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
                    error={form.formState.errors.clientEmail}
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
                      error={form.formState.errors.clientAddress?.street}
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
                      error={form.formState.errors.clientAddress?.city}
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
                      error={form.formState.errors.clientAddress?.country}
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
                      error={form.formState.errors.clientAddress?.postCode}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between gap-x-5">
            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col justify-between">
                  <FormLabel className="mt-1 text-bodyVariant text-07 dark:text-05">
                    Invoice Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div
                          className={cn(
                            "mb-6 flex cursor-pointer items-center justify-between rounded border-[1px] border-transparent bg-05 px-3 py-3 text-headingS text-black caret-01 outline-none hover:border-01 focus:border-[1px] focus:border-01 peer-hover:border-01 sm:mb-0 dark:bg-03 dark:text-white",
                          )}
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : format(new Date(), "PPP")}

                          <CiCalendar className="left text-[1.3rem] text-07" />
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className={cn("w-auto p-0", {
                        dark: isDarkMode,
                      })}
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value as Date}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentTerms"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Payment Terms</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        aria-label="Payment Terms"
                        className="z-[25] mb-4 inline-flex h-[48px] w-full items-center justify-between rounded border-[1px] border-05 bg-05 px-3 text-body font-bold text-black outline-none hover:border-01 focus:border-[1px] focus:border-01 sm:col-start-2 sm:row-start-2 dark:bg-04 dark:text-white"
                      >
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      className={cn("bg-white dark:bg-04", {
                        dark: isDarkMode,
                      })}
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-start-1 sm:col-start-1">
                <div className="flex justify-between">
                  <FormLabel>Description</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    placeholder="Description"
                    error={form.formState.errors.description}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <h3 className="text-headingS text-[#777F98] sm:mb-4">Item List</h3>
            <div className="hidden list-none grid-cols-[minmax(0,_.5fr)_minmax(0,_.7fr)_minmax(0,_.7fr)_minmax(0,_.3fr)] items-center gap-x-4 sm:grid sm:grid-cols-[minmax(0,_1.6fr)_minmax(0,_.4fr)_minmax(0,_.7fr)_minmax(0,_.7fr)_minmax(0,_.2fr)]">
              <p className="mb-2 text-bodyVariant text-07 dark:text-06">
                Item name
              </p>
              <p className="mb-2 text-bodyVariant text-07 dark:text-06">Qty.</p>
              <p className="mb-2 text-bodyVariant text-07 dark:text-06">
                Price
              </p>
              <p className="mb-2 text-bodyVariant text-07 dark:text-06">
                Total
              </p>
            </div>
            {fields.map((item, index) => (
              <li
                key={item.id}
                className="grid list-none grid-cols-[minmax(0,_.5fr)_minmax(0,_.7fr)_minmax(0,_.7fr)_minmax(0,_.3fr)] items-center gap-x-4 sm:grid-cols-[minmax(0,_1.6fr)_minmax(0,_.4fr)_minmax(0,_.7fr)_minmax(0,_.7fr)_minmax(0,_.2fr)]"
              >
                <FormField
                  control={form.control}
                  name={`items.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="col-span-4 mb-4 sm:col-span-1 sm:mb-0">
                      <div className="flex justify-between">
                        <FormLabel className="mt-6 sm:hidden">
                          Item Name
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Item Name"
                          error={form.formState.errors.items?.[index]?.name}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel className="sm:hidden">Qty.</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Qty."
                          error={form.formState.errors.items?.[index]?.quantity}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`items.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel className="sm:hidden">Price</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Price"
                          error={form.formState.errors.items?.[index]?.price}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col">
                  <p className="text-bodyVariant text-07 sm:hidden dark:text-06">
                    Total
                  </p>
                  <p className="mt-2 w-full truncate rounded border-[1px] border-transparent px-3 py-3 text-headingS text-06 focus:border-01">
                    {(
                      form.watch(`items.${index}.price`) *
                      form.watch(`items.${index}.quantity`)
                    ).toFixed(2)}
                  </p>
                </div>

                <MdDelete
                  onClick={() => remove(index)}
                  className="col-start-4 h-[49.33px] cursor-pointer self-end text-[1.5rem] text-06 hover:text-09 sm:col-start-5"
                />
              </li>
            ))}
          </div>
          <Button
            type="button"
            variant="light"
            onClick={() =>
              append({ name: "", price: 0, quantity: 1, total: 0 })
            }
          >
            + Add New Item
          </Button>
          <div>
            {Object.keys(form.formState.errors).length > 0 && (
              <p className="mb-2 text-[.625rem] text-09">
                - All fields must be added
              </p>
            )}
            {form.formState.errors.items?.message && (
              <p className="mb-2 text-[.625rem] text-09">
                - An item must be added
              </p>
            )}
          </div>
        </div>
        <div className="mt-auto flex justify-between gap-3 rounded-br-[20px] p-4 sm:px-14 sm:pb-8 dark:bg-03 dark:sm:bg-12">
          {invoiceData ? (
            <>
              {" "}
              <Button
                variant={isDarkMode ? "lightDarkMode" : "light"}
                type="button"
                className="sm:ml-auto"
                onClick={closeFormInput}
              >
                Cancel
              </Button>
              <Button
                className="min-w-[110px]"
                loading={isPending}
                disabled={isPending}
                variant="violet"
                onClick={() => setActiveInvoiceStatus("pending")}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={isDarkMode ? "lightDarkMode" : "light"}
                type="button"
                className="w-[50%] px-4 sm:mr-auto sm:w-auto"
                onClick={closeFormInput}
              >
                Discard
              </Button>

              <Button
                loading={isPending}
                disabled={isPending}
                variant={isDarkMode ? "darkDarkMode" : "dark"}
                onClick={saveInvoiceAsDraft}
                type="button"
                className="w-[100%] min-w-[119px] sm:w-auto"
              >
                Save as Draft
              </Button>
              <Button
                loading={isPending}
                disabled={isPending}
                variant="violet"
                onClick={() => setActiveInvoiceStatus("pending")}
                className="w-[100%] min-w-[110px] sm:w-auto"
              >
                Save & Send
              </Button>
            </>
          )}
        </div>
      </form>
      <div
        onClick={closeFormInput}
        className={cn("h-full delay-200 duration-500", {
          "bg-black/35": isInvoiceEdit,
        })}
      ></div>
    </Form>
  );
}
