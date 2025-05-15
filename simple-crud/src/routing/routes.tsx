
import { lazy } from 'react';

export const routes = [
  {
    path: '/signin',
    page: lazy(() => import('../pages/signIn')),
    private: false,
    allowedRoles: [],
  },
  {
    path: '/signup',
    page: lazy(() => import('../pages/signUp')),
    private: false,
    allowedRoles: [],
  },
  {
    path: '/dashboard',
    page: lazy(() => import('../pages/dashBoard')),
    private: true,
    allowedRoles: ['admin'],
  },
  {
    path: '/blog',
    page: lazy(() => import('../pages/blog')),
    private: true,
    allowedRoles: ['admin', 'user'],
  },
  {
    path: '/form-hook',
    page: lazy(() => import('../pages/formHook')),
    private: true,
    allowedRoles: ['admin', 'user'],
  },
]
