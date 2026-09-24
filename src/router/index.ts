import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { appRoutes } from '@/config/routes'
import { useAuthStore } from '@/stores/auth'
import type { AppRoute } from '@/types/route'

const flattenRoutes = (routes: AppRoute[], parentPath = ''): RouteRecordRaw[] => {
  return routes.flatMap((route) => {
    const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/')
    const current = {
      path: fullPath,
      name: route.name,
      meta: route.meta,
      ...(route.component ? { component: route.component } : {}),
      ...(route.redirect ? { redirect: route.redirect } : {}),
    } as RouteRecordRaw
    const children = route.children ? flattenRoutes(route.children, fullPath) : []
    return [current, ...children]
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/auth/Login.vue'),
      meta: {
        title: '登录',
        guestOnly: true,
        layout: 'blank',
      },
    },
    ...flattenRoutes(appRoutes),
    {
      path: '/403',
      name: 'Forbidden',
      component: () => import('@/pages/error/403.vue'),
      meta: { title: '无权访问', layout: 'blank' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/error/404.vue'),
      meta: { title: '页面不存在', layout: 'blank' },
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (!auth.initialized) {
    await auth.restore()
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return '/dashboard'
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return {
      name: 'Login',
      query: { redirect: to.fullPath },
    }
  }

  if (to.meta.permission && !auth.hasPermission(to.meta.permission as string)) {
    return '/403'
  }

  return true
})

export default router
