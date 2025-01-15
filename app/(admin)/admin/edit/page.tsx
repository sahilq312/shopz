'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteProduct } from '@/actions/deleteproduct';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/lib/db';

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
}

const Page =()=> {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const product = await db.product.findMany();
        setProducts(product);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteProduct(deleteId);
      setProducts(products.filter((product) => product.id !== deleteId));
      toast({
        title: 'Product deleted',
        description: 'The product has been successfully removed.',
      });
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the product. Please try again.',
        variant: 'destructive',
      });
    }
    setDeleteId(null);
  };

  const total = products.reduce((sum, item) => sum + item.price, 0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table>
        <TableCaption>A list of all products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Image
                  width={50}
                  height={50}
                  src={item.image}
                  alt={item.title}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push(`/products/edit/${item.id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setDeleteId(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete the product
                          from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteId(null)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">${total.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

export default Page;