import React from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 w-64">
    { products.map((product) => (
      <ProductCard product={product} key={product.id} />
    ))}
  </div>
  );
};

export default ProductList;
