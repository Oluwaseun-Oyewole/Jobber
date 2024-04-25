"use client";
// import { Tooltip } from "@/components/ui/tooltip";
import DashboardActiveIcon from "@/assets/activeDashboard.svg";
import DashboardIcon from "@/assets/dash.svg";
import { truncate } from "@/utils/helper";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdArrowDropUp } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import Dropdown from "../dropdown";
import { IRoutesType } from "../sidebar/links";

type INavMenuTypes = {
  route: IRoutesType;
};
const NavMenuItems: React.FC<INavMenuTypes> = ({ route }) => {
  const { path, icon, title, subRoutes, ActiveIcon } = route;
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLLIElement | null>(null);
  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && e.target instanceof Node) {
        if (!menuRef.current.contains(e.target)) {
          setDropdown(false);
        }
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {subRoutes ? (
        <li className={`w-full`} onClick={handleDropdown} ref={menuRef}>
          <div
            className={classNames(
              "flex px-3 justify-between items-center w-full",
              {
                "rounded-lg": subRoutes?.some(
                  (route) => pathname === route.url,
                ),
              },
            )}
          >
            <div className={`flex gap-3 cursor-pointer`}>
              {subRoutes?.some((route) => pathname === route.url) ? (
                <>{ActiveIcon}</>
              ) : (
                <Image src={icon!} alt="icon" />
              )}

              <p
                className={classNames(``, {
                  "": subRoutes?.some(
                    (route) =>
                      pathname === route.url && "bg-[#F4F5FF] text-primary",
                  ),
                })}
              >
                {truncate(title, 15)}
              </p>
            </div>

            <div>
              {dropdown ? (
                <MdArrowDropUp className={`cursor-pointer ${""}`} />
              ) : (
                <RiArrowDropDownLine
                  className={classNames("cursor-pointer", {
                    "": subRoutes?.some((route) => pathname === route.url),
                  })}
                />
              )}
            </div>
          </div>

          <Dropdown subRoutes={subRoutes} dropdown={dropdown} />
        </li>
      ) : (
        <li>
          <Link
            href={`${path}`}
            className={`p-4 rounded-lg gap-3 flex items-center disabled:cursor-not-allowed ${pathname === path && "bg-[#F4F5FF]"}`}
          >
            {pathname === path ? (
              <Image
                src={DashboardActiveIcon}
                alt="icon"
                className="w-[25px]"
              />
            ) : (
              <Image src={DashboardIcon} alt="icon" className="w-[25px]" />
            )}

            <p
              className={` text-black text-base ${pathname === path ? "text-deepBlue font-medium" : "text-[#1C1C1E] font-medium"}`}
            >
              Dashboard
            </p>
          </Link>
        </li>
      )}
    </>
  );
};

export default NavMenuItems;
