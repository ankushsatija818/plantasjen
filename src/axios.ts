import axios from "axios";
// import { getSession } from "next-auth/react";
// import { auth } from "@/auth";

/**
 * Creates an initial 'axios' instance with custom settings.
 */
import { getCookie } from 'typescript-cookie'

console.log(process.env.VITE_API_BASE_URL)
const instance = axios.create({
  baseURL:`${process.env.VITE_API_BASE_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    is_calling_from_react_app: true,     
    Authorization:"Basic NDcyNzc1ZTMtYmRkZS00ZTIzLWEwNTItNDdlNzEzY2UxN2NjOjFUSFpFRTVIUjJhVEVwcjNMZ1RIQUg2WjVzT2M5RE5pOElURG95SGkwNW8=",
  },
});
export const instance2 = axios.create({
  baseURL:`${process.env.VITE_API_BASE_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    is_calling_from_react_app: true,     
    Authorization:`Bearer ${getCookie('tk')}`,
  },
});

instance2.interceptors.request.use(
  async (config) => {
    if (typeof document !== "undefined") {
      config.headers["Authorization"] = `Bearer ${getCookie(
        "tk"
      )}`;
    }

    return config;
  },
  (err) => {
    try {
    } catch (err) {
      console.log(err);
    }
    if (err.response) {
      return Promise.reject(err.response.data);
    }

    if (err.request) {
      return Promise.reject(err.request);
    }

    return Promise.reject(err);
  }
);



export default instance;