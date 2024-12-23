"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartItemComponent } from "@/components/cart/cart-item";
import useCartStore from "@/store/cart"; // Assuming this is the path to your store

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotal,
  } = useCartStore();

  const totalPrice = getTotal();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
      {cart.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8 text-center">
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mb-4 text-muted-foreground">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-2 p-6">
            {cart.map((item) => (
              <div key={item.id}>
                <CartItemComponent
                  item={item}
                  onUpdateQuantity={(id, quantity) => updateQuantity(id, quantity)}
                  onRemove={(id) => removeFromCart(id)}
                />
                <Separator className="my-4" />
              </div>
            ))}
          </Card>
          <Card className="h-fit p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>€{(totalPrice / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>€{(totalPrice).toFixed(2)}</span>
              </div>
            </div>
            <Button className="mt-6 w-full" onClick={clearCart}>
              Proceed to Checkout
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}