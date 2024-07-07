import "@/styles/globals.css";


import NavBar from "@/components/page-components/navbar";


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
      <main className="z-10 mx-auto mt-[90px] min-h-[calc(100vh-90px)] max-w-[90rem] py-8 flex flex-col">
        {children}
      </main>
    </>
  );
}
