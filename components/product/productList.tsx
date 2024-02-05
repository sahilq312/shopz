import Image from 'next/image';
import React from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  // Check if products is undefined or null
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <div>
            <Image src={product.image} alt={product.title} />
          </div>
          <div>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;