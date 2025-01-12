import { getCart } from "@/actions/cart";
import Link from "next/link"

const CartNumbers = async() => {
    const cart = await getCart();
    return (
        <Link href={"/cart"} className=" flex gap-1">
            <p>Cart</p>
            <span className="text-sm">{cart.success?.cartItems.length}</span>
        </Link>
    )
}

export default CartNumbers;