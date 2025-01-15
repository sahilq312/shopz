"use server";

import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
export const admin = async () => {
    const role = await currentRole()
    if (role === UserRole.ADMIN) {
    return { success : "Allowed Admin"}
}
return { error : "not allowed"}
}


export async function BecomeAdmin(email : string) {
    try {
        const user = await db.user.update({
        where: {
            email : email
        },
        data: {
            role : "ADMIN"
        }
    })
        return { success: "You are an admin now" }
    }
    catch (error) {
        return {error : "Error "}
    }
}