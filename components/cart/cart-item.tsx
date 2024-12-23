import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { CartItem } from "@/store/cart";

interface CartItemProps {
  item: CartItem; // The individual cart item details, including title, price, quantity, and more.
  onUpdateQuantity: (id: string, quantity: number) => void; // A function to update the item's quantity in the cart.
  onRemove: (id: string) => void; // A function to remove the item from the cart.
}


export function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center space-x-4 py-4">
      <div className="relative h-16 w-16 overflow-hidden rounded">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 space-y-1">
        <Link href={`/products/${item.id}`} className="font-medium hover:underline">
          {item.title}
        </Link>
        <p className="text-sm text-muted-foreground">
          €{(item.price / 100).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
          className="h-8 w-14 text-center"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
