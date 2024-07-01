import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import ProductCard from "./_components/ProductCard";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SearchProduct } from "./_components/SearchProduct";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { category, q } = searchParams;
  const categoryFilter = typeof category === "string" ? [category] : category;
  const queryText = typeof q === "string" ? q : "";
  const allCategory = await api.category.getAllCategory();
  const products = await api.product.queryProduct({
    query: queryText,
    categoryFilter: categoryFilter,
  });

  return (
    <div className="sticky top-[calc(90px+2rem)]">
      <h1 className="mb-6 py-8 text-3xl font-semibold">Out Product</h1>

      <div className="grid w-full max-w-[90rem] items-start gap-x-8 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >

          <SearchProduct />
          <div className="mt-5 flex flex-col gap-4">
            <Link
              href="/product"
              className={!categoryFilter ? "font-semibold text-primary" : ""}
            >
              ALL PRODUCT
            </Link>
            {allCategory.map((category) => {
              const { id, categoryName } = category;
              const isSelected = categoryFilter?.includes(categoryName);
              return (
                <Link
                  key={id}
                  className={isSelected ? "font-semibold text-primary" : ""}
                  href={`?category=${categoryName}`}
                >
                  {categoryName}
                </Link>
              );
            })}
          </div>
        </nav>
        <div>
        {queryText && <p className="text-sm mb-4 text-slate-400">
            {products.length} "{queryText}"  Products found
          </p>}
          <div className="grid grid-cols-3 gap-x-10 gap-y-10">
            {products.length > 0 && (
              products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
