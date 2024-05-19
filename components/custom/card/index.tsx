"use client";
import Dots from "@/assets/dots.svg";
import { ICardTypes } from "@/utils/constants";
import classNames from "classnames";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type ICards = {
  cardArray: ICardTypes[];
};
const Cards = ({ cardArray }: ICards) => {
  const session = useSession();
  const updatedCards = cardArray?.map((card) => {
    switch (card.id) {
      case 1:
        return { ...card };
      case 2:
        return { ...card };
      case 3:
        return { ...card };
      case 4:
        return { ...card, total: session?.data?.user?.jobs.length };
      default:
        return { ...card };
    }
  });
  const [currentDateTime, setCurrentDateTime] = useState<string>("Jan 2024");
  useEffect(() => {
    const interval = setInterval(() => {
      const dateTimeString = moment().format("MMMM YYYY");
      setCurrentDateTime(dateTimeString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {updatedCards.map((el, i) => (
        <div
          className={classNames(
            `flex flex-col justify-around px-6 py-3 bg-white w-full cursor-pointer shadow-md h-[170px]`,
            `rounded-lg border border-gray-200 space-y-3 shadow-md`,
          )}
          key={`dashboardCard${i}`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-[300]">{el.title}</p>
              <p className="text-xs font-light">{`( ${currentDateTime} )`}</p>
            </div>
            <Image src={Dots} alt="dot image" />
          </div>
          <p className="text-3xl font-medium text-gray-500 md:text-black">
            {el.total ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
