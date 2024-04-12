import { Skeleton } from "@/components/ui/skeleton";
import Loader from "../loader";

export function JobCardSkeleton() {
  return (
    <>
      <Skeleton className="grid w-full items-center bg-transparent">
        <>
          <Skeleton className="w-[300px] min-h-[250px] bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer md:flex flex-col justify-between px-5 py-5">
            <Skeleton className="flex justify-between items-center">
              <Skeleton className="flex items-center gap-4">
                <Skeleton>
                  <Skeleton className="font-[300] text-sm py-1"></Skeleton>
                </Skeleton>
              </Skeleton>
            </Skeleton>

            <Skeleton>
              <Skeleton className="font-[300] text-sm"></Skeleton>
            </Skeleton>

            <Skeleton className="flex justify-between items-center w-[90%] font-[400] text-sm"></Skeleton>

            <Skeleton className="flex items-center justify-center">
              <Loader />
            </Skeleton>

            <Skeleton className="flex justify-between items-center font-[400] text-sm">
              <Skeleton className="flex gap-2 items-center"></Skeleton>
              <div></div>
            </Skeleton>
          </Skeleton>
        </>
      </Skeleton>
    </>
  );
}
