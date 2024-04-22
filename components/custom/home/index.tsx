"use client";
import { getCountryName, getCountryStates } from "@/app/store/thunk";
import Filter from "@/components/custom/filter";
import Jobs from "@/components/custom/jobs";
import Nav from "@/components/custom/nav";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { useEffect, useState } from "react";
import Description from "../description";

const AllJobs = () => {
  const country: any = useAppSelector(
    (state) => state.rootReducer.jobs.country,
  );
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

  useEffect(() => {
    if (coordinates.lat <= 0 || coordinates.lng <= 0) return;
    else {
      dispatch(getCountryName({ lat: coordinates.lat, lng: coordinates.lng }));
    }
  }, [dispatch, coordinates.lat, coordinates.lng]);

  useEffect(() => {
    if (!country) return;
    else {
      dispatch(getCountryStates({ country }));
    }
  }, [dispatch, country]);

  return (
    <>
      <Nav />
      <div className="flex items-center justify-center py-8">
        <div className="w-[95%] grid grid-items-center lg:justify-center xl:grid-flow-col md:grid-cols-[35%_65%] xl:grid-cols-[20%_55%_25%]">
          <Filter />
          <Jobs />
          <Description />
        </div>
      </div>
    </>
  );
};

export default AllJobs;
