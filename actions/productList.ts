"use server";

import { db } from "@/lib/db";

export const List = async () => {
  try {
    const list = await db.product.findMany();
    return { success: list };
  } catch (error) {
    return { error: "error" };
  }
};
