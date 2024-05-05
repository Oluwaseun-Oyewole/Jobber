"use client";
import { allSavedJobs, allSavedSearches } from "@/app/store/slice";
import RecentSearches from "@/components/custom/recent-searches";
import SavedJobs from "@/components/custom/saved-jobs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const Notification = () => {
  const dispatch = useAppDispatch();
  const { savedJobs, savedSearch } = useAppSelector(
    (state) => state.rootReducer.jobs,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = localStorage.getItem("searches")!;
      const storage = localStorage.getItem("savedJobs");
      dispatch(allSavedJobs(JSON.parse(storage!)));
      dispatch(allSavedSearches(search!));
    }
  }, [dispatch]);

  if (
    (savedJobs && savedJobs?.length > 0) ||
    (savedSearch && savedSearch.length > 0)
  ) {
    return (
      <div className="">
        <Tabs
          defaultValue="saved-jobs"
          className="flex justify-between items-center flex-col"
        >
          <TabsList className="flex w-[70%] md:w-[50%] lg:w-[30%] justify-between !bg-gray-200 !text-deepBlue !font-light mt-20 !py-7 !px-3">
            <TabsTrigger value="saved-jobs" className="!font-light">
              Saved Jobs
            </TabsTrigger>
            <TabsTrigger value="recent-searches" className="!font-light">
              Recent Searches
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="saved-jobs"
            className="w-full flex flex-col items-center justify-center"
          >
            <SavedJobs />
          </TabsContent>
          <TabsContent
            value="recent-searches"
            className="w-full flex flex-col items-center justify-center"
          >
            <RecentSearches />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="h-[85vh] flex items-center justify-center">
      <div className="mt-10 bg-white h-[300px] lg:h-[350px] w-[90%] md:w-[50%] rounded-lg">
        <div className="flex items-center justify-center flex-col h-full">
          <Bell size={80} color="#537FE7" />
          <h3 className="font-extrabold pt-2">
            Nothing right now. Check back later
          </h3>
          <p className="w-[90%] md:w-[60%] font-[300] py-4 text-center text-sm md:text-base">
            This is where we notify you about your job applications and recent
            searches.
          </p>
          <Link href={`/?page=1&resultsPerPage=4`}>
            <Button className="bg-lightBlue hover:bg-deepBlue">
              Find Jobs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notification;
