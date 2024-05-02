"use client";
import ProfileImage from "@/assets/Avatar.svg";
import JobPortLogo from "@/assets/logo-f.svg";
import { Button } from "@/components/ui/button";
import { truncate } from "@/utils/helper";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import NavMenuItems from "../navlinks";
import { routes } from "./links";

export const Sidebar = () => {
  const session = useSession();
  const username = session?.data?.user?.name ?? "";

  return (
    <nav className="font-[300] lg:flex items-center flex-col lg:justify-center h-screen">
      <div className="w-[87%]">
        <div className="lg:flex flex-col items-center justify-center">
          <div className="pt-6 pb-2 hidden lg:block">
            <Image
              src={JobPortLogo}
              alt="jop port logo"
              className="w-[140px]"
            />
          </div>
          <div className="py-6">
            <Image
              src={ProfileImage}
              alt="jop port logo"
              className="rounded-full w-[70px]"
            />
            <p className="text-left lg:text-start font-medium text-sm pt-4 text-deepBlue">
              {truncate(username!, 20)}
            </p>
          </div>
        </div>

        <ul className="pt-3 lg:pt-5 flex flex-col gap-7">
          {routes?.map((route, index) => {
            return <NavMenuItems key={index} route={route} />;
          })}
        </ul>

        <div className="py-5 w-[80%] mx-auto flex justify-start items-end h-[20vh] ">
          <Button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="!bg-deepBlue !text-xs"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};
