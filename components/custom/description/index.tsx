import { useGetJobDetailsQuery } from "@/app/store/query";
import { setNotification } from "@/app/store/slice";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { truncate } from "@/utils/helper";
import { Toastify } from "@/utils/toasts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Saved from "../../../assets/fav.svg";
import Share from "../../../assets/share.svg";
import { SavedJobInterface } from "../cards";

const JobTypeResponse = (str: any) => {
  switch (str) {
    case "contract":
      return "Contract";
    case "fulltime":
      return "FullTime";

    case "internship":
      return "Internship";

    case "parttime":
      return "PartTime";

    case "volunteer":
      return "Volunteer";

    default:
      break;
  }
};

const Description = () => {
  const { id, isDescLoader, country, isSearchTrigger } = useAppSelector(
    (state) => state.rootReducer.jobs,
  );
  const jobData: any = useAppSelector((state) => state.rootReducer.jobs.data);
  const firstJobID = jobData?.jobs && jobData?.jobs[0]?.id;
  const [myState, setState] = useState({ id: "", location: country });
  const { data } = useGetJobDetailsQuery(myState, {
    skip: !myState.id,
  });
  const dispatch = useAppDispatch();

  const getDetails = async () => {
    if (isSearchTrigger) return;
    else {
      await setState({ id: id ? id : firstJobID, location: country });
    }
  };

  const checkIfJobInArray = (
    object: SavedJobInterface,
    array: SavedJobInterface[],
  ): boolean => {
    return array.some((item) => item.jobTitle === object.jobTitle);
  };

  const savedJobToLocalStorage = (object: SavedJobInterface) => {
    let currentList: SavedJobInterface[] = [];
    const storedList = localStorage.getItem("savedJobs");
    if (storedList) {
      currentList = JSON.parse(storedList);
    }
    const obj = checkIfJobInArray(object, currentList);
    if (obj || object.jobTitle === "") {
      Toastify.error("Job already saved");
      return;
    } else {
      currentList.push(object);
      if (typeof window !== "undefined") {
        localStorage.setItem("savedJobs", JSON.stringify(currentList));
        localStorage.setItem("notification", String(true));
      }
      dispatch(setNotification());
      Toastify.success("Job saved");
    }
  };

  useEffect(() => {
    if (!firstJobID || isSearchTrigger) return;
    else {
      getDetails();
    }
  }, [id, firstJobID]);

  if (!id) {
    <div className="hidden md:block bg-white rounded-lg h-[84vh] overflow-scroll shadow-md p-5 font-[400]">
      <p>No Found for this {id} found</p>
    </div>;
  }

  return (
    <div className="hidden md:block bg-white rounded-lg h-[84vh] overflow-scroll shadow-md p-5 font-[400]">
      {isDescLoader ? (
        <div className="flex flex-col justify-between  h-[80vh] items-center">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {data?.data === null || !firstJobID ? (
            <div className="h-[70vh] flex items-center justify-center">
              <div>
                <p>No job available</p>
              </div>
            </div>
          ) : (
            <>
              {data && (
                <>
                  <div className="flex justify-between">
                    <div>
                      <Image
                        src={data?.data?.imageSrc}
                        alt="netflix"
                        height={50}
                        width={50}
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <Image
                        src={Share}
                        alt="netflix"
                        className="cursor-not-allowed"
                      />
                      <Image
                        src={Saved}
                        alt="netflix"
                        className="cursor-pointer"
                        onClick={() =>
                          savedJobToLocalStorage({
                            id: data?.data?.id,
                            jobTitle: data?.data?.jobTitle,
                            companyName: data?.data?.companyName,
                            location: data?.data?.location,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="py-6 flex gap-2 flex-col border__bottom">
                    <h1 className="font-bolder text-xl">
                      {data?.data?.jobTitle}
                    </h1>
                    <div className="flex gap-3 text-sm font-[300] text-gray-500">
                      <p>{data?.data?.companyName}</p>
                      <p>{data?.data?.location}</p>
                    </div>

                    <p className="bg-[rgba(83,116,231,0.1)] text-[#5374E7] rounded-md py-3 w-[40%] flex items-center justify-center font-[300] text-sm">
                      {data?.data?.hired} to be hired
                    </p>
                  </div>
                  <div className="py-6 border__bottom font-[300] flex flex-col gap-5 w-[90%]">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="font-bold">Job Type</h1>
                        <p className="text-sm pt-1">
                          {JobTypeResponse(data?.data?.jobType)}
                        </p>
                      </div>
                      <div>
                        <h1 className="font-bold">Experience</h1>
                        <p className="text-sm pt-1">{data?.data?.experience}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="font-bold">Position</h1>
                        <p className="text-sm pt-1">{data?.data?.position}</p>
                      </div>
                      <div>
                        <h1 className="font-bold">Location</h1>
                        <p className="text-sm pt-1">{data?.data?.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-6 border__bottom font-[300]">
                    <h2 className="font-bold text-xl">Job Description</h2>
                    <p className="text-sm pt-4 leading-5 text-gray-600">
                      {truncate(data?.data?.jobInfo, 200)}
                    </p>
                  </div>
                  <div className="py-6 border__bottom font-[300]">
                    <h2 className="font-bold text-xl">Base Salary</h2>
                    <p className="text-sm pt-4 leading-5 text-gray-600">
                      &#36;{data?.data?.salary}K/month
                    </p>

                    <Link href={`/job-description/${data?.data?.id}`}>
                      <Button className="bg-lightBlue hover:bg-deepBlue w-full mt-4 h-[50px] transition-all ease-in-out duration-500">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Description;
