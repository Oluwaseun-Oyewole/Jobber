import { handleRequestError } from "@/utils/axios.error";
import { Toastify } from "@/utils/toasts";
import Request from "..";
import { Endpoints } from "../endpoints";
import {
  CountryByGeoCodeRequestBody,
  CountryByGeoCodeResponseBody,
  StateByCountryNameRequestBody,
  StateByCountryNameResponseBody,
} from "./types";

export const getCountryByGeoCode = async (
  data: CountryByGeoCodeRequestBody,
) => {
  try {
    const response = await Request.get<CountryByGeoCodeResponseBody>(
      Endpoints.getCountryNameByGeoCode +
        `?latlng=${data.lat},${data.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
    );
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const getStatesByCountryName = async (
  data: StateByCountryNameRequestBody,
) => {
  try {
    const response = await Request.post<StateByCountryNameResponseBody>(
      Endpoints.getCountryState!,
      {
        data,
      },
    );
    Toastify.success(response?.msg);
    return response;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      Toastify.error("no country found");
    } else {
      Toastify.error("An error occurred");
    }
  }
};
