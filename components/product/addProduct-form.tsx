"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
      message: "Product name must be at least 2 characters.",
    })
    .max(50, {
      message: "Product name must not be longer than 50 characters.",
    }),
  description: z.string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not be longer than 500 characters.",
    }),
  price: z.number()
    .min(0, { message: "Price must be a positive number." })
    .max(1000000, { message: "Price must not exceed 1,000,000." }),
  category: z.string()
    .min(2, { message: "Category must be at least 2 characters." })
    .max(30, { message: "Category must not be longer than 30 characters." }),
  image: z.string().url({ message: "Please enter a valid URL." }),
});

type ProductFormValues = z.infer<typeof productSchema>;

const defaultValues: Partial<ProductFormValues> = {
  title: "",
  description: "",
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
    mode: "onBlur",
  });

  async function onSubmit(data: ProductFormValues) {
    try {
      const result = await add(data);
      if (result.error) {
        setError(result.error);
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
      if (result.success) {
        setSuccess(result.success);
        toast({
          title: "Success",
          description: result.success,
        });
        form.reset(defaultValues);
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormDescription>
                Provide a clear and concise name for your product.
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
                <Textarea 
                  placeholder="Describe your product" 
                  {...field} 
                  rows={4}
                />
              </FormControl>
              <FormDescription>
                Write a detailed description of the product features and benefits.
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
                <Input 
                  placeholder="0.00" 
                  {...field} 
                  type="number" 
                  step="0.01"
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>Set the price in your local currency.</FormDescription>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose the most appropriate category for your product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} type="url" />
              </FormControl>
              <FormDescription>Provide a URL for the product image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full">Create Product</Button>
      </form>
    </Form>
  );
}
