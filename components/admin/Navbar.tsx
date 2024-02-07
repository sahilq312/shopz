import Link from "next/link"

const AdminNavbar = () => {
    return (
        <nav className=" w-screen flex justify-center items-center h-20 p-4 bg-gray-400">
            <ul className="flex justify-center gap-8 font-bold text-xl">
            <Link href={"/admin"}>Edit</Link>
            <Link href={"/admin/add"}>Add</Link>
            </ul>
        </nav>
    )
}
export default AdminNavbar;