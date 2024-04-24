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
import Link from "next/link";
import { useState } from "react";

type IJob = {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
};

const SavedJobs = (jobs: any) => {
  const [items, setItems] = useState(jobs);

  const removeJobs = (id: string) => {
    const updatedItems = items.jobs.filter((job: IJob) => job.id !== id);
    setItems(updatedItems);
    localStorage.setItem("savedJobs", JSON.stringify(updatedItems));
  };

  if (items?.jobs?.length <= 0) {
    return (
      <div className="h-[40vh] flex justify-center items-center">
        <p className="font-medium text-deepBlue">No saved job(s)</p>
      </div>
    );
  }
  return (
    <div className="h-[40vh] flex justify-center items-center">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-deepBlue">Company </TableHead>
            <TableHead className="w-[250px] text-deepBlue">Job Title</TableHead>
            <TableHead className="w-[150px] text-deepBlue">Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.jobs?.map((job: IJob, index: number) => (
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
