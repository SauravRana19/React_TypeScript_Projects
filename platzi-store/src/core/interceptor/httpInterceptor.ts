import axios from "axios";
import { refreshToken } from "../../feature/auth/Login/service/LoginService";
import { useSelector,useDispatch } from "react-redux";
import type { State } from "../../common/CommonInterface";
import { setAuthToken } from "../../feature/auth/Login/LoginSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
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
      sessionStorage.removeItem("authToken");
      const token = useSelector((state: State) => state?.auth.refreshToken);
      const response = refreshToken(token);
      response.then((res:any) => {
        if (res) {
          const dispatch = useDispatch()
          dispatch(setAuthToken(res.access_token))
        } else {
          window.location.href = "/login";
        }
      });
    }
    return Promise.reject(error);
  }
);

export default api;
