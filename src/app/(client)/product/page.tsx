import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import ProductCard from "./_components/ProductCard";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default async function ProductPage() {
  const session = await getServerAuthSession();

  const allProduct = await api.product.getAllProduct();

  return (
    <div className="sticky top-[calc(90px+2rem)]">
      <h1 className="py-8 text-3xl font-semibold">Out Product</h1>

      <div className="grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Input placeholder="Search product" className="mb-4" />

          <Link href="#" className="font-semibold text-primary">
            ALL PRODUCT
          </Link>
          <Link href="#">OUTDOOR</Link>
          <Link href="#">LIVING ROOMS</Link>
          <Link href="#">KITCHEN</Link>
          <Link href="#">BATHROOMS</Link>
          <Link href="#">GARDEN</Link>
        </nav>
        <div className="grid grid-cols-3 gap-x-10 gap-y-10">
          {allProduct.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
