import Link from "next/link"
import { ModeToggle } from "./toggle"

const Navbar = ()=> {
    return (
        <nav className="flex h-20 justify-center items-center gap-7">
            <Link href={"/"}>Home</Link>
            <Link href={"/admin"}>Admin</Link>
            <Link href={"/setting"}>Profile</Link>
            <ModeToggle/>
        
        </nav>
    )
}
export default Navbar