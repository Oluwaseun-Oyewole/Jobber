export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export class Endpoints {
  static register = BASE_URL + "auth/register";
  static login = BASE_URL + "auth/login";
  static allJobs = BASE_URL + "jobs";
}
