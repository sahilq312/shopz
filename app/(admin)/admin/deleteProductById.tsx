"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"

import { useRouter } from "next/navigation"
import { deleteProduct } from "@/actions/deleteproduct"
import { Button } from "@/components/ui/button"

export function DeleteProductButton({
  id,
}: {
  id: string
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <Button
    className="bg-red-700"
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id)
          router.refresh()
        })
      }}
    >
      Delete
    </Button>
  )
}




/* "use client";

import { addToCart } from "@/actions/cart";
import { deleteProduct } from "@/actions/deleteproduct";
import { useState, useTransition } from "react";

interface DeleteProductById {
  productId: string;
}

export default function DeleteProductButton({ productId }: DeleteProductById) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn-primary btn"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await deleteProduct(productId);
            setSuccess(true);
          });
        }}
      >
        Delete
      </button>
      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to Cart.</span>
      )}
    </div>
  );
}
 */