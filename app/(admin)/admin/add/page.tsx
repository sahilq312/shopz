import { ProductForm } from "@/components/product/addProduct-form";


export default function addProduct(){
    return (
        <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Add New Product</h1>
        <ProductForm />
      </div>
    )
}