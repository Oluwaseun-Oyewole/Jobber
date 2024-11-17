"use client";
import { useGetAllJobsQuery, useGetJobsFilterQuery } from "@/app/store/query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMultiselect } from "@/hooks/multiselect";
import { useAppSelector } from "@/lib/store/hook";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import "rc-slider/assets/index.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SliderComponent from "../slider";
import { experience, jobType, position, sortBy } from "./jobs.data";

enum JobType {
  fulltime = "fulltime",
  parttime = "parttime",
  contract = "contract",
  internship = "internship",
  volunteer = "volunteer",
}

type Job = {
  id: number;
  label: string;
  value: JobType;
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
  job: any;
  // onChange: (job: Job, e: ChangeEvent<HTMLInputElement>) => void;
  onChange: (job: any, e: ChangeEvent<HTMLInputElement>) => void;
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const { country, isSearchTrigger } = useAppSelector(
    (state) => state.rootReducer.jobs,
  );
  const [jobExperience, setJobExperience] = useState(experience);
  const [jobPosition, setJobPosition] = useState(position);
  const [sliderRange, setSliderRange] = useState([500, 10000]);
  const page = +searchParams.get("page")!;
  const resultsPerPage = +searchParams.get("resultsPerPage")!;
  const filter__attr = searchParams.get("filter__attr")!;
  const price_min = +searchParams.get("price_min")!;
  const price_max = +searchParams.get("price_max")!;
  const { selected, isSelected, onChange } = useMultiselect([]);

  const classes = {
    border: "py-6 border-b-2 border-lightGray",
    flexCenterSpace: "flex items-center space-x-2",
    flexJustifyBetween: "flex justify-between",
  };

  const updateURLFromSearchQuery = useDebouncedCallback(
    (query: {
      jobType?: string;
      price_min?: number;
      price_max?: number;
      checkBox?: string;
      experience?: string;
      position?: string;
      page: number;
      resultsPerPage: number;
    }) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", query.page.toString());
      params.set("resultsPerPage", query.resultsPerPage.toString());
      if (query.jobType) {
        params.set("jobType", query.jobType);
      }
      if (query.price_min && query.price_max) {
        params.set("price_min", query.price_min.toString());
        params.set("price_max", query.price_max.toString());
      }
      if (query.checkBox) {
        params.set("filter__attr", query.checkBox);
      }
      if (query.experience) {
        params.set("experience", query.experience);
      }
      if (query.position) {
        params.set("position", query.position);
      }
      router.push(`?${params.toString()}`);
    },
    50,
  );

  // const [quizInfo, setQuizInfo] = useState(emptyInfo);
  // const [getQuizInfo, quizInfoQuery] = api.useLazyGetJobDetailsQuery();
  // useEffect(() => {
  //   if (isClicked === false) {
  //     getQuizInfo({
  //       id: "clv6y0xip0000pnhysjf60vtl",
  //       location: "Remote",
  //     }).then((result) => setQuizInfo(result.data));
  //   } else {
  //     getQuizInfo({
  //       id: "clv6y0xip0000pnhysjf60vtl",
  //       location: "Nigeria",
  //     }).then((result) => setQuizInfo(result.data));
  //   }
  // }, [isClicked]);

  const [myState, setState] = useState({
    resultsPerPage: 0,
    page: 0,
    jobType: "",
    location: "",
  });
  useGetJobsFilterQuery(myState, {
    skip:
      !myState.page ||
      !myState.resultsPerPage ||
      !myState.jobType ||
      !myState.location,
  });
  const handleJobTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    if (isSelected(selected[0])) {
      updateURLFromSearchQuery({
        jobType: selected[0],
        page: page <= 0 ? 1 : page,
        resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
      });

      setState({
        page: 1,
        resultsPerPage: 4,
        jobType: selected[0],
        location: country,
      });
    }
  };

  const [experienceState, setExperienceState] = useState({
    resultsPerPage: 0,
    page: 0,
    experience: "",
    location: "",
  });
  useGetJobsFilterQuery(experienceState, {
    skip:
      !experienceState.page ||
      !experienceState.resultsPerPage ||
      !experienceState.experience ||
      !experienceState.location,
  });

  const handleJobExperienceChange = (
    item: Job,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setJobExperience((items) => {
      return items?.map((e) =>
        e.id === item.id ? { ...e, checked: event.target.checked } : e,
      );
    });

    updateURLFromSearchQuery({
      experience: item.value,
      page: page <= 0 ? 1 : page,
      resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
    });

    setExperienceState({
      page: 1,
      resultsPerPage: 4,
      experience: item.value,
      location: country,
    });
    // dispatch(api.util.resetApiState());
  };

  const [positionState, setPositionState] = useState({
    resultsPerPage: 0,
    page: 0,
    position: "",
    location: "",
  });
  useGetJobsFilterQuery(positionState, {
    skip:
      !positionState.page ||
      !positionState.resultsPerPage ||
      !positionState.position ||
      !positionState.location,
  });

  const handleJobPosition = (
    item: Job,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setJobPosition((items) => {
      return items?.map((e) =>
        e.id === item.id ? { ...e, checked: event.target.checked } : e,
      );
    });

    updateURLFromSearchQuery({
      position: item.value,
      page: page <= 0 ? 1 : page,
      resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
    });

    setPositionState({
      page: 1,
      resultsPerPage: 4,
      position: item.value,
      location: country,
    });
  };

  type CheckboxStateType = {
    resultsPerPage: number;
    page: number;
    filter__attr: string;
    location: string;
    price_min?: number;
    price_max?: number;
  };
  const [checkboxState, setCheckboxState] = useState<CheckboxStateType>({
    resultsPerPage: 0,
    page: 0,
    filter__attr: filter__attr ? filter__attr : "",
    location: "",
    price_min: price_min,
    price_max: price_max,
  });
  useGetJobsFilterQuery(checkboxState, {
    skip:
      !checkboxState.page ||
      !checkboxState.resultsPerPage ||
      !checkboxState.filter__attr ||
      !checkboxState.location,
  });

  // const handleRefetch = () => {
  //   checkboxState && refetch();
  // };

  // useEffect(() => {
  //   handleRefetch();
  // }, [checkboxState.filter__attr]);

  const handleRadioChange = (e: string) => {
    // dispatch(api.util.invalidateTags(["JobFilter"]));
    updateURLFromSearchQuery({
      checkBox: e ? e : filter__attr,
      page: page <= 0 ? 1 : page,
      resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
    });
    if (price_min! <= 0) {
      setCheckboxState({
        page: page <= 0 ? 1 : page,
        resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
        filter__attr: e ? e : filter__attr,
        location: country,
      });
    } else {
      setCheckboxState({
        page: page <= 0 ? 1 : page,
        resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
        filter__attr: e ? e : filter__attr,
        location: country,
        price_min: price_min ? price_min : sliderRange[0],
        price_max: price_max ? price_max : sliderRange[1],
      });
    }
  };

  type SliderType = {
    resultsPerPage: number;
    page: number;
    price_min: number;
    price_max: number;
    location: string;
    filter__attr?: string;
  };

  const [slider, setSlider] = useState<SliderType>({
    resultsPerPage: 0,
    page: 0,
    price_min: 0,
    price_max: 0,
    location: "",
  });
  useGetJobsFilterQuery(slider, {
    skip:
      !slider.page ||
      !slider.resultsPerPage ||
      !slider.price_min ||
      !slider.price_max ||
      !slider.location,
  });
  const filterByPriceRange = () => {
    updateURLFromSearchQuery({
      price_min: sliderRange[0],
      price_max: sliderRange[1],
      page: page <= 0 ? 1 : page,
      resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
    });
    if (!filter__attr) {
      setSlider({
        page: page <= 0 ? 1 : page,
        resultsPerPage: resultsPerPage <= 0 ? 4 : resultsPerPage,
        price_min: price_min ? price_min : sliderRange[0],
        price_max: price_max ? price_max : sliderRange[1],
        location: country,
      });
    } else {
      setSlider({
        page: page <= 0 ? 1 : page,
        resultsPerPage: resultsPerPage <= 0 ? 5 : resultsPerPage,
        price_min: price_min ? price_min : sliderRange[0],
        price_max: price_max ? price_max : sliderRange[1],
        filter__attr: filter__attr,
        location: country,
      });
    }
    // dispatch(api.util.invalidateTags(["JobFilter"]));
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("filter__attr");
    params.delete("price_min");
    params.delete("price_max");
    router.push(`?${params.toString()}`);
  }, [country]);

  const [reset, setReset] = useState(false);
  const { refetch } = useGetAllJobsQuery(
    {
      page: page && page > 0 ? page : 1,
      resultsPerPage: resultsPerPage && resultsPerPage > 0 ? resultsPerPage : 4,
      location: country,
    },
    { skip: reset === false || isSearchTrigger },
  );

  const filterReset = () => {
    setReset(true);
    if (reset) {
      refetch();
    }
    router.push(`/?page=1&resultsPerPage=4`);
  };

  return (
    <div className="hidden md:block bg-white shadow-md rounded-lg pb-8 px-5 h-[84vh] overflow-y-scroll">
      <div
        className={classNames(
          classes.flexJustifyBetween,
          "pb-6 border-b-2 border-lightGrey sticky top-0 py-8 left-0 bg-white",
        )}
      >
        <h2 className="font-bold text-lg">Filters</h2>
        <Button
          className="text-sm text-blue-500 !bg-transparent"
          onClick={filterReset}
        >
          Reset All
        </Button>
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
              {sortBy?.map((sort, index) => {
                return (
                  <div
                    className={classNames(classes.flexCenterSpace)}
                    key={index}
                  >
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
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-bold">Salary Range</h2>
            <Button
              className="bg-transparent hover:bg-transparent text-deepBlue text-sm !m-0 !p-0"
              onClick={filterByPriceRange}
            >
              Apply
            </Button>
          </div>
          <SliderComponent
            sliderRange={sliderRange}
            setSliderRange={setSliderRange}
          />
        </div>
      </div>
      <div className={classNames(classes.border)}>
        <h2 className="pb-4 font-bold">Job Type</h2>

        <div className="w-[92%]">
          <div className="grid grid-flow-cols grid-cols-[50%_50%] gap-3">
            {jobType?.map((job, index) => {
              return (
                <div
                  key={index}
                  className={classNames(classes.flexJustifyBetween)}
                >
                  <div
                    className={classNames(
                      classes.flexCenterSpace,
                      "space-x-0 gap-0",
                    )}
                  >
                    <input
                      id={job.value}
                      type="checkbox"
                      value={job.value}
                      checked={isSelected(job.value)}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleJobTypeChange(e)
                      }
                      className="h-[15px] w-[17px] focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
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
            {jobExperience?.map((job, index) => {
              return (
                <div
                  className={classNames(classes.flexJustifyBetween)}
                  key={index}
                >
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
            {jobPosition?.map((job, index) => {
              return (
                <div
                  className={classNames(classes.flexJustifyBetween)}
                  key={index}
                >
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
