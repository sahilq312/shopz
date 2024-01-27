"use client";
import * as z from "zod";
import { LoginSchema } from "@/schema";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
  ? "Email already in use with different provider!"
  : "";
  const [isPending, startTranstion] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTranstion(() => {
      login(values).then((data) => {
        setError(data?.error);
        //setSuccess(data?.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="welcome back"
      backButtonLabel="Dont have an account"
      showSocial
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="suii@gmail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*****"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error || urlError}/>
            <FormSuccess message={success}/>
            <Button type="submit" className="w-full" disabled={isPending}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default LoginForm;