import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Cards from "../cards";
import { experience, jobType, position, sortBy } from "../filter/jobs.data";
import Search from "../search";

const Jobs = () => {
  return (
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
          <h2 className="font-[300] py-2">Salary Range</h2>
          <Slider defaultValue={[33]} max={100} step={1} />
        </div>
      </div>
      <div className="pt-8">
        <div className="flex items-center justify-between pb-6">
          <h1 className=" text-sm md:text-lg">Search Results</h1>
          <p className="text-sm text-gray-400">30, 000 results found</p>
        </div>
        <Cards />
      </div>
    </div>
  );
};

export default Jobs;
