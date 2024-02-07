" use server"

import { db } from "@/lib/db"

export const ProductDetail = async(productId : string) => {
    const product = await db.product.findUnique({ where: {id: productId}})
    return product;
}