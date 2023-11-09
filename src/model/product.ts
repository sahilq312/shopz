import { Schema } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema<Product>({
    title: String,
    description: String,
    image: String,
    price: Number,
    category: String
})
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;