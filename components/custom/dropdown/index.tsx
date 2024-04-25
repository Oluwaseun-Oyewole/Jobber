import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type IDropType = {
  subRoutes?: { id: number; url?: string; title?: string }[];
  dropdown: boolean;
};
const Dropdown: React.FC<IDropType> = ({ subRoutes, dropdown }) => {
  const pathname = usePathname();

  return (
    <ul
      className={`${
        dropdown ? "flex" : "hidden"
      } flex-col gap-5 pt-6 pb-3 pl-4`}
    >
      {subRoutes?.map((route, index) => {
        return (
          <li key={index} className={`flex gap-3 items-center`}>
            <p
              className={`h-[12px] w-[12px] bg-primary-100 rounded-full ${
                pathname !== route.url && "invisible"
              }`}
            ></p>
            <Link
              href={`${route.url}`}
              key={index}
              className="text-sm hover:text-primary-100"
            >
              {route.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Dropdown;
