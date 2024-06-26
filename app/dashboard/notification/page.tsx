"use client";
import { Bell } from "lucide-react";

const Notification = () => {
  return (
    <div className="h-[85vh] flex items-center justify-center">
      <div className="mt-10 bg-white h-[300px] lg:h-[350px] w-[90%] md:w-[60%] rounded-lg shadow-lg">
        <div className="flex items-center justify-center flex-col h-full">
          <Bell size={70} color="#537FE7" />
          <h3 className="font-extrabold pt-2">
            Nothing right now. Check back later
          </h3>
          <p className="w-[90%] md:w-[60%] font-[300] py-4 text-center text-sm md:text-base">
            This is where we notify you about your job applications and recent
            searches.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
