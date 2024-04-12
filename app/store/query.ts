import { JobRequestBody } from "@/services/jobs/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const JobSlice = createApi({
  reducerPath: "jobs",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  }),

  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (page: JobRequestBody) => {
        return {
          url: `jobs?resultsPerPage=${page.resultsPerPage}&page=${page.page}`,
        };
      },
      providesTags: ["Jobs"],
    }),
  }),
});

export const { useGetAllJobsQuery } = JobSlice;
