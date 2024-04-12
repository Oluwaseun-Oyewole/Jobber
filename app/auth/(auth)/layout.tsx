"use client";
import { outfit } from "@/app/fonts";
import Nav from "@/components/custom/nav";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`${outfit.className} flex flex-col items-center justify-center min-h-screen w-full`}
    >
      <div className="w-full">
        <Nav />
      </div>
      {children}
    </main>
  );
}
