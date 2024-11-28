import axios from 'axios';
import config from '@/config/config';
import { handleError } from './error';

const api = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(config.auth.tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(handleError(error));
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(handleError(error));
  }
);

export const get = async <T>(url: string, params?: object) => {
  const response = await api.get<T>(url, { params });
  return response.data;
};

export const post = async <T>(url: string, data?: object) => {
  const response = await api.post<T>(url, data);
  return response.data;
};

export const put = async <T>(url: string, data?: object) => {
  const response = await api.put<T>(url, data);
  return response.data;
};

export const del = async <T>(url: string) => {
  const response = await api.delete<T>(url);
  return response.data;
};

export default api;