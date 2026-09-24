import { MockAuthProvider } from './MockAuthProvider'
import type { AuthProvider } from '@/types/auth'

export const authProvider: AuthProvider = new MockAuthProvider()
