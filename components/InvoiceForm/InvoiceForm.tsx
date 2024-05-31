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
import { useRecoilState, useRecoilValue } from "recoil";
import { settingsAppState } from "@/atoms/settingsAppAtom";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { darkModeState } from "@/atoms/settingsAppAtom";
import BackButton from "@/components/ui/BackButton";
import createInvoice from "@/actions/createInvoice";
import useCurrentUser from "@/hooks/useCurrentUser";
export default function InvoiceForm({
  invoiceData,
  invoiceId,
  setGetInvoices,
}: {
  invoiceData?: z.infer<typeof InvoiceSchema>;
  invoiceId?: string;
  setGetInvoices: Dispatch<SetStateAction<boolean>>;
}) {
  const userId = useCurrentUser();
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const [isPending, startTransition] = useTransition();
  const isDarkMode = useRecoilValue(darkModeState);
  const [activeInvoiceStatus, setActiveInvoiceStatus] = useState<
    "paid" | "draft"
  >("paid");
  const searchParams = useSearchParams();
  const isInvoiceEdit = !!searchParams.get("invoiceEdit");
  const router = useRouter();
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: invoiceData
      ? invoiceData
      : {
          invoiceId: undefined,
          paymentDue: undefined,
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
          items: [{ name: "", quantity: 0, price: 0, total: 0 }],
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
  function onSubmit(values: z.infer<typeof InvoiceSchema>) {
    const updatedData: z.infer<typeof InvoiceSchema> = {
      ...values,
      status: activeInvoiceStatus,
      invoiceId: generateUserId(),
      paymentDue: createInvoicePaymentDue(
        values.createdAt,
        values.paymentTerms
      ),
      ...updateItemsTotalValue(values),
    };
    const validatedData = InvoiceSchema.safeParse(updatedData);
    // console.log(validatedData);

    if (validatedData.success) {
      startTransition(() => {
        try {
          createInvoice(validatedData.data, userId || "", invoiceId).then(
            () => {
              setGetInvoices((prev) => !prev);
              form.reset();
              router.back();
            }
          );
        } catch (error) {
          console.log({ error: "Something went wrong" });
        }
      });

      // if (invoiceData) {
      //   setSettingsState((prev) => {
      //     const updatedInvoice = prev.userInvoices.map((item) =>
      //       item.invoiceId === invoiceData.invoiceId
      //         ? {
      //             ...item,
      //             ...values,
      //             ...updateItemsTotalValue(values),
      //             paymentDue: createInvoicePaymentDue(
      //               values.createdAt,
      //               values.paymentTerms
      //             ),
      //           }
      //         : item
      //     );

      //     return { ...prev, userInvoices: updatedInvoice };
      //   });
      // } else {
      //   setSettingsState((prev) => ({
      //     ...prev,
      //     userInvoices: [...prev.userInvoices, validatedData.data],
      //   }));
      // }
    }
    // router.back();
  }
  return (
    <Form {...form}>
      <div
        className={cn(
          "duration-500 w-full sm:absolute sm:top-0 sm:-translate-x-full grid sm:grid-cols-[minmax(0,_616px)_auto] lg:grid-cols-[minmax(0,_719px)_auto] overflow-y-scroll z-[5] min-h-full",
          {
            "sm:translate-x-0": isInvoiceEdit,
          }
        )}
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[616px] sm:w-[616px] lg:ml-[103px] sm:min-h-[calc(100vh_-_80px)] lg:h-fit flex flex-col rounded-tr-[20px] dark:bg-12 bg-white"
        >
          <div className="px-6 sm:p-14 flex flex-col gap-5">
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
                  <FormItem className="flex flex-col w-full justify-between">
                    <FormLabel className="text-07 dark:text-05 text-bodyVariant mt-1">
                      Invoice Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div
                            className={cn(
                              "text-headingS py-3 px-3 border-[1px] border-transparent rounded focus:border-01 focus:border-[1px] outline-none caret-01 mb-6 sm:mb-0 flex items-center justify-between peer-hover:border-01 hover:border-01 cursor-pointer text-black bg-05 dark:text-white dark:bg-03"
                            )}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : format(new Date(), "PPP")}

                            <CiCalendar className="text-[1.3rem] text-07 left" />
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
                          className="sm:col-start-2 sm:row-start-2 px-3 border-[1px] rounded focus:border-01 focus:border-[1px] outline-none text-body font-bold w-full hover:border-01 inline-flex items-center h-[48px] justify-between mb-4 z-[25] border-05 bg-05 text-black dark:bg-04 dark:text-white"
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
              <h3 className="text-headingS text-[#777F98] sm:mb-4">
                Item List
              </h3>
              <div className="hidden list-none sm:grid gap-x-4 grid-cols-[minmax(0,_.5fr)_minmax(0,_.7fr)_minmax(0,_.7fr)_minmax(0,_.3fr)] sm:grid-cols-[minmax(0,_1.6fr)_minmax(0,_.4fr)_minmax(0,_.7fr)_minmax(0,_.7fr)_minmax(0,_.2fr)] items-center">
                <p className="text-bodyVariant mb-2 text-07 dark:text-06">
                  Item name
                </p>
                <p className="text-bodyVariant mb-2 text-07 dark:text-06">
                  Qty.
                </p>
                <p className="text-bodyVariant mb-2 text-07 dark:text-06">
                  Price
                </p>
                <p className="text-bodyVariant mb-2 text-07 dark:text-06">
                  Total
                </p>
              </div>
              {fields.map((item, index) => (
                <li
                  key={item.id}
                  className="list-none grid gap-x-4 grid-cols-[minmax(0,_.5fr)_minmax(0,_.7fr)_minmax(0,_.7fr)_minmax(0,_.3fr)] sm:grid-cols-[minmax(0,_1.6fr)_minmax(0,_.4fr)_minmax(0,_.7fr)_minmax(0,_.7fr)_minmax(0,_.2fr)] items-center
            "
                >
                  <FormField
                    control={form.control}
                    name={`items.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="col-span-4 sm:col-span-1 mb-4 sm:mb-0">
                        <div className="flex justify-between">
                          <FormLabel className="sm:hidden mt-6">
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
                            error={
                              form.formState.errors.items?.[index]?.quantity
                            }
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
                    <p className="text-bodyVariant text-07 dark:text-06 sm:hidden">
                      Total
                    </p>
                    <p className="text-headingS py-3 px-3 border-[1px] truncate mt-2 border-transparent rounded focus:border-01 w-full text-06">
                      {(
                        form.watch(`items.${index}.price`) *
                        form.watch(`items.${index}.quantity`)
                      ).toFixed(2)}
                    </p>
                  </div>

                  <MdDelete
                    onClick={() => remove(index)}
                    className="text-[1.5rem] col-start-4 sm:col-start-5 h-[49.33px] cursor-pointer text-06 hover:text-09 self-end"
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
                <p className="text-09 text-[.625rem] mb-2">
                  - All fields must be added
                </p>
              )}
              {form.formState.errors.items?.message && (
                <p className="text-09 text-[.625rem] mb-2">
                  - An item must be added
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between p-4 sm:px-14 sm:pb-8 gap-3 mt-auto rounded-br-[20px] dark:bg-03 dark:sm:bg-12">
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
                  onClick={() => setActiveInvoiceStatus("paid")}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={isDarkMode ? "lightDarkMode" : "light"}
                  type="button"
                  className="sm:mr-auto w-[50%] sm:w-auto"
                  onClick={closeFormInput}
                >
                  Discard
                </Button>
                <Button
                  variant={isDarkMode ? "darkDarkMode" : "dark"}
                  onClick={() => setActiveInvoiceStatus("draft")}
                  className="w-[100%] sm:w-auto"
                >
                  Save as Draft
                </Button>
                <Button
                  loading={isPending}
                  disabled={isPending}
                  variant="violet"
                  onClick={() => setActiveInvoiceStatus("paid")}
                  className="w-[100%] sm:w-auto min-w-[110px]"
                >
                  Save & Send
                </Button>
              </>
            )}
          </div>
        </form>
        <div
          onClick={closeFormInput}
          className={cn("delay-200 duration-500 h-full", {
            "bg-black/35": isInvoiceEdit,
          })}
        ></div>
      </div>
    </Form>
  );
}
