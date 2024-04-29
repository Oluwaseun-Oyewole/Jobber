import { JobPostFormValues } from "@/lib/schema/post-job";
import { handleRequestError } from "@/utils/axios.error";
import Request from "..";
import { Endpoints } from "../endpoints";
import { JobRequestBody, JobResponseBody } from "./types";

export const allJobs = async (data: JobRequestBody) => {
  try {
    const response = await Request.get<JobResponseBody>(Endpoints.allJobs, {
      data,
    });
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const createJob = async (data: JobPostFormValues) => {
  try {
    const response = await Request.post(Endpoints.createJob, {
      data,
    });
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};
