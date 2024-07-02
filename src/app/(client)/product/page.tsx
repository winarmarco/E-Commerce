import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import ProductCard from "./_components/ProductCard";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SearchProduct } from "./_components/SearchProduct";
import CategoryFilter from "./_components/CategoryFilter";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { category, q } = searchParams;
  const categoryFilter = typeof category === "string" ? [category] : (category);
  const queryText = typeof q === "string" ? q : "";
  const allCategory = await api.category.getAllCategory();
  const products = await api.product.queryProduct({
    query: queryText,
    categoryFilter: categoryFilter,
  });

  const createFilterText = (queryText?: string, categoryFilter?: string[]) => {
    let combinedFilterText: string[] = [];
    if (queryText) combinedFilterText.push(queryText);
    if (categoryFilter && categoryFilter.length > 0) combinedFilterText = combinedFilterText.concat(...categoryFilter);

    combinedFilterText = combinedFilterText.map((value) => `"${value}"`);

    let filterText = "";
    if (combinedFilterText.length > 1) {
      const lastFilter = combinedFilterText[combinedFilterText.length - 1];
      const beforeLastFilter = combinedFilterText.slice(0, combinedFilterText.length - 1).join(", ");
      filterText = beforeLastFilter + " and "  + lastFilter;
    } else if (combinedFilterText.length === 1) {
      filterText += combinedFilterText[0];
    }

    return filterText;
    
  }

  return (
    <div className="sticky top-[calc(90px+2rem)]">
      <h1 className="mb-6 py-8 text-3xl font-semibold">Out Product</h1>

      <div className="grid w-full max-w-[90rem] items-start gap-x-8 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >

          <SearchProduct />
          <CategoryFilter allCategory={allCategory} categoryFilter={categoryFilter}/>
        </nav>
        <div>
        {(queryText || categoryFilter) && <p className="text-sm mb-4 text-slate-400">
            {products.length} {createFilterText(queryText, categoryFilter)}  Products found
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
