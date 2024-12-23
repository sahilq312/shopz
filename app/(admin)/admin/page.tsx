
import { auth } from "@/auth";
import AdminProductList from "./adminProductList";
import { db } from "@/lib/db";

export default async function Page() {
  const product = await db.product.findMany();
  const session = await auth();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      
      <AdminProductList products={product}/>
    </div>
  );
}
