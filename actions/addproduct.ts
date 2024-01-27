"use server"

import { db } from "@/lib/db";
import { ProductSchema } from "@/schema"
import * as z from "zod"

export const addProduct = async( value : z.infer<typeof ProductSchema> )=>{
    const validatedFields = ProductSchema.safeParse(value);

    if (!validatedFields.success) {
        return { error: "Invalid field!" }
    }
    const { title, description, price, category, image } = validatedFields.data;

    try {
        const product = await db.product.create({
            data : {
                title,
                description,
                price,
                category,
                image
            }
        })
        return { success : " product created successfully"}
        
    } catch (error) {
        return { error: "product not added" }
    }
}