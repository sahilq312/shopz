import ProductList from "@/component/Product";

async function getData() {
  const res = await fetch('https://fakestoreapi.com/products')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data : Product[] = await getData()
  //console.log(data);
  
 
  return <main>
    <ProductList products={data}/>
  </main>
}