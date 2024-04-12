"use client";
import AllJobs from "@/components/custom/home";
import Loader from "@/components/custom/loader";
import { Suspense } from "react";

const Home = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      }
    >
      <AllJobs />
    </Suspense>
  );
};

export default Home;
