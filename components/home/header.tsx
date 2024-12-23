
import Link from "next/link"
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { auth } from "@/auth"
import CartNumbers from "./cart-number"
import { ModeToggle } from "../ui/toggle"

const UserNavigation = [
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "Explore", href: "/explore" },
  ]
const AdminNavigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Create", href: "/create" },
    { name: "setting", href: "/setting" },
  ]

const Header = async() => {
  const session = await auth();
  if(!session) {
    return <></>
  }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4">
                    {session?.user.role === "USER" ? UserNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    )): AdminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    )) }
                  </nav>
                </SheetContent>
              </Sheet>
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold">Shopz</span>
              </Link>
            </div>
            <nav className="hidden lg:flex lg:gap-6">
              {session?.user.role === "USER" ? UserNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              )) : AdminNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              )) }
            </nav>
            <div className="flex items-center gap-4">
              <ModeToggle/>
              <CartNumbers/>
              <Link href="/account" className="text-sm font-medium">
                My account
              </Link>
            </div>
          </div>
        </header>
    )
}

export default Header

