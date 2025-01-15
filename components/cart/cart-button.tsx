"use client";

import React from "react";
import useCartStore, { Product } from "@/store/cart";

interface AddToCartButtonProps {
  product: Product;
  quantity: number; // Pass the selected quantity from the parent component
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, quantity }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product); // Pass the selected quantity
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center justify-center w-full px-4 py-2 text-white  disabled:bg-gray-400"
      disabled={product.quantity === 0 || quantity === 0}
    >
      Add {quantity} to Cart
    </button>
  );
};

export default AddToCartButton;
