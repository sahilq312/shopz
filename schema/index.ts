import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const RegisterSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6, {
        message: " minumun 6 letter required"
    }),
});

export const ProductSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.coerce.number(),
    category: z.string(),
    image: z.string().url(),
    quantity: z.coerce.number()
});

export const ProductsSchema = z.object({
    items: z.array(ProductSchema)
});