"use client";
import { useGetJobDetailsQuery } from "@/app/store/query";
import { setNotification } from "@/app/store/slice";
import { getCountryName } from "@/app/store/thunk";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { Toastify } from "@/utils/toasts";
import Image from "next/image";
import { useEffect, useState } from "react";
import Saved from "../../../../assets/fav.svg";
import Share from "../../../../assets/share.svg";

interface IProps {
  params: {
    id: string;
  };
}

export interface SavedJobInterface {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
}

const JobDetails = ({ params: { id } }: IProps) => {
  const dispatch = useAppDispatch();
  const [coordinates, setCoordinate] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const { lat, lng } = pos;
          setCoordinate({ lat, lng });
        },
      );
    }
  }, []);

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
    if (coordinates.lat <= 0 || coordinates.lng <= 0) return;
    else {
      dispatch(getCountryName({ lat: coordinates.lat, lng: coordinates.lng }));
    }
  }, [dispatch, coordinates.lat, coordinates.lng]);

  const { country } = useAppSelector((state) => state.rootReducer.jobs);
  const { data } = useGetJobDetailsQuery(
    {
      location: country,
      id,
    },
    { skip: country === "" },
  );

  if (!data?.data || data?.data === null) {
    return (
      <div className=" bg-white max-w-3xl mx-auto mt-5 p-10 h-[85vh] flex justify-center items-center">
        <div>
          <p className="text-lg">No Job found</p>
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
            <Image src={Share} alt="netflix" className="cursor-not-allowed" />
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
      </div>
      <div className="font-[400] flex flex-col ">
        <div className="flex gap-2 flex-col border__bottom">
          <div className="text-sm font-[300] text-gray-500 pt-3">
            <p>{data?.data?.companyName}</p>
          </div>

          <p className="bg-[rgba(83,116,231,0.1)] text-[#5374E7] rounded-sm py-3 w-[40%] lg:w-[18%] flex items-center justify-center font-[300] text-sm my-3">
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
              {data?.data?.jobInfo}
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
