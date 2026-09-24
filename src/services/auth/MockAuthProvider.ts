import type { AuthProvider, AuthSession, LoginCredentials } from '@/types/auth'

const users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    displayName: '系统管理员',
    roles: ['admin'],
    permissions: [
      'dashboard:view',
      'profile:view',
      'system:view',
      'system:user:view',
      'system:user:create',
      'system:user:update',
      'system:user:delete',
      'system:role:view',
      'system:permission:view',
    ],
  },
  {
    id: '2',
    username: 'demo',
    password: 'demo123',
    displayName: '演示用户',
    roles: ['user'],
    permissions: ['dashboard:view', 'profile:view'],
  },
]

const STORAGE_KEY = 'standard-template-session'

export class MockAuthProvider implements AuthProvider {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = users.find(
      (item) =>
        item.username === credentials.username &&
        item.password === credentials.password,
    )

    if (!user) {
      throw new Error('用户名或密码错误')
    }

    const session: AuthSession = {
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        roles: user.roles,
        permissions: user.permissions,
      },
      accessToken: `mock-token-${Date.now()}`,
      expiresAt: Date.now() + 8 * 60 * 60 * 1000,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    return session
  }

  async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY)
  }

  async restoreSession(): Promise<AuthSession | null> {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    try {
      const session = JSON.parse(raw) as AuthSession
      if (session.expiresAt <= Date.now()) {
        localStorage.removeItem(STORAGE_KEY)
        return null
      }
      return session
    } catch {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
  }
}
