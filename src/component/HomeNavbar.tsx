import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";

const NavBar =async()=> {
    const session = await getServerSession(authOptions)
    return(
        <nav>
            {session ? 
            (<nav>
                <Link href={"/"}><h1>Home</h1></Link>
                <Link href={"/product"}><h1>Products</h1></Link>
                <Link href={"/admin"}><h1>Admin</h1></Link>
            </nav>)
             :
             ( <nav>
                <Link href={"/login"}>
                <h1>Login</h1></Link>
                <Link href={"/register"}>
                <h1>Register</h1></Link>
             </nav>)}
        </nav>
    )
}
export default NavBar;