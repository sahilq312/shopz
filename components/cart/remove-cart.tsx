"use client";

import { useState } from "react";
import { Trash2, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { removeFromCart } from "@/actions/cart";

interface RemoveCartItemProps { 
  itemId: string;
}

export const RemoveCartButton = ({ itemId }: RemoveCartItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);
    try {
      await removeFromCart(itemId);
      // Optionally, you can add a callback to update the UI after removal
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isConfirming ? (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsConfirming(false)}
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={handleRemove}
            disabled={isLoading}
          >
            {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive"
          onClick={() => setIsConfirming(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};