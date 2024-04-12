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
