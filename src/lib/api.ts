import axios, { InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

/**
 * Instance that will be use for http request to server API
 * This instance have base url, so you don't have to append base url manualy
 *
 * @type {AxiosInstance}
 */
const instanceApi = axios.create({
  baseURL: process.env.BASE_API_URL,
});

instanceApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = cookies().get("TOKEN");
    config.headers.Authorization = `Bearer ${token?.value}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instanceApi;
