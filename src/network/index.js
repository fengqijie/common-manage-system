import axios from "axios";
import { useInterceptors } from "./interceptors";

// 本地联调可以这样写，配合 vue.config.js 里的 proxy 
export const configApi = {
  baseURL: process.env.VUE_APP_ENV !== "production" ? "/api" : "/api",
  timeout: 5000,
  withCredentials: true
};

export const jsonConfigApi = {
  baseURL:
    process.env.VUE_APP_ENV !== "production"
      ? "//company.test-cloud.com"
      : "//company.online.com/",
  timeout: 5000,
  headers: { 'content-type': 'application/json' },
  withCredentials: true,
};

const axiosInstance = axios.create(configApi);
const axiosJsonInstance = axios.create(jsonConfigApi);

useInterceptors(axiosInstance)

export const request = axiosInstance;
export const jsonRequest = axiosJsonInstance;

export * from "./apis/typeTwo";
export * from "./apis/typeOne.js";