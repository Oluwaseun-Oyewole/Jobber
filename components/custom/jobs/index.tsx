import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/lib/store/hook";
import { JobResponseBody } from "@/services/jobs/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Cards from "../cards";
import { experience, jobType, position, sortBy } from "../filter/jobs.data";
import PaginationWrapper from "../pagination";
import Search from "../search";
import SliderComponent from "../slider";

const Jobs = () => {
  const { data, isLoading } = useAppSelector(
    (state: any) => state.rootReducer.jobs,
  );
  const searchParams = useSearchParams();
  const page = +searchParams.get("page")!;
  const [currentPage, setCurrentPage] = useState(page > 0 ? page : 1);

  // const page = currentPage <= 0 ? 1 : currentPage;
  // const resultsPerPage = useState(+searchParams.get("resultsPerPage")!);

  return (
    <>
      <div className="mx-4 h-[84vh] overflow-y-scroll flex flex-col gap-3">
        <div className="bg-lightGray sticky top-0 bg-transparent left-0 z-10">
          <Search />
        </div>

        <div className="grid grid-cols-2 items-center gap-3 mt-5 md:hidden">
          <Select>
            <SelectTrigger className="w-full py-7 pl-9">
              <SelectValue placeholder="Date Posted" />
            </SelectTrigger>
            <SelectContent>
              {sortBy?.map((sort) => {
                return (
                  <SelectItem
                    key={sort.id}
                    value={sort.value}
                    className="cursor-pointer"
                  >
                    {sort.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full py-7 pl-9">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              {jobType?.map((sort) => {
                return (
                  <SelectItem
                    key={sort.id}
                    value={sort.value}
                    className="cursor-pointer"
                  >
                    {sort.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
            <Select>
              <SelectTrigger className="w-full py-7 pl-9">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                {experience?.map((sort) => {
                  return (
                    <SelectItem
                      key={sort.id}
                      value={sort.value}
                      className="cursor-pointer"
                    >
                      {sort.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full py-7 pl-9">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                {position?.map((sort) => {
                  return (
                    <SelectItem
                      key={sort.id}
                      value={sort.value}
                      className="cursor-pointer"
                    >
                      {sort.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </Select>
        </div>

        <div className="md:hidden">
          <div className="w-full">
            <h2 className="font-[300] py-2 text-sm">Salary Range</h2>
            <SliderComponent />
          </div>
        </div>
        <div className="pt-6">
          <div className="flex items-center justify-between pb-3">
            {/* <h1 className="text-sm md:text-lg">Search Results</h1> */}
            <div className="hidden">
              <PaginationWrapper
                total={data?.totalResults ?? 0}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                resultsPerPage={data?.resultsPerPage ?? 10}
                totalResults={data?.totalResults ?? 0}
                page={data?.page ?? currentPage}
                totalPages={data?.totalPages}
              />
            </div>
            <p className="text-sm text-gray-400">
              {data?.jobs?.length} results found
            </p>
          </div>

          <Cards data={data as JobResponseBody[]} isLoading={isLoading} />
        </div>
      </div>
      {/* <Description /> */}
    </>
  );
};

export default Jobs;
