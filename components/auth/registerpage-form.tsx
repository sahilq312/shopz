"use client";
import * as z from "zod";
import { RegisterSchema } from "@/schema";
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
import { register } from "@/actions/register";
import { Github } from "lucide-react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import AuthBackground from "./background";
import { Social } from "./social";
const RegisterForm = () => {
  const [isPending, startTranstion] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTranstion(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className="relative hidden lg:block">
       <AuthBackground/>
        <div className="relative z-10 flex flex-col h-full p-8">
          <div className="flex items-center gap-2 text-white">
            <div className="h-6 w-6 rounded-full border-2 border-white" />
            <span className="text-lg font-semibold">Shopz</span>
          </div>
          <div className="flex flex-col justify-center flex-1 text-white px-8">
            <h1 className="text-4xl font-semibold mb-4">Get Started with Us</h1>
            <p className="text-lg text-white/80 mb-8">
              Complete these easy steps to register your account.
            </p>
            <div className="space-y-4">
              <Button
                variant="secondary"
                className="w-full justify-start text-left bg-white"
              >
                <span className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-sm">
                    1
                  </span>
                  Sign up your account
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center p-8 bg-black text-white">
        <div className="max-w-md w-full mx-auto space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold">Sign Up Account</h2>
            <p className="text-zinc-400">
              Enter your personal data to create your account.
            </p>
          </div>

          <div className=" ">
            <Social/>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-zinc-400">Or</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-zinc-400">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="eg. John"
                        className="bg-zinc-900 border-zinc-800 placeholder:text-zinc-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-zinc-400">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="eg. johnfrans@gmail.com"
                        type="email"
                        className="bg-zinc-900 border-zinc-800 placeholder:text-zinc-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-zinc-400">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter your password"
                        type="password"
                        className="bg-zinc-900 border-zinc-800 placeholder:text-zinc-500"
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-zinc-400">Must be at least 8 characters.</p>
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-white text-black hover:bg-zinc-200"
              >
                {isPending ? "Creating..." : "Sign Up"}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
