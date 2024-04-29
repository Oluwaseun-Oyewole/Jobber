export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export class Endpoints {
  static register = BASE_URL + "auth/register";
  static login = BASE_URL + "auth/login";
  static allJobs = BASE_URL + "jobs";
  static verifyOTP = BASE_URL + "verify-otp";
  static resendOTP = BASE_URL + "resend-otp";
  static forgotPassword = BASE_URL + "forgot-password";
  static resetPassword = BASE_URL + "reset-password";
  static createJob = BASE_URL + "create-job";
  static getCountryState = process.env.NEXT_PUBLIC_COUNTRY_NAME;
  static getCountryNameByGeoCode =
    process.env.NEXT_PUBLIC_GET_COUNTRY_BY_GEO_CODE + "json";
}
