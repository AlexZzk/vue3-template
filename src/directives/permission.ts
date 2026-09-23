import type { Directive } from 'vue'
import { useAuthStore } from '@/stores/auth'

/**
 * 按钮权限指令：v-permission="'system:user:create'"
 * 当前账号缺少指定权限时移除元素。
 */
export const permission: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    const required = Array.isArray(binding.value) ? binding.value : [binding.value]
    const auth = useAuthStore()
    if (required.length && !required.some((item) => auth.hasPermission(item))) {
      el.remove()
    }
  },
}
