import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3333',  
    withCredentials: true, 
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        
        document.dispatchEvent(new Event("unauthorized"));
      }
      return Promise.reject(error);
    }
  );
  
  export default api;


















