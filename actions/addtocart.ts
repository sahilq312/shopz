"use server"

import { db } from "@/lib/db";
import { cookies } from "next/headers";



export const addtocart = async(userId : string, productId : string ) => {
    const cookiesStore = cookies();
    const cartId = cookiesStore.get("cartId");
    try {
        
    } catch (error) {
        console.log("Failed to addtocart", error);
        
        return { error: "failed to addtocart"}
    }
}