import { useAuthStore } from '@/stores/auth'

export function usePermission() {
  const auth = useAuthStore()

  return {
    hasPermission: auth.hasPermission,
    hasAnyPermission: auth.hasAnyPermission,
    hasRole: auth.hasRole,
  }
}
