import { auth } from "@/auth";
import { db } from "@/lib/db";
import NextAuth from "next-auth";

const Cartpage = async () => {
  const session = await auth();

  return (
    <>cart</>
  )
};

export default Cartpage;
