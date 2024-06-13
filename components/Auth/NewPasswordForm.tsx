import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChangePasswordSchema } from "@/schemas";
import { MdEmail } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import FormError from "@/components/Auth/FormError";
import FormSuccess from "@/components/Auth/FormSuccess";
import useCurrentUser from "@/hooks/useCurrentUser";
import { changePassword } from "@/actions/changePassword";
import CollapsibleContentWrapper from "@/components/ui/CollapsibleContentWrapper";
export default function NewPasswordForm() {
  const userId = useCurrentUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    setError("");
    setSuccess("");
    const validatedFields = ChangePasswordSchema.safeParse(values);
    if (!validatedFields.success) setError("Invalid credentials");
    startTransition(() => {
      if (userId) {
        changePassword(userId, values).then((res) => {
          setError(res?.error);
          setSuccess(res?.success);
        });
      }
    });
  };
  return (
    <CollapsibleContentWrapper buttonTriggerLabel="Change Password">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Current Password</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <div className="relative overflow-hidden">
                    <Input
                      type="password"
                      className="pl-10 focus:pl-4 peer duration-100 dark:bg-04"
                      placeholder="Current Password"
                      error={form.formState.errors.currentPassword}
                      {...field}
                    />
                    <MdEmail className="absolute top-[27%] left-2 size-5 text-06 peer-focus:-translate-x-[140%] duration-100" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>New Password</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <div className="relative overflow-hidden">
                    <Input
                      type="password"
                      className="pl-10 focus:pl-4 peer duration-100 dark:bg-04"
                      placeholder="New Password"
                      error={form.formState.errors.newPassword}
                      {...field}
                    />
                    <MdEmail className="absolute top-[27%] left-2 size-5 text-06 peer-focus:-translate-x-[140%] duration-100" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Repeat New Password</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <div className="relative overflow-hidden">
                    <Input
                      type="password"
                      className="pl-10 focus:pl-4 peer duration-100 dark:bg-04"
                      placeholder="Repeat New Password"
                      error={form.formState.errors.confirmNewPassword}
                      {...field}
                    />
                    <MdEmail className="absolute top-[27%] left-2 size-5 text-06 peer-focus:-translate-x-[140%] duration-100" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            loading={isPending}
            disabled={isPending}
            variant="violet"
            className="w-[100%] sm:w-auto min-w-[110px]"
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
