"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div className="py-6">
      <div>
        Hi <span className="text-deepBlue">{session?.data?.user?.name}</span>
      </div>

      <p>Welcome to JobPort</p>
      <p>Dashboard still under construction</p>
      <div className="py-5">
        <Button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="!bg-deepBlue !text-xs"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
