import Link from "next/link";
import { ModeToggle } from "./toggle";
import { ShoppingCartIcon } from "lucide-react";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  if (session) {
    return (
      <nav className="flex h-20 justify-center items-center gap-7">
        <Link href={"/"}>Home</Link>
        <Link href={"/admin"}>Admin</Link>
        <Link href={"/setting"}>Profile</Link>
        <Link href={"/cart"}>
          <ShoppingCartIcon />
        </Link>
        <ModeToggle />
      </nav>
    );
  }
};
export default Navbar;
