import { API_ENDPOINTS } from "../../../services/ApiEndpoints";
import { del, get, post, put } from "../../../services/ApiMethods";
import type { CategorieData } from "../components/CategorieInterface";

export const categoriesDetail = async () => {
  try {
    const response = await get(API_ENDPOINTS.CATEGORIES.BASE);
    return response;
  } catch (error) {
    return error;
  }
};

export const getCategorieById = async (id: string | number) => {
  try {
    const response = await get(API_ENDPOINTS.CATEGORIES.BY_ID(id));
    return response;
  } catch (error) {
    return error;
  }
};

export const createCategorie = async (payload:CategorieData) => {
  try {
    const response = await post(API_ENDPOINTS.CATEGORIES.BASE,payload);
    return response
  } catch (error) {
    return error
  }
};

export const updateCategorie = async (id: number,payload:CategorieData) => {
  try {
    const response = await put(API_ENDPOINTS.CATEGORIES.BY_ID(id),payload);
    return response
  } catch (error) {
    return error
  }
};

export const deleteCategorie = async (id: number) => {
  try {
    const response = await del(API_ENDPOINTS.CATEGORIES.BY_ID(id));
    return response
  } catch (error) {
    return error
  }
};
