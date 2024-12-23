"use client";
import { admin } from "@/actions/admin";
import { auth } from "@/auth";
import { toast } from "sonner";
import AdminNavbar from "@/components/admin/Navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <AdminNavbar /> */}
      {children}
    </>
  );
};

export default AdminLayout;
