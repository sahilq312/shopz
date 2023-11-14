import connect from "@/lib/db";
import Product from "@/model/product";
import { NextResponse } from "next/server";

export const POST = async (req : Request) => {
    await connect()
    const { title, image,price, description,category } : Partial<Product> = await req.json();
    try {
        const newProduct = new Product({
            title, description, image, category, price
        })
        await newProduct.save();
        return NextResponse.json(newProduct,{status: 200})
    } catch (error) {
        return NextResponse.json(error, {status:500})
    }
}

export const GET = async()=> {
    try {
        const products = await Product.find();
        return NextResponse.json(products, {status:200})
    } catch (error) {
        return NextResponse.json(error, {status: 500})
    }
}