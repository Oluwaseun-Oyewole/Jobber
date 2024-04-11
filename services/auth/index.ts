import { LoginFormValues } from "@/lib/schema/login";
import { RegisterFormValues } from "@/lib/schema/register";
import { handleRequestError } from "@/utils/axios.error";
import Request from "..";
import { Endpoints } from "../endpoints";
import { AuthResponseBody } from "./types";

export const register = async (data: RegisterFormValues) => {
  try {
    const response = await Request.post<AuthResponseBody>(Endpoints.register, {
      data,
    });
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const login = async (data: LoginFormValues) => {
  try {
    const response = await Request.post<AuthResponseBody>(Endpoints.login, {
      data,
    });
    return response;
  } catch (error) {
    console.log("error from axios", error);
    handleRequestError(error);
  }
};
