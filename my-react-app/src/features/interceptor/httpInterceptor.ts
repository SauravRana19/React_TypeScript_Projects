import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '5000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const get = async (url:string) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const post = async (url:string, data:object[]) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const del = async (url: string) => { 
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error('DELETE Error:', error);
    throw error;
  }
};

export const put = async (url: string, data: object) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error('PUT Error:', error);
    throw error;
  }
};

export default api;