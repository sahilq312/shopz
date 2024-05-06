"use server"

import { db } from "@/lib/db";

/* export async function deleteProduct(productId: string) {
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
    return { error: false, message: "Failed to delete product" };
  }
} */
export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } })

  //if (product == null) return notFound()

  /* await fs.unlink(product.filePath)
  await fs.unlink(`public${product.imagePath}`) */

  /* revalidatePath("/")
  revalidatePath("/products") */
  return { success: true, message: "Product deleted successfully" };

}