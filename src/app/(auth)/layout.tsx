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
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      {children}
    </main>
  );
}
