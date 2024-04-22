"use client";
import { useGetAllJobsQuery } from "@/app/store/query";
import { stopPagination } from "@/app/store/slice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { JobResponseBody } from "@/services/jobs/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cards from "../cards";
import { experience, jobType, position, sortBy } from "../filter/jobs.data";
import PaginationWrapper from "../pagination";
import Search from "../search";
import SliderComponent from "../slider";

const Jobs = () => {
  const { isPaginate, isLoading, country, isSearchTrigger } = useAppSelector(
    (state) => state.rootReducer.jobs,
  );
  const data: any = useAppSelector((state) => state.rootReducer.jobs.data);
  const [sliderRange, setSliderRange] = useState([500, 10000]);
  const searchParams = useSearchParams();
  const page = +searchParams.get("page")!;
  const resultsPerPage = +searchParams.get("resultsPerPage")!;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(stopPagination());
  }, []);

  const [myState, setState] = useState({
    resultsPerPage: 0,
    page: 0,
    location: "",
  });
  useGetAllJobsQuery(myState, {
    skip:
      !myState.page ||
      !myState.resultsPerPage ||
      !myState.location ||
      isPaginate ||
      isSearchTrigger,
  });

  const fetchJobs = async () => {
    if (isSearchTrigger) return;
    else {
      await setState({
        page: page <= 0 ? 1 : page,
        resultsPerPage:
          !resultsPerPage || resultsPerPage < 0 ? 4 : resultsPerPage,
        location: country,
      });
    }
  };

  useEffect(() => {
    if (!country || isSearchTrigger) return;
    else {
      fetchJobs();
    }
  }, [country]);

  return (
    <>
      <div className="mx-4 overflow-y-scroll flex flex-col gap-3">
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
            <SliderComponent
              sliderRange={sliderRange}
              setSliderRange={setSliderRange}
            />
          </div>
        </div>
        <div className="pt-6">
          <div className="flex items-center justify-between pb-3">
            <div>
              <PaginationWrapper
                total={data?.totalResults ?? 0}
                resultsPerPage={data?.resultsPerPage ?? 4}
                totalResults={data?.totalResults ?? 0}
                page={data?.page ?? 1}
                totalPages={data?.totalPages ?? 0}
              />
            </div>
            <p className="text-sm text-gray-400">
              {data?.jobs?.length} results found
            </p>
          </div>

          <Cards data={data as JobResponseBody[]} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default Jobs;
