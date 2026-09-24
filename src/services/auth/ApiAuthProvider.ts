import type { AuthProvider, AuthSession, LoginCredentials } from '@/types/auth'
import { apiClient } from '@/services/api/client'

export class ApiAuthProvider implements AuthProvider {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const { data } = await apiClient.post<AuthSession>('/auth/login', credentials)
    return data
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  }

  async restoreSession(): Promise<AuthSession | null> {
    try {
      const { data } = await apiClient.post<AuthSession>('/auth/session')
      return data
    } catch {
      return null
    }
  }
}
