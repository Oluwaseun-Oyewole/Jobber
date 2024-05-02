"use client";
import { JobSlice as api } from "@/app/store/query";
import Dots from "@/assets/dots.svg";
import Cards from "@/components/custom/card";
import { CustomChart } from "@/components/custom/chart";
import ProfileViewers from "@/components/custom/profile-viewers";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { JobFormValues, jobValidationSchema } from "@/lib/schema/jobs";
import { useAppSelector } from "@/lib/store/hook";
import { ProfileCard } from "@/utils/constants";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const session = useSession();
  const [jobs, setJobs] = useState<JobFormValues[]>([]);
  const { country } = useAppSelector((state) => state.rootReducer.jobs);
  const [getJobsInfo, { isLoading, isSuccess }] = api.useLazyGetAllJobsQuery();
  const skeleton = new Array(2).fill("_");
  const searchParams = useSearchParams();
  const page = +searchParams.get("page")!;
  const resultsPerPage = +searchParams.get("resultsPerPage")!;
  const [currentDateTime, setCurrentDateTime] = useState<string>("Jan 2024");
  const [currentChartDate, setCurrentChartDate] = useState<string>("");

  useEffect(() => {
    if (country) {
      getJobsInfo({
        page: page && page > 0 ? page : 1,
        resultsPerPage:
          resultsPerPage && resultsPerPage > 0 ? resultsPerPage : 10,
        location: country,
      }).then((result) => setJobs(result.data?.data?.jobs));
    } else {
      return;
    }
  }, [country]);

  useEffect(() => {
    const interval = setInterval(() => {
      const dateTimeString = moment().format("MMMM YYYY");
      const currentTimeString = moment().format("MMMM DD YYYY");
      setCurrentDateTime(dateTimeString);
      setCurrentChartDate(currentTimeString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const areaSeries = [
    {
      name: currentChartDate,
      data: [380, 340, 380, 330, 350, 410, 350, 380],
      // data: [200, 100, 240, 150, 360, 210, 220, 280],
    },
  ];

  const months = [
    "01/04",
    "05/04",
    "07/04",
    "10/04",
    "12/04",
    "14/04",
    "18/04",
    "22/04",
  ];

  return (
    <>
      <div className="block lg:grid grid-flow-col lg:grid-cols-[69%_29%] justify-between h-screen overflow-y-scroll">
        <div className="md:pb-[100px]">
          <div className="bg-white h-[50vh] rounded-lg">
            <div className="w-[97%] py-6 mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-light">Profile View</p>
                  <p className="text-xs font-light">{`( ${currentDateTime} )`}</p>
                </div>

                <div className="flex gap-3 items-center">
                  <p className="text-xl md:text-3xl font-medium">{4097}</p>
                  <Image src={Dots} alt="dot image" />
                </div>
              </div>
              <CustomChart
                id="area-chart"
                type="area"
                colors={["#0095FF"]}
                series={areaSeries}
                categories={months}
                curve="smooth"
              />
            </div>
          </div>
          <Cards cardArray={ProfileCard} />
          <ProfileViewers />
        </div>
        <div className="mt-10 md:mt-0 flex flex-col gap-5 pb-20">
          <div className="bg-white shadow-lg font-[300] w-full rounded-md h-[55vh]">
            <div className="w-[85%] mx-auto">
              <div className="py-6 flex items-center justify-between sticky top-0 left-0 bg-white">
                <p className="text-lg">Jobs for you</p>
                <p className="text-deepBlue font-medium">All Jobs</p>
              </div>
              {isLoading && (
                <div className="flex flex-col justify-around items-center overflow-hidden h-[40vh]">
                  {skeleton?.map((_, index) => {
                    return (
                      <div className="flex justify-around" key={index}>
                        <div
                          className="flex items-center space-x-4"
                          key={index}
                        >
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {isSuccess && jobs?.length <= 0 && (
                <div className=" h-[30vh] w-full cursor-pointer flex flex-col gap-2 justify-center items-center">
                  <h1 className="text-lg">No jobs available</h1>
                </div>
              )}
              <div>
                {jobs?.map((job: JobFormValues) => {
                  const validatedJobs = jobValidationSchema.safeParse(job);
                  if (!validatedJobs.success) {
                    return;
                  } else {
                    return (
                      <div key={job.id} className="py-3">
                        <div className="flex items-center gap-7">
                          <Image
                            src={job?.imageSrc}
                            alt="job image"
                            width={50}
                            height={50}
                          />
                          <div>
                            <h1 className="text-base font-medium">
                              {job?.jobTitle}
                            </h1>
                            <div className="flex items-center gap-2">
                              <p className="font-[300] text-sm py-1">
                                {job?.location}, {job?.country}
                              </p>
                            </div>
                            <Button className="!bg-transparent !text-deepBlue !px-0 !py-2">
                              <Link
                                href={`/dashboard/job-description/${job?.id}`}
                              >
                                View jobs
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg font-[300] w-full rounded-md mb-10">
            <div className="w-[85%] mx-auto">
              <div className="py-6 flex items-center justify-between sticky top-0 left-0 bg-white">
                <p className="text-lg">Jobs posted by you</p>
                <p className="text-deepBlue font-medium">All Jobs</p>
              </div>
              {isLoading && (
                <div className="flex flex-col justify-around items-center overflow-hidden h-[40vh]">
                  {skeleton?.map((_, index) => {
                    return (
                      <div className="flex justify-around" key={index}>
                        <div
                          className="flex items-center space-x-4"
                          key={index}
                        >
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {isSuccess && jobs?.length <= 0 && (
                <div className=" h-[30vh] w-full cursor-pointer flex flex-col gap-2 justify-center items-center">
                  <h1 className="text-lg ">No jobs available</h1>
                </div>
              )}
              <div>
                {session?.data?.user?.jobs?.map((job: JobFormValues) => {
                  const validatedJobs = jobValidationSchema.safeParse(job);
                  if (!validatedJobs.success) {
                    return;
                  } else {
                    return (
                      <div key={job.id} className="py-3">
                        <div className="flex items-center gap-7">
                          <Image
                            src={job?.imageSrc}
                            alt="job image"
                            width={50}
                            height={50}
                          />
                          <div>
                            <h1 className="text-base font-medium">
                              {job?.jobTitle}
                            </h1>
                            <div className="flex items-center gap-2">
                              <p className="font-[300] text-sm py-1">
                                {job?.location}, {job?.country}
                              </p>
                            </div>
                            <Button className="!bg-transparent !text-deepBlue !px-0 !py-2">
                              <Link
                                href={`/dashboard/job-description/${job?.id}`}
                              >
                                View jobs
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
