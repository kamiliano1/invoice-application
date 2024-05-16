"use client";
import { RegisterSchema } from "@/schemas";
import CardWrapper from "@/components/Auth/CardWrapper";
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
import { FaLock, FaUnlockKeyhole } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import FormSuccess from "@/components/Auth/FormSuccess";
import FormError from "@/components/Auth/FormError";
import { register } from "@/actions/register";
export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    const validatedData = RegisterSchema.safeParse(values);
    if (!validatedData.success) setError("Invalid credentials");
    startTransition(() => {
      register(values)
        .then((res) => {
          setError(res.error);
          setSuccess(res.success);
        })
        .catch(() => setError("Something went wrong"));
    });
    return;
  };
  return (
    <CardWrapper
      headerLabel="Register"
      headerDescription="Let's get you started"
      redirectButtonDescription="Already have an account?"
      redirectButtonLabel="Login"
      redirectLink="/login"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Repeat Password</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <div className="relative overflow-hidden">
                    <Input
                      type="password"
                      className="pl-10 focus:pl-4 peer duration-100 dark:bg-04"
                      placeholder="Repeat password"
                      error={form.formState.errors.confirmPassword}
                      {...field}
                    />
                    <FaUnlockKeyhole className="absolute top-[27%] left-2 size-5 text-06 peer-focus:-translate-x-[140%] duration-100" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button loading={isPending} className="w-full" variant={"violet"}>
            Register
          </Button>
          <FormSuccess message={success} />
          <FormError message={error} />
        </form>
      </Form>
    </CardWrapper>
  );
}
