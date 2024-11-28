import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import config from '@/config/config';

interface LoginCredentials {
  accessKeyId: string;
  secretAccessKey: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem(config.auth.tokenKey);
    if (!token) {
      setState({ isAuthenticated: false, isLoading: false, error: null });
      return;
    }

    try {
      await axios.get(`${config.api.baseUrl}/api/auth/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setState({ isAuthenticated: true, isLoading: false, error: null });
    } catch (error) {
      localStorage.removeItem(config.auth.tokenKey);
      setState({ isAuthenticated: false, isLoading: false, error: null });
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      const response = await axios.post(
        `${config.api.baseUrl}/api/auth/login`,
        credentials
      );
      localStorage.setItem(config.auth.tokenKey, response.data.token);
      setState({ isAuthenticated: true, isLoading: false, error: null });
      router.push('/dashboard');
    } catch (error) {
      setState({
        isAuthenticated: false,
        isLoading: false,
        error: 'Invalid credentials',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem(config.auth.tokenKey);
    setState({ isAuthenticated: false, isLoading: false, error: null });
    router.push('/login');
  };

  return {
    ...state,
    login,
    logout,
  };
}

export default useAuth;