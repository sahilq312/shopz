import { admin } from "@/actions/admin";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

export default async function Page() {
    return (
      <div className="flex items-center justify-center h-60">
        <div className="flex flex-col justify-center">
          <h1>Welcome Admin</h1>
          <div className="gap-5">
            <Button>
                <Link href={"/admin/edit"}>Edit</Link></Button>
            <Button>
            <Link href={"/admin/add"}>Add</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
