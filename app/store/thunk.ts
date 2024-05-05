import {
  getCountryByGeoCode,
  getStatesByCountryName,
} from "@/services/country";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCountryName = createAsyncThunk(
  "get-country-name",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (data: { lat: number; lng: number }, { dispatch }) => {
    const res = await await getCountryByGeoCode({
      lat: data.lat,
      lng: data.lng,
    });
    return res;
  },
);

export const getCountryStates = createAsyncThunk(
  "get-country-states",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (data: { country: string }, { dispatch }) => {
    const response = await getStatesByCountryName({
      country: data.country,
    });
    return response;
  },
);
