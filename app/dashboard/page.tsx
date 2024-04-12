"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div>
      <h1>Dashboard</h1>
      <div>{JSON.stringify(session)}</div>
      <Button onClick={() => signOut({ callbackUrl: "/auth/login" })}>
        Sign Out
      </Button>
    </div>
  );
}
