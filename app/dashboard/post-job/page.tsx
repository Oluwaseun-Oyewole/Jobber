"use client";
import Loader from "@/components/custom/loader";
import FormContent from "@/components/custom/steper-form";
import { Suspense } from "react";

const Jobber = () => {
  return (
    <div className="bg-white w-full">
      <Suspense fallback={<Loader />}>
        <div className="flex h-full w-full mx-auto md:justify-center items-center">
          <div className="w-full">
            <FormContent />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Jobber;
