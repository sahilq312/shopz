import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[600px] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold">Product Not Found</h2>
      <p className="text-muted-foreground">
        The product you are looking for doesnot exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
