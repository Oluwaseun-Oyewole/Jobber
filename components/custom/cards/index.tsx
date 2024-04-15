import { getJobId } from "@/app/store/slice";
import { Skeleton } from "@/components/ui/skeleton";
import { jobValidationSchema } from "@/lib/schema/jobs";
import { useAppDispatch } from "@/lib/store/hook";
import { IJob } from "@/services/jobs/types";
import { getDateDifference, truncate } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import Dollar from "../../../assets/dollar.svg";
import Saved from "../../../assets/fav.svg";

const Cards = ({ data, isLoading }: { data: any; isLoading: boolean }) => {
  const skeleton = new Array(2).fill("_");

  if (isLoading) {
    return (
      <div className="flex flex-col justify-around items-center overflow-hidden  h-[50vh]  bg-white shadow-xl rounded-lg">
        {skeleton?.map((_, index) => {
          return (
            <div className="flex justify-around">
              <div className="flex items-center space-x-4" key={index}>
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
    );
  }
  const dispatch = useAppDispatch();
  const setJobId = (id: string) => {
    dispatch(getJobId(id));
  };

  if (data?.jobs?.length <= 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <div className="h-[250px] w-full bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer flex justify-center items-center">
          <h1 className="text-lg ">No jobs available</h1>
        </div>
      </div>
    );
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
              <Link href={`/job-description/${job.id}`} className="xl:hidden">
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
                        <div className="flex items-center gap-2">
                          <p className="font-[300] text-sm py-1">
                            {job.companyName}
                          </p>
                          <div>
                            {days <= 1 && (
                              <small className="text-red-500 text-[10px] border-[0.5px] border-red-500 px-2 ">
                                New
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Image src={Saved} alt="netflix" />
                  </div>

                  <p className="font-[300] text-sm">{job.location}</p>

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
              <div
                className="hidden min-h-[250px] bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer xl:flex flex-col justify-between px-5 py-5"
                onClick={() => setJobId(job.id)}
              >
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
                      <div className="flex items-center gap-2">
                        <p className="font-[300] text-sm py-1">
                          {job.companyName}
                        </p>
                        <div>
                          {days <= 1 && (
                            <small className="text-red-500 text-[10px] border-[0.5px] border-red-500 px-2 ">
                              New
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Image src={Saved} alt="netflix" />
                </div>

                <div>
                  <p className="font-[300] text-sm">{job.location}</p>
                </div>

                <div className="flex justify-between items-center w-[90%] font-[400] text-sm">
                  <h3 className=" bg-lightGray rounded-sm py-2 px-3">
                    {job.jobType}
                  </h3>
                </div>

                <div>
                  <p className="text-sm font-[300]">
                    {truncate(job.jobInfo, 70)}
                  </p>
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
