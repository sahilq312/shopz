"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AddToCartButton from "@/components/cart/cart-button";

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface ProductDetailsClientProps {
  product: Product;
}

const ProductDetailsClient: React.FC<ProductDetailsClientProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrement = () => {
    if (quantity < product.quantity) setQuantity((prev) => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(1, parseInt(e.target.value) || 1), product.quantity);
    setQuantity(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="h-full w-full object-cover"
            priority
          />
        </Card>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Description</Label>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>
          <div className="space-y-2">
            <Label>Price</Label>
            <p className="text-2xl font-bold">€{(product.price / 100).toFixed(2)}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label>Quantity</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleDecrement}
                  disabled={quantity === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  max={product.quantity}
                  className="h-8 w-20"
                  value={quantity}
                  onChange={handleInputChange}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleIncrement}
                  disabled={quantity >= product.quantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.quantity} available
              </span>
            </div>
            <AddToCartButton product={product} quantity={quantity} />
          </div>
          <Separator />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsClient;
