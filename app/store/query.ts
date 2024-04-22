import { JobRequestBody } from "@/services/jobs/types";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
});

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const urlEnd = typeof args === "string" ? args : args.url;
  const adjustedUrl = `/${urlEnd}`;
  const adjustedArgs =
    typeof args === "string" ? adjustedUrl : { ...args, url: adjustedUrl };
  return rawBaseQuery(adjustedArgs, api, extraOptions);
};

export const JobSlice = createApi({
  reducerPath: "jobs",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  // }),
  baseQuery: dynamicBaseQuery,
  tagTypes: ["Jobs", "JobFilter", "JobDetails", "JobSearch"],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (query: JobRequestBody) => {
        return {
          url: `jobs?resultsPerPage=${query.resultsPerPage}&page=${query.page}&location=${query.location}`,
        };
      },
      providesTags: ["Jobs"],
    }),
    getJobsFilter: builder.query<any, Record<string, any> | undefined | null>({
      query: (args) => {
        return {
          url: `job-filter`,
          params: { ...args },
        };
      },
      providesTags: ["JobFilter"],
    }),
    getJobDetails: builder.query({
      query: (query: { id: string; location: string }) => {
        return {
          url: `job-details?id=${query.id}&location=${query.location}`,
        };
      },
      providesTags: ["JobDetails"],
    }),

    getJobSearch: builder.query<any, Record<string, any> | undefined | null>({
      query: (args) => {
        return {
          url: "search",
          params: { ...args },
        };
      },
      providesTags: ["JobSearch"],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetJobsFilterQuery,
  useGetJobDetailsQuery,
  useGetJobSearchQuery,
} = JobSlice;
