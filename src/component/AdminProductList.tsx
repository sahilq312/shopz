"use client";
import { useEffect, useState } from "react";
import Image from "next/image"
const AdminProductList = () => {
  // fetch to complete, we dont attempt to render the image
  let [product, setProduct] = useState<Product[]>();

  // 3. Create out useEffect function
  useEffect(() => {
    fetch("http://localhost:3000/api/product")
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => setProduct(data));
  }, []);

  return (
    <section className="items-center lg:flex bg-gray-50 lg:h-screen font-poppins dark:bg-gray-800 w-full ">
      <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div className="pt-4 bg-white rounded shadow dark:bg-gray-900">
          <div className="flex px-6 pb-4 border-b dark:border-gray-700">
            <h2 className="text-xl font-bold dark:text-gray-400">Table</h2>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-xs text-left text-gray-500 dark:text-gray-400">
                  <th className="px-6 pb-3 font-medium">Image</th>
                  <th className="px-6 pb-3 font-medium ">Title </th>
                  <th className="px-6 pb-3 font-medium">Category </th>
                  <th className="px-6 pb-3 font-medium">Price </th>
                  <th className="px-6 pb-3 font-medium">   </th>
                </tr>
              </thead>
              <tbody>
                {product?.map((item) => (
                  <tr
                    key={item._id}
                    className="text-xs bg-gray-100 dark:text-gray-400 dark:bg-gray-800"
                  >
                    <td className="px-6 py-5 font-medium ">
                      <Image src={item.image} alt="image" width={30} height={30}/></td>
                    <td className="px-6 py-5 font-medium">{item.title}</td>
                    <td className="px-6 py-5 font-medium ">{item.category}</td>
                    <td className="px-6 py-5 font-medium ">{item.price}</td>
                    
                    <td className="px-6 py-5 ">
                      <button 
                        className="px-4 py-2 font-medium text-blue-500 border border-blue-500 rounded-md dark:text-blue-300 dark:border-blue-300 dark:hover:bg-blue-300 dark:hover:text-gray-700 hover:text-gray-100 hover:bg-blue-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdminProductList;
