"use server"

import { db } from "@/lib/db";
import { cookies } from "next/headers";



export async function getCart(userId: string) {
    let cartId = cookies().get('localCartId')?.value;
    if (!cartId) {
        const userCart = await db.cart.findFirst({ where: { userId: userId } });
        if (userCart) {
            cartId = userCart.id;
            cookies().set('localCartId', cartId);
        } else {
            return null;
        }
    }

    try {
        const cart = await db.cart.findUnique({
            where: {
                id: cartId,
            },
            include: { cartItem: { include: { product: true } } }
        });

        return {
            ...cart,
            subtotal: cart?.cartItem.reduce((acc, item) => acc + item.product.price, 0),
            productCount: cart?.cartItem.length
        };
    } catch (error) {
        return null;
    }
}

export async function addToCart(productId: string,) {
    const cartId = cookies().get("localCartId")?.value;
    try {
        if (!cartId) {
            return null;
        }
        const cartitem = await db.cartItem.create({
            data: {
                productId: productId,
                cartId: cartId,
            }
        })
    } catch (error) {
        return null;
    }
}

export async function removeFromCart(cartItemId: string) {
    const cartId = cookies().get("localCartId")?.value;

    try {
        if (!cartId) {
            return null;
        }
        const cartItem = await db.cartItem.delete({
            where: {
                cartId: cartId,
                id: cartItemId,
            }
        })
    } catch (error) {
        return null;
    }
}

export async function createCart(userId : string){
    const cart = await db.cart.create({
        data: {
            userId : userId
        },
      });
    cookies().set("localCartId", cart.id);
    return {
        ...cart,
        items : [],
        size : 0,
        subtotal : 0
    }
}