import axios from "axios";
import store from "@/store";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getters["auth/accessToken"];

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let refreshing = false;
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      if (refreshing) {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (!refreshing) {
              clearInterval(interval);
              resolve(axiosInstance(error.config));
            }
          }, 100);
        });
      }

      refreshing = true;

      try {
        await store.dispatch("auth/refreshToken");
        refreshing = false;
        return axiosInstance(error.config);
      } catch (refreshError) {
        refreshing = false;
        store.dispatch("auth/logout");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
