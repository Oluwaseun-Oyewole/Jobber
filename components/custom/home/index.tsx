"use client";
import { useGetAllJobsQuery } from "@/app/store/query";
import Filter from "@/components/custom/filter";
import Jobs from "@/components/custom/jobs";
import Nav from "@/components/custom/nav";
import { useSearchParams } from "next/navigation";
import Description from "../description";

const AllJobs = () => {
  const searchParams = useSearchParams();
  const searchParamObject = Object.fromEntries(searchParams);
  const resultsPerPage = +searchParamObject.resultsPerPage;
  const page = +searchParams.get("page")!;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useGetAllJobsQuery({
    resultsPerPage: !resultsPerPage || resultsPerPage <= 0 ? 5 : resultsPerPage,
    page: !page || page <= 0 ? 1 : page,
  });

  return (
    <>
      <Nav />
      <div className="flex items-center justify-center py-8">
        <div className="w-[95%] grid grid-items-center lg:justify-center xl:grid-flow-col md:grid-cols-[35%_65%] xl:grid-cols-[20%_55%_25%]">
          <Filter />
          <Jobs />
          <Description />
        </div>
      </div>
    </>
  );
};

export default AllJobs;
