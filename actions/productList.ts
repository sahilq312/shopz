" use server "

import { db } from "@/lib/db"

export const List = async()=> {
    
        const list = await db.product.findMany()
        return list
        
    
}