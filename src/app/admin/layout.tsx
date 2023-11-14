import AdminNavbar from "@/component/AdminNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (<>
  <AdminNavbar/>
  {children}</>);
}
