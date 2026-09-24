import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { LayoutName } from '@/types/route'

export const useAppStore = defineStore('app', () => {
  const layout = ref<LayoutName>('sidebar')
  const sidebarCollapsed = ref(false)

  const isSidebarCollapsed = computed(() => sidebarCollapsed.value)

  function setLayout(value: LayoutName) {
    layout.value = value
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  return {
    layout,
    sidebarCollapsed,
    isSidebarCollapsed,
    setLayout,
    toggleSidebar,
  }
})
