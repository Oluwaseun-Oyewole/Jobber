import { jobValidationSchema } from "@/lib/schema/jobs";
import { IJob } from "@/services/jobs/types";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parseISO,
} from "date-fns";
import Image from "next/image";
import Link from "next/link";
import Dollar from "../../../assets/dollar.svg";
import Saved from "../../../assets/fav.svg";
import { JobCardSkeleton } from "../loaders/job.card.loader";

const Cards = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  function getDateDifference(dateString: string): {
    days: number;
    hours: number;
    minutes: number;
  } {
    const currentDate = new Date();
    const dateToCompare = parseISO(dateString);
    const days = differenceInDays(currentDate, dateToCompare);
    const hours = differenceInHours(currentDate, dateToCompare);
    const minutes = differenceInMinutes(currentDate, dateToCompare);

    return {
      days,
      hours,
      minutes,
    };
  }

  if (isLoading) {
    return <JobCardSkeleton />;
  }
  return (
    <div className="grid grid-flow-row gap-4 pb-7">
      <div className="grid grid-cols-[100%] gap-4 lg:gap-3 lg:grid-cols-2">
        {data?.jobs?.map((job: IJob) => {
          const formattedDate = getDateDifference(job.datePosted);
          const { days, hours, minutes } = formattedDate;
          const validateJobs = jobValidationSchema.safeParse(job);
          if (!validateJobs.success) {
            return;
          }
          return (
            <>
              <Link href="/job-description/1" className="xl:hidden">
                <div className="min-h-[260px] bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between px-5 py-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Image
                        src={job.imageSrc}
                        alt="netflix"
                        width={50}
                        height={50}
                      />
                      <div>
                        <h1>{job.jobTitle}</h1>
                        <p className="font-[300] text-sm py-1">Netflix</p>
                      </div>
                    </div>
                    <Image src={Saved} alt="netflix" />
                  </div>

                  <p className="font-[300] text-sm">London</p>

                  <div className="flex justify-between items-center w-[90%] font-[400] text-sm">
                    <h3 className=" bg-lightGray rounded-sm py-2 px-2 text-xs xl:text-base">
                      {job.jobType}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm font-[300]">{job.jobInfo}</p>
                  </div>

                  <div className="flex justify-between items-center font-[400] text-sm">
                    <div className="flex gap-2 items-center">
                      <Image src={Dollar} alt="netflix" />
                      <p className="text-sm font-[300]">${job.salary}/month</p>
                    </div>
                    <div>
                      <p className="text-sm font-[300]">2 mins ago</p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="hidden min-h-[250px] bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer xl:flex flex-col justify-between px-5 py-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Image
                      src={job.imageSrc}
                      alt="job image"
                      width={50}
                      height={50}
                    />
                    <div>
                      <h1>{job.jobTitle}</h1>
                      <p className="font-[300] text-sm py-1">Netflix</p>
                    </div>
                  </div>

                  <Image src={Saved} alt="netflix" />
                </div>

                <div>
                  <p className="font-[300] text-sm">London</p>
                </div>

                <div className="flex justify-between items-center w-[90%] font-[400] text-sm">
                  <h3 className=" bg-lightGray rounded-sm py-2 px-3">
                    {job.jobType}
                  </h3>
                </div>

                <div>
                  <p className="text-sm font-[300]">{job.jobInfo}</p>
                </div>

                <div className="flex justify-between items-center font-[400] text-sm">
                  <div className="flex gap-2 items-center">
                    <Image src={Dollar} alt="netflix" />
                    <p className="text-sm font-[300]">${job.salary}K/month</p>
                  </div>
                  <div>
                    <p className="text-sm font-[300]">
                      {days > 0 ? (
                        <div>
                          {days} {days > 1 ? "days" : "day"} ago
                        </div>
                      ) : hours > 0 ? (
                        <div>
                          {hours} {hours > 1 ? "hrs" : "hr"} ago
                        </div>
                      ) : (
                        <div>
                          {minutes} {minutes > 1 ? "mins" : "mins"} ago
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
