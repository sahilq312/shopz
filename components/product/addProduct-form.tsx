"use client";
import * as z from "zod";
import { ProductSchema } from "@/schema";

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
import { useState, useTransition } from "react";
import addProduct from "@/app/(protected)/admin/add/page";
import { add } from "@/actions/addproduct";
const AddProduct = () => {
  const [isPending, startTranstion] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: "",
      price: 0,
    },
  });

  const addproduct = async(values: z.infer<typeof ProductSchema>) => {
    startTranstion(()=> {
      add(values).then((data) =>{
        if (data.error) {
          setError(data.error)
        }
        if (data.success) {
          setSuccess(data.success)
        }
      })
    })
    
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(addproduct)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="title"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="suii@gmail.com"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder=""
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="image"
                      type="url"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>category</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="suii@gmail.com"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Create Product
            </Button>
          </div>
        </form>
      </Form>
    </div>
    //</CardWrapper>
  );
};
export default AddProduct;
