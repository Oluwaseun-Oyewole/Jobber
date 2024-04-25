"use client";
import { allSavedSearches } from "@/app/store/slice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppDispatch } from "@/lib/store/hook";
import { DeleteIcon } from "lucide-react";
import { useEffect, useState } from "react";

const RecentSearches = () => {
  const [items, setItems] = useState([]);
  const dispatch = useAppDispatch();

  const removeJobs = (searchTerm: string) => {
    const updatedItems = items?.filter(
      (search: string) => search !== searchTerm,
    );
    setItems(updatedItems);
    localStorage.setItem("searches", JSON.stringify(updatedItems));
    dispatch(allSavedSearches(updatedItems));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("searches");
      setItems(JSON.parse(storage!));
      dispatch(allSavedSearches(JSON.parse(storage!)));
    }
  }, []);

  if (items?.length <= 0) {
    return (
      <div className="h-[40vh] flex justify-center items-center">
        <p className="font-medium text-deepBlue">No recent search</p>
      </div>
    );
  }
  return (
    <div className="min-h-[40vh] flex justify-center items-center">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-deepBlue">Searches</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((searchTerm: string, index: number) => (
            <TableRow>
              <TableCell className="font-medium text-deepBlue" key={index}>
                {searchTerm}
              </TableCell>
              <TableCell className="font-light" key={index}>
                <DeleteIcon
                  className="cursor-pointer"
                  onClick={() => removeJobs(searchTerm)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentSearches;
