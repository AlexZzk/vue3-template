<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { SidebarLayout, TopLayout, BlankLayout } from './index'
import type { LayoutName } from '@/types/route'

const route = useRoute()
const app = useAppStore()

const layouts: Record<LayoutName, Component> = {
  sidebar: SidebarLayout,
  top: TopLayout,
  blank: BlankLayout,
}

// 路由未显式声明布局时，回退到 app store 的默认布局
const layoutName = computed<LayoutName>(() => {
  const meta = route.meta.layout as LayoutName | undefined
  return meta || app.layout
})
</script>

<template>
  <component :is="layouts[layoutName] || SidebarLayout" />
</template>
