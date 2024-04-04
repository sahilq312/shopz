"use server"
import * as z from "zod";
import { RegisterSchema } from "@/schema";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid field!" }
    }
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return { error: "Email already exists" }
    }

    const newUser = await db.user.create({
        data: { email, password : hashedPassword, name }
    })
    await db.cart.create({
        data : {
            userId : newUser.id,
        }
    })
    return { success: "Email sent" }

}