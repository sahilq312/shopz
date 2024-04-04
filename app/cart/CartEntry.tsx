"use client";

//import { CartItemWithProduct } from "@/lib/db/cart";
//import { formatPrice } from "@/lib/format";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: { product: true };
  }>;

  export function formatPrice(price: number) {
    return (price / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}

export default function CartEntry({
  cartItem: { product }
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-3 justify-evenly">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={"/products/" + product.id} className="font-bold">
            {product.title}
          </Link>
          <div>Price: {formatPrice(product.price)}</div>
          
          <div className="flex items-center gap-3">
            Total: {formatPrice(product.price)}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}