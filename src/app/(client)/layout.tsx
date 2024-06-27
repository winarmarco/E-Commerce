import "@/styles/globals.css";

import { Inter } from "next/font/google";

import NavBar from "@/components/page-components/navbar";

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
      <NavBar />
      <main className="z-10 mx-auto mt-[90px] min-h-[calc(100vh-90px)] max-w-7xl py-8">
        {children}
      </main>
    </>
  );
}
