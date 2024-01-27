import { admin } from "@/actions/admin";
import { auth } from "@/auth";
import { useSession } from "next-auth/react"
import { toast } from "sonner";

export default async function Page(){
    const user = await auth();
    const onServerActionClick = () => {
        admin()
          .then((data) => {
            if (data.error) {
              toast.error(data.error);
            }
    
            if (data.success) {
              toast.success(data.success);
            }
          })
      }
    return (
        <>admin</>
    )
}