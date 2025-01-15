"use client"

import { BecomeAdmin } from "@/actions/admin"
import { Button } from "../ui/button"
import { useToast } from "@/hooks/use-toast"

const AdminButton = ({ email }: { email: string }) => {
    const { toast } = useToast();
    return (
        <Button
        type="button"
        onClick={async () => {
          if (email) {
            await BecomeAdmin(email).then((data) => {
              if (data.success) {
                toast({
                    title: "successfull",
                    description: "You are now an admin",
                  })
              }
            })
          }
        }}
      >
        Become a Admin
      </Button>
    )
}

export default AdminButton;