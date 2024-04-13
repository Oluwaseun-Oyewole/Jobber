"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import classNames from "classnames";
import "rc-slider/assets/index.css";
import { ChangeEvent, useState } from "react";
import SliderComponent from "../slider";
import { experience, jobType, position, sortBy } from "./jobs.data";

type Job = {
  id: number;
  label: string;
  value: string;
  checked: boolean;
};

const CheckBoxInput = ({
  name,
  id,
  value,
  checked,
  job,
  onChange,
}: {
  name: string;
  id: string;
  value: string;
  checked: boolean;
  job: Job;
  // onChange: (job: Job, e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (job: Job, e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="checkbox"
      name={name}
      id={id}
      value={value}
      checked={checked}
      onChange={(e) => onChange(job, e)}
      className="h-[15px] w-[17px] focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
    />
  );
};

const Filter = () => {
  const classes = {
    border: "py-6 border-b-2 border-lightGray",
    flexCenterSpace: "flex items-center space-x-2",
    flexJustifyBetween: "flex justify-between",
  };

  const [jobs, setJobs] = useState(jobType);
  const [jobExperience, setJobExperience] = useState(experience);
  const [jobPosition, setJobPosition] = useState(position);

  const handleChange = (item: Job, event: ChangeEvent<HTMLInputElement>) => {
    setJobs((items) => {
      return items?.map((e) =>
        e.id === item.id ? { ...e, checked: event.target.checked } : e,
      );
    });
  };
  const handleJobExperienceChange = (
    item: Job,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setJobExperience((items) => {
      return items?.map((e) =>
        e.id === item.id ? { ...e, checked: event.target.checked } : e,
      );
    });
  };

  const handleJobPosition = (
    item: Job,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setJobPosition((items) => {
      return items?.map((e) =>
        e.id === item.id ? { ...e, checked: event.target.checked } : e,
      );
    });
  };

  const handleRadioChange = (e: string) => {
    console.log("string value", e);
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
            onValueChange={(e) => handleRadioChange(e)}
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
        <div className="w-[90%]">
          <h2 className="font-bold pb-5">Salary Range</h2>
          <SliderComponent />
        </div>
      </div>
      <div className={classNames(classes.border)}>
        <h2 className="pb-4 font-bold">Job Type</h2>

        <div className="w-[92%]">
          <div className="grid grid-flow-cols grid-cols-[50%_50%] gap-3">
            {jobs?.map((job) => {
              return (
                <div
                  key={job.id}
                  className={classNames(classes.flexJustifyBetween)}
                >
                  <div
                    className={classNames(
                      classes.flexCenterSpace,
                      "space-x-0 gap-1",
                    )}
                  >
                    {/* <Checkbox
                      id={job.value}
                      checked={job.checked}
                      onCheckedChange={(e) => {
                        console.log("e", e);
                      }}
                      onClick={(e) => {
                        console.log("eee", e.target, e.currentTarget.value);
                      }}
                    /> */}
                    {/* <input
                      type="checkbox"
                      name="jobType"
                      id={job.value}
                      value={job.value}
                      checked={job.checked}
                      onChange={(e) => handleChange(job, e)}
                      className="h-4 w-4 focus:ring-blue-500 border-red-300 focus:border-blue-500 rounded-2xl cursor-pointer"
                    /> */}
                    <CheckBoxInput
                      name="jobType"
                      id={job.value}
                      value={job.value}
                      checked={job.checked}
                      job={job}
                      onChange={handleChange}
                    />
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
            {jobExperience?.map((job) => {
              return (
                <div className={classNames(classes.flexJustifyBetween)}>
                  <div
                    className={classNames(
                      classes.flexCenterSpace,
                      "space-x-0 gap-1",
                    )}
                  >
                    <CheckBoxInput
                      name="experience"
                      id={job.value}
                      value={job.value}
                      checked={job.checked}
                      job={job}
                      onChange={handleJobExperienceChange}
                    />

                    <Label htmlFor={job.value}>{job.label}</Label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={classNames("pt-6")}>
        <h2 className="pb-4 font-bold">Position</h2>

        <div className="w-[92%]">
          <div className="grid grid-flow-cols grid-cols-[50%_50%] gap-3">
            {jobPosition?.map((job) => {
              return (
                <div className={classNames(classes.flexJustifyBetween)}>
                  <div
                    className={classNames(
                      classes.flexCenterSpace,
                      "space-x-0 gap-1",
                    )}
                  >
                    <CheckBoxInput
                      name="experience"
                      id={job.value}
                      value={job.value}
                      checked={job.checked}
                      job={job}
                      onChange={handleJobPosition}
                    />
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
