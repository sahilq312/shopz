"use client"

import useCartStore from "@/store/cart"
import Link from "next/link"

const CartNumbers = () => {
    const {cart} = useCartStore()
    return (
        <Link href={"/cart"} className=" flex gap-1">
            <p>Cart</p>
            <span className="text-sm">{cart.length}</span>
        </Link>
    )
}

export default CartNumbers;