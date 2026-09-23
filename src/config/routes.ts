import type { AppRoute } from '@/types/route'
import { permissions } from './permissions'

export const appRoutes: AppRoute[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/dashboard/index.vue'),
    meta: {
      title: 'menu.dashboard',
      icon: 'Odometer',
      requiresAuth: true,
      permission: permissions.dashboardView,
      layout: 'sidebar',
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/profile/index.vue'),
    meta: {
      title: 'menu.profile',
      icon: 'User',
      requiresAuth: true,
      permission: permissions.profileView,
      layout: 'sidebar',
    },
  },
  {
    path: '/system',
    name: 'System',
    redirect: '/system/users',
    meta: {
      title: 'menu.system.title',
      icon: 'Setting',
      requiresAuth: true,
      permission: permissions.systemView,
      layout: 'sidebar',
    },
    children: [
      {
        path: 'users',
        name: 'SystemUsers',
        component: () => import('@/pages/system/users/index.vue'),
        meta: {
          title: 'menu.system.users',
          icon: 'UserFilled',
          requiresAuth: true,
          permission: permissions.userView,
          layout: 'sidebar',
        },
      },
      {
        path: 'roles',
        name: 'SystemRoles',
        component: () => import('@/pages/system/roles/index.vue'),
        meta: {
          title: 'menu.system.roles',
          icon: 'Avatar',
          requiresAuth: true,
          permission: permissions.roleView,
          layout: 'sidebar',
        },
      },
      {
        path: 'permissions',
        name: 'SystemPermissions',
        component: () => import('@/pages/system/permissions/index.vue'),
        meta: {
          title: 'menu.system.permissions',
          icon: 'Lock',
          requiresAuth: true,
          permission: permissions.permissionView,
          layout: 'sidebar',
        },
      },
    ],
  },
]
