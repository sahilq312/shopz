import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {


    try {
        const { title, description, category, price, image, quantity }: Product = await request.json();

        await db.product.create({
            data: {
                title, description, category, price, image, quantity
            }
        });

        return NextResponse.json({
            status: 200,
            body: { message: "Product created successfully" }
        });
    } catch (error) {
        return NextResponse.json({ status: 500, message: "server error" });
    }
}
