"use client";
import { useGetAllJobsQuery } from "@/app/store/query";
import { startPagination } from "@/app/store/slice";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppDispatch, useAppSelector } from "@/lib/store/hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type IPagination = {
  total: number;
  totalResults: number;
  page: number;
  resultsPerPage: number;
  totalPages: number;
};

const PaginationWrapper = ({
  total,
  resultsPerPage,
  totalResults,
  page,
  totalPages,
}: IPagination) => {
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [lowBound, upBound] = [
    totalResults === 0 ? 0 : (page - 1) * resultsPerPage + 1,
    totalResults > page * resultsPerPage ? page * resultsPerPage : totalResults,
  ];
  const { isPaginate, country, isSearchTrigger } = useAppSelector(
    (state: any) => state.rootReducer.jobs,
  );
  const dispatch = useAppDispatch();
  const [myState, setState] = useState({
    page: 0,
    resultsPerPage: 0,
    location: "",
  }); // initialize with skipToken to skip at first

  const searchParams = useSearchParams();
  const router = useRouter();
  const updateURLFromSearchQuery = useDebouncedCallback((page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    params.set("resultsPerPage", resultsPerPage.toString());
    router.push(`?${params.toString()}`);
  }, 50);

  useGetAllJobsQuery(myState, {
    skip:
      (myState.page <= 0 && myState.resultsPerPage <= 0) ||
      !isPaginate ||
      isSearchTrigger,
  });

  const changePage = (page: number) => {
    dispatch(startPagination());
    if (isSearchTrigger) return;
    else {
      setState({ page, resultsPerPage, location: country });
    }
    // dispatch(api.util.resetApiState());
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    changePage(currentPage + 1);
    updateURLFromSearchQuery(currentPage + 1);
    // dispatch(api.util.invalidateTags(["Jobs"]));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    changePage(currentPage - 1);
    updateURLFromSearchQuery(currentPage - 1);
    // dispatch(api.util.invalidateTags(["Jobs"]));
  };

  // useEffect(() => {
  //   if (isPaginate) {
  //     dispatch(stopPagination());
  //   }
  // }, [isPaginate]);

  console.log("is paginate", isPaginate);

  return (
    <div className="flex items-center">
      <Pagination className="flex items-center gap-3 text-xs">
        <div className="font-normal">
          {lowBound} to {upBound} of {total}
        </div>
        <PaginationContent className="flex gap-3">
          <PaginationItem>
            <Button
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
              className="!px-0 flex items-center justify-center bg-gray-200 disabled:bg-transparent hover:bg-transparent"
            >
              <PaginationPrevious className="text-black rounded-lg !py-0 text-xs" />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              disabled={currentPage >= totalPages}
              className="!px-0 flex items-center justify-center !bg-gray-200 disabled:bg-transparent"
              onClick={goToNextPage}
            >
              <PaginationNext className="text-black rounded-lg !py-0 text-xs" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationWrapper;
