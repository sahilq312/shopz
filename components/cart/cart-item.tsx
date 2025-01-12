import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { removeFromCart, updateQuantity } from "@/actions/cart";
import { RemoveCartButton } from "./remove-cart";
import { UpdateQuantity } from "./cart-update-quantity";
//import { CartItem, Product } from "@/store/cart";

/* interface CartItemProps {
  item: Product; // The individual cart item details, including title, price, quantity, and more.
  onUpdateQuantity: (id: string, quantity: number) => void; // A function to update the item's quantity in the cart.
  onRemove: (id: string) => void; // A function to remove the item from the cart.
} */

interface CartItemComponentProps {
   item : CartItem;
 } 

interface CartItem { 
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: {
    title: string;
    price: number;
    image: string;
    quantity: number;
  }
}

export function CartItemComponent({ item }: CartItemComponentProps) { 
  return (
    <div className="flex items-center space-x-4 py-4" key={item.id}>
      <div className="relative h-16 w-16 overflow-hidden rounded">
        <Image
          src={item.product.image}
          alt={item.product.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 space-y-1">
        <Link href={`/products/${item.id}`} className="font-medium hover:underline">
          {item.product.title}
        </Link>
        <p className="text-sm text-muted-foreground">
          €{(item.product.price / 100).toFixed(2)}
        </p>
      </div>
      <UpdateQuantity item={item}/>
      <RemoveCartButton itemId={item.id} />
    </div>
  )
}

