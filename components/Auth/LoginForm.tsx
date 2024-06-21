"use client";
import CardWrapper from "@/components/Auth/CardWrapper";
import { InvoicesSchema, LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEmail } from "react-icons/md";
import { signIn, signOut } from "next-auth/react";
import { FaLock } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSuccess from "@/components/Auth/FormSuccess";
import FormError from "@/components/Auth/FormError";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import { useSession } from "next-auth/react";
import { getUserInvoicesById } from "@/data/invoices";
import { getUserAvatar, getUserByEmail } from "@/data/user";
import { settingsAppState, userInvoicesState } from "@/atoms/settingsAppAtom";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRecoilState, useRecoilValue } from "recoil";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
export default function LoginForm() {
  const { data } = useSession();
  const userId = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [settingsState, setSettingsState] = useRecoilState(settingsAppState);
  const { isLoaded } = useRecoilValue(userInvoicesState);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) setError("Invalid credentials");
    startTransition(() => {
      login(values)
        .then((res) => {
          setSuccess(res?.success);
          setError(res?.error);
        })
        .catch(() => setError("Something went wrong"));
    });
  };
  const router = useRouter();
  const loguj = async () => {
    await signIn("credentials", {
      email: "aaa@wp.plllll",
      password: "aaa@wp.plllll",
      redirectTo: "/",
    });
  };
  const logujj = async () => {
    login({ email: "aaa@wp.plllll", password: "aaa@wp.plllll" });

    // if (!isLoaded) {
    //   getUserInvoicesById(userId).then((res) => {
    //     if (res) {
    //       const validatedFields = InvoicesSchema.safeParse(
    //         res.filter((item) => item.status !== "draft")
    //       );
    //       if (validatedFields.success) {
    //         getUserAvatar(userId).then((response) => {
    //           setSettingsState((prev) => ({
    //             ...prev,
    //             userInvoices: res as z.infer<typeof InvoicesSchema>,
    //             isLoaded: true,
    //             avatar: response as string,
    //           }));
    //         });
    //       }
    //     }
    //   });
    // }
  };
  return (
    <CardWrapper
      headerLabel="Login"
      headerDescription="Add your details below to get back into the app"
      redirectButtonDescription="Don't have an account?"
      redirectButtonLabel="Create account"
      redirectLink="/register"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Button
            type="button"
            onClick={loguj}
            className="text-headingS text-white"
          >
            Logowanie
          </Button>
          <Button
            type="button"
            onClick={logujj}
            className="text-headingS text-white"
          >
            Logowanieee
          </Button>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Email Address</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <div className="relative overflow-hidden">
                    <Input
                      className="pl-10 focus:pl-4 peer duration-100 dark:bg-04"
                      placeholder="E-mail"
                      error={form.formState.errors.email}
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Password</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <div className="relative overflow-hidden">
                    <Input
                      type="password"
                      className="pl-10 focus:pl-4 peer duration-100 dark:bg-04"
                      placeholder="Password"
                      error={form.formState.errors.password}
                      {...field}
                    />
                    <FaLock className="absolute top-[27%] left-2 size-5 text-06 peer-focus:-translate-x-[140%] duration-100" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button loading={isPending} className="w-full" variant={"violet"}>
            Login
          </Button>
          <FormSuccess message={success} />
          <FormError message={error} />
        </form>
      </Form>
    </CardWrapper>
  );
}
