import type { Component } from 'vue'
import type {
  RouteComponent,
  RouteMeta as VueRouterRouteMeta,
  RouteRecordRedirectOption,
} from 'vue-router'

export type LayoutName = 'sidebar' | 'top' | 'blank'

export interface RouteMeta extends VueRouterRouteMeta {
  title: string
  icon?: string
  requiresAuth?: boolean
  guestOnly?: boolean
  permission?: string
  permissions?: string[]
  layout?: LayoutName
  hidden?: boolean
}

export interface AppRoute {
  path: string
  name: string
  component?: RouteComponent
  redirect?: RouteRecordRedirectOption
  meta: RouteMeta
  children?: AppRoute[]
}
