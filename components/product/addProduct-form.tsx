"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { add } from "@/actions/addproduct";
import { useState } from "react";
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";

const productSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  description: z.string({
    required_error: "Please select an email to display.",
  }),
  price: z.string().transform((v) => Number(v) || 0),
  category: z.string().min(2, { message: "Add more to bio" }),
  image: z.string().url(),
});

type ProductFormValues = z.infer<typeof productSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProductFormValues> = {
  title: "Product Name",
  description: "Product Description",
  price: 0,
  category: "",
  image: "",
};

export function ProductForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProductFormValues) {
    //add(data)
    console.log(data);
    add(data).then((data) => {
      if (data.error) {
        setError(data.error);
        console.log("product error");
      }
      if (data.success) {
        setSuccess(data.success);
        console.log("success");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public product name. It can be your real name .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Write a description for the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} type="number" />
              </FormControl>
              <FormDescription>Add a price</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Add a category .</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image url</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} type="url" />
              </FormControl>
              <FormDescription>Add a image url .</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit">Create a product</Button>
      </form>
    </Form>
  );
}
