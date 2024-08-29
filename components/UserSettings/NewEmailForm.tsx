"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChangeEmailSchema } from "@/schemas";
import { MdEmail } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import FormError from "@/components/Auth/FormError";
import FormSuccess from "@/components/Auth/FormSuccess";
import { changeEmail } from "@/actions/changeEmail";

import CollapsibleContentWrapper from "@/components/ui/CollapsibleContentWrapper";
export default function NewEmailForm({
  userEmail,
}: {
  userEmail: string | null | undefined;
}) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ChangeEmailSchema>>({
    resolver: zodResolver(ChangeEmailSchema),
    defaultValues: {
      currentEmail: "",
      newEmail: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ChangeEmailSchema>) => {
    setError("");
    setSuccess("");
    const validatedFields = ChangeEmailSchema.safeParse(values);
    if (!validatedFields.success) setError("Invalid credentials");
    startTransition(() => {
      if (userEmail) {
        changeEmail(userEmail, values).then((res) => {
          setError(res?.error);
          setSuccess(res?.success);
        });
      }
    });
  };
  return (
    <CollapsibleContentWrapper buttonTriggerLabel="Change Email">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="currentEmail"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Current Email</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <div className="relative overflow-hidden">
                    <Input
                      className="peer pl-10 duration-100 focus:pl-4 dark:bg-04"
                      placeholder="Current Email"
                      error={form.formState.errors.currentEmail}
                      {...field}
                    />
                    <MdEmail className="absolute left-2 top-[27%] size-5 text-06 duration-100 peer-focus:-translate-x-[140%]" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>New Email</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <div className="relative overflow-hidden">
                    <Input
                      className="peer pl-10 duration-100 focus:pl-4 dark:bg-04"
                      placeholder="New Email"
                      error={form.formState.errors.newEmail}
                      {...field}
                    />
                    <MdEmail className="absolute left-2 top-[27%] size-5 text-06 duration-100 peer-focus:-translate-x-[140%]" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            loading={isPending}
            disabled={isPending}
            variant="violet"
            className="w-[100%] min-w-[110px] sm:w-auto"
          >
            Update
          </Button>
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </CollapsibleContentWrapper>
  );
}
