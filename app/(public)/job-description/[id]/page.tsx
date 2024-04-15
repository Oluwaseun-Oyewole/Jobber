"use client";
import { useGetJobDetailsQuery } from "@/app/store/query";
import Image from "next/image";
import Saved from "../../../../assets/fav.svg";
import Share from "../../../../assets/share.svg";

interface IProps {
  params: {
    id: string;
  };
}

const JobDetails = ({ params: { id } }: IProps) => {
  const { data } = useGetJobDetailsQuery(id);

  if (!data?.data || data?.data === null) {
    return (
      <div className=" bg-white max-w-3xl mx-auto mt-5 p-10 h-[85vh] overflow-y-scroll flex justify-center items-center">
        <div className="flex gap-4 sticky top-0 left-0">
          <p className="text-lg">No Job for this id {id} found</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-white max-w-3xl mx-auto mt-5 p-10 h-[85vh] overflow-y-scroll">
      <div className="flex justify-between">
        <div className="flex gap-4 sticky top-0 left-0">
          <h1 className="font-extrabold text-2xl">{data?.data?.jobTitle}</h1>
          <Image
            src={data?.data?.imageSrc}
            alt="netflix"
            className="w-8"
            height={50}
            width={50}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Image src={Share} alt="netflix" />
            <Image src={Saved} alt="netflix" />
          </div>
        </div>
      </div>
      <div className="font-[400] flex flex-col ">
        <div className="flex gap-2 flex-col border__bottom">
          <div className="text-sm font-[300] text-gray-500 pt-3">
            <p>{data?.data?.companyName}</p>
          </div>

          <p className="bg-[rgba(83,116,231,0.1)] text-[#5374E7] rounded-sm py-3 w-[60%] lg:w-[18%] flex items-center justify-center font-[300] text-sm my-3">
            {data?.data?.hired} to be hired
          </p>
        </div>
        <div>
          <h2 className="font-extrabold pt-6 text-lg">Job Details</h2>
        </div>
        <div className="pt-4 pb-6 border__bottom font-[300] flex flex-col gap-5">
          <div className="w-[90%] flex justify-between items-center">
            <div>
              <h1 className="font-bold text-base">Job Type</h1>
              <p className="text-sm pt-1">{data?.data?.jobType}</p>
            </div>

            <div>
              <h1 className="font-bold text-base">Position</h1>
              <p className="text-sm pt-1">{data?.data?.position}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 pb-6 border__bottom font-[300] flex flex-col gap-5">
          <div className="w-[90%] flex justify-between items-center">
            <div>
              <h1 className="font-bold text-base">Location</h1>
              <p className="text-sm pt-1">{data?.data?.location}</p>
            </div>

            <div>
              <h1 className="font-bold text-base">Salary</h1>
              <p className="text-sm pt-1">&#36; {data?.data?.salary}K</p>
            </div>
          </div>
        </div>
        <div className="py-6 border__bottom font-[400] text-base">
          <div className="py-2">
            <h2 className="font-bold text-xl">Full job description</h2>
            <p className="pt-4 font-[300] text-sm leading-6">
              {data?.data?.jobInfo}
            </p>
          </div>

          <div className="py-2">
            <h3>About Data Services at Relativity</h3>
            <p className="font-[300] text-sm leading-6">
              {data?.data?.aboutJob}
            </p>
          </div>
          <div className="py-2">
            <h3>About the Role</h3>
            <p className="font-[300] text-sm leading-6">
              {data?.data?.aboutRole}
            </p>
          </div>
        </div>
        <div className="py-6 border__bottom font-[400] text-base">
          <div className="py-2">
            <h2 className="font-bold text-xl"> Your Skills</h2>
            <p className="pt-4 font-[300] text-sm leading-6">
              {data?.data?.aboutSkill}
            </p>
          </div>
          <div className="py-2">
            <h3>Compensation:</h3>
            <p className="font-[300] text-sm leading-6">
              {data?.data?.compensation}
            </p>
          </div>
          <div className="py-2">
            <h3> Benefit Highlights:</h3>
            <p className="font-[300] text-sm leading-6">
              {data?.data?.benefit}
            </p>
          </div>

          <div>
            <p className="font-[300] text-sm leading-6">
              {data?.data?.process}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
