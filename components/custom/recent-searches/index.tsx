"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteIcon } from "lucide-react";
import { useState } from "react";

const RecentSearches = (searchArray: any) => {
  const [items, setItems] = useState(searchArray);

  const removeJobs = (searchTerm: string) => {
    const updatedItems = items.searchArray.filter(
      (search: string) => search !== searchTerm,
    );
    setItems(updatedItems);
    localStorage.setItem("searches", JSON.stringify(updatedItems));
  };

  if (items?.searchArray?.length <= 0) {
    return (
      <div className="h-[40vh] flex justify-center items-center">
        <p className="font-medium text-deepBlue">No recent search</p>
      </div>
    );
  }
  return (
    <div className="h-[40vh] flex justify-center items-center">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-deepBlue">
              SearchTerm
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.searchArray?.map((searchTerm: string, index: number) => (
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
