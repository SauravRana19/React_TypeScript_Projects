import { API_ENDPOINTS } from "../../../services/ApiEndpoints";
import { del, get, post, put } from "../../../services/ApiMethods";
import type { UserData } from "../components/UsersInterface";

export const usersDetail = async () => {
  try {
    const response = await get(API_ENDPOINTS.USERS.BASE);
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserById = async (id: string | number) => {
  try {
    const response = await get(API_ENDPOINTS.USERS.BY_ID(id));
    return response;
  } catch (error) {
    return error;
  }
};

export const createUser = async (payload:UserData) => {
  try {
    const response = await post(API_ENDPOINTS.USERS.BASE,payload);
    return response
  } catch (error) {
    return error
  }
};

export const updateUser = async (id: number,payload:UserData) => {
  try {
    const response = await put(API_ENDPOINTS.USERS.BY_ID(id),payload);
    return response
  } catch (error) {
    return error
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await del(API_ENDPOINTS.USERS.BY_ID(id));
    return response
  } catch (error) {
    return error
  }
};
