"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getCart = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return { error: "User not authenticated" };
  }

  try {
    const cart = await db.cart.findFirst({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        cartItems: {
          select: {
            id: true,
            productId: true,
            quantity: true,
            product: {
              select: {
                title: true,
                price: true,
                image: true,
                quantity: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      const newCart = await db.cart.create({
        data: {
          userId: userId,
        },
        select: {
          id: true,
          cartItems: {
            select: {
              id: true,
              productId: true,
              quantity: true,
              product: {
                select: {
                  title: true,
                  price: true,
                  image: true,
                  quantity: true,
                },
              },
            },
          },
        },
      });
      return { success: newCart };
    }

    return { success: cart };
  } catch (error) {
    return { error: "An error occurred while fetching the cart" };
  }
};

export const addToCart = async (productId: string, quantity: number) => {
  if (!productId || quantity <= 0) {
    return { error: "Invalid product ID or quantity" };
  }

  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return { error: "User not authenticated" };
  }

  try {
    // Get or create the user's cart
    let cart = await db.cart.findFirst({
      where: { userId: userId },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: { userId: userId },
      });
    }

    // Check if the item already exists in the cart
    const existingItem = await db.cartItem.findFirst({
      where: {
        productId: productId,
        cartId: cart.id,
      },
    });

    if (!existingItem) {
      // Add new item to the cart
      const newItem = await db.cartItem.create({
        data: {
          productId: productId,
          quantity: quantity,
          cartId: cart.id,
        },
      });
      return { success: newItem };
    }

    // Update quantity of the existing item
    const updatedItem = await db.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
    return { success: updatedItem };
  } catch (error) {
    return { error: "An error occurred while adding to the cart" };
  }
};

export const updateQuantity = async (itemId: string, quantity: number) => {
  if (!itemId || quantity < 0) {
    return { error: "Invalid item ID or quantity" };
  }

  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return { error: "User not authenticated" };
  }

  try {
    const item = await db.cartItem.findFirst({
      where: {
        id: itemId,
        cart: {
          userId: userId,
        },
      },
    });

    if (!item) {
      return { error: "Item not found in user's cart" };
    }

    if (quantity === 0) {
      await db.cartItem.delete({
        where: { id: itemId },
      });
      return { success: "Item removed from the cart" };
    }

    const updatedItem = await db.cartItem.update({
      where: { id: itemId },
      data: { quantity: quantity },
    });
    return { success: updatedItem };
  } catch (error) {
    return { error: "An error occurred while updating the item quantity" };
  }
};

export const removeFromCart = async (itemId: string) => { 
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) {
      return { error: "User not authenticated" };
    }
    try {
        const item = await db.cartItem.findFirst({
            where: {
                id: itemId,
                cart: {
                    userId: userId,
                },
            },
        });
        if (!item) {
            return { error: "Item not found in user's cart" };
        }
        await db.cartItem.delete({
            where: { id: itemId },
        });
        revalidatePath("/cart");
        return { success: "Item removed from the cart" };
    } catch (error) {
        return { error: "An error occurred while removing the item from the cart" };
    }
}