"use client";
import { outfit } from "@/app/fonts";
import Nav from "@/components/custom/nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  return (
    <main
      className={`${outfit.className} flex flex-col items-center justify-center w-full`}
    >
      <div className="w-full">
        <Nav />
      </div>
      {children}
    </main>
  );
}
