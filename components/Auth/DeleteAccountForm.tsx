import CollapsibleContentWrapper from "@/components/ui/CollapsibleContentWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormError from "@/components/Auth/FormError";
import FormSuccess from "@/components/Auth/FormSuccess";
import { Button } from "@/components/ui/button";
import { DeleteUserSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MdEmail } from "react-icons/md";
import DeleteModalWrapper from "@/components/ui/DeleteModalWrapper";
import useCurrentUser from "@/hooks/useCurrentUser";
import { deleteUser } from "@/actions/deleteUser";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function DeleteAccountForm() {
  const form = useForm<z.infer<typeof DeleteUserSchema>>({
    resolver: zodResolver(DeleteUserSchema),
    defaultValues: { currentPassword: "" },
  });
  const userId = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { update } = useSession();
  const router = useRouter();
  const deleteAccountModalRef = useRef<HTMLButtonElement>(null);
  const onSubmit = (value: z.infer<typeof DeleteUserSchema>) => {};
  const deleteUserForever = () => {
    setError("");
    setSuccess("");
    startTransition(() => {
      if (userId) {
        deleteUser(userId, {
          currentPassword: form.getValues("currentPassword"),
        }).then((res) => {
          setError(res?.error);
          if (res.success) {
            setSuccess(res?.success);
            signOut();
            update();
            router.push("/login");
          }
        });
      }
    });
  };
  return (
    <CollapsibleContentWrapper buttonTriggerLabel="Delete account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button
            onClick={() => deleteAccountModalRef.current?.click()}
            variant="red"
            className="w-full my-5"
            loading={isPending}
          >
            Delete Account
          </Button>
          <DeleteModalWrapper
            deleteModalRef={deleteAccountModalRef}
            disabled={
              form.getValues("currentPassword").length < 1 ? true : false
            }
            buttonTriggerLabel="Delete Account"
            modalDescription={`Are you sure you want to delete your account? This action cannot be undone.`}
            modalTitle="Confirm User Deletion"
            deleteModalAction={deleteUserForever}
            className="my-5 w-full hidden"
            loading={isPending}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </CollapsibleContentWrapper>
  );
}
