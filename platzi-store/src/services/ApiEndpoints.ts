
const API_BASE = {
  AUTH: '/auth',
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  USERS: '/users',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE.AUTH}/login`,
    PROFILE: `${API_BASE.AUTH}/profile`,
    REFRESH_TOKEN: `${API_BASE.AUTH}/refresh-token`,
  },
  PRODUCTS: {
    BASE: API_BASE.PRODUCTS,
    BY_ID: (id: string | number) => `${API_BASE.PRODUCTS}/${id}`,
  },
  CATEGORIES: {
    BASE: API_BASE.CATEGORIES,
    BY_ID: (id: string | number) => `${API_BASE.CATEGORIES}/${id}`,
  },
  USERS: {
    BASE: API_BASE.USERS,
    BY_ID: (id: string | number) => `${API_BASE.USERS}/${id}`,
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;