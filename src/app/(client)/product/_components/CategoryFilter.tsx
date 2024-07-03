"use client";
import { type AppRouter } from "@/server/api/root";
import { type inferRouterOutputs } from "@trpc/server";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const CategoryFilter: React.FC<{
  allCategory: inferRouterOutputs<AppRouter>["category"]["getAllCategory"];
  categoryFilter?: string[];
}> = ({ allCategory, categoryFilter }) => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);

      return params.toString();
    },
    [searchParams],
  );
  return (
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
            href={"/product?" + createQueryString("category", categoryName)}
          >
            {categoryName}
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
