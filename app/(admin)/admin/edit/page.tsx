import { deleteProduct } from "@/actions/deleteproduct";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { db } from "@/lib/db"
import { Delete, DeleteIcon, Trash, Trash2Icon } from "lucide-react";
import Image from "next/image";


export default async function editProduct(){
    const product = await db.product.findMany();
    //console.log(product);
   // const total = product.reduce((sum, item) => sum + item.price,0);
    
    return (
        <Table className="">
      <TableCaption>A list of all products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-center">delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {product.map((item) => (
          <TableRow key={item.id}>
            <TableCell><Image width={50} height={50} src={item.image} alt={item.title} /></TableCell>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell className="text-right">23</TableCell>
            <TableCell className="flex justify-center"><Trash2Icon/></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$23</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    )
}