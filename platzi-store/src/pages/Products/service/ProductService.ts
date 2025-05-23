import { API_ENDPOINTS } from "../../../services/ApiEndpoints";
import { get } from "../../../services/ApiMethods";

export const products = async () => {
  try {
    const response = await get(API_ENDPOINTS.PRODUCTS.BASE);
    return response;
  } catch (error) {
    return error;
  }
};

export const getProductById = async (id: string | number) => {
  try {
    const response = await get(API_ENDPOINTS.PRODUCTS.BY_ID(id));
    return response;
  } catch (error) {
    return error;
  }
};
