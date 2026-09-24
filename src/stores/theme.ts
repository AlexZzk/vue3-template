import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ThemeName } from '@/types/theme'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeName>('apple-glass')

  function setTheme(value: ThemeName) {
    theme.value = value
    document.documentElement.dataset.theme = value
    localStorage.setItem('app-theme', value)
  }

  function restore() {
    const saved = localStorage.getItem('app-theme') as ThemeName | null
    setTheme(saved || 'apple-glass')
  }

  return { theme, setTheme, restore }
})
