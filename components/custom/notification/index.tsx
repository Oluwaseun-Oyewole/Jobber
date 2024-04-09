"use client";
// import { motion } from "framer-motion";

const Notification = ({ openNotification }: { openNotification: boolean }) => {
  return (
    <div className="relative">
      {openNotification && (
        <div className="absolute z-30 top-40 md:top-16 right-10 h-[150px] lg:w-[23%] overflow-y-scroll bg-white text-sm shadow-xl p-4 rounded-lg">
          <p className="pb-2"> No Notification yet</p>
          <div className="flex gap-2 flex-col"></div>
        </div>
      )}
    </div>
  );
};

export default Notification;
