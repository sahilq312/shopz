import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
import { List } from "@/actions/productList";
import ProductList from "@/components/product/productList";
import Image from "next/image";
import { title } from "process";
import { Router, useRouter } from "next/router";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function Home() {
  const products = await List();
  return (
    <div className="space-y-4 p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="bg-slate-900 group cursor-pointer rounded-xl border p-3 space-y-4"
          >
            <div className="aspect-square rounded-xl bg-gray-100 relative">
              <Image
                className="rounded-md"
                src={product.image}
                alt={product.title}
                fill
                unoptimized
              />
            </div>
            <div>
              <p className="font-semibold text-lg">{product.title}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
            {/* Price & Reiew */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">₹{product.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
