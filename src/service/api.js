import axios from 'axios';
import { useAuth } from '../components/Auth/AuthContext';

const useApi = () => {
  const { token } = useAuth(); 

  const api = axios.create({////https://guess-game1-production.up.railway.app //https://guess-game-backend.vercel.app/
    baseURL: 'https://guess-game-backend.vercel.app',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  return api;
};

export default useApi;
