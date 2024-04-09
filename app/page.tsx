"use client";
import Description from "@/components/custom/description";
import Filter from "@/components/custom/filter";
import Jobs from "@/components/custom/jobs";

const Home = () => {
  return (
    <div className="py-8">
      <div className="grid grid-items-center  lg:justify-center lg:grid-flow-col lg:grid-cols-[20%_55%_25%]">
        <Filter />
        <Jobs />
        <Description />
      </div>
    </div>
  );
};

export default Home;
