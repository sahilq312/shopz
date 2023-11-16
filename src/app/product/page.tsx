import ProductList from "@/component/Product";

async function getData() {
  const res = await fetch("http://localhost:3000/api/product");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    throw Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page() {
  const data: Product[] = await getData();
  //console.log(data);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <ProductList products={data} />
      </div>
    </div>
  );
}
