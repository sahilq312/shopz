"use client"

import { AspectRatio } from "../ui/aspect-ratio"

const ProductImage = (children : any) => {
    return (
        <AspectRatio ratio={16/9}>
            {children}
        </AspectRatio>
    )
}
export default ProductImage