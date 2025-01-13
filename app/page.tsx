import { Poppins } from "next/font/google";
import { List } from "@/actions/productList";
import { ProductCard } from "@/components/home/product-card";
import { FilterButton } from "@/components/home/filter-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});


export default async function Home() {

  const products = await List();
  if (!products || !products.success ) { 
    return <div>error</div>
  }
  return (
    <main className="container py-10">
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">Get Inspired</h1>
      <p className="text-lg text-muted-foreground">
        Browsing for your next long-haul trip, everyday journey, or just fancy a look at what new? 
        From community favourites to about-to-sell-out items, see them all here.
      </p>
    </div>
    
    <div className="my-8 flex flex-wrap gap-4">
      <FilterButton
        label="All Categories"
        options={["Backpacks", "Totes", "Accessories"]}
        className="w-[200px]"
      />
      <FilterButton
        label="All Colors"
        options={["Black", "Grey", "Yellow", "Blue"]}
        className="w-[200px]"
      />
      <FilterButton
        label="All Features"
        options={["Waterproof", "Laptop Sleeve", "Bottle Holder"]}
        className="w-[200px]"
      />
      <FilterButton
        label="From €0 - €1000"
        options={["€0 - €100", "€100 - €200", "€200+"]}
        className="w-[200px]"
      />
      <FilterButton
        label="New In"
        options={["Newest", "Price: Low to High", "Price: High to Low"]}
        className="w-[200px]"
      />
    </div>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        { products?.success.map((product, index) => (
          <ProductCard product={product} key={index}/>
        )) }
      </div>
    </main>
    
  );
}
