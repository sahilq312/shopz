import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
  try {
    // Use the `delete` method of the Prisma client to delete the product
    await db.product.delete({
      where: {
        id: productId,
      },
    });
    
    // Return a success message or handle the deletion completion
    return { success: true, message: "Product deleted successfully" };
    
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting product:", error);
    return { success: false, message: "Failed to delete product" };
  }
}
