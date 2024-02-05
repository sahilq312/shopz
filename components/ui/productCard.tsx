"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import * as z from "zod"
import { ProductSchema } from "@/schema";
const ProductCard = (
    data : z.infer<typeof ProductSchema>
) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data.title}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data.image}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
        />
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.title}</p>
        <p className="text-sm text-gray-500">{data.category}</p>
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <p> {data?.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
