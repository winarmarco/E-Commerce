import { getServerSession } from "next-auth";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

interface INavbarItem {
  label: string;
  link: string;
}

const NAVBAR_ITEMS: INavbarItem[] = [
  {
    label: "Home",
    link: "",
  },
  {
    label: "About Us",
    link: "",
  },
  {
    label: "Our Product",
    link: "",
  },
  {
    label: "My Cart",
    link: "",
  },
];

const NavBarItem: React.FC<{ item: INavbarItem }> = ({ item }) => {
  return <li>{item.label}</li>;
};

const NavBar = async () => {
  const session = await getServerSession();

  return (
    <nav className="w-full shadow-md fixed top-0 h-[90px] z-20 bg-white">
      <div className="flex w-full h-full max-w-7xl flex-row items-center justify-center py-4 mx-auto">

      <div>LOGOs</div>

      <ul className="ml-auto flex flex-row items-center justify-center gap-x-5">
        {NAVBAR_ITEMS.map((item) => (
          <NavBarItem key={item.label} item={item} />
        ))}

        <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          <Button variant={session ? "destructive" : "default"}>
            {session ? "Sign out" : "Sign in"}
          </Button>
        </Link>
      </ul>
      </div>
    </nav>
  );
};

export default NavBar;
