export interface User {
  id: string
  username: string
  displayName: string
  avatar?: string
  roles: string[]
  permissions: string[]
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthSession {
  user: User
  accessToken: string
  expiresAt: number
}

export interface AuthProvider {
  login(credentials: LoginCredentials): Promise<AuthSession>
  logout(): Promise<void>
  restoreSession(): Promise<AuthSession | null>
}

export type AuthMode = 'mock' | 'api' | 'redirect'
