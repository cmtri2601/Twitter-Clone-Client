import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import { HttpStatus } from '~/constants/HttpStatus';
import { StorageKey } from '~/constants/StorageKey';
import { UserEndpoints } from './endPoints';
import { Media } from '~/dto/common/Media';
import { uploadFile } from '~/utils/file';

/**
 * Error response interface
 */
interface ErrorResponse {
  message: string;
  code: string;
}

// IIFE => singleton pattern => encapsulate extra logic, prevent global scope pollution
export const axiosClient: AxiosInstance = (() => {
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Accept: 'application/json, text/plain, */*'
    },
    timeout: 10000 // 10s
  });
})();

/**
 * Request interceptor
 * - Adds authentication token
 * - Handles request configuration
 */
axiosClient.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    // Add token if available
    const token = localStorage.getItem(StorageKey.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    /* 
      Note: config.data in interceptors.request is object,
      but in interceptors.response is json
      => just handle send file at request
     */
    const body = config.data;

    // Check if the request data includes a file
    if (typeof body === 'object') {
      for (const [, value] of Object.entries(body)) {
        if (value instanceof Media && value.file instanceof File) {
          await uploadFile(value);
        }
      }
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * - Handles response data transformation
 * - Manage authentication error
 * - Standardizes error handling
 */
axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === HttpStatus.UNAUTHORIZED && originalRequest) {
      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem(StorageKey.REFRESH_TOKEN);
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/refresh-token`,
          { refreshToken }
        );

        // Update stored token
        const { accessToken, refreshToken: newRefreshToken } =
          response.data.data;
        localStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
        localStorage.setItem(StorageKey.REFRESH_TOKEN, newRefreshToken);

        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Case logout need to change refresh token
        if (originalRequest.url === UserEndpoints.logout()) {
          originalRequest.data = {
            refreshToken: newRefreshToken
          };
        }

        // retry original request
        return axiosClient(originalRequest);
      } catch (error) {
        localStorage.removeItem(StorageKey.ACCESS_TOKEN);
        localStorage.removeItem(StorageKey.REFRESH_TOKEN);
        localStorage.removeItem(StorageKey.USER);
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    // Handle 403 forbidden error

    // Normal error
    return Promise.reject(error);
  }
);
