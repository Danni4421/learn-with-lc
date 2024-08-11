import axios, { InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const instanceApi = axios.create({
  baseURL: process.env.BASE_API_URL,
});

instanceApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = cookies().get("token");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instanceApi;
