import { ForgotPasswordFormValues } from "@/lib/schema/forgot-password";
import { LoginFormValues } from "@/lib/schema/login";
import { OTPFormValues, OTPResendFormValues } from "@/lib/schema/otp";
import { RegisterFormValues } from "@/lib/schema/register";
import { handleRequestError } from "@/utils/axios.error";
import Request from "..";
import { Endpoints } from "../endpoints";
import { PasswordResetFormValues } from "./../../lib/schema/password-reset";
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
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const resendOTP = async (data: OTPResendFormValues) => {
  try {
    const response = await Request.post(Endpoints.resendOTP, {
      data,
    });
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const verifyOTP = async (data: OTPFormValues) => {
  try {
    const response = await Request.post(Endpoints.verifyOTP, {
      data,
    });
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const forgotPassword = async (data: ForgotPasswordFormValues) => {
  try {
    const response = await Request.post<AuthResponseBody>(
      Endpoints.forgotPassword,
      {
        data,
      },
    );
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};

export const resetPassword = async (data: PasswordResetFormValues) => {
  try {
    const response = await Request.post<AuthResponseBody>(
      Endpoints.resetPassword,
      {
        data,
      },
    );
    return response;
  } catch (error) {
    handleRequestError(error);
  }
};
