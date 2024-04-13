import { JobRequestBody } from "@/services/jobs/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const JobSlice = createApi({
  reducerPath: "jobs",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  }),

  tagTypes: ["Jobs", "JobFilter"],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (page: JobRequestBody) => {
        return {
          url: `jobs?resultsPerPage=${page.resultsPerPage}&page=${page.page}`,
        };
      },
      providesTags: ["Jobs"],
    }),
    getJobsFilter: builder.query<any, { resultsPerPage: number; page: number }>(
      {
        query: (args) => {
          const { resultsPerPage, page } = args;
          return {
            url: `filter-jobs?resultsPerPage=${resultsPerPage}&page=${page}`,
            params: { resultsPerPage, page },
          };
        },
        providesTags: ["JobFilter"],
      },
    ),
  }),
});

export const { useGetAllJobsQuery, useGetJobsFilterQuery } = JobSlice;
