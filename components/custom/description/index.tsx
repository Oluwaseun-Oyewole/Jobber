import { useGetAllJobsQuery, useGetJobDetailsQuery } from "@/app/store/query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/lib/store/hook";
import { truncate } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import Saved from "../../../assets/fav.svg";
import Share from "../../../assets/share.svg";

const Description = () => {
  const { id, isDescLoader, isLoading } = useAppSelector(
    (state) => state.rootReducer.jobs,
  );
  const allJobs = useGetAllJobsQuery({ page: 1, resultsPerPage: 5 });
  const firstJobID =
    allJobs?.data?.data?.jobs[0]?.id ?? "clv0scy6e0000ljqcrs2zs1sz";
  const { data } = useGetJobDetailsQuery(id ? id : firstJobID);

  if (!id) {
    <div className="hidden md:block bg-white rounded-lg h-[84vh] overflow-scroll shadow-md p-5 font-[400]">
      <p>No Found for this {id} found</p>
    </div>;
  }

  return (
    <div className="hidden md:block bg-white rounded-lg h-[84vh] overflow-scroll shadow-md p-5 font-[400]">
      {isDescLoader || isLoading ? (
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
          {data?.data === null ? (
            <div className="h-[70vh] flex items-center justify-center">
              <div>No jobs available</div>
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
                      <Image src={Share} alt="netflix" />
                      <Image src={Saved} alt="netflix" />
                    </div>
                  </div>
                  <div className="py-6 flex gap-2 flex-col border__bottom">
                    <h1 className="font-bolder text-xl">
                      {data?.data?.jobTitle}
                    </h1>
                    <div className="flex text-sm font-[300] text-gray-500">
                      <p>{data?.data?.companyName}</p>
                      <p>{data?.data?.location}</p>
                    </div>

                    <p className="bg-[rgba(83,116,231,0.1)] text-[#5374E7] rounded-md py-3 w-[40%] flex items-center justify-center font-[300] text-sm">
                      {data?.data?.hired} to be hired
                    </p>
                  </div>
                  <div className="py-6 border__bottom font-[300] flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="font-bold">Job Type</h1>
                        <p className="text-sm pt-1">{data?.data?.jobType}</p>
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
                      {data?.data?.salary}K
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
