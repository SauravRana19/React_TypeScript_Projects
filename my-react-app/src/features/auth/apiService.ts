import { del, get, post, put } from "../interceptor/httpInterceptor";
import API_ENDPOINTS from "./endpoints";

const endpoint = API_ENDPOINTS;

const fetchUserDetails = async () => {
  try {
    const data = await get(endpoint.USER.Details);
    return data;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
  }
};

const createNewUser = async (payload: any) => {
  try {
    let url = `${endpoint.USER.Details}`;
    const data = await post(url, payload);
    return data;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
  }
};

const deleteUser = async (id: number) => {
  try {
    let url = `${endpoint.USER.Details}/${id}`;
    const data = await del(url);
    return data;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
  }
};

const updateUser = async (id:number,payload:object) => {
  try {
    let url = `${endpoint.USER.Details}/${id}`;
    const data = await put(url,payload);
    return data;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
  }
};

export const ApiService = {
  fetchUserDetails,
  createNewUser,
  deleteUser,
  updateUser,
};
