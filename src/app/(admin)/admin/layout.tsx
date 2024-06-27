import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Sidebar from "./_components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ESSENTIA",
  description: "An E-commerce app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="mx-auto my-[100px] grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
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
