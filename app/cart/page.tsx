import { getCart } from "@/actions/cart";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import CartEntry from "./CartEntry";

export default async function cart() {
  const session = await auth();
  const userId = session?.user.id;
  if (userId) {
    const cart = await getCart(userId);
    //console.log(cart);

    return (
      <div className="flex flex-col items-center w-screen">
        <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
        
        {cart?.cartItem?.map((cartItem) =>(
            <CartEntry 
            cartItem={cartItem}
            key={cartItem.id}/>
        ))}
        {/* {JSON.stringify(cart)} */}
        {!cart?.cartItem?.length && <p>Your cart is empty</p>}
        <div className=" flex flex-col items-end sm:items-center">
            <p className="mb-3 font-bold">
                Total : {cart?.subtotal || 0}
            </p>
          <Button className="btn-primary btw sm:w-[200px]">Checkout</Button>
        </div>
      </div>
    );
  }
}
