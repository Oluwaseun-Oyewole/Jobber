import { createSlice } from "@reduxjs/toolkit";
import { JobSlice as api } from "./query";
import { getCountryName, getCountryStates } from "./thunk";

const initialState = {
  data: [],
  jobDetails: {},
  isLoading: false,
  isDescLoader: false,
  isFilter: false,
  id: "",
  isPaginate: false,
  country: "",
  states: [],
  isSearchTrigger: false,
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
    startSearch(state) {
      state.isSearchTrigger = true;
    },
    stopSearch(state) {
      state.isSearchTrigger = false;
    },
    startPagination(state) {
      state.isPaginate = true;
    },
    stopPagination(state) {
      state.isPaginate = false;
    },
    getJobId(state, action) {
      state.id = action.payload;
    },
    removeJobId(state) {
      state.id = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountryName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountryName.fulfilled, (state, action) => {
        state.isLoading = false;
        const country = action.payload?.plus_code?.compound_code;
        const countryLength = country?.split(",").length - 1;
        state.country = country?.split(",")[countryLength];
      })
      .addCase(getCountryName.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(getCountryStates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountryStates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.states = action.payload?.data?.states;
      })
      .addCase(getCountryStates.rejected, (state) => {
        state.isLoading = false;
      });
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
    builder.addMatcher(api.endpoints.getJobsFilter.matchRejected, (state) => {
      state.isLoading = false;
    });
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

    builder.addMatcher(api.endpoints.getJobSearch.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(
      api.endpoints.getJobSearch.matchFulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.data = payload?.data;
      },
    );
  },
});

export const {
  stopFilter,
  startFilter,
  getJobId,
  startPagination,
  stopPagination,
  startSearch,
  stopSearch,
  removeJobId,
} = jobSlice.actions;

export default jobSlice.reducer;
