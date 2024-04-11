/* eslint-disable valid-jsdoc */
import Axios, { AxiosRequestConfig } from "axios";

Axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.data.message === "Auth token expired/invalid") {
      //  handle error here
    }
    return Promise.reject(error);
  },
);

const Request = {
  /**
   * Prepares request options
   *
   * @param {AxiosRequestConfig} axiosOpts
   * @param {string} authToken
   * @return {Object}
   */
  prepareOptions(axiosOpts?: AxiosRequestConfig | null, authToken?: string) {
    /* eslint-disable-next-line */
    const { url, method, headers, data, ...requestOptions } = axiosOpts || {};

    const options = {
      ...requestOptions,
      headers: {
        ...(headers || {}),
        authorization: "Bearer " + authToken,
      },
    };
    return { data, ...options };
  },

  /**
   * Makes a POST request
   *
   * @param endpoint
   * @param data
   * @param options
   */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async post<T = any>(endpoint: string, options?: AxiosRequestConfig | null) {
    let postData;
    let requestOptions;

    if (options) {
      const { data, ...rest } = options;

      postData = data;
      requestOptions = rest;
    }

    return (await Axios.post(endpoint, postData, requestOptions)).data;
  },
};

export default Request;
