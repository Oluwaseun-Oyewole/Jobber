"use client";
import { allSavedJobs } from "@/app/store/slice";
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
import Link from "next/link";
import { useEffect, useState } from "react";

type IJob = {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
};

const SavedJobs = () => {
  const [items, setItems] = useState([]);
  const dispatch = useAppDispatch();

  const removeJobs = (id: string) => {
    const updatedItems = items.filter((job: IJob) => job.id !== id);
    setItems(updatedItems);
    localStorage.setItem("savedJobs", JSON.stringify(updatedItems));
    dispatch(allSavedJobs(updatedItems));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("savedJobs");
      setItems(JSON.parse(storage!));
      dispatch(allSavedJobs(JSON.parse(storage!)));
    }
  }, [dispatch]);

  if (items?.length <= 0) {
    return (
      <div className="h-[30vh] flex justify-center items-center bg-white shadow-lg rounded-md mt-8 w-[90%] lg:w-[45%]">
        <p className="font-medium text-deepBlue">No saved job(s)</p>
      </div>
    );
  }

  return (
    <div className="h-[40vh] flex justify-center items-center w-[90%] lg:w-[45%] bg-white shadow-lg rounded-md mt-8 overflow-y-scroll">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-deepBlue">Company </TableHead>
            <TableHead className="w-[250px] text-deepBlue">Job Title</TableHead>
            <TableHead className="w-[150px] text-deepBlue">Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((job: IJob, index: number) => (
            <TableRow>
              <TableCell className="font-medium" key={index}>
                <Link
                  href={`job-description/${job.id}`}
                  className="text-deepBlue"
                >
                  {job.companyName}
                </Link>
              </TableCell>
              <TableCell className="font-light" key={index}>
                {job.jobTitle}
              </TableCell>
              <TableCell className="font-light" key={index}>
                {job.location}
              </TableCell>
              <TableCell className="font-light" key={index}>
                <DeleteIcon
                  className="cursor-pointer"
                  onClick={() => removeJobs(job.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SavedJobs;
