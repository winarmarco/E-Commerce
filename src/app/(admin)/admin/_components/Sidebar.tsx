"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SIDEBAR_LINKS: { url: string; label: string }[] = [
  {
    label: "OVERVIEW",
    url: "/admin/dashboard",
  },
  {
    label: "PRODUCTS",
    url: "/admin/product",
  },
  {
    label: "ORDER",
    url: "/admin/order",
  },
];

const Sidebar = () => {
  const currentUrl = usePathname();
  console.log(currentUrl);
  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      {SIDEBAR_LINKS.map((item, index) => {
        const isCurrentUrl = currentUrl.includes(item.url);
        return (
          <Link
            href={item.url}
            key={index + item.label}
            className={isCurrentUrl ? `font-semibold text-primary` : ''}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Sidebar;
