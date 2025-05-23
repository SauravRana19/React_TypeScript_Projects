import type { LoginForm } from "../../../../common/CommonInterface";
import { API_ENDPOINTS } from "../../../../services/ApiEndpoints";
import { get, post } from "../../../../services/ApiMethods";

export const login = async (loginForm: LoginForm) => {
  try {
    const response = await post(API_ENDPOINTS.AUTH.LOGIN, loginForm);
    return response;
  } catch (error) {
    return error;
  }
};

export const refreshToken = async (accessToken: string) => {
  try {
    const response = await post(API_ENDPOINTS.AUTH.REFRESH_TOKEN,accessToken)
    return response
  } catch (error) {
    return error
  }
};

export const loginUserRole = async (accessToken: string) => {
  try {
    const response = await get(API_ENDPOINTS.AUTH.PROFILE);
    return response;
  } catch (error) {
    return error;
  }
};
