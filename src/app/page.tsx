import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import NavBar from "@/components/page-components/navbar";
import ProductCard from "./_components/product-card";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default async function Home() {
  // const hello = await api.user.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();
  // console.log(session);

  return (
    <>
      <NavBar />
      <div className="mx-auto grid w-full max-w-7xl gap-2 py-8">
        <h1 className="text-3xl font-semibold">Out Product</h1>
      </div>
      <main className="mx-auto grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Input placeholder="Search product" className="mb-4"/>

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
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </main>
    </>
  );

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
  //     <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
  //       <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
  //         Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
  //       </h1>
  //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
  //         <Link
  //           className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
  //           href="https://create.t3.gg/en/usage/first-steps"
  //           target="_blank"
  //         >
  //           <h3 className="text-2xl font-bold">First Steps →</h3>
  //           <div className="text-lg">
  //             Just the basics - Everything you need to know to set up your
  //             database and authentication.
  //           </div>
  //         </Link>
  //         <Link
  //           className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
  //           href="https://create.t3.gg/en/introduction"
  //           target="_blank"
  //         >
  //           <h3 className="text-2xl font-bold">Documentation →</h3>
  //           <div className="text-lg">
  //             Learn more about Create T3 App, the libraries it uses, and how to
  //             deploy it.
  //           </div>
  //         </Link>
  //       </div>
  //       <div className="flex flex-col items-center gap-2">
  //         <p className="text-2xl text-white">
  //           {hello ? hello.greeting : "Loading tRPC query..."}
  //         </p>

  //         <div className="flex flex-col items-center justify-center gap-4">
  //           <p className="text-center text-2xl text-white">
  //             {session && <span>Logged in as {session.user?.name}</span>}
  //           </p>
  //           <Link
  //             href={session ? "/api/auth/signout" : "/api/auth/signin"}
  //             className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
  //           >
  //             {session ? "Sign out" : "Sign in"}
  //           </Link>
  //         </div>
  //       </div>

  //       <CrudShowcase />
  //     </div>
  //   </main>
  // );
}
