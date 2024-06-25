"use client";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface INavbarItem {
  label: string;
  url: string;
}

const NAVBAR_ITEMS: INavbarItem[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About Us",
    url: "#",
  },
  {
    label: "Our Product",
    url: "/product",
  },
  {
    label: "My Cart",
    url: "/cart",
  },
];

const NavBarItem: React.FC<{ item: INavbarItem }> = ({ item }) => {
  const pathname = usePathname();
  const isCurrentUrl = pathname === item.url;

  return (
    <li>
      <Link
        href={item.url}
        className={isCurrentUrl ? `font-bold` : ""}
      >
        {item.label}
      </Link>
    </li>
  );
};

const NavBar = () => {
  const session = useSession();

  return (
    <nav className="fixed top-0 z-20 h-[90px] w-full bg-white shadow-md">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-row items-center justify-center py-4">
        <div>LOGOs</div>

        <ul className="ml-auto flex flex-row items-center justify-center gap-x-5">
          {NAVBAR_ITEMS.map((item) => (
            <NavBarItem key={item.label} item={item} />
          ))}

          {session.status === "authenticated" && (
            <Link href="/api/auth/signout">
              <Button variant="outline">Sign out</Button>
            </Link>
          )}
          {session.status === "unauthenticated" && (
            <Link href="/api/auth/signin">
              <Button>Sign in</Button>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
