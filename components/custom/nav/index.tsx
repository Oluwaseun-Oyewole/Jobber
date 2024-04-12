import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../assets/logo-f.svg";

const Nav = () => {
  return (
    <div className="h-[10vh] flex items-center justify-center sticky top-0 left-0 bg-white z-10">
      <div className="w-[95%] flex justify-between items-center">
        <Link href="/">
          <Image src={Logo} alt="logo" className="w-[100px]" />
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/notification">
            <div className="cursor-pointer rounded-full border-2 border-gray-300 p-3">
              <Bell />
              <div className="h-3 w-3 bg-red-500 rounded-full text-[8px] text-red-500 font-bold absolute top-5 md:top-6 z-20 right-[110px] md:right-[135px]"></div>
            </div>
          </Link>
          <Link href="/auth/login">
            <Button className="bg-lightBlue transition-all ease-in-out duration-500">
              login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
