import { createSlice } from "@reduxjs/toolkit";
import { JobSlice as api } from "./query";

const initialState = {
  data: [],
  jobDetails: {},
  isLoading: false,
  isDescLoader: false,
  isFilter: false,
  id: "",
};

const jobSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    stopFilter(state) {
      state.isFilter = false;
    },
    startFilter(state) {
      state.isFilter = true;
    },
    getJobId(state, action) {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getAllJobs.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      api.endpoints.getAllJobs.matchFulfilled,
      (state, action) => {
        state.isLoading = false;
        state.isFilter = false;
        state.data = action.payload?.data;
      },
    );
    builder.addMatcher(api.endpoints.getJobsFilter.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      api.endpoints.getJobsFilter.matchFulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.isFilter = true;
        state.data = payload?.data;
      },
    );
    builder.addMatcher(api.endpoints.getJobDetails.matchPending, (state) => {
      state.isDescLoader = true;
    });
    builder.addMatcher(
      api.endpoints.getJobDetails.matchFulfilled,
      (state, { payload }) => {
        state.isDescLoader = false;
        state.jobDetails = payload?.data;
      },
    );
  },
});

export const { stopFilter, startFilter, getJobId } = jobSlice.actions;

export default jobSlice.reducer;
