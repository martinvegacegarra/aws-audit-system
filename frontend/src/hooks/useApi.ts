import useSWR from 'swr';
import axios from 'axios';
import config from '@/config/config';

const fetcher = async (url: string) => {
  const token = localStorage.getItem(config.auth.tokenKey);
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export function useApi<T>(endpoint: string, options = {}) {
  const url = `${config.api.baseUrl}/api${endpoint}`;
  const { data, error, mutate } = useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
    ...options,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export default useApi;