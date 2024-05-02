import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { DataTable } from "./_components/product_table";
import { columns } from "./_components/columns";
import { type Product } from "@prisma/client";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const data: Product[] = [
    {
      imageURL:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Hello world",
      description: "lorem ipsum",
      price: 3000.0,
      categoryId: "asdasda",
      id: "asdasda",
    },
    {
      imageURL:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Hello world",
      description: "lorem ipsum",
      price: 3000.0,
      categoryId: "asdasda",
      id: "asdasda",
    },
    {
      imageURL:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Hello world",
      description: "lorem ipsum",
      price: 3000.0,
      categoryId: "asdasda",
      id: "asdasda",
    },
  ];

  return (
    <>
      <main className="mx-auto mt-[100px] grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link href="#" className="font-semibold text-primary">
            PRODUCTS
          </Link>
          <Link href="#">OUTDOOR</Link>
          <Link href="#">LIVING ROOMS</Link>
          <Link href="#">KITCHEN</Link>
          <Link href="#">BATHROOMS</Link>
          <Link href="#">GARDEN</Link>
        </nav>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-row justify-between">
            <Input placeholder="Search product" className="mb-4 w-[300px]" />
            <Link href="/admin/product/add">
              <Button>Add Product +</Button>
            </Link>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
