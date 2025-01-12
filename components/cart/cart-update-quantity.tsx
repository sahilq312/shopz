"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { updateQuantity } from "@/actions/cart";
import { CartItem } from "@prisma/client";

interface UpdateQuantityProps { 
  item: CartItem;
}

export const UpdateQuantity = ({ item }: UpdateQuantityProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      await updateQuantity(item.id, newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      handleUpdateQuantity(newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleUpdateQuantity(quantity - 1)}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        min="1"
        value={quantity}
        className="h-8 w-14 text-center"
        onChange={handleInputChange}
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleUpdateQuantity(quantity + 1)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};