import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Sidebar from "./_components/Sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { api } from "@/trpc/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ESSENTIA",
  description: "An E-commerce app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) return redirect("/sign-in");

  const role = await api.user.getUserRole();
  if (role === "USER") return redirect("/");
  return (
    <>
      <main className="mx-auto my-[100px] grid w-full max-w-[90rem] items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <Sidebar />
        <div>{children}</div>
      </main>
      <Toaster
        toastOptions={{
          className: "h-[64px]",
        }}
      />
    </>
  );
}
