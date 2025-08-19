import axios from "axios";
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: 'http://localhost:3333',  
    withCredentials: true, 
})

// Interceptor para adicionar token às requisições
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token_access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para lidar com respostas
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Remove token inválido dos cookies
        Cookies.remove('token_access', { path: '/' });
        document.dispatchEvent(new Event("unauthorized"));
      }
      return Promise.reject(error);
    }
  );
  
  export default api;


















