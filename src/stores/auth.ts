import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { LoginCredentials, User } from '@/types/auth'
import { authProvider } from '@/services/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref('')
  const expiresAt = ref(0)
  const initialized = ref(false)

  const isAuthenticated = computed(
    () => !!user.value && !!accessToken.value && expiresAt.value > Date.now(),
  )

  const permissions = computed(() => user.value?.permissions ?? [])
  const roles = computed(() => user.value?.roles ?? [])

  function hasPermission(permission?: string) {
    if (!permission) return true
    return permissions.value.includes(permission)
  }

  function hasAnyPermission(items: string[] = []) {
    return items.length === 0 || items.some((item) => permissions.value.includes(item))
  }

  function hasRole(role: string) {
    return roles.value.includes(role)
  }

  async function login(credentials: LoginCredentials) {
    const session = await authProvider.login(credentials)
    user.value = session.user
    accessToken.value = session.accessToken
    expiresAt.value = session.expiresAt
  }

  async function logout() {
    await authProvider.logout()
    user.value = null
    accessToken.value = ''
    expiresAt.value = 0
  }

  async function restore() {
    const session = await authProvider.restoreSession()
    if (session) {
      user.value = session.user
      accessToken.value = session.accessToken
      expiresAt.value = session.expiresAt
    }
    initialized.value = true
  }

  return {
    user,
    accessToken,
    expiresAt,
    initialized,
    isAuthenticated,
    permissions,
    roles,
    hasPermission,
    hasAnyPermission,
    hasRole,
    login,
    logout,
    restore,
  }
})
