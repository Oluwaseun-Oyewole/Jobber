"use client";
import Description from "@/components/custom/description";
import Filter from "@/components/custom/filter";
import Jobs from "@/components/custom/jobs";
import Nav from "@/components/custom/nav";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="flex items-center justify-center py-8">
        <div className="w-[95%] grid grid-items-center lg:justify-center lg:grid-flow-col lg:grid-cols-[20%_55%_25%]">
          <Filter />
          <Jobs />
          <Description />
        </div>
      </div>
    </>
  );
};

export default Home;
