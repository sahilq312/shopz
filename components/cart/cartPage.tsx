import { auth } from "@/auth";
import { db } from "@/lib/db";
import NextAuth from "next-auth";

/* const cartItems = {
  cart : [],
  subtotal :  0,
  total : 0,

} */



const Cartpage = async () => {
  const session = await auth();

  return (
    <>cart</>
  )
};

export default Cartpage;
