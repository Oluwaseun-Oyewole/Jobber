"use client";
import JobPortLogo from "@/assets/logo-f.svg";
import MessagingIcon from "@/assets/messaging.svg";
import NotificationIcon from "@/assets/notify.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sidebar } from "../sidebar";

const DashboardNavigation = () => {
  const session = useSession();
  const [click, setClicked] = useState(false);
  const pathname = usePathname();
  const getTitle = pathname.split("/");

  const handleClick = () => {
    setClicked((click) => !click);
  };

  const closeClick = () => {
    if (click) {
      setClicked(false);
    }
  };
  return (
    <div>
      <div className="hidden my-6 lg:flex justify-between items-center">
        <div className="w-full">
          <Input
            name="search"
            type="search"
            // value=""
            className="autocomplete-input h-[52px] w-[80%] px-10 rounded-lg border-none font-[500] placeholder:!text-sm placeholder:!text-gray-500"
            onChange={() => {}}
            autoComplete="off"
            placeholder="search job title or skills"
          />
        </div>
        <div className="flex gap-2 justify-end items-center w-full">
          {session?.data?.user?.name && (
            <Button className="!bg-deepBlue !text-xs">Post a Job</Button>
          )}
          <Image src={NotificationIcon} alt="notification icon" />
          <Image src={MessagingIcon} alt="message icon" />
        </div>
      </div>
      <div className="lg:hidden flex justify-between items-center my-7 w-full">
        <Image src={JobPortLogo} alt="logo" className="w-[100px]" />

        <Sheet onOpenChange={closeClick}>
          <SheetTrigger className="">
            <div onClick={handleClick}>
              {click ? (
                <IoMdClose className="text-xl text-primary-100" />
              ) : (
                <RxHamburgerMenu className="text-xl text-primary-100" />
              )}
            </div>
          </SheetTrigger>
          <SheetContent className="overflow-y-scroll">
            <SheetHeader>
              <SheetDescription>
                <Image
                  src={JobPortLogo}
                  alt="jop port logo"
                  className="w-[120px] mt-8"
                />
                <div>
                  <Breadcrumb className="py-4">
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          href="/dashboard"
                          className="text-deepBlue"
                        >
                          Dashboard
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-black">
                          <p className="text-primary-100">
                            {pathname
                              .split("/")
                              [getTitle.length - 1].substring(0, 1)
                              .toUpperCase() +
                              pathname
                                .split("/")
                                [getTitle.length - 1].substring(1)}
                          </p>
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div className="flex flex-col justify-between items-center">
                  <div className="w-full">
                    <Input
                      name="search"
                      type="search"
                      // value=""
                      className="mb-6 autocomplete-input h-[52px] w-full px-10 rounded-lg !border-[1.5px] font-[500] placeholder:!text-sm placeholder:!text-gray-500"
                      onChange={() => {}}
                      autoComplete="off"
                      placeholder="search job title or skills"
                    />
                  </div>
                  <div className="flex gap-2 items-center w-full">
                    {session?.data?.user?.name && (
                      <Button className="!bg-deepBlue !text-xs">
                        Post a Job
                      </Button>
                    )}
                    <Image src={NotificationIcon} alt="notification icon" />
                    <Image src={MessagingIcon} alt="message icon" />
                  </div>
                </div>
              </SheetDescription>
              <SheetDescription>
                <Sidebar />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default DashboardNavigation;
