import { createSlice } from "@reduxjs/toolkit";
import { JobSlice as api } from "./query";

const initialState = {
  data: [],
  isLoading: false,
  isFilter: false,
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
  },
});

export const { stopFilter, startFilter } = jobSlice.actions;

export default jobSlice.reducer;
