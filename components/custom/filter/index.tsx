"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import classNames from "classnames";
import { experience, jobType, position, sortBy } from "./jobs.data";

const Filter = () => {
  const classes = {
    border: "py-6 border-b-2 border-lightGray",
    flexCenterSpace: "flex items-center space-x-2",
    flexJustifyBetween: "flex justify-between",
  };

  return (
    <div className="hidden md:block bg-white shadow-md rounded-lg pb-8 px-5 h-[84vh] overflow-scroll">
      <div
        className={classNames(
          classes.flexJustifyBetween,
          "pb-6 border-b-2 border-lightGrey sticky top-0 py-8 left-0 bg-white",
        )}
      >
        <h2 className="font-bold text-lg">Filters</h2>
        <p className="text-sm text-blue-500 ">Reset All</p>
      </div>

      <div className={classNames(classes.border)}>
        <h2 className="font-bold pb-5">Sort By</h2>
        <div>
          <RadioGroup
            defaultValue={sortBy[0].value}
            className="w-[92%] font-[300]"
          >
            <div className="grid gap-3 grid-cols-[50%_50%] items-center">
              {sortBy?.map((sort) => {
                return (
                  <div className={classNames(classes.flexCenterSpace)}>
                    <RadioGroupItem
                      value={`${sort.value}`}
                      id={`${sort.value}`}
                    />
                    <Label
                      htmlFor={`${sort.value}`}
                      className="hidden lg:block"
                    >
                      {sort.label}
                    </Label>

                    <Label htmlFor="most-recent" className="block lg:hidden">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="line-clamp-1">
                            {sort.label.substring(0, 5) + "..."}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{sort.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className={classNames(classes.border)}>
        <div className="w-[80%]">
          <h2 className="font-bold pb-5">Salary Range</h2>
          <Slider defaultValue={[33]} max={100} step={1} />
        </div>
      </div>

      <div className={classNames(classes.border)}>
        <h2 className="pb-4 font-bold">Job Type</h2>

        <div className="w-[92%]">
          <div className="grid grid-flow-cols grid-cols-[50%_50%] gap-3">
            {jobType?.map((job) => {
              return (
                <div className={classNames(classes.flexJustifyBetween)}>
                  <div
                    className={classNames(
                      classes.flexCenterSpace,
                      "space-x-0 gap-1",
                    )}
                  >
                    <Checkbox id={job.value} />
                    <Label htmlFor={job.value}>{job.label}</Label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={classNames(classes.border)}>
        <h2 className="pb-4 font-bold">Experience</h2>
        <div className="w-[92%]">
          <div className="grid grid-flow-cols grid-cols-[50%_50%] gap-3">
            {experience?.map((job) => {
              return (
                <div className={classNames(classes.flexJustifyBetween)}>
                  <div
                    className={classNames(
                      classes.flexCenterSpace,
                      "space-x-0 gap-1",
                    )}
                  >
                    <Checkbox id={job.value} />
                    <Label htmlFor={job.value}>{job.label}</Label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={classNames("py-6")}>
        <h2 className="pb-4 font-bold">Position</h2>

        <div className="w-[92%]">
          <div className="grid grid-flow-cols grid-cols-[50%_50%] gap-3">
            {position?.map((job) => {
              return (
                <div className={classNames(classes.flexJustifyBetween)}>
                  <div
                    className={classNames(
                      classes.flexCenterSpace,
                      "space-x-0 gap-1",
                    )}
                  >
                    <Checkbox id={job.value} />
                    <Label htmlFor={job.value}>{job.label}</Label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
