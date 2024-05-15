"use client";
import CardWrapper from "@/components/Auth/CardWrapper";
import { LoginSchema } from "@/schemas";
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
import { FaLock } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSuccess from "@/components/Auth/FormSuccess";
import FormError from "./FormError";
export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {};
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
          <Button className="w-full" variant={"violet"}>
            Login
          </Button>
          <FormSuccess message="User created" />
          <FormError message="Something went wrong" />
        </form>
      </Form>
    </CardWrapper>
  );
}
