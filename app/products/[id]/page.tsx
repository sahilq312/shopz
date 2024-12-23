// app/product/[id]/page.tsx (Server Component)
import { ProductDetail } from "@/actions/productDetails";
import ProductDetailsClient from "@/components/product/product-detail";
import { notFound } from "next/navigation";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const productId = params.id;
  const product = await ProductDetail(productId);

  if (!product) {
    return notFound();
  }

  return <ProductDetailsClient product={product} />;
};

export default ProductDetails;
