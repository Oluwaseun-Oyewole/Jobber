import { useGetAllJobsQuery } from "@/app/store/query";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type IPagination = {
  total: number;
  totalResults: number;
  page: number;
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const PaginationWrapper = ({
  total,
  resultsPerPage,
  totalResults,
  page,
  totalPages,
  currentPage,
  setCurrentPage,
}: IPagination) => {
  const [lowBound, upBound] = [
    totalResults === 0 ? 0 : (page - 1) * resultsPerPage + 1,
    totalResults > page * resultsPerPage ? page * resultsPerPage : totalResults,
  ];
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const goToNextPage = () => {
    const params = new URLSearchParams(searchParams);
    if (currentPage < totalPages) {
      params.set("page", currentPage.toString());
      setCurrentPage(currentPage + 1);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const goToPrevPage = () => {
    const params = new URLSearchParams(searchParams);
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
      setCurrentPage(currentPage - 1);
      replace(`${pathname}?${params.toString()}`);
    }
  };
  //   console.log("page", page);
  //   console.log("current page", currentPage);
  //   console.log("total pages", totalPages);

  useGetAllJobsQuery(
    { page: currentPage, resultsPerPage: 5 },
    { skip: !page || currentPage < 1 },
  );

  //   useEffect(() => {
  //     if (currentPage !== 0) {
  //       refetch();
  //     }
  //   }, [currentPage]);

  return (
    <div className="flex items-center">
      <Pagination className="flex items-center gap-3">
        <div className="font-normal">
          {lowBound} to {upBound} of {total}
        </div>
        <PaginationContent>
          <PaginationItem>
            <Button
              onClick={goToPrevPage}
              disabled={page <= 1}
              className="!px-0 flex items-center justify-center disabled:cursor-not-allowed bg-lightBlue hover:bg-deepBlue"
            >
              <PaginationPrevious className="disabled:cursor-not-allowed bg-lightBlue hover:bg-deepBlue text-white hover:text-white rounded-lg" />
            </Button>
          </PaginationItem>

          <Button
            disabled={page >= totalPages}
            className="!px-0 flex items-center justify-center disabled:cursor-not-allowed bg-lightBlue hover:bg-deepBlue"
            onClick={goToNextPage}
          >
            <PaginationItem>
              <PaginationNext className="disabled:cursor-not-allowed bg-lightBlue hover:bg-deepBlue text-white hover:text-white rounded-lg" />
            </PaginationItem>
          </Button>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationWrapper;
