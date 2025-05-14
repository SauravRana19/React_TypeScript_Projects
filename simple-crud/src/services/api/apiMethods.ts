import api from "../../features/interceptor/httpInterceptor";

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