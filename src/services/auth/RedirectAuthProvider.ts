import type { AuthProvider, AuthSession, LoginCredentials } from '@/types/auth'

/**
 * 第三方登录预留实现。
 * 实际项目中可根据 OAuth/OIDC/企业统一认证中心替换以下方法。
 */
export class RedirectAuthProvider implements AuthProvider {
  async login(_credentials: LoginCredentials): Promise<AuthSession> {
    throw new Error('RedirectAuthProvider 不支持账号密码登录，请使用 redirect()')
  }

  redirect(returnUrl = window.location.href) {
    const callback = encodeURIComponent(returnUrl)
    window.location.href = `/auth/redirect?returnUrl=${callback}`
  }

  async logout(): Promise<void> {
    // 可接入第三方 SSO logout
  }

  async restoreSession(): Promise<AuthSession | null> {
    return null
  }
}
