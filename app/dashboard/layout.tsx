import type { Metadata } from "next";
import { outfit } from "../fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main
        className={`w-full flex items-center justify-center ${outfit.className}`}
      >
        {children}
      </main>
    </>
  );
}