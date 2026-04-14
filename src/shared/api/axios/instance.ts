import axios from "axios";

import { env } from "shared/config";

export const axiosInstance = axios.create({
    baseURL: env.apiBaseUrl,
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => Promise.reject(error)
);
