"use server"

import { db } from "@/lib/db";
import { ProductSchema } from "@/schema";
import * as z from "zod";

export const add = async (values: z.infer<typeof ProductSchema>) => {
    const validatedFields = ProductSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid field!" };
    }

    const { title, description, price, category, image, quantity } = validatedFields.data;

    try {
        const newProduct = await db.product.create({
            data: {
                title : title,
                description :description,
                price :price,
                category : category,
                quantity : quantity,
                image : image,
            },
        });

        return { success: "Product created successfully", newProduct };
    } catch (error) {
        console.error("Error creating product:", error);
        return { error: "Failed to create product" };
    }
};
