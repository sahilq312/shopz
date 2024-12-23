import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id : string,
    title: string
    description: string
    price: number
    image: string
    color?: string
  }
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      key={product.id}
      href={`/products/${product.id}`}
      className={cn("group block", className)}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
        <div className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ backgroundColor: product.color }} />
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium">{product.title}</h3>
        <p className="text-xs text-muted-foreground">{product.description}</p>
        <p className="text-sm font-medium">€{product.price.toFixed(2)}</p>
      </div>
    </Link>
  )
}
