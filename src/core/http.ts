import axiosInstance from "./axiosInstance";
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";

interface ApiResponse<T> {
  data: T;
  success: boolean;
  status?: number;
  message: string;
}

async function handleAxiosRequest<T>(
  axiosRequestFn: () => Promise<AxiosResponse<T, any>>
): Promise<ApiResponse<T>> {
  try {
    const response = await axiosRequestFn();
    return {
      data: response.data,
      success: true,
      status: response.status,
      message: "Success",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const errorData = error.response?.data;
      return {
        data: null as unknown as T,
        status: error.response?.status,
        success: false,
        message: errorData?.message || errorData?.error || error.message,
      };
    }
    return {
      data: null as unknown as T,
      status: undefined,
      success: false,
      message: "An unknown error occurred",
    };
  }
}

export default {
  get<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<ApiResponse<T>> {
    return handleAxiosRequest<T>(() => axiosInstance.get<T>(url, config));
  },

  delete<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<ApiResponse<T>> {
    return handleAxiosRequest<T>(() => axiosInstance.delete<T>(url, config));
  },

  post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<ApiResponse<T>> {
    return handleAxiosRequest<T>(() =>
      axiosInstance.post<T>(url, data, config)
    );
  },

  put<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<ApiResponse<T>> {
    return handleAxiosRequest<T>(() => axiosInstance.put<T>(url, data, config));
  },

  patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<ApiResponse<T>> {
    return handleAxiosRequest<T>(() =>
      axiosInstance.patch<T>(url, data, config)
    );
  },
};
